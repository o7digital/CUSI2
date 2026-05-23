import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: "Mother's Day Flowers CDMX | May 10 Flowers | CUSI",
  description: "Mother's Day flowers in CDMX with premium arrangements, bouquets, roses, tulips, and orchids for May 10.",
  alternates: { canonical: 'https://www.cusiflores.com/en/mothers-day-flowers-cdmx' },
}

export default function EnMothersDayFlowersCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Mother's Day Flowers in CDMX"
      intro={[
        "CUSI Flowers prepares premium Mother's Day flowers in CDMX. For May 10, we recommend ordering early to secure flower availability and delivery timing.",
        'You can request bouquets, roses, tulips, orchids, and seasonal floral compositions with card message coordination through WhatsApp.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We confirm flower availability, delivery time, card message, and recipient details before preparing each Mother's Day order."
      sections={[
        { title: 'Flowers for Mom', body: 'We design elegant arrangements to express affection, gratitude, and celebration.' },
        { title: 'Early May 10 orders', body: "Mother's Day is high demand, so ordering early helps coordinate availability and delivery route." },
        { title: 'Bouquets, roses, tulips, and orchids', body: 'Availability changes by season and demand. We confirm options before closing the order.' },
        { title: 'Delivery in CDMX', body: 'We serve selected CDMX areas with scheduled delivery and direct WhatsApp follow-up.' },
      ]}
      ctaText="Order flowers for Mom"
      whatsappText="Hello CUSI FLOWERS, I would like to order Mother's Day flowers in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: "When should I order Mother's Day flowers?", answer: 'We recommend ordering early, especially for May 10, because flower and delivery demand is high.' },
        { question: 'What arrangements do you recommend for Mom?', answer: 'Premium bouquets, rose boxes, tulips, and orchids are frequent choices.' },
        { question: 'Can you include a card message?', answer: 'Yes. We coordinate the card text and sender signature by WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/en/flower-delivery-cdmx', label: 'Flower delivery CDMX' },
        { href: '/en/flower-bouquets-cdmx', label: 'Flower bouquets CDMX' },
      ]}
    />
  )
}
