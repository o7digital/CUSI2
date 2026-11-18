import test from 'node:test'
import assert from 'node:assert/strict'
import { createOliviaGateway } from '../lib/olivia-gateway.ts'

const key = 'test-cusi-only-'.repeat(5)
const origin = 'https://www.cusiflores.com'
const body = () => ({ message: '¿Entregan en Polanco?', language: 'es', consent: true, conversationId: '12345678-1234-1234-1234-123456789abc' })
const request = (method, action, headers = {}, data) => new Request(`${origin}/api/olivia/${action}`, { method, headers: { Origin: origin, ...headers }, ...(data === undefined ? {} : { body: JSON.stringify(data) }) })
async function session(handle) {
  const response = await handle(request('GET', 'session'), 'session')
  const { identity } = await response.json()
  return { Cookie: response.headers.get('set-cookie').split(';')[0], 'X-Olivia-Widget-Identity': identity, 'Content-Type': 'application/json' }
}

test('health requires the actual CUSI 3.6 provider without creating a session', async () => {
  for (const [data, available] of [
    [{ status: 'ok', site: 'cusi', version: '3.6.0', provider_configured: true }, true],
    [{ status: 'ok', site: 'another-client', version: '3.6.0', provider_configured: true }, false],
    [{ status: 'ok', site: 'cusi', version: '2.0.0', provider_configured: true }, false],
    [{ status: 'ok', site: 'cusi', version: '3.6.0', provider_configured: false }, false],
  ]) {
    const handle = createOliviaGateway(key, async url => { assert.equal(url, 'https://olivia.o7digitalgroup.com/cusi/health'); return Response.json(data) })
    const response = await handle(request('GET', 'status'), 'status')
    assert.equal(response.status, available ? 200 : 503)
    assert.equal((await response.json()).available, available)
    assert.equal(response.headers.get('set-cookie'), null)
  }
})

test('server binds chat to the signed visitor, fixed tenant and private gateway', async () => {
  const calls = []
  const handle = createOliviaGateway(key, async (url, options) => { calls.push({ url, ...options }); return Response.json({ reply: 'Confirma la entrega con CUSI.', clientCode: 'cusi', version: '3.6.0', model: 'test-model' }) })
  const headers = await session(handle)
  assert.equal((await handle(request('POST', 'chat', headers, body()), 'chat')).status, 200)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://olivia.o7digitalgroup.com/cusi/chat')
  assert.equal(calls[0].headers.Authorization, `Bearer ${key}`)
  const payload = JSON.parse(calls[0].body)
  assert.equal(payload.consent, true)
  assert.match(payload.conversation_id, /^[a-f0-9]{48}$/)
  assert.match(payload.session_id, /^[a-f0-9]{32}$/)
  assert.match(payload.client_hash, /^[a-f0-9]{64}$/)
  const second = await session(handle)
  await handle(request('POST', 'chat', second, body()), 'chat')
  assert.notEqual(JSON.parse(calls[1].body).conversation_id, payload.conversation_id)
})

test('cross-origin calls, forged sessions and browser-selected tenants never reach the engine', async () => {
  let calls = 0
  const handle = createOliviaGateway(key, async () => { calls++; throw new Error('must not be called') })
  const headers = await session(handle)
  for (const [extraHeaders, data, expected] of [
    [{ Origin: 'https://example.com' }, body(), 403],
    [{ 'X-Olivia-Widget-Identity': 'forged' }, body(), 401],
    [{ Cookie: headers.Cookie.replace(/.$/, 'x') }, body(), 401],
    [{}, { ...body(), clientCode: 'other' }, 400],
    [{}, { ...body(), history: [] }, 400],
    [{}, { ...body(), consent: false }, 400],
    [{}, { ...body(), message: ' ' }, 400],
    [{}, { ...body(), message: 'a'.repeat(4001) }, 400],
  ]) assert.equal((await handle(request('POST', 'chat', { ...headers, ...extraHeaders }, data), 'chat')).status, expected)
  assert.equal(calls, 0)
})

test('oversized bodies are rejected even without a content-length header', async () => {
  const handle = createOliviaGateway(key, async () => { throw new Error('must not be called') })
  const headers = await session(handle)
  assert.equal((await handle(request('POST', 'chat', headers, { ...body(), message: 'a'.repeat(17000) }), 'chat')).status, 413)
})

test('only the supported inline form action reaches the chat UI', async () => {
  for (const action of ['open_order_form', 'arbitrary_action']) {
    const handle = createOliviaGateway(key, async () => Response.json({ reply: 'Remplissez ce petit formulaire.', clientCode: 'cusi', version: '3.6.0', model: 'test-model', action }))
    const headers = await session(handle)
    const response = await handle(request('POST', 'chat', headers, body()), 'chat')
    const result = await response.json()
    assert.equal(result.action, action === 'open_order_form' ? action : undefined)
  }
})

test('wrong-client replies and provider failures cannot become a successful AI response', async () => {
  for (const reply of [Response.json({ clientCode: 'someone-else', version: '3.6.0', reply: 'private', model: 'test' }), Response.json({}, { status: 500 }), Response.json({}, { status: 429 })]) {
    const handle = createOliviaGateway(key, async () => reply)
    const headers = await session(handle)
    const result = await handle(request('POST', 'chat', headers, body()), 'chat')
    assert.equal(result.status, reply.status === 429 ? 429 : 502)
    assert(!JSON.stringify(await result.json()).includes('private'))
  }
})
