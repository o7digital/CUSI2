import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Floral Arrangements CDMX | CUSI Flowers',
  description: 'Premium floral arrangements in CDMX for birthdays, anniversaries, gifts, events, and special occasions. WhatsApp orders.',
  alternates: { canonical: 'https://www.cusiflores.com/en/floral-arrangements-cdmx' },
}

export default function EnFloralArrangementsCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Premium Floral Arrangements in CDMX"
      intro={[
        'CUSI Flowers designs premium floral arrangements in CDMX with fresh flowers, balanced colors, and elegant presentation.',
        'Each composition is prepared according to the occasion and availability, with personalized WhatsApp attention before confirmation.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We review occasion, budget, card message, address, and flower availability before confirming each arrangement."
      sections={[
        { title: 'Floral design with intention', body: 'Each arrangement is built to communicate celebration, gratitude, affection, elegance, or presence through color, shape, and volume.' },
        { title: 'Fresh seasonal flowers', body: 'Depending on availability, we can propose roses, tulips, orchids, premium bouquets, and seasonal floral mixes.' },
        { title: 'Gifts and events', body: 'Our arrangements are suitable for homes, offices, hotels, restaurants, private dinners, and corporate gestures.' },
        { title: 'Boutique service', body: 'We guide the final choice according to the recipient, occasion, delivery area, and desired style.' },
      ]}
      ctaText="Quote a floral arrangement"
      whatsappText="Hello CUSI FLOWERS, I would like to quote a floral arrangement in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: 'What floral arrangements do you offer?', answer: 'We offer bouquets, rose boxes, orchids, tulips, and seasonal floral compositions depending on availability.' },
        { question: 'Can I request a custom arrangement?', answer: 'Yes. We can orient the arrangement by occasion, colors, style, and budget.' },
        { question: 'Do arrangements include delivery?', answer: 'Delivery is coordinated by WhatsApp depending on area, schedule, and availability.' },
      ]}
      relatedLinks={[
        { href: '/en/flower-delivery-cdmx', label: 'Flower delivery CDMX' },
        { href: '/en/birthday-flowers-cdmx', label: 'Birthday flowers CDMX' },
        { href: '/en/mothers-day-flowers-cdmx', label: "Mother's Day flowers CDMX" },
      ]}
    />
  )
}
