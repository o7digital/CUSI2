import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Flores a domicilio CDMX | Entrega premium | CUSI Flores',
  description:
    'Flores a domicilio en CDMX con arreglos florales premium, ramos, rosas, tulipanes y orquideas. Pedidos por WhatsApp y entrega programada.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-a-domicilio-cdmx',
  },
  openGraph: {
    title: 'Flores a domicilio CDMX | CUSI Flores',
    description: 'Arreglos florales premium con entrega programada en CDMX.',
    url: 'https://www.cusiflores.com/flores-a-domicilio-cdmx',
    type: 'website',
  },
}

export default function FloresADomicilioCdmxPage() {
  return (
    <SeoLandingPage
      title="Flores a domicilio en CDMX"
      intro={[
        'CUSI Flores prepara flores a domicilio en CDMX para quienes buscan un detalle elegante, fresco y cuidado. Trabajamos con ramos premium, arreglos florales, cajas de rosas, tulipanes y orquideas para ocasiones especiales.',
        'Cada entrega se coordina por WhatsApp para confirmar disponibilidad, horario, direccion completa y mensaje de tarjeta. Nuestro servicio esta pensado para regalos personales, celebraciones, aniversarios y detalles corporativos.',
      ]}
      sections={[
        {
          title: 'Entrega programada de flores',
          body: 'Coordinamos cada pedido antes de preparar el arreglo para cuidar tiempos, datos de contacto y presentacion. La entrega programada ayuda a mantener la frescura y reducir errores de direccion.',
        },
        {
          title: 'Arreglos para cada ocasion',
          body: 'Puedes pedir flores para cumpleaños, aniversario, agradecimiento, nacimiento, condolencias, eventos privados o fechas especiales como Dia de las Madres.',
        },
        {
          title: 'Zonas de cobertura en CDMX',
          body: 'Atendemos zonas seleccionadas de la Ciudad de Mexico, incluyendo Lomas de Chapultepec, Bosques de las Lomas, Polanco, Santa Fe y colonias cercanas segun disponibilidad.',
        },
        {
          title: 'Compra sencilla por WhatsApp',
          body: 'Te ayudamos a elegir el arreglo, confirmar precio, revisar disponibilidad de flor y coordinar los datos necesarios para completar el pedido.',
        },
      ]}
      ctaText="Pedir flores a domicilio"
      whatsappText="Hola CUSI FLORES, quiero pedir flores a domicilio en CDMX."
      faq={[
        {
          question: 'Hacen entrega de flores a domicilio en CDMX?',
          answer: 'Si. CUSI Flores ofrece entregas programadas en zonas seleccionadas de CDMX con confirmacion por WhatsApp.',
        },
        {
          question: 'Puedo elegir el tipo de arreglo?',
          answer: 'Si. Puedes solicitar ramos, rosas, tulipanes, orquideas o arreglos de temporada segun disponibilidad.',
        },
        {
          question: 'Como confirmo mi pedido?',
          answer: 'El pedido se confirma por WhatsApp revisando arreglo, precio, direccion, horario, dedicatoria y datos del destinatario.',
        },
      ]}
      relatedLinks={[
        { href: '/arreglos-florales-cdmx', label: 'Arreglos florales CDMX' },
        { href: '/ramos-de-flores-cdmx', label: 'Ramos de flores CDMX' },
        { href: '/flores-polanco', label: 'Flores en Polanco' },
        { href: '/flores-santa-fe', label: 'Flores en Santa Fe' },
      ]}
    />
  )
}
