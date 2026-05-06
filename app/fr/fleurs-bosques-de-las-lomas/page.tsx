import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison de fleurs a Bosques de las Lomas CDMX | CUSI Flores',
  description:
    'Livraison de fleurs premium a Bosques de las Lomas CDMX. Bouquets, orchidees et compositions florales elegantes.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/fleurs-bosques-de-las-lomas',
  },
}

export default function FrFleursBosquesPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Livraison de fleurs a Bosques de las Lomas CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">Commandez vos fleurs premium sur WhatsApp pour Bosques de las Lomas avec livraison soignee.</p>
      </section>
    </main>
  )
}
