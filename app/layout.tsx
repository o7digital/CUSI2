import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CUSI FLORES',
  description: 'Floreria premium en CDMX',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
