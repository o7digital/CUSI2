'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'

const COPY = {
  es: { subtitle: 'Tu asistente floral', open: 'Habla con Olivia AI', close: 'Cerrar chat', online: 'En línea', offline: 'No disponible', checking: 'Conectando…', welcome: '¡Hola! Soy Olivia AI, la asistente de CUSI Flores. Puedo ayudarte a elegir flores y orientarte sobre pedidos y entregas en CDMX.', consent: 'Acepto que CUSI procese y guarde esta conversación para atender mi solicitud.', privacy: 'Aviso de privacidad', privacyUrl: '/aviso-de-privacidad', placeholder: '¿En qué puedo ayudarte?', send: 'Enviar', thinking: 'Olivia está escribiendo…', error: 'No pude responder. Tu pregunta está lista para reintentar. También puedes escribirnos por WhatsApp.', contact: 'Contactar por WhatsApp', quick: ['¿Qué flores tienen?', '¿Entregan en Polanco?', 'Quiero un regalo de cumpleaños'] },
  fr: { subtitle: 'Votre assistante florale', open: 'Parler à Olivia AI', close: 'Fermer le chat', online: 'En ligne', offline: 'Indisponible', checking: 'Connexion…', welcome: 'Bonjour ! Je suis Olivia AI, l’assistante de CUSI Flores. Je peux vous aider à choisir des fleurs et vous renseigner sur les commandes et livraisons à Mexico.', consent: 'J’accepte que CUSI traite et conserve cette conversation pour répondre à ma demande.', privacy: 'Confidentialité', privacyUrl: '/fr/privacy-policy', placeholder: 'Comment puis-je vous aider ?', send: 'Envoyer', thinking: 'Olivia écrit…', error: 'La réponse est indisponible. Votre question est prête à être renvoyée. Vous pouvez aussi nous contacter sur WhatsApp.', contact: 'Contacter sur WhatsApp', quick: ['Quelles fleurs proposez-vous ?', 'Livrez-vous à Polanco ?', 'Je cherche un cadeau d’anniversaire'] },
  en: { subtitle: 'Your floral assistant', open: 'Talk to Olivia AI', close: 'Close chat', online: 'Online', offline: 'Unavailable', checking: 'Connecting…', welcome: 'Hello! I’m Olivia AI, the CUSI Flores assistant. I can help you choose flowers and explain orders and delivery in Mexico City.', consent: 'I agree to CUSI processing and storing this conversation to respond to my request.', privacy: 'Privacy notice', privacyUrl: '/en/privacy-policy', placeholder: 'How can I help you?', send: 'Send', thinking: 'Olivia is typing…', error: 'The reply is unavailable. Your question is ready to retry. You can also contact us on WhatsApp.', contact: 'Contact on WhatsApp', quick: ['What flowers do you offer?', 'Do you deliver to Polanco?', 'I need a birthday gift'] },
  it: { subtitle: 'La tua assistente floreale', open: 'Parla con Olivia AI', close: 'Chiudi la chat', online: 'Online', offline: 'Non disponibile', checking: 'Connessione…', welcome: 'Ciao! Sono Olivia AI, l’assistente di CUSI Flores. Posso aiutarti a scegliere i fiori e darti informazioni su ordini e consegne a Città del Messico.', consent: 'Acconsento al trattamento e alla conservazione di questa conversazione da parte di CUSI per rispondere alla mia richiesta.', privacy: 'Informativa sulla privacy', privacyUrl: '/it/privacy-policy', placeholder: 'Come posso aiutarti?', send: 'Invia', thinking: 'Olivia sta scrivendo…', error: 'La risposta non è disponibile. La tua domanda è pronta per riprovare. Puoi anche contattarci su WhatsApp.', contact: 'Contatta su WhatsApp', quick: ['Quali fiori proponete?', 'Consegnate a Polanco?', 'Cerco un regalo di compleanno'] },
}
type Language = keyof typeof COPY
type Message = { role: 'assistant' | 'user'; content: string }

