import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Ramos de flores CDMX | Ramos premium a domicilio | CUSI',
  description:
    'Ramos de flores premium en CDMX para cumpleaños, aniversario, agradecimiento y regalos especiales. Pedidos por WhatsApp.',
  alternates: {
    canonical: 'https://www.cusiflores.com/ramos-de-flores-cdmx',
  },
}

export default function RamosDeFloresCdmxPage() {
  return (
    <SeoLandingPage
      title="Ramos de flores en CDMX"
      intro={[
        'CUSI Flores prepara ramos de flores premium en CDMX para regalos elegantes y ocasiones especiales. Los ramos pueden incluir rosas, tulipanes, flor de temporada y combinaciones seleccionadas segun disponibilidad.',
        'Cada ramo se coordina por WhatsApp para confirmar estilo, presupuesto, dedicatoria y entrega. Buscamos que el arreglo sea fresco, proporcionado y adecuado para la persona que lo recibe.',
      ]}
      sections={[
        {
          title: 'Ramos para regalar',
          body: 'Un ramo premium funciona para cumpleaños, aniversario, felicitacion, agradecimiento o un detalle espontaneo. Adaptamos la propuesta al mensaje que quieres enviar.',
        },
        {
          title: 'Rosas, tulipanes y temporada',
          body: 'La disponibilidad cambia por temporada, por eso confirmamos opciones antes de preparar el pedido. Podemos recomendar colores, volumen y tipo de flor.',
        },
        {
          title: 'Entrega en zonas seleccionadas',
          body: 'Coordinamos entregas en CDMX en zonas como Lomas de Chapultepec, Bosques de las Lomas, Polanco y Santa Fe, sujetas a disponibilidad.',
        },
        {
          title: 'Pedido por WhatsApp',
          body: 'Por WhatsApp confirmamos precio, horario, direccion, telefono de contacto, texto de tarjeta y datos del destinatario.',
        },
      ]}
      ctaText="Pedir ramo de flores"
      whatsappText="Hola CUSI FLORES, quiero pedir un ramo de flores en CDMX."
      faq={[
        {
          question: 'Tienen ramos de rosas?',
          answer: 'Si. Podemos preparar ramos de rosas y otras flores segun disponibilidad de temporada.',
        },
        {
          question: 'Puedo enviar un ramo con tarjeta?',
          answer: 'Si. Coordinamos el texto de la tarjeta y la firma del remitente por WhatsApp.',
        },
        {
          question: 'Los ramos son para entrega el mismo dia?',
          answer: 'Depende de la disponibilidad de flor y ruta. Lo confirmamos directamente por WhatsApp.',
        },
      ]}
      relatedLinks={[
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
        { href: '/arreglos-florales-cdmx', label: 'Arreglos florales CDMX' },
        { href: '/flores-para-cumpleanos-cdmx', label: 'Flores para cumpleaños' },
      ]}
    />
  )
}
