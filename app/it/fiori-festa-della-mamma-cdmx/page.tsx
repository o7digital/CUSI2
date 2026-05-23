import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Fiori festa della mamma CDMX | CUSI Flores',
  description: 'Fiori per la festa della mamma a CDMX: bouquet, rose, tulipani, orchidee e composizioni premium.',
  alternates: { canonical: 'https://www.cusiflores.com/it/fiori-festa-della-mamma-cdmx' },
}

export default function ItFioriFestaDellaMammaCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Fiori per la festa della mamma a CDMX"
      intro={[
        'CUSI Flores prepara composizioni floreali premium per la festa della mamma a CDMX.',
        'Per il 10 maggio consigliamo di ordinare in anticipo per garantire disponibilita, orario e presentazione.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Confermiamo disponibilita, orario, messaggio del biglietto e destinatario prima della preparazione."
      sections={[
        { title: 'Fiori per mamma', body: 'Composizioni eleganti per esprimere affetto, gratitudine e celebrazione.' },
        { title: 'Ordini anticipati per il 10 maggio', body: 'La festa della mamma ha alta domanda; ordinare presto facilita la coordinazione.' },
        { title: 'Bouquet, rose, tulipani e orchidee', body: 'La disponibilita varia secondo stagione e domanda. Confermiamo le opzioni prima dell ordine.' },
        { title: 'Consegna a CDMX', body: 'Serviamo zone selezionate con consegna programmata e follow-up via WhatsApp.' },
      ]}
      ctaText="Ordinare per mamma"
      whatsappText="Ciao CUSI FLORES, vorrei ordinare fiori per la festa della mamma a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Quando ordinare?', answer: 'Consigliamo di ordinare in anticipo, soprattutto per il 10 maggio.' },
        { question: 'Che composizioni per mamma?', answer: 'Bouquet premium, scatole di rose, tulipani e orchidee sono opzioni frequenti.' },
        { question: 'Si puo includere un biglietto?', answer: 'Si. Coordiniamo testo e firma via WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/it/consegna-fiori-cdmx', label: 'Consegna fiori CDMX' },
        { href: '/it/bouquet-fiori-cdmx', label: 'Bouquet fiori CDMX' },
      ]}
    />
  )
}
