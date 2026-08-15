'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

function useOliviaFloatingTheme() {
  useEffect(() => {
    if (document.querySelector('script[data-olivia-floating-theme]')) return
    const script = document.createElement('script')
    script.src = 'https://olivia-ai.o7digital.com/olivia-floating-theme.js'
    script.defer = true
    script.dataset.oliviaFloatingTheme = 'true'
    document.head.appendChild(script)
  }, [])
}

const SITE_CODE = 'cusi'
const LEAD_ENDPOINT = 'https://www.o7digital.com/api/o7-lead'
const CHAT_ENDPOINT = 'https://olivia-ai.o7digital.com/api/olivia/chat'
const CHANNEL_ENDPOINT = 'https://olivia-ai.o7digital.com/api/widget/conversations'

const COPY = {
  es: {
    title: 'Olivia AI Assistant',
    status: 'Asistente CUSI Flores',
    online: 'En linea',
    teaser: 'Necesitas flores?',
    open: 'Abrir chat',
    close: 'Cerrar chat',
    welcome: 'Hola, soy Olivia AI Assistant. En que puedo ayudarte con tus flores?',
    leadIntro: 'Deja tus datos para que un asesor de CUSI pueda contactarte y confirmar disponibilidad.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    phone: 'Telefono',
    submitLead: 'Enviar datos',
    leadThanks: 'Gracias. Tus datos fueron enviados y un asesor de CUSI te contactara pronto.',
    placeholder: 'Escribe tu pregunta...',
    send: 'Enviar',
    error: 'No pude enviar el mensaje. Intenta de nuevo o contacta directamente a CUSI.',
  },
  en: {
    title: 'Olivia AI Assistant',
    status: 'CUSI Flowers Assistant',
    online: 'Online',
    teaser: 'Need flowers?',
    open: 'Open chat',
    close: 'Close chat',
    welcome: 'Hello, I am Olivia AI Assistant. How can I help with your flowers?',
    leadIntro: 'Leave your details so a CUSI advisor can contact you and confirm availability.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    submitLead: 'Send details',
    leadThanks: 'Thanks. Your details were sent and a CUSI advisor will contact you soon.',
    placeholder: 'Write your question...',
    send: 'Send',
    error: 'I could not send the message. Please try again or contact CUSI directly.',
  },
  fr: {
    title: 'Olivia AI Assistant',
    status: 'Assistante CUSI Fleurs',
    online: 'En ligne',
    teaser: 'Besoin de fleurs ?',
    open: 'Ouvrir le chat',
    close: 'Fermer le chat',
    welcome: 'Bonjour, je suis Olivia AI Assistant. Comment puis-je vous aider avec vos fleurs ?',
    leadIntro: "Laissez vos coordonnees pour qu'un conseiller CUSI puisse vous contacter et confirmer la disponibilite.",
    firstName: 'Prenom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Telephone',
    submitLead: 'Envoyer',
    leadThanks: 'Merci. Vos coordonnees ont ete envoyees et un conseiller CUSI vous contactera rapidement.',
    placeholder: 'Ecrivez votre question...',
    send: 'Envoyer',
    error: "Je n'ai pas pu envoyer le message. Reessayez ou contactez directement CUSI.",
  },
  it: {
    title: 'Olivia AI Assistant',
    status: 'Assistente CUSI Fiori',
    online: 'Online',
    teaser: 'Hai bisogno di fiori?',
    open: 'Apri chat',
    close: 'Chiudi chat',
    welcome: 'Ciao, sono Olivia AI Assistant. Come posso aiutarti con i tuoi fiori?',
    leadIntro: 'Lascia i tuoi dati cosi un consulente CUSI potra contattarti e confermare la disponibilita.',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'Email',
    phone: 'Telefono',
    submitLead: 'Invia dati',
    leadThanks: 'Grazie. I tuoi dati sono stati inviati e un consulente CUSI ti contattera presto.',
    placeholder: 'Scrivi la tua domanda...',
    send: 'Invia',
    error: 'Non ho potuto inviare il messaggio. Riprova o contatta direttamente CUSI.',
  },
}

type Language = keyof typeof COPY
type ChatMessage = { role: 'assistant' | 'user'; content: string }

function getLanguage(pathname: string | null): Language {
  const firstSegment = pathname?.split('/').filter(Boolean)[0]
  if (firstSegment === 'en' || firstSegment === 'fr' || firstSegment === 'it') return firstSegment
  return 'es'
}

function detectMessageLanguage(message: string, fallbackLanguage: Language): Language {
  const value = message.toLowerCase()
  if (/\b(hola|gracias|quiero|precio|precios|flores|ramo|ramos|arreglo|arreglos|orquidea|cumpleanos|entrega|domicilio|madres|polanco|santa fe)\b/.test(value)) return 'es'
  if (/\b(bonjour|merci|prix|fleurs|bouquet|composition|orchidee|anniversaire|livraison|domicile|mere|polanco|santa fe)\b/.test(value)) return 'fr'
  if (/\b(hello|thanks|price|flowers|bouquet|arrangement|orchid|birthday|delivery|mother|polanco|santa fe)\b/.test(value)) return 'en'
  if (/\b(ciao|grazie|prezzo|fiori|bouquet|composizione|orchidea|compleanno|consegna|mamma|polanco|santa fe)\b/.test(value)) return 'it'
  return fallbackLanguage
}

