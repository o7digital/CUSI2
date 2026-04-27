import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import HomePage from '../../components/HomePage'

const SUPPORTED_LANGS = ['es', 'en', 'fr', 'it'] as const

type Lang = (typeof SUPPORTED_LANGS)[number]

const metadataByLang: Record<Lang, Metadata> = {
  es: {
    title: 'CUSI | Dia de las Madres 2026 | Floreria premium CDMX',
    description: 'Coleccion especial 10 de mayo: arreglos florales premium y entrega en CDMX.',
  },
  en: {
    title: "CUSI | Mother's Day 2026 | Premium florist in CDMX",
    description: "Special May 10 collection: premium floral arrangements and delivery in CDMX.",
  },
  fr: {
    title: 'CUSI | Fete des Meres 2026 | Fleuriste premium a CDMX',
    description: 'Collection speciale du 10 mai: compositions florales premium et livraison a CDMX.',
  },
  it: {
    title: 'CUSI | Festa della Mamma 2026 | Fioreria premium a CDMX',
    description: 'Collezione speciale 10 maggio: composizioni floreali premium e consegna a CDMX.',
  },
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang.toLowerCase() as Lang
  if (!SUPPORTED_LANGS.includes(lang)) {
    return metadataByLang.es
  }
  const canonicalPath = lang === 'es' ? '/' : `/${lang}`
  return {
    ...metadataByLang[lang],
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: '/',
        en: '/en',
        fr: '/fr',
        it: '/it',
      },
    },
  }
}

export default function LocalizedPage({ params }: { params: { lang: string } }) {
  const lang = params.lang.toLowerCase()
  if (!SUPPORTED_LANGS.includes(lang as Lang)) {
    notFound()
  }
  return <HomePage lang={lang as Lang} />
}
