import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Privacy Policy', href: '/en/privacy-policy' },
  { label: 'Tax Information', href: '/en/tax-information' },
  { label: 'Terms of Use', href: '/en/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Tax Information | CUSI Flowers',
  description:
    'Tax information for CUSI Flowers: CFDI invoicing requirements and payment confirmation details.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/tax-information',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TaxInformationPage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/en" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/pago-de-impuestos" className="underline underline-offset-2 hover:opacity-75">
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
          <p className="text-xs uppercase tracking-[0.22em] text-[#94736a]">Tax information</p>
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">Tax Information</h1>
          <p className="mt-4 text-base leading-8 text-[#5d4740]">
            CUSI complies with its tax obligations under Mexican law. This section summarizes invoicing requirements and payment validation.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">1. Invoicing</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>CFDI invoices are issued when requested by the customer.</li>
            <li>To invoice, we require RFC, legal name, fiscal ZIP code, and CFDI usage.</li>
            <li>Invoice requests must be submitted within the applicable fiscal period.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">2. Payments</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>An order is confirmed once payment has been validated.</li>
            <li>Available payment methods are provided by CUSI during checkout.</li>
            <li>For clarifications, customers can contact our administrative team.</li>
          </ul>
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
