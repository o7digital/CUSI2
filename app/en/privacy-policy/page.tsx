import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Privacy Policy', href: '/en/privacy-policy' },
  { label: 'Tax Information', href: '/en/tax-information' },
  { label: 'Terms of Use', href: '/en/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Privacy Policy | CUSI Flowers',
  description:
    'CUSI Flowers Privacy Policy: personal data processing, purposes, data rights, and contact channels.',
  alternates: {
    canonical: 'https://www.cusiflores.com/en/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/en" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/aviso-de-privacidad" className="underline underline-offset-2 hover:opacity-75">
                FR
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <span>EN</span>
            </div>
            <a href="/en" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Back to home</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 text-[#2a1c19] md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Last update: April 2026</p>
          <p className="mt-5 text-base leading-8 text-[#4e3a34]">
            This Privacy Policy explains how CUSI collects, uses, protects, and shares personal data when you contact us, place an order, or use this website.
          </p>
        </section>

        <section className="mt-6 space-y-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <article>
            <h2 className="text-2xl md:text-3xl">1. Data Controller</h2>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">
              CUSI (RFC: CUGC470830RU2), located at C. Monte Carpatos 990 Int. 2, Colonia Lomas Virreyes, C.P. 11000, Mexico City, Mexico.
            </p>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">Email: contacto@cusiflores.com</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">2. Data We May Collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
              <li>Full name, phone number, email</li>
              <li>Delivery address and order details</li>
              <li>Billing information when invoicing is requested</li>
              <li>Messages provided through forms, WhatsApp, social networks, or email</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">3. Purposes of Processing</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
              <li>Reply to inquiries and quotations</li>
              <li>Process orders and coordinate deliveries</li>
              <li>Confirm payments and issue invoices</li>
              <li>Provide customer support and follow-up</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">4. Data Rights</h2>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">
              You may request access, correction, cancellation, or objection regarding your personal data by emailing contacto@cusiflores.com.
            </p>
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
