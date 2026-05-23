import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Birthday Flowers CDMX | Premium Arrangements | CUSI',
  description: 'Birthday flowers in CDMX with premium bouquets, floral arrangements, roses, tulips, and orchids. Scheduled delivery.',
  alternates: { canonical: 'https://www.cusiflores.com/en/birthday-flowers-cdmx' },
}

export default function EnBirthdayFlowersCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Birthday Flowers in CDMX"
      intro={[
        'CUSI Flowers prepares birthday flowers in CDMX with premium arrangements, fresh bouquets, and elegant compositions.',
        'Each order can include a personalized card message and is coordinated through WhatsApp for style, colors, budget, and delivery timing.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We confirm the arrangement, card message, delivery window, and recipient details before preparing the birthday flowers."
      sections={[
        { title: 'Birthday floral arrangements', body: 'Choose bouquets, rose boxes, tulips, orchids, or mixed arrangements for partners, family, friends, or clients.' },
        { title: 'Personalized message', body: 'We coordinate the card text and sender signature so the gift arrives complete.' },
        { title: 'Home or office delivery', body: 'Delivery can be coordinated to homes, offices, restaurants, or hotels in selected CDMX areas.' },
        { title: 'Style by recipient', body: 'We can suggest sober, romantic, colorful, or elegant options based on the recipient.' },
      ]}
      ctaText="Order birthday flowers"
      whatsappText="Hello CUSI FLOWERS, I would like to order birthday flowers in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: 'What flowers do you recommend for birthdays?', answer: 'Mixed bouquets, roses, tulips, and orchids are common options depending on taste, budget, and availability.' },
        { question: 'Can you deliver to an office?', answer: 'Yes. We coordinate deliveries to offices and homes in selected CDMX areas.' },
        { question: 'Can the order include a birthday card?', answer: 'Yes. We coordinate the card text by WhatsApp before confirmation.' },
      ]}
      relatedLinks={[
        { href: '/en/flower-bouquets-cdmx', label: 'Flower bouquets CDMX' },
        { href: '/en/floral-arrangements-cdmx', label: 'Floral arrangements CDMX' },
      ]}
    />
  )
}
