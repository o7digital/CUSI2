import os
os.environ['DATABASE_URL'] = 'sqlite:///:memory:'
os.environ['EMBEDDING_PROVIDER'] = 'local-hash'
os.environ['CUSI_GATEWAY_KEY'] = 'local-test-key'

import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, select
from sqlalchemy.pool import StaticPool
from app import db as database
from app import cusi_api as cusi
from app.models import Base, Document, Message


@pytest.fixture
def client(monkeypatch):
    engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    monkeypatch.setattr(database, 'engine', engine)
    cusi.limits.clear()
    cusi.busy.clear()
    with TestClient(cusi.app) as client:
        yield client
    engine.dispose()


def payload(**updates):
    return {'message': '¿Qué flores tienen?', 'conversation_id': 'a'*48, 'session_id': 'b'*32, 'client_hash': 'c'*64, 'language': 'es', 'consent': True, **updates}


def post(client, **updates):
    return client.post('/chat', json=payload(**updates), headers={'Authorization': 'Bearer local-test-key'})


def test_authorization_consent_and_fixed_tenant(client):
    assert client.post('/chat', json=payload()).status_code == 401
    assert post(client, consent=False).status_code == 400
    assert post(client, tenant='other').status_code == 422
    assert post(client, history=[]).status_code == 422
    assert post(client, message='  ').status_code == 422
    assert client.get('/v1/documents').status_code == 404
    with database.tenant_session(cusi.TENANT) as db:
        assert list(db.scalars(select(Message))) == []


def test_core_uses_only_cusi_documents_and_isolated_conversations(client, monkeypatch):
    histories = []
    def generate(routing, prompt, history, context, **kwargs):
        histories.append([(item.role, item.content) for item in history])
        assert kwargs['tenant'] == 'cusi'
        assert all(hit.tenant_id == 'cusi' for hit in context)
        assert all(hit.source.startswith('https://www.cusiflores.com/') for hit in context)
        assert 'Visitor question:' in prompt
        return 'Confirma la entrega con CUSI por WhatsApp.', 'test-model', 'test-response', 1
    monkeypatch.setattr(cusi, 'generate', generate)
    for language in ['es', 'fr', 'en', 'it']:
        response = post(client, language=language)
        assert response.status_code == 200
        assert response.json()['clientCode'] == 'cusi'
        assert response.json()['version'] == '3.6.0'
        assert response.json()['model'] == 'test-model'
    post(client, conversation_id='d'*48)
    assert len(histories[1]) == 2
    assert histories[0] == histories[-1] == []


def test_failure_does_not_store_a_fabricated_response(client, monkeypatch):
    def unavailable(*args, **kwargs):
        raise HTTPException(502, 'Provider unavailable')
    monkeypatch.setattr(cusi, 'generate', unavailable)
    assert post(client).status_code == 502
    assert not cusi.busy
    with database.tenant_session(cusi.TENANT) as db:
        assert list(db.scalars(select(Message))) == []


def test_knowledge_is_only_cusi_and_seed_is_idempotent(client):
    cusi.seed_knowledge()
    with database.tenant_session(cusi.TENANT) as db:
        docs = list(db.scalars(select(Document)))
        assert len(docs) == 3
        assert {doc.tenant_id for doc in docs} == {'cusi'}
        assert any('525521092665' in doc.content for doc in docs)
        assert any('Bouquet Frances II' in doc.content for doc in docs)


def test_limits(client, monkeypatch):
    monkeypatch.setattr(cusi, 'generate', lambda *args, **kwargs: ('CUSI', 'test-model', 'test', 1))
    for _ in range(8):
        assert post(client).status_code == 200
    assert post(client).status_code == 429


def test_order_intent_opens_inline_form_without_storing_control_markers(client, monkeypatch):
    monkeypatch.setattr(cusi, 'generate', lambda *args, **kwargs: ('Remplissez ce petit formulaire ici. [CUSI_ORDER_FORM]', 'test-model', 'test', 1))
    response = post(client, message='Je souhaite commander', language='fr')
    assert response.status_code == 200
    assert response.json()['action'] == 'open_order_form'
    assert response.json()['reply'] == 'Remplissez ce petit formulaire ici.'
    with database.tenant_session(cusi.TENANT) as db:
        replies = list(db.scalars(select(Message).where(Message.role == 'assistant')))
        assert replies and all('[CUSI_ORDER_FORM]' not in reply.content for reply in replies)
