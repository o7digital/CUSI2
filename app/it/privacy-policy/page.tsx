import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Informativa sulla privacy', href: '/it/privacy-policy' },
  { label: 'Informazioni fiscali', href: '/it/tax-information' },
  { label: 'Termini di utilizzo', href: '/it/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Informativa sulla privacy | CUSI Flowers',
  description:
    'Informativa sulla privacy di CUSI Flowers: trattamento dei dati personali, finalita, diritti e canali di contatto.',
  alternates: {
    canonical: 'https://www.cusiflores.com/it/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPageIt() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/it" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/aviso-de-privacidad" className="underline underline-offset-2 hover:opacity-75">ES</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/privacy-policy" className="underline underline-offset-2 hover:opacity-75">EN</a>
              <span className="text-[#b8a9a2]">|</span>
              <span>IT</span>
            </div>
            <a href="/it" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Torna alla home</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 text-[#2a1c19] md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Informativa sulla privacy</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Ultimo aggiornamento: Aprile 2026</p>
          <p className="mt-5 text-base leading-8 text-[#4e3a34]">
            Questa informativa spiega come CUSI raccoglie, usa e protegge i dati personali quando ci contatti, effettui un ordine o utilizzi questo sito web.
          </p>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informazioni legali</p>
        <div className="mt-2 flex flex-col gap-1.5 text-sm font-semibold">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="underline underline-offset-2 transition hover:opacity-70">{link.label}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
