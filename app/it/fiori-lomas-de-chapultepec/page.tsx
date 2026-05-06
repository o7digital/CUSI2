import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consegna fiori a Lomas de Chapultepec CDMX | CUSI Flores',
  description:
    'Consegna fiori premium a Lomas de Chapultepec CDMX. Bouquet e composizioni floreali con ordini WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it/fiori-lomas-de-chapultepec',
  },
}

export default function ItFioriLomasPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Consegna fiori a Lomas de Chapultepec CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">CUSI Flores realizza bouquet premium e composizioni floreali con consegna programmata a Lomas de Chapultepec.</p>
      </section>
    </main>
  )
}
