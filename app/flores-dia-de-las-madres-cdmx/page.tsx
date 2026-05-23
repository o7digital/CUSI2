import type { Metadata } from 'next'
import SeoLandingPage from '../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Flores Dia de las Madres CDMX | 10 de Mayo | CUSI',
  description:
    'Flores para Dia de las Madres en CDMX. Arreglos florales premium, ramos, rosas, tulipanes y orquideas para el 10 de Mayo.',
  alternates: {
    canonical: 'https://www.cusiflores.com/flores-dia-de-las-madres-cdmx',
  },
}

export default function FloresDiaDeLasMadresCdmxPage() {
  return (
    <SeoLandingPage
      title="Flores para Dia de las Madres en CDMX"
      intro={[
        'CUSI Flores prepara arreglos florales premium para Dia de las Madres en CDMX. Para el 10 de Mayo, recomendamos pedir con anticipacion para asegurar disponibilidad de flor, horario de entrega y presentacion.',
        'Puedes solicitar ramos, rosas, tulipanes, orquideas y composiciones florales de temporada. Cada pedido se confirma por WhatsApp con datos de entrega y mensaje de tarjeta.',
      ]}
      sections={[
        {
          title: 'Arreglos para mama',
          body: 'Diseñamos arreglos elegantes para expresar cariño, gratitud y celebracion. La seleccion puede adaptarse a un estilo clasico, sobrio, colorido o sofisticado.',
        },
        {
          title: 'Pedidos anticipados para 10 de Mayo',
          body: 'Dia de las Madres es una fecha de alta demanda. Pedir con anticipacion permite coordinar mejor disponibilidad, horario y ruta de entrega.',
        },
        {
          title: 'Ramos, rosas, tulipanes y orquideas',
          body: 'La disponibilidad de flores cambia por temporada. Confirmamos opciones por WhatsApp antes de cerrar el pedido.',
        },
        {
          title: 'Entrega en CDMX',
          body: 'Atendemos zonas seleccionadas de CDMX con entrega programada y seguimiento directo por WhatsApp.',
        },
      ]}
      ctaText="Pedir flores para mama"
      whatsappText="Hola CUSI FLORES, quiero pedir flores para Dia de las Madres en CDMX."
      faq={[
        {
          question: 'Cuando debo pedir flores para Dia de las Madres?',
          answer: 'Recomendamos pedir con anticipacion, especialmente para el 10 de Mayo, por la alta demanda de flores y entregas.',
        },
        {
          question: 'Que arreglos recomiendan para mama?',
          answer: 'Ramos premium, cajas de rosas, tulipanes y orquideas son opciones frecuentes para Dia de las Madres.',
        },
        {
          question: 'Pueden incluir mensaje de tarjeta?',
          answer: 'Si. Coordinamos el texto de la tarjeta y la firma por WhatsApp.',
        },
      ]}
      relatedLinks={[
        { href: '/flores-a-domicilio-cdmx', label: 'Flores a domicilio CDMX' },
        { href: '/ramos-de-flores-cdmx', label: 'Ramos de flores CDMX' },
        { href: '/orquideas-a-domicilio-cdmx', label: 'Orquideas a domicilio' },
      ]}
    />
  )
}
