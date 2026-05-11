import type { Metadata } from 'next'
import LocaleHtmlLang from '../../components/LocaleHtmlLang'

export const metadata: Metadata = {
  openGraph: { locale: 'it_IT' },
  other: { 'Content-Language': 'it' },
}

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleHtmlLang lang="it" />
      {children}
    </>
  )
}
