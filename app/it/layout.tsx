import type { Metadata } from 'next'

export const metadata: Metadata = {
  openGraph: { locale: 'it_IT' },
  other: { 'Content-Language': 'it' },
}

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return children
}
