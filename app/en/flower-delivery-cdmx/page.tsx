import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Flower Delivery CDMX | Premium Flowers | CUSI Flowers',
  description: 'Premium flower delivery in CDMX with bouquets, roses, tulips, orchids, WhatsApp orders, and scheduled delivery.',
  alternates: { canonical: 'https://www.cusiflores.com/en/flower-delivery-cdmx' },
}

export default function EnFlowerDeliveryCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Flower Delivery in CDMX"
      intro={[
        'CUSI Flowers prepares premium flower delivery in CDMX for elegant gifts, birthdays, anniversaries, corporate details, and special occasions.',
        'Each order is confirmed through WhatsApp so we can review flower availability, delivery time, full address, card message, and recipient details before preparing the arrangement.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We confirm flowers, arrangement style, delivery window, and recipient details before preparing each order."
      sections={[
        { title: 'Premium flowers delivered', body: 'Choose from bouquets, floral arrangements, rose boxes, tulips, orchids, and seasonal compositions depending on availability.' },
        { title: 'Delivery in selected CDMX areas', body: 'We serve selected areas including Lomas de Chapultepec, Bosques de las Lomas, Polanco, Santa Fe, and nearby neighborhoods when available.' },
        { title: 'Flowers for every occasion', body: 'Our arrangements work for birthdays, anniversaries, thank-you gifts, newborn celebrations, private events, and corporate gestures.' },
        { title: 'Personalized service', body: 'We help choose the arrangement based on occasion, budget, color preference, and delivery details.' },
      ]}
      ctaText="Order flower delivery"
      whatsappText="Hello CUSI FLOWERS, I would like to order flower delivery in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: 'Do you offer flower delivery in CDMX?', answer: 'Yes. We offer scheduled flower delivery in selected areas of CDMX with WhatsApp confirmation.' },
        { question: 'Can I choose the arrangement style?', answer: 'Yes. We can guide the selection by occasion, budget, colors, and flower availability.' },
        { question: 'How do I confirm an order?', answer: 'Orders are confirmed by WhatsApp with arrangement, price, address, delivery window, card message, and recipient details.' },
      ]}
      relatedLinks={[
        { href: '/en/floral-arrangements-cdmx', label: 'Floral arrangements CDMX' },
        { href: '/en/flower-bouquets-cdmx', label: 'Flower bouquets CDMX' },
        { href: '/en/orchid-delivery-cdmx', label: 'Orchid delivery CDMX' },
      ]}
    />
  )
}
