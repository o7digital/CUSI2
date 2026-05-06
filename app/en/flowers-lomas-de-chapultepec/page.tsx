import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flower Delivery in Lomas de Chapultepec CDMX | CUSI Flowers',
  description:
    'Premium flower delivery in Lomas de Chapultepec CDMX. Bouquets, floral arrangements, and WhatsApp orders with scheduled delivery.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/flowers-lomas-de-chapultepec',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you deliver flowers in Lomas de Chapultepec?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We deliver in Lomas de Chapultepec with prior WhatsApp confirmation.' },
    },
    {
      '@type': 'Question',
      name: 'What kind of arrangements can I order?',
      acceptedAnswer: { '@type': 'Answer', text: 'Premium bouquets, tulips, orchids, rose boxes, and seasonal Mother’s Day arrangements.' },
    },
  ],
}

export default function EnFlowersLomasPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Flower Delivery in Lomas de Chapultepec CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">CUSI Flowers offers premium floral arrangements in Lomas de Chapultepec with personalized service and scheduled delivery.</p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
