import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Bouquet fiori CDMX | CUSI Flores',
  description: 'Bouquet di fiori premium a CDMX per compleanni, ringraziamenti, regali e occasioni speciali. Ordini WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/it/bouquet-fiori-cdmx' },
}

export default function ItBouquetFioriCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Bouquet di fiori a CDMX"
      intro={[
        'CUSI Flores prepara bouquet premium a CDMX per regali eleganti e occasioni importanti.',
        'I bouquet possono includere rose, tulipani, fiori stagionali e combinazioni selezionate secondo disponibilita.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Confermiamo disponibilita, stile, messaggio del biglietto, zona di consegna e destinatario prima della preparazione."
      sections={[
        { title: 'Bouquet da regalare', body: 'Un bouquet premium e adatto a compleanni, congratulazioni, ringraziamenti, anniversari o gesti spontanei.' },
        { title: 'Rose, tulipani e fiori stagionali', body: 'La disponibilita varia per stagione; confermiamo colori, tipo di fiore e volume prima dell ordine.' },
        { title: 'Consegna a CDMX', body: 'Coordiniamo consegne in zone selezionate come Lomas de Chapultepec, Bosques de las Lomas, Polanco e Santa Fe.' },
        { title: 'Messaggio personalizzato', body: 'Il bouquet puo includere un messaggio e una firma coordinati via WhatsApp.' },
      ]}
      ctaText="Ordinare bouquet"
      whatsappText="Ciao CUSI FLORES, vorrei ordinare un bouquet di fiori a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Offrite bouquet di rose?', answer: 'Si. Possiamo preparare bouquet di rose e altre combinazioni secondo disponibilita.' },
        { question: 'Posso inviare un bouquet con biglietto?', answer: 'Si. Coordiniamo messaggio e firma via WhatsApp.' },
        { question: 'Consegna in giornata possibile?', answer: 'Dipende dalla disponibilita dei fiori e dalla rotta. Confermiamo via WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/it/consegna-fiori-cdmx', label: 'Consegna fiori CDMX' },
        { href: '/it/composizioni-floreali-cdmx', label: 'Composizioni floreali CDMX' },
      ]}
    />
  )
}
