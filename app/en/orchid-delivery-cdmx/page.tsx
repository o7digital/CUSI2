import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Orchid Delivery CDMX | Phalaenopsis Orchids | CUSI',
  description: 'Orchid delivery in CDMX with Phalaenopsis orchids and elegant orchid arrangements. Scheduled delivery and WhatsApp orders.',
  alternates: { canonical: 'https://www.cusiflores.com/en/orchid-delivery-cdmx' },
}

export default function EnOrchidDeliveryCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flowers CDMX"
      title="Orchid Delivery in CDMX"
      intro={[
        'Orchids are an elegant choice for refined gifts, interiors, offices, and lasting details.',
        'CUSI Flowers prepares Phalaenopsis orchids and orchid compositions for scheduled delivery in selected CDMX areas.',
      ]}
      orderTitle="WhatsApp orders and scheduled delivery"
      orderBody="We confirm orchid availability, color, presentation, delivery area, and recipient details before preparing the order."
      sections={[
        { title: 'Phalaenopsis orchids', body: 'We work with Phalaenopsis orchids in carefully presented arrangements for homes, offices, receptions, anniversaries, and thank-you gifts.' },
        { title: 'Elegant long-lasting gifts', body: 'An orchid communicates refinement and presence, making it suitable for personal and corporate gifting.' },
        { title: 'Scheduled delivery', body: 'Delivery is coordinated in advance to protect the plant and confirm the correct delivery details.' },
        { title: 'Seasonal availability', body: 'Colors, sizes, and presentations vary. We share current options by WhatsApp before confirming.' },
      ]}
      ctaText="Quote an orchid"
      whatsappText="Hello CUSI FLOWERS, I would like to quote an orchid delivery in CDMX."
      faqTitle="Frequently asked questions"
      faq={[
        { question: 'Do you deliver orchids in CDMX?', answer: 'Yes. We offer orchids and orchid arrangements for scheduled delivery in selected CDMX areas.' },
        { question: 'Can I choose the orchid color?', answer: 'It depends on availability. We confirm color and presentation options by WhatsApp.' },
        { question: 'Does the orchid include a pot or base?', answer: 'Presentation depends on the available model. We share options before confirmation.' },
      ]}
      relatedLinks={[
        { href: '/en/floral-arrangements-cdmx', label: 'Floral arrangements CDMX' },
        { href: '/en/flower-delivery-cdmx', label: 'Flower delivery CDMX' },
      ]}
    />
  )
}
