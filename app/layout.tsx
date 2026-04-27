import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CUSI | Dia de las Madres 2026 | Floreria premium CDMX',
  description:
    'Coleccion especial 10 de mayo: flores para el Dia de las Madres, arreglos florales premium y entrega de flores en CDMX por CUSI Flores.',
  keywords: [
    'floreria premium CDMX',
    'flores para el Dia de las Madres',
    'arreglos florales 10 de mayo',
    'ramos para mama CDMX',
    'entrega de flores CDMX',
    'CUSI Flores',
  ],
  openGraph: {
    title: 'CUSI | Coleccion 10 de mayo 2026',
    description:
      'Landing premium para pedidos de flores del Dia de las Madres en CDMX. WhatsApp directo y entregas programadas.',
    type: 'website',
  },
  alternates: {
    canonical: '/',
    languages: {
      es: '/',
      en: '/en',
      fr: '/fr',
      it: '/it',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  )
}
