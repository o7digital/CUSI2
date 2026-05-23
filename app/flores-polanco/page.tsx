import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Floreria en Polanco CDMX | Flores a domicilio | CUSI',
  description:
    'Entrega de flores y arreglos florales premium en Polanco, CDMX. Ramos, orquideas, rosas y regalos florales con pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-polanco',
    languages: {
      'es-MX': 'https://www.cusiflores.com/flores-polanco',
      'x-default': 'https://www.cusiflores.com/flores-polanco',
    },
  },
  openGraph: {
    title: 'Floreria en Polanco CDMX | CUSI Flores',
    description: 'Arreglos florales premium con entrega programada en Polanco, CDMX.',
    url: 'https://www.cusiflores.com/flores-polanco',
    type: 'website',
  },
}

export default function FloresPolancoPage() {
  return (
    <SeoLandingPage
      title="Floreria en Polanco, CDMX"
      intro={[
        'CUSI Flores prepara arreglos florales premium con entrega programada en Polanco y zonas cercanas. Creamos ramos, cajas de rosas, orquideas y composiciones florales para regalos elegantes, aniversarios, cumpleaños y detalles corporativos.',
        'Cada pedido se coordina por WhatsApp para confirmar disponibilidad, horario y estilo del arreglo. El objetivo es que el detalle llegue fresco, cuidado y alineado con la ocasion.',
      ]}
      sections={[
        {
          title: 'Flores a domicilio en Polanco',
          body: 'Atendemos entregas en Polanco con arreglos seleccionados para departamentos, oficinas, restaurantes, hoteles y regalos personales. La coordinacion previa nos permite cuidar tiempos, direccion y presentacion.',
        },
        {
          title: 'Arreglos para ocasiones especiales',
          body: 'Diseñamos propuestas para cumpleaños, aniversarios, agradecimientos, nacimientos, eventos privados y fechas de alta demanda como Dia de las Madres.',
        },
        {
          title: 'Ramos, rosas y orquideas',
          body: 'La seleccion puede incluir ramos premium, tulipanes, cajas de rosas, orquideas Phalaenopsis y composiciones con flor de temporada segun disponibilidad.',
        },
        {
          title: 'Servicio boutique en CDMX',
          body: 'CUSI trabaja con una atencion directa y personalizada. Antes de confirmar, revisamos el mensaje, los datos del destinatario y los detalles de entrega.',
        },
      ]}
      ctaText="Pedir flores en Polanco"
      whatsappText="Hola CUSI FLORES, quiero un arreglo floral para entrega en Polanco."
      faq={[
        {
          question: 'Hacen entrega de flores en Polanco?',
          answer: 'Si. Coordinamos entregas programadas en Polanco, CDMX, con confirmacion previa por WhatsApp.',
        },
        {
          question: 'Puedo pedir un arreglo para el mismo dia?',
          answer: 'Depende de la disponibilidad de flor y horario. Recomendamos escribir por WhatsApp para confirmar opciones disponibles.',
        },
        {
          question: 'Que tipo de flores puedo pedir?',
          answer: 'Puedes solicitar ramos premium, rosas, tulipanes, orquideas y arreglos florales de temporada.',
        },
      ]}
      relatedLinks={[
        { href: '/flores-lomas-de-chapultepec', label: 'Flores en Lomas de Chapultepec' },
        { href: '/flores-bosques-de-las-lomas', label: 'Flores en Bosques de las Lomas' },
        { href: '/flores-santa-fe', label: 'Flores en Santa Fe' },
        { href: '/arreglos-florales-cdmx', label: 'Arreglos florales CDMX' },
      ]}
    />
  )
}
