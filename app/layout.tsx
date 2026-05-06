import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Dancing_Script, Manrope } from 'next/font/google'
import Script from 'next/script'

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

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cusiflores.com'),
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
    url: 'https://www.cusiflores.com/',
    siteName: 'CUSI Flores',
    locale: 'es_MX',
    images: [
      {
        url: '/cusi-logo.webp',
        width: 1200,
        height: 630,
        alt: 'CUSI Flores',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CUSI | Coleccion 10 de mayo 2026',
    description:
      'Arreglos florales premium y entrega de flores en CDMX. Pedidos por WhatsApp.',
    images: ['/cusi-logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CUSI Flores',
    url: 'https://www.cusiflores.com',
    logo: 'https://www.cusiflores.com/cusi-logo.webp',
    sameAs: ['https://instagram.com/cusiflores'],
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: 'CUSI Flores',
    image: 'https://www.cusiflores.com/cusi-logo.webp',
    url: 'https://www.cusiflores.com',
    telephone: '+52 55 2109 2665',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad de Mexico',
      addressRegion: 'CDMX',
      addressCountry: 'MX',
    },
    areaServed: 'Ciudad de Mexico',
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CUSI Flores',
    url: 'https://www.cusiflores.com',
    inLanguage: ['es-MX', 'en', 'it', 'fr'],
  }
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'CUSI Flores',
    url: 'https://www.cusiflores.com',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios florales en CDMX',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entrega de flores en CDMX' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Arreglos florales premium' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ramos para Dia de las Madres' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pedidos por WhatsApp' } },
      ],
    },
  }

  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cormorant.variable} ${dancingScript.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5NB55HC1FZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5NB55HC1FZ');
          `}
        </Script>
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="services-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
