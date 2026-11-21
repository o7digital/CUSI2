import { getSiteContent } from '../../lib/studio'
import type { Metadata } from 'next'
import { getChristmasProducts } from '../../lib/christmas'
import HomePageFr from '../../components/HomePageFr'

export const metadata: Metadata = {
  title: 'CUSI | Livraison de fleurs premium à CDMX',
  description:
    'Atelier floral premium à CDMX. Bouquets et compositions florales pour la Fête des Mères, anniversaires et événements. Commandes par WhatsApp et livraison planifiée.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr',
    languages: {
      'es-MX': 'https://www.cusiflores.com/',
      en: 'https://www.cusiflores.com/en',
      it: 'https://www.cusiflores.com/it',
      fr: 'https://www.cusiflores.com/fr',
      'x-default': 'https://www.cusiflores.com/',
    },
  },
  openGraph: {
    title: 'CUSI | Livraison de fleurs premium à CDMX',
    description:
      'Bouquets et compositions florales premium à CDMX pour les occasions spéciales. Commandez sur WhatsApp.',
    url: 'https://www.cusiflores.com/fr',
    type: 'website',
  },
}

export default async function FrPage() {
  const [christmasProducts, siteContent] = await Promise.all([getChristmasProducts(), getSiteContent()])
  return <HomePageFr christmasProducts={christmasProducts} siteContent={siteContent} />
}