export default function OliviaChat() {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'es'
  const language: Language = locale === 'fr' || locale === 'en' || locale === 'it' ? locale : 'es'
  const t = COPY[language]
  const orderLabel = { es: 'Solicitar un arreglo', fr: 'Commander un arrangement', en: 'Order an arrangement', it: 'Ordinare una composizione' }[language]
  const orderUrl = `${language === 'es' ? '/' : `/${language}`}#pedidos`
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [loading, setLoading] = useState(false)
  const [draft, setDraft] = useState('')
  const [failed, setFailed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const identity = useRef('')
  const conversation = useRef('')
  const busy = useRef(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const composer = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true
    async function check() {
      if (document.hidden) return
      try {
        const response = await fetch('/api/olivia/status', { cache: 'no-store', signal: AbortSignal.timeout(7000) })
        const data = await response.json()
        if (active) setStatus(response.ok && data.available === true && data.clientCode === 'cusi' && data.version === '3.6.0' ? 'online' : 'offline')
      } catch { if (active) setStatus('offline') }
    }
    void check()
    const timer = window.setInterval(check, 60000)
    const offline = () => setStatus('offline')
    window.addEventListener('online', check)
    window.addEventListener('offline', offline)
    document.addEventListener('visibilitychange', check)
    return () => { active = false; clearInterval(timer); window.removeEventListener('online', check); window.removeEventListener('offline', offline); document.removeEventListener('visibilitychange', check) }
  }, [])

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }) }, [messages, loading, open])
  useEffect(() => { if (open) composer.current?.focus() }, [open])

  function close() { setOpen(false); launcher.current?.focus() }

  async function send(event: FormEvent) {
    event.preventDefault()
    const message = draft.trim()
    if (!message || !consent || busy.current) return
    busy.current = true
    setLoading(true)
    setFailed(false)
    setDraft('')
    setMessages(previous => [...previous, { role: 'user', content: message }])
    if (!conversation.current) conversation.current = window.crypto.randomUUID()
    const getIdentity = async () => {
      const response = await fetch('/api/olivia/session', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok || data.clientCode !== 'cusi' || data.version !== '3.6.0' || typeof data.identity !== 'string') throw new Error('session')
      identity.current = data.identity
    }
    const post = () => fetch('/api/olivia/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Olivia-Widget-Identity': identity.current },
      body: JSON.stringify({ message, language, consent: true, conversationId: conversation.current }), signal: AbortSignal.timeout(60000),
    })
    try {
      if (!identity.current) await getIdentity()
      let response = await post()
      if (response.status === 401) { await getIdentity(); response = await post() }
      const data = await response.json()
      if (!response.ok || data.clientCode !== 'cusi' || data.version !== '3.6.0' || typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('reply')
      setMessages(previous => [...previous, { role: 'assistant', content: data.reply }])
      setStatus('online')
    } catch {
      setDraft(previous => previous || message)
      setFailed(true)
      setStatus('offline')
    } finally { busy.current = false; setLoading(false); composer.current?.focus() }
  }

  return (
    <aside className="cusi-olivia" data-engine="olivia-v3.6" onKeyDown={event => { if (event.key === 'Escape' && open) close() }}>
      {open && <section id="cusi-olivia-panel" className="cusi-olivia-panel" role="dialog" aria-label="Olivia AI · CUSI Flores">
        <header className="cusi-olivia-header">
          <span className="cusi-olivia-avatar" aria-hidden="true">O</span>
          <div><h2>Olivia AI</h2><p>{t.subtitle} · CUSI Flores</p><span className="cusi-olivia-status" role="status"><i data-status={status} />{t[status]}</span></div>
          <button type="button" className="cusi-olivia-close" onClick={close} aria-label={t.close}>×</button>
        </header>
        <div className="cusi-olivia-messages" ref={log} role="log" aria-live="polite" aria-relevant="additions">
          <p className="cusi-olivia-message assistant">{t.welcome}</p>
          {messages.map((message, index) => <p className={`cusi-olivia-message ${message.role}`} key={index}>{message.content}</p>)}
          {loading && <p className="cusi-olivia-thinking" role="status">{t.thinking}<span aria-hidden="true"> • • •</span></p>}
          {failed && <p className="cusi-olivia-error" role="alert">{t.error}</p>}
        </div>
        {messages.length === 0 && <div className="cusi-olivia-questions">{t.quick.map(question => <button type="button" key={question} onClick={() => { setDraft(question); composer.current?.focus() }}>{question}</button>)}</div>}
        <form className="cusi-olivia-form" onSubmit={send}>
          <label className="cusi-olivia-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} /><span>{t.consent} <a href={t.privacyUrl}>{t.privacy}</a></span></label>
          <div className="cusi-olivia-composer"><input ref={composer} value={draft} onChange={event => setDraft(event.target.value)} maxLength={4000} placeholder={t.placeholder} aria-label={t.placeholder} /><button disabled={!consent || loading || !draft.trim()} type="submit">{t.send}</button></div>
          <a className="cusi-olivia-order" href={orderUrl} onClick={close}>{orderLabel} →</a>
          <a className="cusi-olivia-contact" href="https://wa.me/525521092665" target="_blank" rel="noreferrer">{t.contact} ↗</a>
        </form>
      </section>}
      <button ref={launcher} type="button" className="cusi-olivia-launcher" onClick={() => open ? close() : setOpen(true)} aria-label={open ? t.close : t.open} aria-expanded={open} aria-controls="cusi-olivia-panel">
        <span className="cusi-olivia-avatar" aria-hidden="true">O</span><span>Olivia AI<span className="cusi-olivia-status"><i data-status={status} />{t[status]}</span></span><span aria-hidden="true">{open ? '×' : '✦'}</span>
      </button>
    </aside>
  )
}
