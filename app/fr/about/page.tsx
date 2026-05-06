import type { Metadata } from 'next'
import AboutPageFrClient from '../../../components/AboutPageFrClient'

export const metadata: Metadata = {
  title: 'À propos | CUSI Flowers',
  description:
    'Découvrez CUSI Flowers : boutique florale premium à CDMX, axée sur un design élégant, un service personnalisé et des livraisons soignées.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/about',
    languages: {
      'es-MX': 'https://www.cusiflores.com/quienes-somos',
      en: 'https://www.cusiflores.com/en/about',
      it: 'https://www.cusiflores.com/it/about',
      fr: 'https://www.cusiflores.com/fr/about',
      'x-default': 'https://www.cusiflores.com/quienes-somos',
    },
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
