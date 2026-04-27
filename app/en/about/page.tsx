import type { Metadata } from 'next'
import AboutPageEnClient from '../../../components/AboutPageEnClient'

export const metadata: Metadata = {
  title: 'About Us | CUSI Flowers',
  description:
    'Meet CUSI Flowers: premium floral boutique in CDMX focused on elegant floral design, personal attention, and careful deliveries.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/about',
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
