import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flower Delivery in Bosques de las Lomas CDMX | CUSI Flowers',
  description:
    'Premium flower delivery in Bosques de las Lomas CDMX. Bouquets, orchids, and custom floral arrangements.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/flowers-bosques-de-las-lomas',
  },
}

export default function EnFlowersBosquesPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Flower Delivery in Bosques de las Lomas CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">Premium bouquets and floral arrangements delivered in Bosques de las Lomas with WhatsApp order confirmation.</p>
      </section>
    </main>
  )
}
