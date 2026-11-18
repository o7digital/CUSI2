'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'

type Language = 'es' | 'fr' | 'en' | 'it'
type Product = { title: string; price: string }

const COPY = {
  es: { intro: 'Completa tus datos y los detalles de entrega. CUSI confirmará disponibilidad, envío y total antes del pago. Los campos con * son obligatorios.', customer: 'Tus datos', first: 'Nombre', last: 'Apellidos', email: 'Email', phone: 'Teléfono con código de país', delivery: 'Dirección de entrega', street: 'Calle, número e interior', city: 'Ciudad', state: 'Estado / provincia', country: 'País', postcode: 'Código postal', recipient: 'Nombre del destinatario', recipientPhone: 'Teléfono del destinatario (opcional)', order: 'Tu arreglo', product: 'Arreglo floral', choose: 'Selecciona un arreglo', custom: 'Arreglo personalizado / por definir', quantity: 'Cantidad', date: 'Fecha de entrega deseada', card: 'Mensaje de la tarjeta (opcional)', signed: 'Firma de la tarjeta (opcional)', envelope: 'Texto del sobre (opcional)', notes: 'Detalles adicionales (ocasión, colores, horario, indicaciones)', proof: 'Justificante de transferencia (PDF, opcional)', proofHint: 'Adjúntalo solo si ya realizaste el pago acordado con CUSI.', consent: 'Acepto que CUSI use mis datos para atender y coordinar esta solicitud.', privacy: 'Aviso de privacidad', privacyUrl: '/aviso-de-privacidad', send: 'Enviar solicitud de pedido', sending: 'Enviando…', success: 'Tu solicitud fue enviada. CUSI te contactará para confirmar disponibilidad, entrega y total. El pedido queda sujeto a esa confirmación.', error: 'No se pudo enviar la solicitud. Tus datos se conservan para que puedas reintentar o contactar a CUSI por WhatsApp.', fileError: 'Adjunta un archivo PDF de hasta 10 MB.', whatsapp: 'Contactar por WhatsApp', another: 'Enviar otra solicitud' },
  fr: { intro: 'Renseignez vos coordonnées et les détails de livraison. CUSI confirmera la disponibilité, les frais de livraison et le total avant le paiement. Les champs avec * sont obligatoires.', customer: 'Vos coordonnées', first: 'Prénom', last: 'Nom', email: 'Email', phone: 'Téléphone avec indicatif du pays', delivery: 'Adresse de livraison', street: 'Rue, numéro et appartement', city: 'Ville', state: 'État / région', country: 'Pays', postcode: 'Code postal', recipient: 'Nom du destinataire', recipientPhone: 'Téléphone du destinataire (facultatif)', order: 'Votre arrangement', product: 'Arrangement floral', choose: 'Choisissez un arrangement', custom: 'Arrangement personnalisé / à définir', quantity: 'Quantité', date: 'Date de livraison souhaitée', card: 'Message de la carte (facultatif)', signed: 'Signature de la carte (facultatif)', envelope: 'Texte de l’enveloppe (facultatif)', notes: 'Détails complémentaires (occasion, couleurs, horaire, indications)', proof: 'Justificatif de virement (PDF, facultatif)', proofHint: 'À joindre uniquement si vous avez déjà effectué le paiement convenu avec CUSI.', consent: 'J’accepte que CUSI utilise mes données pour traiter et organiser cette demande.', privacy: 'Confidentialité', privacyUrl: '/fr/privacy-policy', send: 'Envoyer la demande de commande', sending: 'Envoi…', success: 'Votre demande a été envoyée. CUSI vous contactera pour confirmer la disponibilité, la livraison et le total. La commande reste soumise à cette confirmation.', error: 'La demande n’a pas pu être envoyée. Vos informations sont conservées pour réessayer ou contacter CUSI sur WhatsApp.', fileError: 'Joignez un fichier PDF de 10 Mo maximum.', whatsapp: 'Contacter sur WhatsApp', another: 'Envoyer une autre demande' },
  en: { intro: 'Enter your contact and delivery details. CUSI will confirm availability, shipping and the total before payment. Fields marked * are required.', customer: 'Your contact details', first: 'First name', last: 'Last name', email: 'Email', phone: 'Phone with country code', delivery: 'Delivery address', street: 'Street, number and apartment', city: 'City', state: 'State / region', country: 'Country', postcode: 'Postal / ZIP code', recipient: 'Recipient name', recipientPhone: 'Recipient phone (optional)', order: 'Your arrangement', product: 'Floral arrangement', choose: 'Choose an arrangement', custom: 'Custom arrangement / to be decided', quantity: 'Quantity', date: 'Requested delivery date', card: 'Card message (optional)', signed: 'Card signature (optional)', envelope: 'Envelope text (optional)', notes: 'Additional details (occasion, colors, time, directions)', proof: 'Bank transfer receipt (PDF, optional)', proofHint: 'Attach only if you have already made the payment agreed with CUSI.', consent: 'I agree to CUSI using my details to respond to and coordinate this request.', privacy: 'Privacy notice', privacyUrl: '/en/privacy-policy', send: 'Send order request', sending: 'Sending…', success: 'Your request was sent. CUSI will contact you to confirm availability, delivery and the total. The order remains subject to that confirmation.', error: 'The request could not be sent. Your details are kept here so you can retry or contact CUSI on WhatsApp.', fileError: 'Attach a PDF file up to 10 MB.', whatsapp: 'Contact on WhatsApp', another: 'Send another request' },
  it: { intro: 'Inserisci i tuoi dati e i dettagli di consegna. CUSI confermerà disponibilità, spedizione e totale prima del pagamento. I campi con * sono obbligatori.', customer: 'I tuoi dati', first: 'Nome', last: 'Cognome', email: 'Email', phone: 'Telefono con prefisso internazionale', delivery: 'Indirizzo di consegna', street: 'Via, numero e appartamento', city: 'Città', state: 'Stato / regione', country: 'Paese', postcode: 'Codice postale', recipient: 'Nome del destinatario', recipientPhone: 'Telefono del destinatario (facoltativo)', order: 'La tua composizione', product: 'Composizione floreale', choose: 'Scegli una composizione', custom: 'Composizione personalizzata / da definire', quantity: 'Quantità', date: 'Data di consegna desiderata', card: 'Messaggio del biglietto (facoltativo)', signed: 'Firma del biglietto (facoltativo)', envelope: 'Testo della busta (facoltativo)', notes: 'Altri dettagli (occasione, colori, orario, indicazioni)', proof: 'Ricevuta del bonifico (PDF, facoltativa)', proofHint: 'Allega solo se hai già effettuato il pagamento concordato con CUSI.', consent: 'Acconsento all’uso dei miei dati da parte di CUSI per rispondere e organizzare questa richiesta.', privacy: 'Informativa sulla privacy', privacyUrl: '/it/privacy-policy', send: 'Invia richiesta d’ordine', sending: 'Invio…', success: 'La richiesta è stata inviata. CUSI ti contatterà per confermare disponibilità, consegna e totale. L’ordine resta soggetto a tale conferma.', error: 'Impossibile inviare la richiesta. I dati sono conservati qui per riprovare o contattare CUSI su WhatsApp.', fileError: 'Allega un file PDF di massimo 10 MB.', whatsapp: 'Contatta su WhatsApp', another: 'Invia un’altra richiesta' },
}

