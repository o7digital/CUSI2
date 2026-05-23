import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Arreglos florales CDMX | Flores premium | CUSI',
  description:
    'Arreglos florales premium en CDMX para cumpleaños, aniversarios, regalos, eventos y ocasiones especiales. Pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/arreglos-florales-cdmx',
  },
  openGraph: {
    title: 'Arreglos florales CDMX | CUSI Flores',
    description: 'Composiciones florales premium para regalar en CDMX.',
    url: 'https://www.cusiflores.com/arreglos-florales-cdmx',
    type: 'website',
  },
}

export default function ArreglosFloralesCdmxPage() {
  return (
    <SeoLandingPage
      title="Arreglos florales premium en CDMX"
      intro={[
        'CUSI Flores diseña arreglos florales premium en CDMX con una seleccion cuidada de flores frescas, colores armonicos y presentaciones elegantes. Cada composicion se prepara segun la ocasion y disponibilidad de flor.',
        'Nuestros arreglos son una opcion para cumpleaños, aniversarios, agradecimientos, regalos corporativos, eventos privados y fechas especiales. La atencion por WhatsApp permite ajustar estilo, mensaje y entrega.',
      ]}
      sections={[
        {
          title: 'Diseño floral con intencion',
          body: 'Cada arreglo se construye para comunicar una emocion concreta: celebracion, gratitud, cariño, elegancia o presencia. Cuidamos forma, volumen, color y recipiente.',
        },
        {
          title: 'Flores frescas y de temporada',
          body: 'Trabajamos con flor disponible y seleccionada para mantener calidad. Segun temporada, podemos proponer rosas, tulipanes, orquideas y mezclas florales premium.',
        },
        {
          title: 'Regalos florales en CDMX',
          body: 'Los arreglos florales son ideales para entregar en casa, oficina, hotel o restaurante, siempre con confirmacion previa del horario y datos de entrega.',
        },
        {
          title: 'Atencion personalizada',
          body: 'Antes de confirmar, revisamos ocasion, presupuesto, dedicatoria, direccion y disponibilidad para recomendar una composicion adecuada.',
        },
      ]}
      ctaText="Cotizar arreglo floral"
      whatsappText="Hola CUSI FLORES, quiero cotizar un arreglo floral en CDMX."
      faq={[
        {
          question: 'Que arreglos florales manejan?',
          answer: 'Manejamos ramos, cajas de rosas, orquideas, tulipanes y composiciones florales de temporada segun disponibilidad.',
        },
        {
          question: 'Puedo pedir un arreglo personalizado?',
          answer: 'Si. Podemos orientar la propuesta por ocasion, colores, estilo y presupuesto disponible.',
        },
        {
          question: 'Los arreglos incluyen entrega?',
          answer: 'La entrega se coordina por WhatsApp segun zona, horario y disponibilidad.',
        },
      ]}
      relatedLinks={[
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
        { href: '/orquideas-a-domicilio-cdmx', label: 'Orquideas a domicilio' },
        { href: '/flores-para-cumpleanos-cdmx', label: 'Flores para cumpleaños' },
        { href: '/flores-dia-de-las-madres-cdmx', label: 'Flores Dia de las Madres' },
      ]}
    />
  )
}
