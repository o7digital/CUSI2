import type { Metadata } from 'next'
import AboutPageItClient from '../../../components/AboutPageItClient'

export const metadata: Metadata = {
  title: 'Chi siamo | CUSI Flowers',
  description:
    'Scopri CUSI Flowers: boutique floreale premium a CDMX focalizzata su design elegante, attenzione personalizzata e consegne curate.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it/about',
  },
  openGraph: {
    title: 'Chi siamo | CUSI Flowers',
    description:
      'Boutique floreale premium a CDMX con composizioni d’autore e servizio dedicato per occasioni speciali.',
    url: 'https://www.cusiflores.com/it/about',
    type: 'website',
  },
}

export default function AboutPageIt() {
  return <AboutPageItClient />
}
