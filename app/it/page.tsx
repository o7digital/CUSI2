import type { Metadata } from 'next'
import HomePageIt from '../../components/HomePageIt'

export const metadata: Metadata = {
  title: 'CUSI | Consegna fiori premium a CDMX',
  description:
    'Studio floreale premium a CDMX. Bouquet e composizioni floreali per Festa della Mamma, compleanni ed eventi. Ordini via WhatsApp e consegna programmata.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it',
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
