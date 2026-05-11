import type { Metadata } from 'next'
import LocaleHtmlLang from '../../components/LocaleHtmlLang'

export const metadata: Metadata = {
  openGraph: { locale: 'fr_FR' },
  other: { 'Content-Language': 'fr' },
}

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleHtmlLang lang="fr" />
      {children}
    </>
  )
}
