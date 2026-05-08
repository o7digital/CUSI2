import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floreria en Polanco CDMX | CUSI Flores',
  description: 'Entrega de flores y arreglos florales premium en Polanco, CDMX. Pedidos por WhatsApp con atencion personalizada.',
  alternates: { canonical: 'https://www.cusiflores.com/flores-polanco' },
}

export default function FloresPolancoPage() {
  return (
    <main className="mx-auto w-[92%] max-w-5xl py-16">
      <h1 className="text-4xl">Floreria en Polanco, CDMX</h1>
      <p className="mt-4 text-lg">Arreglos florales premium con entrega programada en Polanco y zonas cercanas.</p>
    </main>
  )
}
