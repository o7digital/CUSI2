import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Floreria en Bosques de las Lomas CDMX | CUSI Flores',
  description:
    'Floreria premium en Bosques de las Lomas CDMX. Arreglos florales, ramos y orquideas con entrega programada y atencion por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-bosques-de-las-lomas',
  },
  openGraph: {
    title: 'Floreria en Bosques de las Lomas CDMX | CUSI Flores',
    description:
      'Ramos y arreglos florales premium con entrega en Bosques de las Lomas CDMX.',
    url: 'https://www.cusiflores.com/flores-bosques-de-las-lomas',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hacen entregas en Bosques de las Lomas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. Tenemos cobertura en Bosques de las Lomas con entregas coordinadas por WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Puedo pedir arreglos para aniversario y cumpleaños?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. Diseñamos arreglos para aniversario, cumpleaños, nacimientos, agradecimientos y eventos privados.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que incluye el servicio premium?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Seleccion de flor, diseño cuidado, confirmacion de pedido y seguimiento de entrega.',
      },
    },
  ],
}

export default function FloresBosquesDeLasLomasPage() {
  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl leading-tight md:text-5xl">Floreria en Bosques de las Lomas CDMX</h1>
        <p className="mt-5 text-base leading-8 text-[#4e3a34]">
          CUSI Flores ofrece arreglos florales premium para Bosques de las Lomas. Diseños de autor, servicio personalizado y entregas con coordinacion previa para asegurar puntualidad y calidad.
        </p>
        <p className="mt-4 text-base leading-8 text-[#4e3a34]">
          Trabajamos con bouquets premium, cajas de rosas, tulipanes y orquideas, ademas de propuestas especiales para temporada de 10 de Mayo.
        </p>

        <div className="mt-8 rounded-2xl border border-[#ead8cf] bg-white p-6">
          <h2 className="text-2xl md:text-3xl">Atencion directa y pedidos por WhatsApp</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Nuestro equipo confirma disponibilidad y horario para cada entrega en Bosques de las Lomas y zonas cercanas.
          </p>
          <a
            href="https://wa.me/525521092665?text=Hola%20CUSI%20FLORES%2C%20quiero%20un%20arreglo%20para%20Bosques%20de%20las%20Lomas."
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-semibold text-white"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        <div className="mt-8 text-sm text-[#6f5851]">
          <a href="/flores-lomas-de-chapultepec" className="underline underline-offset-2">
            Ver tambien: floreria en Lomas de Chapultepec
          </a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
