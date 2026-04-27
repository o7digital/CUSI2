'use client'

import { useEffect, useState } from 'react'

const BRAND = {
  name: 'CUSI',
  city: 'Ville de Mexico',
  whatsappUrl: 'https://wa.me/5215512345678?text=Bonjour%20CUSI%20FLORES%2C%20je%20souhaite%20passer%20une%20commande%20premium.',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const navLinks = [
  { label: 'Accueil', href: '/fr/#inicio' },
  { label: 'Collection Fete des Meres', href: '/fr/#coleccion' },
  { label: 'A propos', href: '/fr/about' },
  { label: 'Contact', href: '/fr/#contacto' },
]

const footerSeoKeywords = [
  'flower shop in cdmx bosques de las lomas cdmx',
  'premium flower shop cdmx bosques de las lomas cdmx',
  'flower delivery cdmx bosques de las lomas cdmx',
  'floral arrangements cdmx bosques de las lomas cdmx',
  'flower bouquets cdmx bosques de las lomas cdmx',
  'flowers for mom bosques de las lomas cdmx',
  "mother's day flowers bosques de las lomas cdmx",
  "mother's day arrangements bosques de las lomas cdmx",
  "mother's day gifts bosques de las lomas cdmx",
  'birthday flowers bosques de las lomas cdmx',
  'anniversary bouquets bosques de las lomas cdmx',
  'orchid delivery bosques de las lomas cdmx',
  'tulip bouquet bosques de las lomas cdmx',
  'yellow rose box bosques de las lomas cdmx',
  'red roses delivery bosques de las lomas cdmx',
  'elegant floral arrangements bosques de las lomas cdmx',
  'flower shop bosques de las lomas cdmx',
  'flowers in mexico city bosques de las lomas cdmx',
  'send flowers cdmx bosques de las lomas cdmx',
  'order flowers on whatsapp bosques de las lomas cdmx',
]

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

export default function AboutPageFrClient() {
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
          <a href="/fr/#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Premium flower studio CDMX</p>
            <p className="truncate text-[1.3rem] tracking-[0.14em] text-[#2a1c19] md:text-[1.625rem]">{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-5 text-base text-[#3c2a25] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className={`transition duration-300 hover:opacity-60 ${item.label === 'A propos' ? 'font-semibold' : ''}`}>
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
              <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">EN</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">IT</a>
              <span className="text-[#b8a9a2]">|</span>
              <span>FR</span>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-[#2b1a17] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {mobileMenuOpen ? <path fill="currentColor" d="M6.2 5.15 12 10.94l5.8-5.8L19.2 6.56 13.41 12l5.8 5.8-1.42 1.4-5.8-5.79-5.8 5.8-1.4-1.42 5.79-5.8-5.8-5.8z" /> : <path fill="currentColor" d="M3 6.75h18v1.5H3zm0 4.5h18v1.5H3zm0 4.5h18v1.5H3z" />}
              </svg>
            </button>

            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} hidden px-4 py-2 text-xs md:text-sm lg:inline-flex`}>
              Commander
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
                <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">EN</a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">IT</a>
                <span className="text-[#b8a9a2]">|</span>
                <span>FR</span>
              </div>
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`rounded-xl px-3 py-2 transition hover:bg-[#f7eee9] ${item.label === 'A propos' ? 'font-semibold' : ''}`}>
                  {item.label}
                </a>
              ))}
              <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-5 py-2.5 text-sm font-medium text-white">
                Commander
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-[92%] max-w-7xl space-y-8 py-28 md:space-y-10 md:py-36">
        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Our essence</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight text-[#2a1c19] md:text-6xl">Flowers with intention, beauty, and presence.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d4740] md:text-xl">
            CUSI was born as a floral boutique for people who want to gift more than flowers: a delicate, elegant, and memorable experience.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-white p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">A contemporary boutique floral studio</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#5d4740]">
            <p>
              At CUSI, we believe every arrangement should communicate emotion. Our work combines seasonal flowers, aesthetic composition, soft palettes, and careful attention to create floral pieces with a distinct identity.
            </p>
            <p>
              Each bouquet, box, or arrangement is intentionally designed by balancing color, texture, visual harmony, and the way it will be received. We do not aim for ordinary arrangements, but for floral details that feel special from the first moment.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">Our values</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Design with intention</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Each composition is designed as a visual piece: harmony, color, texture, and presence.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Boutique attention</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">We provide a close, personalized, and carefully curated experience for every order.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Natural elegance</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">We work with a soft, contemporary aesthetic while preserving freshness and natural elegance.</p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">Our mission</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              Our mission is to turn every floral delivery into a memorable experience. We want every customer to feel they are gifting beauty, care, and emotion with reliable service and impeccable presentation.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">Our vision</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              We aim to position CUSI as a premium floral design reference in Mexico City, recognized for delicate style, personalized attention, and the ability to create special moments through flowers.
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] bg-[#2a1d1a] p-7 text-white shadow-[0_28px_70px_rgba(42,29,26,0.34)] md:p-10">
          <h2 className="text-3xl leading-tight md:text-5xl">Want to create a special arrangement?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85">
            Tell us the occasion, style, and message you want to share. CUSI can help you design a personalized floral proposal.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1]">
              Write us on WhatsApp
            </a>
            <a href="/fr/#coleccion" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition duration-300 hover:bg-white/10">
              View collection
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto grid w-[92%] max-w-7xl gap-6 border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851] md:grid-cols-[220px_1fr_1.2fr_auto] md:items-start">
        <div>
          <img src="/cusi-logo.webp" alt="Logo CUSI" className="h-auto w-[220px] max-w-full" />
          <div className="h-3" aria-hidden="true" />
          <p>Premium flower studio CDMX</p>
          <p>Mother's Day collection 2026</p>
        </div>

        <div className="text-[#b48700]">
          <p className="font-semibold">Contact phone numbers</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li className="font-semibold">Orders and quotes: +52 55 2109 2665 / alternate phone +52 55 6157 9500</li>
            <li className="font-semibold">Order status: +52 56 1923 2940</li>
            <li className="font-semibold">Emergencies: +52 55 5596 9871</li>
          </ul>
        </div>

        <div className="space-y-3 text-[#8a6a00]">
          <p className="font-semibold text-[#6f5851]">Service information</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Orders via WhatsApp with phone confirmation.</li>
            <li>Home delivery starting at $600 in CDMX and the metropolitan area.</li>
            <li>Additional charge for distances over 5 km from Bosques de las Lomas.</li>
            <li>Weekly arrangements for homes and offices.</li>
            <li>Events of all sizes.</li>
          </ul>
          <p className="pt-1 text-xs text-[#6f5851]">Orders are subject to availability and delivery zone.</p>
          <div className="pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informations legales</p>
            <div className="mt-2 flex flex-col gap-1.5 text-xs font-semibold text-[#6f5851]">
              <a href="/fr/privacy-policy" className="underline underline-offset-2 transition hover:opacity-70">Politique de confidentialite</a>
              <a href="/fr/tax-information" className="underline underline-offset-2 transition hover:opacity-70">Informations fiscales</a>
              <a href="/fr/terms-of-use" className="underline underline-offset-2 transition hover:opacity-70">Conditions d'utilisation</a>
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
          <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">EN</a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">IT</a>
          <span className="text-[#b8a9a2]">|</span>
          <span>FR</span>
        </div>
      </div>
    </div>
  )
}
