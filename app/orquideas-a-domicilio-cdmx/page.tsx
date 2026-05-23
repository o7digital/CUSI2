import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Orquideas a domicilio CDMX | CUSI Flores',
  description:
    'Orquideas Phalaenopsis y arreglos con orquideas a domicilio en CDMX. Regalos elegantes con entrega programada y pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/orquideas-a-domicilio-cdmx',
  },
}

export default function OrquideasADomicilioCdmxPage() {
  return (
    <SeoLandingPage
      title="Orquideas a domicilio en CDMX"
      intro={[
        'Las orquideas son una opcion elegante para regalos duraderos, espacios interiores y detalles sofisticados. En CUSI Flores preparamos orquideas Phalaenopsis y composiciones con orquideas para entrega programada en CDMX.',
        'Cada pedido se confirma por WhatsApp para revisar disponibilidad, color, presentacion y zona de entrega. La seleccion puede variar segun temporada y stock.',
      ]}
      sections={[
        {
          title: 'Orquideas Phalaenopsis',
          body: 'Trabajamos con orquideas Phalaenopsis en presentaciones cuidadas, ideales para casa, oficina, recepcion, aniversario o agradecimiento.',
        },
        {
          title: 'Regalos elegantes y sobrios',
          body: 'Una orquidea comunica presencia y refinamiento sin saturar el espacio. Es una buena opcion para regalos corporativos o detalles personales premium.',
        },
        {
          title: 'Entrega programada',
          body: 'Coordinamos la entrega para cuidar traslado, horario y datos del destinatario. La confirmacion previa es importante por tratarse de una planta delicada.',
        },
        {
          title: 'Disponibilidad por temporada',
          body: 'Los colores, tamaños y presentaciones pueden cambiar. Por WhatsApp te compartimos las opciones disponibles antes de confirmar.',
        },
      ]}
      ctaText="Cotizar orquidea"
      whatsappText="Hola CUSI FLORES, quiero cotizar una orquidea a domicilio en CDMX."
      faq={[
        {
          question: 'Tienen orquideas a domicilio?',
          answer: 'Si. Ofrecemos orquideas y arreglos con orquideas para entrega programada en zonas seleccionadas de CDMX.',
        },
        {
          question: 'Puedo elegir el color de la orquidea?',
          answer: 'Depende de la disponibilidad. Confirmamos opciones de color y presentacion por WhatsApp.',
        },
        {
          question: 'La orquidea incluye maceta o base?',
          answer: 'La presentacion depende del modelo disponible. Te compartimos opciones antes de confirmar el pedido.',
        },
      ]}
      relatedLinks={[
        { href: '/arreglos-florales-cdmx', label: 'Arreglos florales CDMX' },
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
        { href: '/flores-lomas-de-chapultepec', label: 'Flores en Lomas de Chapultepec' },
      ]}
    />
  )
}
