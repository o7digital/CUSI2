import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Fiori compleanno CDMX | CUSI Flores',
  description: 'Fiori per compleanno a CDMX con bouquet premium, composizioni floreali, rose, tulipani e orchidee.',
  alternates: { canonical: 'https://www.cusiflores.com/it/fiori-compleanno-cdmx' },
}

export default function ItFioriCompleannoCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Fiori per compleanno a CDMX"
      intro={[
        'CUSI Flores prepara fiori per compleanno a CDMX con composizioni premium, bouquet freschi e presentazioni eleganti.',
        'Ogni ordine puo includere un biglietto personalizzato e si coordina via WhatsApp per stile, colori, budget e orario.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Confermiamo composizione, messaggio del biglietto, orario e destinatario prima della preparazione."
      sections={[
        { title: 'Composizioni compleanno', body: 'Bouquet, scatole di rose, tulipani, orchidee o composizioni miste per famiglia, amici, clienti o partner.' },
        { title: 'Messaggio personalizzato', body: 'Coordiniamo testo del biglietto e firma per un regalo completo.' },
        { title: 'Consegna casa o ufficio', body: 'Consegna possibile a domicilio, ufficio, ristorante o hotel in zone selezionate di CDMX.' },
        { title: 'Stile secondo destinatario', body: 'Proponiamo opzioni sobrie, romantiche, colorate o eleganti secondo la persona.' },
      ]}
      ctaText="Ordinare fiori compleanno"
      whatsappText="Ciao CUSI FLORES, vorrei ordinare fiori per compleanno a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Che fiori consigliate?', answer: 'Bouquet misti, rose, tulipani e orchidee secondo gusto, budget e disponibilita.' },
        { question: 'Consegnate in ufficio?', answer: 'Si. Coordiniamo consegne in uffici e domicili in zone selezionate.' },
        { question: 'Si puo includere un biglietto?', answer: 'Si. Coordiniamo il testo del biglietto via WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/it/bouquet-fiori-cdmx', label: 'Bouquet fiori CDMX' },
        { href: '/it/composizioni-floreali-cdmx', label: 'Composizioni floreali CDMX' },
      ]}
    />
  )
}
