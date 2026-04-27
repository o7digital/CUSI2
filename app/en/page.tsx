import type { Metadata } from 'next'
import HomePageEn from '../../components/HomePageEn'

export const metadata: Metadata = {
  title: 'CUSI | Premium flower delivery in CDMX',
  description:
    'Premium flower studio in CDMX. Bouquets and floral arrangements for Mother\'s Day, birthdays, and events. WhatsApp orders and scheduled delivery.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en',
  },
  openGraph: {
    title: 'CUSI | Premium flower delivery in CDMX',
    description:
      'Premium bouquets and floral arrangements in CDMX for special occasions. Request your order on WhatsApp.',
    url: 'https://www.cusiflores.com/en',
    type: 'website',
  },
}

export default function EnPage() {
  return <HomePageEn />
}
