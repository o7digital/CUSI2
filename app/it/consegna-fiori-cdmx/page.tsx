import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Consegna fiori CDMX | CUSI Flores',
  description: 'Consegna fiori premium a CDMX con bouquet, rose, tulipani, orchidee, ordini WhatsApp e consegna programmata.',
  alternates: { canonical: 'https://www.cusiflores.com/it/consegna-fiori-cdmx' },
}

export default function ItConsegnaFioriCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Consegna fiori a CDMX"
      intro={[
        'CUSI Flores prepara fiori premium con consegna a CDMX per regali eleganti, compleanni, anniversari, attenzioni aziendali e occasioni speciali.',
        'Ogni ordine viene confermato via WhatsApp per verificare disponibilita dei fiori, orario, indirizzo completo, messaggio del biglietto e dati del destinatario.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Confermiamo fiori, stile della composizione, fascia oraria e dati del destinatario prima della preparazione."
      sections={[
        { title: 'Fiori premium consegnati', body: 'Bouquet, composizioni floreali, scatole di rose, tulipani, orchidee e composizioni stagionali secondo disponibilita.' },
        { title: 'Zone servite a CDMX', body: 'Serviamo zone selezionate come Lomas de Chapultepec, Bosques de las Lomas, Polanco, Santa Fe e quartieri vicini secondo disponibilita.' },
        { title: 'Fiori per ogni occasione', body: 'Compleanni, anniversari, ringraziamenti, nascite, eventi privati, regali romantici e attenzioni professionali.' },
        { title: 'Servizio personalizzato', body: 'Aiutiamo a scegliere la composizione in base a occasione, budget, colori e dettagli di consegna.' },
      ]}
      ctaText="Ordinare consegna fiori"
      whatsappText="Ciao CUSI FLORES, vorrei ordinare una consegna di fiori a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Consegnate fiori a CDMX?', answer: 'Si. Offriamo consegne programmate in zone selezionate di CDMX con conferma WhatsApp.' },
        { question: 'Posso scegliere lo stile?', answer: 'Si. Orientiamo la scelta secondo occasione, budget, colori e disponibilita.' },
        { question: 'Come confermo un ordine?', answer: 'L ordine si conferma via WhatsApp con composizione, prezzo, indirizzo, orario, messaggio e destinatario.' },
      ]}
      relatedLinks={[
        { href: '/it/composizioni-floreali-cdmx', label: 'Composizioni floreali CDMX' },
        { href: '/it/bouquet-fiori-cdmx', label: 'Bouquet fiori CDMX' },
        { href: '/it/consegna-orchidee-cdmx', label: 'Consegna orchidee CDMX' },
      ]}
    />
  )
}
