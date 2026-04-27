import type { Metadata } from 'next'
import QuienesSomosPageClient from '../../components/QuienesSomosPageClient'

export const metadata: Metadata = {
  title: 'Quienes Somos | CUSI Flores',
  description:
    'Conoce a CUSI Flores: boutique floral premium en CDMX, enfocada en diseno floral elegante, atencion personalizada y entregas cuidadas.',
  alternates: {
    canonical: 'https://www.cusiflores.com/quienes-somos',
  },
  openGraph: {
    title: 'Quienes Somos | CUSI Flores',
    description:
      'Boutique floral premium en CDMX con arreglos de autor, servicio cercano y propuestas para ocasiones especiales.',
    url: 'https://www.cusiflores.com/quienes-somos',
    type: 'website',
  },
}

export default function QuienesSomosPage() {
  return <QuienesSomosPageClient />
}
