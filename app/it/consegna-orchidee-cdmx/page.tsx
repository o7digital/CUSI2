import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Consegna orchidee CDMX | CUSI Flores',
  description: 'Consegna orchidee a CDMX con orchidee Phalaenopsis e composizioni eleganti. Ordini WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/it/consegna-orchidee-cdmx' },
}

export default function ItConsegnaOrchideeCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Consegna orchidee a CDMX"
      intro={[
        'Le orchidee sono una scelta elegante per regali raffinati, interni, uffici e attenzioni durature.',
        'CUSI Flores prepara orchidee Phalaenopsis e composizioni con orchidee per consegna programmata a CDMX.',
      ]}
      orderTitle="Ordini WhatsApp e consegna programmata"
      orderBody="Confermiamo disponibilita, colore, presentazione, zona di consegna e destinatario prima della preparazione."
      sections={[
        { title: 'Orchidee Phalaenopsis', body: 'Lavoriamo con orchidee Phalaenopsis in presentazioni curate per casa, ufficio, reception o regalo.' },
        { title: 'Regali eleganti e duraturi', body: 'Un orchidea comunica raffinatezza e presenza, ideale per regali personali o professionali.' },
        { title: 'Consegna programmata', body: 'La consegna viene coordinata in anticipo per proteggere la pianta e confermare i dettagli.' },
        { title: 'Disponibilita stagionale', body: 'Colori, dimensioni e presentazioni variano. Condividiamo le opzioni attuali via WhatsApp.' },
      ]}
      ctaText="Richiedere orchidea"
      whatsappText="Ciao CUSI FLORES, vorrei un orchidea con consegna a CDMX."
      faqTitle="Domande frequenti"
      relatedLabel="Pagine correlate"
      faq={[
        { question: 'Consegnate orchidee a CDMX?', answer: 'Si. Offriamo orchidee e composizioni con orchidee in zone selezionate.' },
        { question: 'Posso scegliere il colore?', answer: 'Dipende dalla disponibilita. Confermiamo le opzioni via WhatsApp.' },
        { question: 'L orchidea include vaso o base?', answer: 'La presentazione dipende dal modello disponibile. Condividiamo le opzioni prima della conferma.' },
      ]}
      relatedLinks={[
        { href: '/it/composizioni-floreali-cdmx', label: 'Composizioni floreali CDMX' },
        { href: '/it/consegna-fiori-cdmx', label: 'Consegna fiori CDMX' },
      ]}
    />
  )
}
