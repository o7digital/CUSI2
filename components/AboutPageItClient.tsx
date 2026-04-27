'use client'

import { useEffect, useState } from 'react'

const BRAND = {
  name: 'CUSI',
  city: 'Mexico City',
  whatsappUrl: 'https://wa.me/5215512345678?text=Ciao%20CUSI%20FLOWERS%2C%20vorrei%20fare%20un%20ordine%20premium.',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const navLinks = [
  { label: 'Home', href: '/it/#inicio' },
  { label: 'Collezione Festa della Mamma', href: '/it/#coleccion' },
  { label: 'Chi siamo', href: '/it/about' },
  { label: 'Contatto', href: '/it/#contacto' },
]

const footerSeoKeywords = [
  'fioreria a cdmx bosques de las lomas cdmx',
  'fioreria premium cdmx bosques de las lomas cdmx',
  'consegna fiori cdmx bosques de las lomas cdmx',
  'composizioni floreali cdmx bosques de las lomas cdmx',
  'bouquet di fiori cdmx bosques de las lomas cdmx',
  'fiori per la mamma bosques de las lomas cdmx',
  'fiori festa della mamma bosques de las lomas cdmx',
  'composizioni festa della mamma bosques de las lomas cdmx',
  'regali festa della mamma bosques de las lomas cdmx',
  'fiori di compleanno bosques de las lomas cdmx',
  'bouquet anniversario bosques de las lomas cdmx',
  'consegna orchidee bosques de las lomas cdmx',
  'bouquet di tulipani bosques de las lomas cdmx',
  'scatola di rose gialle bosques de las lomas cdmx',
  'consegna rose rosse bosques de las lomas cdmx',
  'composizioni floreali eleganti bosques de las lomas cdmx',
  'fioreria bosques de las lomas cdmx',
  'fiori a citta del messico bosques de las lomas cdmx',
  'inviare fiori cdmx bosques de las lomas cdmx',
  'ordinare fiori su whatsapp bosques de las lomas cdmx',
]

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

export default function AboutPageItClient() {
  const [menuVisible, setMenuVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY < 40) {
        setMenuVisible(true)
      } else if (currentY > lastY) {
        setMenuVisible(false)
        setMobileMenuOpen(false)
      } else {
        setMenuVisible(true)
      }
      lastY = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715] selection:bg-[#dcc1b7] selection:text-[#2b1a17]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${menuVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto mt-3 flex w-[94%] max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fffaf7]/85 px-4 py-3 shadow-[0_15px_45px_rgba(62,38,31,0.15)] backdrop-blur-xl md:mt-5 md:px-6">
          <a href="/it/#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Studio floreale premium CDMX</p>
            <p className="truncate text-[1.3rem] tracking-[0.14em] text-[#2a1c19] md:text-[1.625rem]">{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-5 text-base text-[#3c2a25] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className={`transition duration-300 hover:opacity-60 ${item.label === 'Chi siamo' ? 'font-semibold' : ''}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/quienes-somos" className="underline underline-offset-2 hover:opacity-75">
                ES
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
                EN
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <span>IT</span>
            </div>
            <button
              type="button"
              aria-label="Apri menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-[#2b1a17] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {mobileMenuOpen ? <path fill="currentColor" d="M6.2 5.15 12 10.94l5.8-5.8L19.2 6.56 13.41 12l5.8 5.8-1.42 1.4-5.8-5.79-5.8 5.8-1.4-1.42 5.79-5.8-5.8-5.8z" /> : <path fill="currentColor" d="M3 6.75h18v1.5H3zm0 4.5h18v1.5H3zm0 4.5h18v1.5H3z" />}
              </svg>
            </button>

            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} hidden px-4 py-2 text-xs md:text-sm lg:inline-flex`}>
              Ordina ora
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mx-auto mt-2 w-[94%] max-w-7xl rounded-3xl border border-[#e4d2c9] bg-[#fffaf7] p-4 shadow-[0_20px_45px_rgba(62,38,31,0.12)] lg:hidden">
            <nav className="flex flex-col gap-2 text-base text-[#3c2a25]">
              <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
                <a href="/quienes-somos" className="underline underline-offset-2 hover:opacity-75">
                  ES
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
                  EN
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <span>IT</span>
              </div>
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`rounded-xl px-3 py-2 transition hover:bg-[#f7eee9] ${item.label === 'Chi siamo' ? 'font-semibold' : ''}`}>
                  {item.label}
                </a>
              ))}
              <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-5 py-2.5 text-sm font-medium text-white">
                Ordina ora
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-[92%] max-w-7xl space-y-8 py-28 md:space-y-10 md:py-36">
        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">La nostra essenza</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight text-[#2a1c19] md:text-6xl">Fiori con intenzione, bellezza e presenza.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d4740] md:text-xl">
            CUSI nasce come boutique floreale per chi desidera regalare piu di fiori: un'esperienza delicata, elegante e memorabile.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-white p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">Una boutique floreale contemporanea</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#5d4740]">
            <p>
              In CUSI crediamo che ogni composizione debba comunicare emozione. Il nostro lavoro combina fiori stagionali, composizione estetica, palette delicate e attenzione ai dettagli per creare pezzi floreali con identita propria.
            </p>
            <p>
              Ogni bouquet, box o composizione e progettato con intenzione: equilibrio di colori, texture e armonia visiva. Non cerchiamo composizioni ordinarie, ma dettagli floreali che risultino speciali fin dal primo istante.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">I nostri valori</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Design con intenzione</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Ogni composizione e pensata come un pezzo visivo: armonia, colore, texture e presenza.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Attenzione boutique</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Offriamo un'esperienza vicina, personalizzata e curata per ogni ordine.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Eleganza naturale</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Lavoriamo con un'estetica morbida e contemporanea, preservando freschezza ed eleganza naturale.</p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">La nostra missione</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              La nostra missione e trasformare ogni consegna floreale in un'esperienza memorabile. Vogliamo che ogni cliente senta di regalare bellezza, cura ed emozione con un servizio affidabile e una presentazione impeccabile.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">La nostra visione</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              Vogliamo posizionare CUSI come riferimento del design floreale premium a Citta del Messico, riconosciuto per stile delicato, attenzione personalizzata e capacita di creare momenti speciali attraverso i fiori.
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] bg-[#2a1d1a] p-7 text-white shadow-[0_28px_70px_rgba(42,29,26,0.34)] md:p-10">
          <h2 className="text-3xl leading-tight md:text-5xl">Vuoi creare una composizione speciale?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85">
            Raccontaci l'occasione, lo stile e il messaggio che vuoi trasmettere. CUSI puo aiutarti a progettare una proposta floreale personalizzata.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1]">
              Scrivici su WhatsApp
            </a>
            <a href="/it/#coleccion" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition duration-300 hover:bg-white/10">
              Vedi collezione
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto grid w-[92%] max-w-7xl gap-6 border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851] md:grid-cols-[220px_1fr_1.2fr_auto] md:items-start">
        <div>
          <img src="/cusi-logo.webp" alt="Logo CUSI" className="h-auto w-[220px] max-w-full" />
          <div className="h-3" aria-hidden="true" />
          <p>Studio floreale premium CDMX</p>
          <p>Collezione Festa della Mamma 2026</p>
        </div>

        <div className="text-[#b48700]">
          <p className="font-semibold">Telefoni di contatto</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li className="font-semibold">Ordini e preventivi: +52 55 2109 2665 / telefono alternativo +52 55 6157 9500</li>
            <li className="font-semibold">Stato ordine: +52 56 1923 2940</li>
            <li className="font-semibold">Emergenze: +52 55 5596 9871</li>
          </ul>
        </div>

        <div className="space-y-3 text-[#8a6a00]">
          <p className="font-semibold text-[#6f5851]">Informazioni di servizio</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ordini via WhatsApp con conferma telefonica.</li>
            <li>Consegna a domicilio a partire da $600 a CDMX e nell'area metropolitana.</li>
            <li>Supplemento per distanze superiori a 5 km da Bosques de las Lomas.</li>
            <li>Composizioni settimanali per case e uffici.</li>
            <li>Eventi di tutte le dimensioni.</li>
          </ul>
          <p className="pt-1 text-xs text-[#6f5851]">Gli ordini sono soggetti a disponibilita e zona di consegna.</p>
          <div className="pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informazioni legali</p>
            <div className="mt-2 flex flex-col gap-1.5 text-xs font-semibold text-[#6f5851]">
              <a href="/it/privacy-policy" className="underline underline-offset-2 transition hover:opacity-70">Informativa sulla privacy</a>
              <a href="/it/tax-information" className="underline underline-offset-2 transition hover:opacity-70">Informazioni fiscali</a>
              <a href="/it/terms-of-use" className="underline underline-offset-2 transition hover:opacity-70">Termini di utilizzo</a>
            </div>
          </div>
        </div>

        <div className="md:justify-self-end">
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram CUSI" className="inline-flex items-center justify-center rounded-full border border-[#d8c7be] p-3 transition hover:opacity-80">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-14 w-14">
              <defs>
                <linearGradient id="instagram-gradient-quienes" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff0033" />
                  <stop offset="45%" stopColor="#ff1744" />
                  <stop offset="75%" stopColor="#e1306c" />
                  <stop offset="100%" stopColor="#c2185b" />
                </linearGradient>
              </defs>
              <path fill="url(#instagram-gradient-quienes)" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.9 2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
            </svg>
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="mt-2 border-t border-[#e6d5cc] pt-5 text-[11px] leading-6 text-[#907972] md:text-xs">
            {footerSeoKeywords.join(' · ')}
          </p>
        </div>
      </footer>
      <div className="fixed bottom-4 left-4 z-50">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-xs font-semibold text-[#2e231f] shadow-[0_10px_25px_rgba(46,35,31,0.2)]">
          <a href="/quienes-somos" className="underline underline-offset-2 hover:opacity-75">
            ES
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
            EN
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <span>IT</span>
        </div>
      </div>
    </div>
  )
}
