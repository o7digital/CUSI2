'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { OLIVIA_ORDER_EVENT } from '@/lib/olivia-order'

const COPY = {
  es: { subtitle: 'Tu asistente floral', open: 'Habla con Olivia AI', close: 'Cerrar chat', online: 'En línea', offline: 'No disponible', checking: 'Conectando…', welcome: '¡Hola! Soy Olivia AI, la asistente de CUSI Flores. Puedo ayudarte a elegir flores y orientarte sobre pedidos y entregas en CDMX.', consent: 'Acepto que CUSI procese y guarde esta conversación para atender mi solicitud.', privacy: 'Aviso de privacidad', privacyUrl: '/aviso-de-privacidad', placeholder: '¿En qué puedo ayudarte?', send: 'Enviar', thinking: 'Olivia está escribiendo…', error: 'No pude responder. Tu pregunta está lista para reintentar. También puedes escribirnos por WhatsApp.', contact: 'Contactar por WhatsApp', quick: ['¿Qué flores tienen?', '¿Entregan en Polanco?', 'Quiero un regalo de cumpleaños'] },
  fr: { subtitle: 'Votre assistante florale', open: 'Parler à Olivia AI', close: 'Fermer le chat', online: 'En ligne', offline: 'Indisponible', checking: 'Connexion…', welcome: 'Bonjour ! Je suis Olivia AI, l’assistante de CUSI Flores. Je peux vous aider à choisir des fleurs et vous renseigner sur les commandes et livraisons à Mexico.', consent: 'J’accepte que CUSI traite et conserve cette conversation pour répondre à ma demande.', privacy: 'Confidentialité', privacyUrl: '/fr/privacy-policy', placeholder: 'Comment puis-je vous aider ?', send: 'Envoyer', thinking: 'Olivia écrit…', error: 'La réponse est indisponible. Votre question est prête à être renvoyée. Vous pouvez aussi nous contacter sur WhatsApp.', contact: 'Contacter sur WhatsApp', quick: ['Quelles fleurs proposez-vous ?', 'Livrez-vous à Polanco ?', 'Je cherche un cadeau d’anniversaire'] },
  en: { subtitle: 'Your floral assistant', open: 'Talk to Olivia AI', close: 'Close chat', online: 'Online', offline: 'Unavailable', checking: 'Connecting…', welcome: 'Hello! I’m Olivia AI, the CUSI Flores assistant. I can help you choose flowers and explain orders and delivery in Mexico City.', consent: 'I agree to CUSI processing and storing this conversation to respond to my request.', privacy: 'Privacy notice', privacyUrl: '/en/privacy-policy', placeholder: 'How can I help you?', send: 'Send', thinking: 'Olivia is typing…', error: 'The reply is unavailable. Your question is ready to retry. You can also contact us on WhatsApp.', contact: 'Contact on WhatsApp', quick: ['What flowers do you offer?', 'Do you deliver to Polanco?', 'I need a birthday gift'] },
  it: { subtitle: 'La tua assistente floreale', open: 'Parla con Olivia AI', close: 'Chiudi la chat', online: 'Online', offline: 'Non disponibile', checking: 'Connessione…', welcome: 'Ciao! Sono Olivia AI, l’assistente di CUSI Flores. Posso aiutarti a scegliere i fiori e darti informazioni su ordini e consegne a Città del Messico.', consent: 'Acconsento al trattamento e alla conservazione di questa conversazione da parte di CUSI per rispondere alla mia richiesta.', privacy: 'Informativa sulla privacy', privacyUrl: '/it/privacy-policy', placeholder: 'Come posso aiutarti?', send: 'Invia', thinking: 'Olivia sta scrivendo…', error: 'La risposta non è disponibile. La tua domanda è pronta per riprovare. Puoi anche contattarci su WhatsApp.', contact: 'Contatta su WhatsApp', quick: ['Quali fiori proponete?', 'Consegnate a Polanco?', 'Cerco un regalo di compleanno'] },
}
type Language = keyof typeof COPY
type Message = { role: 'assistant' | 'user'; content: string }

