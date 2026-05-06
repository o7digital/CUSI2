import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consegna fiori a Bosques de las Lomas CDMX | CUSI Flores',
  description:
    'Consegna fiori premium a Bosques de las Lomas CDMX. Bouquet, orchidee e composizioni floreali eleganti.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it/fiori-bosques-de-las-lomas',
  },
}

export default function ItFioriBosquesPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Consegna fiori a Bosques de las Lomas CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">Ordina su WhatsApp e ricevi fiori premium con consegna curata a Bosques de las Lomas.</p>
      </section>
    </main>
  )
}
