import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Privacy Policy', href: '/en/privacy-policy' },
  { label: 'Tax Information', href: '/en/tax-information' },
  { label: 'Terms of Use', href: '/en/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Terms of Use | CUSI Flowers',
  description:
    'General terms of use for CUSI Flowers website: orders, deliveries, availability, cancellations, and liability.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/terms-of-use',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/en" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/condiciones-generales-de-uso" className="underline underline-offset-2 hover:opacity-75">
                FR
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <span>EN</span>
            </div>
            <a href="/en" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Back to home</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Terms of Use</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Last update: April 2026</p>
          <p className="mt-4 text-base leading-8 text-[#5d4740]">
            By browsing this website, requesting information, or placing an order with CUSI, the user agrees to these Terms of Use.
          </p>
        </section>

        <section className="mt-6 space-y-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <article>
            <h2 className="text-2xl md:text-3xl">1. Website purpose</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              This website provides information about CUSI products, floral services, promotions, contact channels, and delivery options.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">2. Product availability</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Flower images are illustrative. Final arrangements may vary due to seasonality and stock availability.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">3. Orders and confirmations</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Orders are confirmed only after validating customer information, product availability, delivery conditions, and payment.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">4. Deliveries</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Deliveries are subject to area coverage, schedule availability, traffic, and complete delivery details provided by the customer.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">5. Contact</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Phone: +52 1 55 2109 2665</p>
            <p className="text-base leading-8 text-[#5d4740]">Email: contacto@cusiflores.com</p>
          </article>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Legal information</p>
        <div className="mt-2 flex flex-col gap-1.5 text-sm font-semibold">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="underline underline-offset-2 transition hover:opacity-70">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
