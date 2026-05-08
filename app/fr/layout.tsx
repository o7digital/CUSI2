import type { Metadata } from 'next'

export const metadata: Metadata = {
  openGraph: { locale: 'fr_FR' },
  other: { 'Content-Language': 'fr' },
}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return children
}
