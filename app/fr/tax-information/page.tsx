import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Politique de confidentialité', href: '/fr/privacy-policy' },
  { label: 'Informations fiscales', href: '/fr/tax-information' },
  { label: "Conditions d'utilisation", href: '/fr/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Informations fiscales | CUSI Flowers',
  description:
    'Informations fiscales de CUSI Flowers : facturation CFDI et confirmation des paiements.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/tax-information',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TaxInformationPageFr() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/fr" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/pago-de-impuestos" className="underline underline-offset-2 hover:opacity-75">ES</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/tax-information" className="underline underline-offset-2 hover:opacity-75">EN</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it/tax-information" className="underline underline-offset-2 hover:opacity-75">IT</a>
              <span className="text-[#b8a9a2]">|</span>
              <span>FR</span>
            </div>
            <a href="/fr" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Retour à l'accueil</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#94736a]">Informations fiscales</p>
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">Informations fiscales</h1>
          <p className="mt-4 text-base leading-8 text-[#5d4740]">
            CUSI respecte ses obligations fiscales conformément à la législation mexicaine. Cette section résume les exigences de facturation et la validation des paiements.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">1. Facturation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>Les factures CFDI sont émises à la demande du client.</li>
            <li>Pour facturer, nous avons besoin du RFC, de la raison sociale, du code postal fiscal et de l'usage CFDI.</li>
            <li>La demande doit être faite dans la période fiscale correspondante.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">2. Paiements</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>Une commande est confirmée après validation du paiement.</li>
            <li>Les moyens de paiement disponibles sont communiqués pendant la commande.</li>
            <li>Pour toute clarification, le client peut contacter l'équipe administrative.</li>
          </ul>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informations légales</p>
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
