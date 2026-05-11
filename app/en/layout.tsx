import type { Metadata } from 'next'
import LocaleHtmlLang from '../../components/LocaleHtmlLang'

export const metadata: Metadata = {
  openGraph: { locale: 'en_US' },
  other: { 'Content-Language': 'en' },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleHtmlLang lang="en" />
      {children}
    </>
  )
}
