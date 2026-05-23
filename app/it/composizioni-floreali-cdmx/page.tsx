import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Composizioni floreali CDMX | CUSI Flores',
  description: 'Composizioni floreali premium a CDMX per compleanni, regali, eventi e occasioni speciali. Ordini WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/it/composizioni-floreali-cdmx' },
}

export default function ItComposizioniFlorealiCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Composizioni floreali premium a CDMX"
      intro={[
        'CUSI Flores crea composizioni floreali premium a CDMX con fiori freschi, colori equilibrati e presentazione elegante.',
        'Ogni composizione viene preparata secondo occasione e disponibilita, con attenzione personalizzata via WhatsApp prima della conferma.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Verifichiamo occasione, budget, messaggio del biglietto, indirizzo e disponibilita prima di confermare."
      sections={[
        { title: 'Design floreale intenzionale', body: 'Ogni composizione esprime celebrazione, gratitudine, affetto, eleganza o presenza attraverso colore, forma e volume.' },
        { title: 'Fiori freschi e stagionali', body: 'Secondo disponibilita proponiamo rose, tulipani, orchidee, bouquet premium e mix floreali.' },
        { title: 'Regali ed eventi', body: 'Le composizioni sono adatte a case, uffici, hotel, ristoranti, cene private e attenzioni aziendali.' },
        { title: 'Servizio boutique', body: 'Guidiamo la scelta finale secondo destinatario, occasione, zona di consegna e stile desiderato.' },
      ]}
      ctaText="Richiedere composizione"
      whatsappText="Ciao CUSI FLORES, vorrei una composizione floreale a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Che composizioni offrite?', answer: 'Bouquet, scatole di rose, orchidee, tulipani e composizioni stagionali secondo disponibilita.' },
        { question: 'Posso chiedere una composizione personalizzata?', answer: 'Si. Possiamo orientare la composizione per occasione, colori, stile e budget.' },
        { question: 'La consegna e inclusa?', answer: 'La consegna si coordina via WhatsApp secondo zona, orario e disponibilita.' },
      ]}
      relatedLinks={[
        { href: '/it/consegna-fiori-cdmx', label: 'Consegna fiori CDMX' },
        { href: '/it/fiori-compleanno-cdmx', label: 'Fiori compleanno CDMX' },
        { href: '/it/fiori-festa-della-mamma-cdmx', label: 'Fiori festa della mamma CDMX' },
      ]}
    />
  )
}
