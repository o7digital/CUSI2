import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floreria en Lomas de Chapultepec CDMX | CUSI Flores',
  description:
    'Floreria premium en Lomas de Chapultepec CDMX. Ramos, arreglos florales y regalos con entrega programada y pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-lomas-de-chapultepec',
  },
  openGraph: {
    title: 'Floreria en Lomas de Chapultepec CDMX | CUSI Flores',
    description:
      'Arreglos florales premium con entrega en Lomas de Chapultepec CDMX. Pedidos por WhatsApp.',
    url: 'https://www.cusiflores.com/flores-lomas-de-chapultepec',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Realizan entrega de flores en Lomas de Chapultepec?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. Atendemos entregas programadas en Lomas de Chapultepec CDMX con confirmacion previa por WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que tipo de arreglos puedo pedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ramos premium, tulipanes, orquideas, cajas de rosas y arreglos para cumpleanos, aniversario y Dia de las Madres.',
      },
    },
    {
      '@type': 'Question',
      name: 'Con cuanto tiempo debo pedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recomendamos solicitar con anticipacion para asegurar disponibilidad de flor y horario de entrega.',
      },
    },
  ],
}

export default function FloresLomasDeChapultepecPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Floreria en Lomas de Chapultepec CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">
          En CUSI Flores creamos arreglos florales premium para entregas en Lomas de Chapultepec. Diseños elegantes, seleccion de flor fresca y atencion personalizada para ocasiones especiales.
        </p>
        <p className="mt-4 text-base leading-8 text-[#4e3a34]">
          Puedes pedir ramos de rosas, tulipanes en ramo o cilindro, orquideas, arreglos de cumpleaños y regalos florales para aniversario o Dia de las Madres.
        </p>

        <div className="mt-8 rounded-2xl border border-[#ead8cf] bg-white p-6">
          <h2 className="text-2xl md:text-3xl">Pedido por WhatsApp y entrega programada</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Coordinamos cada entrega por WhatsApp para validar horario, direccion y disponibilidad del arreglo.
          </p>
          <a
            href="https://wa.me/5215512345678?text=Hola%20CUSI%20FLORES%2C%20quiero%20un%20arreglo%20para%20Lomas%20de%20Chapultepec."
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-semibold text-white"
          >
            Pedir por WhatsApp
          </a>
        </div>

        <div className="mt-8 text-sm text-[#6f5851]">
          <a href="/flores-bosques-de-las-lomas" className="underline underline-offset-2">
            Ver tambien: floreria en Bosques de las Lomas
          </a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