export default function OrderForm({ language, products, selectedProduct = '' }: { language: Language; products: Product[]; selectedProduct?: string }) {
  const t = COPY[language]
  const prefix = useId()
  const [product, setProduct] = useState(selectedProduct)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [fileError, setFileError] = useState(false)
  const busy = useRef(false)
  useEffect(() => { if (selectedProduct) { setProduct(selectedProduct); setStatus('idle') } }, [selectedProduct])

  const field = (name: string, label: string, options: { type?: string; autoComplete?: string; required?: boolean; wide?: boolean; defaultValue?: string } = {}) => (
    <label className={options.wide ? 'md:col-span-2' : ''} htmlFor={`${prefix}-${name}`}>
      <span className="mb-2 block text-sm font-medium text-white/90">{label}{options.required === false ? '' : ' *'}</span>
      <input className="cusi-order-input" id={`${prefix}-${name}`} name={name} type={options.type || 'text'} autoComplete={options.autoComplete} required={options.required !== false} defaultValue={options.defaultValue} maxLength={name === 'email' ? 254 : 250} />
    </label>
  )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const proof = data.get('comprobante_transferencia_pdf')
    if (proof instanceof File && proof.size > 0 && (proof.type !== 'application/pdf' || proof.size > 10 * 1024 * 1024)) { setFileError(true); return }
    if (proof instanceof File && proof.size === 0) data.delete('comprobante_transferencia_pdf')
    setFileError(false)
    busy.current = true
    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/xqewoabn', { method: 'POST', headers: { Accept: 'application/json' }, body: data, signal: AbortSignal.timeout(30000) })
      const result = await response.json()
      if (!response.ok || result.ok !== true) throw new Error('submission_failed')
      form.reset()
      setProduct('')
      setStatus('success')
    } catch { setStatus('error') }
    finally { busy.current = false }
  }

  if (status === 'success') return <div className="mt-7 space-y-5 rounded-2xl border border-white/25 bg-white/10 p-6" data-order-success>
    <p role="status" className="leading-7">{t.success}</p>
    <button type="button" onClick={() => setStatus('idle')} className="rounded-full bg-[#f4ddd2] px-5 py-3 font-semibold text-[#2a1d1a]">{t.another}</button>
  </div>

  return <form className="cusi-order-form mt-7 space-y-8" action="https://formspree.io/f/xqewoabn" method="POST" encType="multipart/form-data" onSubmit={submit}>
    <p className="max-w-3xl text-sm leading-7 text-white/80">{t.intro}</p>
    <fieldset disabled={status === 'sending'} className="grid gap-4 md:grid-cols-2">
      <legend className="mb-5 text-xl font-semibold">{t.customer}</legend>
      {field('nombre', t.first, { autoComplete: 'given-name' })}
      {field('apellido', t.last, { autoComplete: 'family-name' })}
      {field('email', t.email, { type: 'email', autoComplete: 'email' })}
      {field('telefono', t.phone, { type: 'tel', autoComplete: 'tel' })}
    </fieldset>
    <fieldset disabled={status === 'sending'} className="grid gap-4 border-t border-white/15 pt-5 md:grid-cols-2">
      <legend className="pr-3 text-xl font-semibold">{t.delivery}</legend>
      {field('direccion_entrega', t.street, { autoComplete: 'shipping street-address', wide: true })}
      {field('ciudad', t.city, { autoComplete: 'shipping address-level2' })}
      {field('estado', t.state, { autoComplete: 'shipping address-level1', required: false })}
      {field('pais', t.country, { autoComplete: 'shipping country-name', defaultValue: 'México' })}
      {field('codigo_postal', t.postcode, { autoComplete: 'shipping postal-code' })}
      {field('para_quien', t.recipient, { autoComplete: 'shipping name' })}
      {field('telefono_entrega', t.recipientPhone, { type: 'tel', autoComplete: 'shipping tel', required: false })}
    </fieldset>
    <fieldset disabled={status === 'sending'} className="grid gap-4 border-t border-white/15 pt-5 md:grid-cols-2">
      <legend className="pr-3 text-xl font-semibold">{t.order}</legend>
      <label htmlFor={`${prefix}-arreglo`} className="md:col-span-2"><span className="mb-2 block text-sm font-medium text-white/90">{t.product} *</span>
        <select id={`${prefix}-arreglo`} name="arreglo" required value={product} onChange={event => setProduct(event.target.value)} className="cusi-order-input"><option value="">{t.choose}</option>{products.map(item => <option key={item.title} value={item.title}>{item.title} — {item.price} MXN</option>)}<option value="personalizado">{t.custom}</option></select>
      </label>
      <label htmlFor={`${prefix}-cantidad`}><span className="mb-2 block text-sm font-medium text-white/90">{t.quantity} *</span><input id={`${prefix}-cantidad`} name="cantidad" type="number" min="1" max="99" step="1" defaultValue="1" required className="cusi-order-input" /></label>
      <label htmlFor={`${prefix}-dia_entrega`}><span className="mb-2 block text-sm font-medium text-white/90">{t.date} *</span><input id={`${prefix}-dia_entrega`} type="date" name="dia_entrega" required className="cusi-order-input" /></label>
      <label htmlFor={`${prefix}-texto_tarjeta`} className="md:col-span-2"><span className="mb-2 block text-sm font-medium text-white/90">{t.card}</span><textarea id={`${prefix}-texto_tarjeta`} name="texto_tarjeta" rows={3} maxLength={2000} className="cusi-order-input" /></label>
      {field('quien_firma', t.signed, { required: false })}
      {field('que_debe_decir_el_sobre', t.envelope, { required: false })}
      <label htmlFor={`${prefix}-mensaje`} className="md:col-span-2"><span className="mb-2 block text-sm font-medium text-white/90">{t.notes}</span><textarea id={`${prefix}-mensaje`} name="mensaje" rows={3} maxLength={4000} className="cusi-order-input" /></label>
      <label htmlFor={`${prefix}-comprobante`} className="md:col-span-2"><span className="mb-2 block text-sm font-medium text-white/90">{t.proof}</span><input id={`${prefix}-comprobante`} name="comprobante_transferencia_pdf" type="file" accept="application/pdf,.pdf" className="cusi-order-input file:mr-3 file:rounded-full file:border-0 file:bg-[#f4ddd2] file:px-3 file:py-2 file:text-[#2a1d1a]" /><span className="mt-2 block text-xs text-white/70">{t.proofHint}</span></label>
    </fieldset>
    <input type="hidden" name="_subject" value="Nuevo pedido CUSI — solicitud de cliente" />
    <input type="hidden" name="idioma" value={language} />
    <input type="hidden" name="precio_referencia" value={products.find(item => item.title === product)?.price || ''} />
    <div className="space-y-4">
      <label className="flex items-start gap-3 text-sm leading-6 text-white/85"><input name="consentimiento" type="checkbox" value="aceptado" required disabled={status === 'sending'} className="mt-1 h-4 w-4 shrink-0 accent-[#f4ddd2]" /><span>{t.consent} <a href={t.privacyUrl} className="underline underline-offset-2">{t.privacy}</a></span></label>
      {fileError && <p role="alert" className="text-sm text-[#ffd5c9]">{t.fileError}</p>}
      {status === 'error' && <p role="alert" className="text-sm leading-6 text-[#ffd5c9]">{t.error} <a href="https://wa.me/525521092665" className="underline" target="_blank" rel="noreferrer">{t.whatsapp}</a></p>}
      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition hover:bg-[#efcfc1] disabled:opacity-60">{status === 'sending' ? t.sending : t.send}</button>
    </div>
  </form>
}
