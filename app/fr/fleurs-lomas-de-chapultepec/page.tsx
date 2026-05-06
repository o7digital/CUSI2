import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Livraison de fleurs a Lomas de Chapultepec CDMX | CUSI Flores',
  description:
    'Livraison de fleurs premium a Lomas de Chapultepec CDMX. Bouquets et compositions florales avec commande WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/fleurs-lomas-de-chapultepec',
  },
}

export default function FrFleursLomasPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Livraison de fleurs a Lomas de Chapultepec CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">CUSI Flores propose des bouquets premium et des compositions florales avec livraison planifiee a Lomas de Chapultepec.</p>
      </section>
    </main>
  )
}
