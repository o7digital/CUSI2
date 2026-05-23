import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Flores para cumpleaños CDMX | Arreglos premium | CUSI',
  description:
    'Flores para cumpleaños en CDMX: ramos, arreglos florales, rosas, tulipanes y orquideas con entrega programada.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-para-cumpleanos-cdmx',
  },
}

export default function FloresParaCumpleanosCdmxPage() {
  return (
    <SeoLandingPage
      title="Flores para cumpleaños en CDMX"
      intro={[
        'CUSI Flores prepara flores para cumpleaños en CDMX con arreglos premium, ramos frescos y composiciones pensadas para celebrar con presencia. Cada detalle puede acompañarse con tarjeta y mensaje personalizado.',
        'El pedido se coordina por WhatsApp para elegir estilo, colores, presupuesto y horario de entrega. La propuesta final depende de la disponibilidad de flor y la ocasion.',
      ]}
      sections={[
        {
          title: 'Arreglos de cumpleaños',
          body: 'Puedes pedir ramos, cajas de rosas, tulipanes, orquideas o arreglos mixtos para celebrar cumpleaños de pareja, familia, amistades o clientes.',
        },
        {
          title: 'Mensaje personalizado',
          body: 'Coordinamos el texto de la tarjeta y la firma para que el regalo llegue completo y con el tono correcto.',
        },
        {
          title: 'Entrega en casa u oficina',
          body: 'Podemos coordinar entrega en domicilio, oficina, restaurante u hotel en zonas seleccionadas de CDMX segun disponibilidad.',
        },
        {
          title: 'Seleccion segun la persona',
          body: 'Te orientamos con opciones sobrias, romanticas, coloridas o elegantes segun el gusto de quien recibe el arreglo.',
        },
      ]}
      ctaText="Pedir flores de cumpleaños"
      whatsappText="Hola CUSI FLORES, quiero pedir flores para cumpleaños en CDMX."
      faq={[
        {
          question: 'Que flores recomiendan para cumpleaños?',
          answer: 'Ramos mixtos, rosas, tulipanes y orquideas son opciones frecuentes. La recomendacion depende del gusto, presupuesto y disponibilidad.',
        },
        {
          question: 'Pueden entregar en oficina?',
          answer: 'Si. Coordinamos entregas en oficinas y domicilios en zonas seleccionadas de CDMX.',
        },
        {
          question: 'Incluyen tarjeta de cumpleaños?',
          answer: 'Podemos coordinar el texto de la tarjeta por WhatsApp antes de confirmar el pedido.',
        },
      ]}
      relatedLinks={[
        { href: '/ramos-de-flores-cdmx', label: 'Ramos de flores CDMX' },
        { href: '/arreglos-florales-cdmx', label: 'Arreglos florales CDMX' },
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
      ]}
    />
  )
}
