import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Flower Bouquets CDMX | Premium Bouquets | CUSI',
  description: 'Premium flower bouquets in CDMX for birthdays, anniversaries, thank-you gifts, and special occasions. WhatsApp orders.',
  alternates: { canonical: 'https://www.cusiflores.com/en/flower-bouquets-cdmx' },
}

export default function EnFlowerBouquetsCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Flower Bouquets in CDMX"
      intro={[
        'CUSI Flowers prepares premium flower bouquets in CDMX for elegant gifts and meaningful occasions.',
        'Bouquets can include roses, tulips, seasonal flowers, and selected combinations depending on availability.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We confirm flower availability, style, card message, delivery area, and recipient details before preparing the bouquet."
      sections={[
        { title: 'Bouquets for gifting', body: 'A premium bouquet works for birthdays, anniversaries, congratulations, thank-you gifts, and spontaneous gestures.' },
        { title: 'Roses, tulips, and seasonal flowers', body: 'Availability changes by season, so we confirm color, flower type, and volume before preparing the order.' },
        { title: 'Delivery in CDMX', body: 'We coordinate delivery in selected CDMX areas, including Lomas de Chapultepec, Bosques de las Lomas, Polanco, and Santa Fe.' },
        { title: 'Personal card message', body: 'Your bouquet can include a card message and sender signature coordinated through WhatsApp.' },
      ]}
      ctaText="Order a bouquet"
      whatsappText="Hello CUSI FLOWERS, I would like to order a flower bouquet in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: 'Do you offer rose bouquets?', answer: 'Yes. We can prepare rose bouquets and other flower combinations depending on seasonal availability.' },
        { question: 'Can I send a bouquet with a card?', answer: 'Yes. We coordinate the card message and signature by WhatsApp.' },
        { question: 'Can bouquets be delivered the same day?', answer: 'It depends on flower availability and route timing. We confirm options by WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/en/flower-delivery-cdmx', label: 'Flower delivery CDMX' },
        { href: '/en/floral-arrangements-cdmx', label: 'Floral arrangements CDMX' },
      ]}
    />
  )
}
