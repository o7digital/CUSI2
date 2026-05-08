import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floreria en Santa Fe CDMX | CUSI Flores',
  description: 'Ramos y arreglos florales premium con entrega en Santa Fe, CDMX. Cotizacion y pedidos por WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/flores-santa-fe' },
}

export default function FloresSantaFePage() {
  return (
    <main className="mx-auto w-[92%] max-w-5xl py-16">
      <h1 className="text-4xl">Floreria en Santa Fe, CDMX</h1>
      <p className="mt-4 text-lg">Servicio floral boutique para regalos, aniversarios y eventos corporativos.</p>
    </main>
  )
}
