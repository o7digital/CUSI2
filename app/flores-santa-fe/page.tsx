import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Floreria en Santa Fe CDMX | Arreglos premium | CUSI',
  description:
    'Ramos y arreglos florales premium con entrega en Santa Fe, CDMX. Flores para regalos, aniversarios, oficinas y eventos corporativos.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-santa-fe',
    languages: {
      'es-MX': 'https://www.cusiflores.com/flores-santa-fe',
      'x-default': 'https://www.cusiflores.com/flores-santa-fe',
    },
  },
  openGraph: {
    title: 'Floreria en Santa Fe CDMX | CUSI Flores',
    description: 'Servicio floral boutique con entrega programada en Santa Fe, CDMX.',
    url: 'https://www.cusiflores.com/flores-santa-fe',
    type: 'website',
  },
}

export default function FloresSantaFePage() {
  return (
    <SeoLandingPage
      title="Floreria en Santa Fe, CDMX"
      intro={[
        'CUSI Flores ofrece servicio floral boutique con entrega programada en Santa Fe, CDMX. Preparamos arreglos premium para regalos personales, aniversarios, cumpleaños, oficinas, recepciones y eventos corporativos.',
        'El pedido se confirma por WhatsApp para cuidar disponibilidad, horario, mensaje de tarjeta y detalles de entrega. Trabajamos con flores frescas y composiciones pensadas para una presentacion elegante.',
      ]}
      sections={[
        {
          title: 'Flores para oficinas y corporativos',
          body: 'Santa Fe concentra oficinas, corporativos, hoteles y espacios de reunion. CUSI atiende pedidos para recepciones, agradecimientos, celebraciones internas y detalles ejecutivos.',
        },
        {
          title: 'Entrega programada en Santa Fe',
          body: 'Coordinamos la entrega con anticipacion para validar direccion, acceso, horario y telefono de contacto. Esto ayuda a que el arreglo llegue en condiciones optimas.',
        },
        {
          title: 'Arreglos premium para regalar',
          body: 'Puedes solicitar rosas, tulipanes, orquideas, bouquets y composiciones florales de temporada para cumpleaños, aniversario, agradecimiento o una ocasion especial.',
        },
        {
          title: 'Atencion personalizada por WhatsApp',
          body: 'Nuestro equipo revisa cada pedido antes de confirmarlo. Te ayudamos a elegir el arreglo segun la ocasion, el presupuesto y la disponibilidad de flor.',
        },
      ]}
      ctaText="Pedir flores en Santa Fe"
      whatsappText="Hola CUSI FLORES, quiero un arreglo floral para entrega en Santa Fe."
      faq={[
        {
          question: 'Hacen entrega de flores en Santa Fe?',
          answer: 'Si. Atendemos entregas programadas en Santa Fe, CDMX, previa confirmacion por WhatsApp.',
        },
        {
          question: 'Tienen arreglos para empresas?',
          answer: 'Si. Podemos preparar arreglos para oficinas, recepciones, regalos corporativos y eventos privados.',
        },
        {
          question: 'Con cuanto tiempo debo pedir?',
          answer: 'Lo ideal es pedir con anticipacion para asegurar disponibilidad de flor y horario de entrega.',
        },
      ]}
      relatedLinks={[
        { href: '/flores-polanco', label: 'Flores en Polanco' },
        { href: '/flores-lomas-de-chapultepec', label: 'Flores en Lomas de Chapultepec' },
        { href: '/flores-bosques-de-las-lomas', label: 'Flores en Bosques de las Lomas' },
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
      ]}
    />
  )
}