export default function ConchitaChat() {
  useOliviaFloatingTheme()
  const pathname = usePathname()
  const language = getLanguage(pathname)
  const copy = COPY[language]
  const [visitorId, setVisitorId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [lead, setLead] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: copy.welcome }])

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.role !== 'assistant') return prev
      return [{ role: 'assistant', content: copy.welcome }]
    })
  }, [copy.welcome])

  const transcript = useMemo(() => messages.map((message) => `${message.role}: ${message.content}`).join('\n'), [messages])

  useEffect(() => {
    const key = 'oliviaVisitor:cusi'
    const existing = window.localStorage.getItem(key)
    const next = existing || window.crypto.randomUUID()
    window.localStorage.setItem(key, next)
    setVisitorId(next)
  }, [])

  const persistChannelMessage = async (content: string, role: 'user' | 'assistant', extraContext: Record<string, unknown> = {}) => {
    if (!visitorId || !content.trim()) return null

    const payload = {
      clientCode: SITE_CODE,
      visitorId,
      visitorName: `${lead.firstName} ${lead.lastName}`.trim() || undefined,
      email: lead.email.trim() || undefined,
      phone: lead.phone.trim() || undefined,
      source: 'website-chat',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      content,
      language,
      metadata: {
        site: 'CUSI Flores',
        source: 'Chat Olivia AI Assistant CUSI Flores',
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        role,
        lead,
        ...extraContext,
      },
    }

    const response = await fetch(CHANNEL_ENDPOINT, {
      method: role === 'assistant' ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error('Channel Manager delivery failed')
    return response.json().catch(() => null)
  }

  const handleLeadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!lead.firstName.trim() || !lead.lastName.trim() || !lead.email.trim() || !lead.phone.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: lead.firstName.trim(),
          lastName: lead.lastName.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim(),
          source: 'Chat Olivia AI Assistant CUSI Flores',
          language,
          siteCode: SITE_CODE,
          message: `Lead Chat Olivia AI Assistant CUSI Flores (${language}, ${SITE_CODE})\n\n${transcript}`,
        }),
      })
      if (!response.ok) throw new Error('Lead delivery failed')
      await persistChannelMessage(
        `${lead.firstName.trim()} ${lead.lastName.trim()} · ${lead.email.trim()} · ${lead.phone.trim()}`,
        'user',
        { type: 'lead' },
      ).catch(() => null)
      setLeadSent(true)
      setMessages((prev) => [...prev, { role: 'assistant', content: copy.leadThanks }])
      await persistChannelMessage(copy.leadThanks, 'assistant', { type: 'lead_acknowledgement' }).catch(() => null)
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: copy.error }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    const message = input.trim()
    if (!message || isLoading || !leadSent) return
    const messageLanguage = detectMessageLanguage(message, language)

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setIsLoading(true)
    try {
      await persistChannelMessage(message, 'user').catch(() => null)
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language: messageLanguage,
          clientCode: SITE_CODE,
          clientId: SITE_CODE,
          visitorId,
          pageUrl: window.location.href,
          metadata: {
            source: 'Chat Olivia AI Assistant CUSI Flores',
            transcript,
            lead,
          },
        }),
      })
      const data = await response.json()
      const reply = data.reply || copy.error
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      await persistChannelMessage(reply, 'assistant', { type: 'olivia_reply' }).catch(() => null)
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: copy.error }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="conchita-chat">
      {isOpen && (
        <section className="conchita-panel" aria-label={copy.status}>
          <header className="conchita-header">
            <div>
              <p className="conchita-title">{copy.title}</p>
              <p className="conchita-status">{copy.status} · {copy.online}</p>
            </div>
            <button type="button" className="conchita-close" onClick={() => setIsOpen(false)} aria-label={copy.close}>x</button>
          </header>

          <div className="conchita-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`conchita-message ${message.role}`}>{message.content}</div>
            ))}
            {isLoading && <div className="conchita-message assistant">...</div>}
          </div>

          {!leadSent && (
            <form className="conchita-lead" onSubmit={handleLeadSubmit}>
              <p>{copy.leadIntro}</p>
              <input required placeholder={copy.firstName} value={lead.firstName} onChange={(event) => setLead((prev) => ({ ...prev, firstName: event.target.value }))} />
              <input required placeholder={copy.lastName} value={lead.lastName} onChange={(event) => setLead((prev) => ({ ...prev, lastName: event.target.value }))} />
              <input required type="email" placeholder={copy.email} value={lead.email} onChange={(event) => setLead((prev) => ({ ...prev, email: event.target.value }))} />
              <input required type="tel" placeholder={copy.phone} value={lead.phone} onChange={(event) => setLead((prev) => ({ ...prev, phone: event.target.value }))} />
              <button type="submit" disabled={isLoading}>{copy.submitLead}</button>
            </form>
          )}

          <div className="conchita-composer">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') handleSend() }} disabled={!leadSent || isLoading} placeholder={copy.placeholder} />
            <button type="button" onClick={handleSend} disabled={isLoading || !leadSent} aria-label={copy.send}>{'>'}</button>
          </div>
        </section>
      )}

      <div className="conchita-closed">
        {!isOpen && (
          <button type="button" className="conchita-teaser" onClick={() => setIsOpen(true)}>
            <span className="conchita-avatar">O</span>
            <span>{copy.teaser}</span>
          </button>
        )}
        <button type="button" className="conchita-toggle" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? copy.close : copy.open}>
          {isOpen ? 'x' : 'Olivia'}
        </button>
      </div>
    </div>
  )
}