const ORDER_COPY = {
  es: { title: 'Tu pedido', back: 'Volver al chat', first: 'Nombre', last: 'Apellidos', email: 'Email', phone: 'Teléfono', address: 'Dirección', city: 'Ciudad', postcode: 'Código postal', country: 'País', consent: 'Acepto el uso de mis datos para esta solicitud.', send: 'Enviar', sending: 'Enviando…', sent: 'Solicitud enviada. CUSI te contactará para confirmar tu pedido.', error: 'No se pudo enviar. Conservamos tus datos aquí para reintentar.' },
  fr: { title: 'Votre commande', back: 'Retour au chat', first: 'Prénom', last: 'Nom', email: 'Email', phone: 'Téléphone', address: 'Adresse', city: 'Ville', postcode: 'Code postal', country: 'Pays', consent: 'J’accepte l’utilisation de mes données pour cette demande.', send: 'Envoyer', sending: 'Envoi…', sent: 'Demande envoyée. CUSI vous contactera pour confirmer votre commande.', error: 'L’envoi a échoué. Vos informations restent ici pour réessayer.' },
  en: { title: 'Your order', back: 'Back to chat', first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone', address: 'Address', city: 'City', postcode: 'Postal code', country: 'Country', consent: 'I agree to the use of my details for this request.', send: 'Send', sending: 'Sending…', sent: 'Request sent. CUSI will contact you to confirm your order.', error: 'Unable to send. Your details remain here so you can retry.' },
  it: { title: 'Il tuo ordine', back: 'Torna alla chat', first: 'Nome', last: 'Cognome', email: 'Email', phone: 'Telefono', address: 'Indirizzo', city: 'Città', postcode: 'Codice postale', country: 'Paese', consent: 'Acconsento all’uso dei miei dati per questa richiesta.', send: 'Invia', sending: 'Invio…', sent: 'Richiesta inviata. CUSI ti contatterà per confermare il tuo ordine.', error: 'Invio non riuscito. I tuoi dati restano qui per riprovare.' },
}
const ORDER_FIELDS = [
  { name: 'nombre', label: 'first', type: 'text', autoComplete: 'given-name' },
  { name: 'apellido', label: 'last', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'email', type: 'email', autoComplete: 'email' },
  { name: 'telefono', label: 'phone', type: 'tel', autoComplete: 'tel' },
  { name: 'direccion_entrega', label: 'address', type: 'text', autoComplete: 'shipping street-address', wide: true },
  { name: 'ciudad', label: 'city', type: 'text', autoComplete: 'shipping address-level2' },
  { name: 'codigo_postal', label: 'postcode', type: 'text', autoComplete: 'shipping postal-code' },
  { name: 'pais', label: 'country', type: 'text', autoComplete: 'shipping country-name', wide: true },
] as const
const EMPTY_ORDER = { nombre: '', apellido: '', email: '', telefono: '', direccion_entrega: '', ciudad: '', codigo_postal: '', pais: 'México' }

export default function OliviaChat() {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'es'
  const language: Language = locale === 'fr' || locale === 'en' || locale === 'it' ? locale : 'es'
  const t = COPY[language]
  const orderLabel = { es: 'Hacer un pedido', fr: 'Commander', en: 'Place an order', it: 'Ordinare' }[language]
  const orderCopy = ORDER_COPY[language]
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [loading, setLoading] = useState(false)
  const [draft, setDraft] = useState('')
  const [failed, setFailed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState(EMPTY_ORDER)
  const [orderProduct, setOrderProduct] = useState('')
  const [orderConsent, setOrderConsent] = useState(false)
  const [orderStatus, setOrderStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const orderBusy = useRef(false)
  const identity = useRef('')
  const conversation = useRef('')
  const busy = useRef(false)
  const launcher = useRef<HTMLButtonElement>(null)
  const composer = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const firstOrderField = useRef<HTMLInputElement>(null)

  function showOrder(product = '') {
    if (product) setOrderProduct(product)
    if (orderStatus === 'sent') { setOrderStatus('idle'); setOrderDetails(EMPTY_ORDER); setOrderConsent(false) }
    setOpen(true)
    setOrderOpen(true)
  }

  useEffect(() => {
    const onOrder = (event: Event) => {
      const product = (event as CustomEvent<{ product?: unknown }>).detail?.product
      if (typeof product === 'string' && product.length < 300) setOrderProduct(product)
      setOrderStatus(previous => previous === 'sent' ? 'idle' : previous)
      setOrderOpen(true)
      setOpen(true)
    }
    window.addEventListener(OLIVIA_ORDER_EVENT, onOrder)
    return () => window.removeEventListener(OLIVIA_ORDER_EVENT, onOrder)
  }, [])

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
  useEffect(() => { if (open) (orderOpen ? firstOrderField : composer).current?.focus() }, [open, orderOpen])

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
      if (data.action === 'open_order_form') showOrder()
    } catch {
      setDraft(previous => previous || message)
      setFailed(true)
      setStatus('offline')
    } finally { busy.current = false; setLoading(false); composer.current?.focus() }
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (orderBusy.current || !form.reportValidity()) return
    const data = new FormData(form)
    for (const field of ORDER_FIELDS) data.set(field.name, orderDetails[field.name].trim())
    data.set('_subject', 'Pedido CUSI — Chat Olivia')
    data.set('idioma', language)
    data.set('origen', 'Olivia AI 3.6 — CUSI')
    if (orderProduct) data.set('arreglo', orderProduct)
    data.set('conversacion', messages.slice(-12).map(message => `${message.role}: ${message.content}`).join('\n').slice(-12000))
    orderBusy.current = true
    setOrderStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xqewoabn', { method: 'POST', headers: { Accept: 'application/json' }, body: data, signal: AbortSignal.timeout(30000) })
      const result = await response.json()
      if (!response.ok || result.ok !== true) throw new Error('order_failed')
      setOrderStatus('sent')
      setOrderDetails(EMPTY_ORDER)
      setOrderConsent(false)
    } catch { setOrderStatus('error') }
    finally { orderBusy.current = false }
  }

  return (
    <aside className="cusi-olivia" data-engine="olivia-v3.6" onKeyDown={event => { if (event.key === 'Escape' && open) close() }}>
      {open && <section id="cusi-olivia-panel" className="cusi-olivia-panel" role="dialog" aria-label="Olivia AI · CUSI Flores">
        <header className="cusi-olivia-header">
          <span className="cusi-olivia-avatar" aria-hidden="true">O</span>
          <div><h2>Olivia AI</h2><p>{t.subtitle} · CUSI Flores</p><span className="cusi-olivia-status" role="status"><i data-status={status} />{t[status]}</span></div>
          <button type="button" className="cusi-olivia-close" onClick={close} aria-label={t.close}>×</button>
        </header>
        {orderOpen ? <div className="cusi-olivia-order-view">
          <button type="button" className="cusi-olivia-order-back" onClick={() => setOrderOpen(false)}>← {orderCopy.back}</button>
          <h3>{orderCopy.title}</h3>
          {orderProduct && <p className="cusi-olivia-order-product">{orderProduct}</p>}
          {orderStatus === 'sent' ? <p className="cusi-olivia-order-sent" role="status">{orderCopy.sent}</p> : <form className="cusi-olivia-mini-order" onSubmit={submitOrder}>
            <fieldset disabled={orderStatus === 'sending'}>
              {ORDER_FIELDS.map((field, index) => <label key={field.name} className={'wide' in field ? 'wide' : ''}>
                <span>{orderCopy[field.label]}</span>
                <input ref={index === 0 ? firstOrderField : undefined} name={field.name} type={field.type} autoComplete={field.autoComplete} required maxLength={field.name === 'email' ? 254 : 250} value={orderDetails[field.name]} onChange={event => setOrderDetails(previous => ({ ...previous, [field.name]: event.target.value }))} />
              </label>)}
            </fieldset>
            <label className="cusi-olivia-consent"><input name="consentimiento" type="checkbox" value="aceptado" required checked={orderConsent} disabled={orderStatus === 'sending'} onChange={event => setOrderConsent(event.target.checked)} /><span>{orderCopy.consent} <a href={t.privacyUrl}>{t.privacy}</a></span></label>
            {orderStatus === 'error' && <p className="cusi-olivia-error" role="alert">{orderCopy.error}</p>}
            <button type="submit" className="cusi-olivia-order-submit" disabled={orderStatus === 'sending'}>{orderStatus === 'sending' ? orderCopy.sending : orderCopy.send}</button>
          </form>}
        </div> : <>
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
          <button className="cusi-olivia-order" type="button" onClick={() => showOrder()}>{orderLabel} →</button>
          <a className="cusi-olivia-contact" href="https://wa.me/525521092665" target="_blank" rel="noreferrer">{t.contact} ↗</a>
        </form>
        </>}
      </section>}
      <button ref={launcher} type="button" className="cusi-olivia-launcher" onClick={() => open ? close() : setOpen(true)} aria-label={open ? t.close : t.open} aria-expanded={open} aria-controls="cusi-olivia-panel">
        <span className="cusi-olivia-avatar" aria-hidden="true">O</span><span>Olivia AI<span className="cusi-olivia-status"><i data-status={status} />{t[status]}</span></span><span aria-hidden="true">{open ? '×' : '✦'}</span>
      </button>
    </aside>
  )
}
