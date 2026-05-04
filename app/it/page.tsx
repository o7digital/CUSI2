import type { Metadata } from 'next'
import HomePageIt from '../../components/HomePageIt'

export const metadata: Metadata = {
  title: 'CUSI | Consegna fiori premium a CDMX',
  description:
    'Studio floreale premium a CDMX. Bouquet e composizioni floreali per Festa della Mamma, compleanni ed eventi. Ordini via WhatsApp e consegna programmata.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it',
    languages: {
      'es-MX': 'https://www.cusiflores.com/',
      en: 'https://www.cusiflores.com/en',
      it: 'https://www.cusiflores.com/it',
      fr: 'https://www.cusiflores.com/fr',
      'x-default': 'https://www.cusiflores.com/',
    },
  },
  openGraph: {
    title: 'CUSI | Consegna fiori premium a CDMX',
    description:
      'Bouquet e composizioni floreali premium a CDMX per occasioni speciali. Richiedi il tuo ordine su WhatsApp.',
    url: 'https://www.cusiflores.com/it',
    type: 'website',
  },
}

export default function ItPage() {
  return <HomePageIt />
}
