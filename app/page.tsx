import type { Metadata } from 'next'
import HomePage from '../components/HomePage'

export const metadata: Metadata = {
  title: 'CUSI | Flores premium a domicilio en CDMX',
  description:
    'Floreria premium en CDMX. Ramos y arreglos florales para Dia de las Madres, cumpleanos y eventos. Pedidos por WhatsApp y entrega programada.',
  alternates: {
    canonical: 'https://www.cusiflores.com/',
    languages: {
      'es-MX': 'https://www.cusiflores.com/',
      en: 'https://www.cusiflores.com/en',
      it: 'https://www.cusiflores.com/it',
      fr: 'https://www.cusiflores.com/fr',
      'x-default': 'https://www.cusiflores.com/',
    },
  },
  openGraph: {
    title: 'CUSI | Flores premium a domicilio en CDMX',
    description:
      'Ramos y arreglos florales premium en CDMX para ocasiones especiales. Cotiza y pide por WhatsApp.',
    url: 'https://www.cusiflores.com/',
    type: 'website',
  },
}

export default function Page() {
  return <HomePage />
}
