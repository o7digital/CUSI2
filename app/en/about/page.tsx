import type { Metadata } from 'next'
import AboutPageEnClient from '../../../components/AboutPageEnClient'

export const metadata: Metadata = {
  title: 'About Us | CUSI Flowers',
  description:
    'Meet CUSI Flowers: premium floral boutique in CDMX focused on elegant floral design, personal attention, and careful deliveries.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/about',
    languages: {
      'es-MX': 'https://www.cusiflores.com/quienes-somos',
      en: 'https://www.cusiflores.com/en/about',
      it: 'https://www.cusiflores.com/it/about',
      fr: 'https://www.cusiflores.com/fr/about',
      'x-default': 'https://www.cusiflores.com/quienes-somos',
    },
  },
  openGraph: {
    title: 'About Us | CUSI Flowers',
    description:
      'Premium floral boutique in CDMX with authored arrangements, close service, and proposals for special occasions.',
    url: 'https://www.cusiflores.com/en/about',
    type: 'website',
  },
}

export default function AboutPageEn() {
  return <AboutPageEnClient />
}
