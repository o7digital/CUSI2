import type { Metadata } from 'next'
import AboutPageFrClient from '../../../components/AboutPageFrClient'

export const metadata: Metadata = {
  title: 'À propos | CUSI Flowers',
  description:
    'Découvrez CUSI Flowers : boutique florale premium à CDMX, axée sur un design élégant, un service personnalisé et des livraisons soignées.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/about',
  },
  openGraph: {
    title: 'À propos | CUSI Flowers',
    description:
      'Boutique florale premium à CDMX avec compositions d’auteur, service attentif et propositions pour les occasions spéciales.',
    url: 'https://www.cusiflores.com/fr/about',
    type: 'website',
  },
}

export default function AboutPageFr() {
  return <AboutPageFrClient />
}
