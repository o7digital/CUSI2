'use client'

import { useEffect, useState } from 'react'

const BRAND = {
  name: 'CUSI',
  city: 'Ville de Mexico',
  whatsappUrl: 'https://wa.me/5215512345678?text=Bonjour%20CUSI%20FLORES%2C%20je%20souhaite%20passer%20une%20commande%20premium.',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const images = {
  hero: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=2200&q=80',
  occasions: '/custom/hero-ocasiones.jpeg',
  events: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80',
}

const campaignImages = [
  '/mothers-day-2026/image-1-1.webp',
  '/mothers-day-2026/image-2-1.webp',
  '/mothers-day-2026/image-3-1.webp',
  '/mothers-day-2026/image-4-1.webp',
  '/mothers-day-2026/image-5-1.webp',
  '/mothers-day-2026/image-6-1.webp',
  '/mothers-day-2026/image-7-1.webp',
  '/mothers-day-2026/image-8-1.webp',
]

type ProductCard = {
  title: string
  desc: string
  price: string
  image: string
}

const emotionalPillars = [
  { title: 'Fleurs selectionnees', text: "Selection florale axee sur la qualite, la fraicheur et l'harmonie visuelle." },
  { title: 'Design intentionnel', text: 'Chaque composition est concue pour transmettre emotion et elegance.' },
  { title: 'Livraison soignee', text: 'Service personnalise et livraison planifiee dans des zones selectionnees.' },
]

const occasions = [
  'Anniversaires',
  'Anniversaires de couple',
  'Celebrations de naissance',
  'Demandes speciales',
  "Evenements d'entreprise",
  'Cadeaux de prestige',
]

const navLinks = [
  { label: 'Accueil', href: '#inicio' },
  { label: "Collection Fete des Meres", href: '#coleccion' },
  { label: 'A propos', href: '/fr/about' },
  { label: 'Contact', href: '#contacto' },
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

const ctaSoft =
  'inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white/20'

const handwrittenDescriptions: Record<string, string> = {
  'Caja Rosas Amarillas': '16 rosas en caja, alegria luminosa.',
  'Rosas Premium en Ramo': 'Ramo clasico de rosas, presencia elegante.',
  'Tulipanes en ramo': '2 dozen de tulipanes, frescura delicada.',
  'Tulipanes en cilindro': '4 decenas de tulipanes, diseno con altura.',
  'Indonesia Orquídea Phalenopsis': 'Orquidea premium con gesto refinado.',
  'Orquídea Phalenopsis En Escultura de Piedra': 'Escultura floral para espacios con caracter.',
  'Orquídea en cilindro d e vidrio': 'Orquidea en cilindro de vidrio, minimalismo botanico.',
  'Orquídea Phalenopsis 8 Varas': 'Composicion de 8 varas, impacto sofisticado.',
  'Orquídea Phalenopsis En Escultura de Piedra 3 varas': '3 varas en escultura, trazo artistico.',
  'Orquídea Phalenopsis En Cilindro de Cristal': 'Orquidea en cristal, elegancia atemporal.',
  'Orquídea Fiusha Phalenopsis': 'Fiusha vibrante para un detalle inolvidable.',
}

export default function CusiFloresFrPage() {
  const [menuVisible, setMenuVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [products, setProducts] = useState<ProductCard[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)

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

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error(`Products API failed with ${response.status}`)
        }

        const data = (await response.json()) as { products?: ProductCard[] }
        if (isMounted && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products)
          setProductsError(null)
        }
      } catch (error) {
        if (isMounted) {
          setProducts([])
          setProductsError("Impossible de charger les produits pour le moment. Reessayez dans quelques minutes.")
        }
        console.error(error)
      } finally {
        if (isMounted) {
          setProductsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715] selection:bg-[#dcc1b7] selection:text-[#2b1a17]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${menuVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto mt-3 flex w-[94%] max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fffaf7]/85 px-4 py-3 shadow-[0_15px_45px_rgba(62,38,31,0.15)] backdrop-blur-xl md:mt-5 md:px-6">
          <a href="#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Atelier floral premium CDMX</p>
            <p className="truncate text-[1.7rem] tracking-[0.14em] text-[#2a1c19] md:text-[2.1rem]">{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-5 text-base text-[#3c2a25] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition duration-300 hover:opacity-60">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/" className="underline underline-offset-2 hover:opacity-75">
                ES
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en" className="underline underline-offset-2 hover:opacity-75">
                EN
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it" className="underline underline-offset-2 hover:opacity-75">
                IT
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <span>FR</span>
            </div>
            <button
              type="button"
              aria-label="Ouvrir le menu"
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
                <a href="/" className="underline underline-offset-2 hover:opacity-75">
                  ES
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/en" className="underline underline-offset-2 hover:opacity-75">
                  EN
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/it" className="underline underline-offset-2 hover:opacity-75">
                  IT
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <span>FR</span>
              </div>
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#f7eee9]">
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

      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${images.hero}')` }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,17,15,0.88)_0%,rgba(28,17,15,0.58)_40%,rgba(28,17,15,0.2)_100%)]" />
          <div className="relative mx-auto grid min-h-[100svh] w-[92%] max-w-7xl items-center gap-8 pt-28 pb-20 md:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl font-[var(--font-sans)]">
              <h1 className="max-w-2xl [font-family:var(--font-script)] text-[1.55rem] leading-[0.98] text-white sm:text-[2.05rem] md:text-[3.05rem] xl:text-[60px]">
                Laissez les fleurs CUSI porter votre amour pour la Fete des Meres
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-xl md:leading-8">
                Collection speciale Fete des Meres 2026. Bouquets et compositions premium avec livraison dans des zones selectionnees de CDMX.
              </p>

              <p className="mt-4 inline-flex rounded-full bg-[#efe0d8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#60473f] md:text-sm">
                Planifiez votre commande avant le 5 mai
              </p>

              <div className="mt-9 flex flex-wrap gap-3 md:gap-4">
                <a href="#pedidos" className={ctaSoft}>
                  Demander un arrangement
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
                {[
                  ['Livraison a CDMX', ''],
                  ['Design editorial', 'Composition florale au langage visuel raffine'],
                  ['Service boutique', 'Une experience chaleureuse, elegante et personnalisee'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md md:rounded-[28px] md:p-5">
                    <p className="font-[var(--font-display)] text-base font-medium md:text-lg">{title}</p>
                    {desc ? <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal hidden h-[520px] overflow-hidden rounded-[2.2rem] border border-[#e4d1c7] bg-white/95 p-8 shadow-[0_26px_65px_rgba(71,44,35,0.15)] backdrop-blur-sm lg:flex lg:-translate-y-[2cm] lg:flex-col lg:justify-between">
              <p className="font-[var(--font-display)] text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Pour garantir la qualite des fleurs, les commandes doivent etre confirmees au moins 10 jours a l&rsquo;avance.&rdquo;
              </p>
              <p className="-translate-y-[1.5cm] font-[var(--font-display)] text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Les livraisons auront lieu les 7, 8 et 9 mai. Le 10 mai, les commandes seront acceptees uniquement de facon exceptionnelle, selon disponibilite.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section id="coleccion" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-14">
          <div className="mb-8 md:mb-10">
            <p className="text-sm uppercase tracking-[0.24em] text-[#94736a] md:text-base">Collection Fete des Meres</p>
            <h2 className="mt-3 max-w-3xl text-[1.35rem] leading-tight [font-family:Arial,sans-serif] md:text-[2.295rem]">Des compositions qui disent merci avec elegance et presence.</h2>
            {productsLoading ? <p className="mt-3 text-sm text-[#6f5851]">Chargement des produits...</p> : null}
            {productsError ? <p className="mt-3 text-sm text-[#6f5851]">{productsError}</p> : null}
          </div>

          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <article key={item.title} className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#ead8cf] bg-[#fffdfa] shadow-[0_16px_42px_rgba(74,46,37,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(74,46,37,0.14)]">
                <div className="flex h-52 items-center justify-center bg-[#f7efea] px-4 py-3 md:h-56">
                  <img src={item.image} alt={item.title} className="h-full w-full object-contain scale-[1.2]" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="min-h-[3.4rem] text-[1.89rem] leading-[1.02] text-[#2a1c19] [font-family:var(--font-script)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                    {item.title}
                  </h3>
                  <p className="text-[1.35rem] leading-tight text-[#8d6c62] italic tracking-[0.01em] [font-family:Arial,sans-serif]">
                    {handwrittenDescriptions[item.title] || 'Design floral signature CUSI.'}
                  </p>
                  {item.title === 'Caja Rosas Amarillas' ? <p className="text-sm font-medium text-[#664f48]">16 roses</p> : null}
                  {item.title === 'Tulipanes en ramo' ? <p className="text-sm font-medium text-[#664f48]">2 douzaines</p> : null}
                  {item.title === 'Tulipanes en cilindro' ? <p className="text-sm font-medium text-[#664f48]">40 tiges</p> : null}
                  <div className="mt-auto space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#4e3a34]">{item.price} + IVA</p>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#c8ada3] bg-white px-6 py-2.5 text-sm font-semibold text-[#2e231f] transition duration-300 hover:border-[#b4988e] hover:bg-[#fff8f5]"
                    >
                      Acheter
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!productsLoading && !products.length ? (
            <div className="mt-4 rounded-2xl border border-[#ead8cf] bg-[#fffdfa] p-5 text-sm text-[#6f5851]">
              Aucun produit n'est disponible pour le moment.
            </div>
          ) : null}
        </section>

        <section id="ocasiones" className="scroll-mt-32 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-[92%] max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative h-[460px] overflow-hidden rounded-[2.4rem] shadow-[0_30px_90px_rgba(83,48,37,0.12)] md:h-[560px]">
              <img src={images.occasions} alt="Premium floral arrangement" className="h-full w-full object-cover scale-[0.7]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Special moments</p>
              <h2 className="mt-4 [font-family:var(--font-script)] text-[1.6875rem] leading-tight md:text-[2.8125rem]">
                For every occasion, a refined and elegant floral proposal.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5c4842]">
                From a romantic detail to a boutique ambiance, each arrangement is crafted to convey emotion, beauty, and subtle luxury.
              </p>
            </div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-[92%] max-w-7xl scroll-mt-32 py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div className="rounded-[2.2rem] bg-[#2b1a17] p-8 text-white shadow-[0_30px_80px_rgba(43,29,26,0.24)] md:p-12">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d8b8ab]">Events & floral design</p>
              <h2 className="mt-4 max-w-xl text-3xl leading-tight md:text-5xl">
                Events with boutique-level floral design.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">
                Private dinners, boutique hotels, intimate weddings, corporate gifts, and special experiences.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
                <a href="#contacto" className="inline-flex items-center justify-center rounded-full bg-[#f2ddd4] px-6 py-3 text-sm font-medium text-[#2b1a17] transition duration-300 hover:-translate-y-0.5 hover:bg-[#edd2c6]">
                  Get event quote
                </a>
                <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition duration-300 hover:bg-white/10">
                  Order on WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[2rem]">
                <img src={images.events} alt="Evento floral premium" className="h-72 w-full object-cover" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.8rem] bg-white p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="text-3xl">Same day</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Fast response for premium orders and special-occasion arrangements.</p>
                </article>
                <article className="rounded-[1.8rem] bg-[#efe2da] p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="text-3xl">CDMX</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Selective coverage with a boutique approach and carefully curated experience.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[92%] max-w-7xl py-6 md:py-10">
          <div className="rounded-[2rem] border border-[#e4d2c9] bg-white p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">CUSI experience</p>
            <h2 className="mt-3 [font-family:var(--font-script)] text-[1.6875rem] leading-tight md:text-[2.8125rem]">A gift Mom will never forget.</h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#5d4740]">
              Each CUSI arrangement is conceived as an experience: selected flowers, careful composition, elegant presentation, and personalized attention so your gift arrives with intention and beauty.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {emotionalPillars.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-[#ead8cf] bg-[#fdf8f4] p-5">
                  <h3 className="text-xl text-[#2a1c19]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.65] text-[#664f48]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pedidos" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-12 md:py-16">
          <div className="rounded-[2rem] bg-[#2a1d1a] p-7 text-white shadow-[0_28px_70px_rgba(42,29,26,0.34)] md:p-10">
            <h2 className="text-3xl leading-tight md:text-5xl">Informations pour la livraison de votre arrangement</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                'Arrangement',
                'Copie du justificatif de virement',
              ].map((step) => (
                <p key={step} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
                  {step}
                </p>
              ))}
            </div>

            <form action="https://formspree.io/f/xqewoabn" method="POST" encType="multipart/form-data" className="mt-7 grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="comprobante_transferencia_pdf" className="mb-2 block text-sm font-medium text-white/90">
                  Copie du justificatif de virement (PDF) * Champ obligatoire
                </label>
                <input
                  id="comprobante_transferencia_pdf"
                  type="file"
                  name="comprobante_transferencia_pdf"
                  accept="application/pdf"
                  required
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-[#f4ddd2] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#2a1d1a] hover:file:bg-[#efcfc1]"
                />
              </div>
              <input type="text" name="nombre" required placeholder="Nom de la personne qui passe la commande" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="para_quien" required placeholder="Nom du destinataire" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="que_debe_decir_el_sobre" placeholder="Texte de l'enveloppe" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="texto_tarjeta" required placeholder="Message de la carte" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="quien_firma" required placeholder="Qui signe" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="direccion_entrega" required placeholder="Adresse complete de livraison * Champ obligatoire" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45 md:col-span-2" />
              <input type="tel" name="telefono_entrega" required placeholder="Telephone de contact pour la livraison" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <div>
                <label htmlFor="dia_entrega" className="mb-2 block text-sm font-medium text-white/90">
                  Date de livraison
                </label>
                <input id="dia_entrega" type="date" name="dia_entrega" required className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-0 focus:border-white/45" />
              </div>
              <textarea name="mensaje" placeholder="Details supplementaires de la commande" rows={3} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45 md:col-span-2" />
              <input type="hidden" name="_subject" value="Nouvelle commande CUSI" />
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1] md:col-span-2 md:justify-self-start">
                Envoyer la commande
              </button>
            </form>

            <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-white/80 md:text-sm">
              <li>Au-dela de 5 km de Bosques de las Lomas, des frais de coursier supplementaires s'ajoutent au prix de l'arrangement.</li>
            </ul>

          </div>
        </section>

        <section id="contacto" className="scroll-mt-32" />
      </main>

      <footer className="mx-auto grid w-[92%] max-w-7xl gap-6 border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851] md:grid-cols-[220px_1fr_1.2fr_auto] md:items-start">
        <div>
          <img src="/cusi-logo.webp" alt="Logo CUSI" className="h-auto w-[220px] max-w-full" />
          <div className="h-3" aria-hidden="true" />
          <p>Atelier floral premium CDMX</p>
          <p>Mother's Day collection 2026</p>
        </div>

        <div className="text-[#b48700]">
          <p className="font-semibold">Contact phone numbers</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li className="font-semibold">
              Orders and quotes:{' '}
              <a href="tel:+525521092665" className="underline underline-offset-2 hover:opacity-80">+52 55 2109 2665</a>
              {' / alternate phone '}
              <a href="tel:+525561579500" className="underline underline-offset-2 hover:opacity-80">+52 55 6157 9500</a>
            </li>
            <li className="font-semibold">
              Order status:{' '}
              <a href="tel:+525619232940" className="underline underline-offset-2 hover:opacity-80">+52 56 1923 2940</a>
            </li>
            <li className="font-semibold">
              Emergencies:{' '}
              <a href="tel:+525555969871" className="underline underline-offset-2 hover:opacity-80">+52 55 5596 9871</a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-[#8a6a00]">
          <p className="font-semibold text-[#6f5851]">Service information</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Orders via WhatsApp with phone confirmation.</li>
            <li>Home delivery starting at $600 in CDMX and the metropolitan area.</li>
            <li>Additional charge for distances over 5 km from Bosques de las Lomas.</li>
              <li>Weekly arrangements for homes and offices</li>
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
                <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff0033" />
                  <stop offset="45%" stopColor="#ff1744" />
                  <stop offset="75%" stopColor="#e1306c" />
                  <stop offset="100%" stopColor="#c2185b" />
                </linearGradient>
              </defs>
              <path fill="url(#instagram-gradient)" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.9 2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
            </svg>
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="mt-2 border-t border-[#e6d5cc] pt-5 text-[11px] leading-6 text-[#907972] md:text-xs">
            {footerSeoKeywords.join(' · ')}
          </p>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2e231f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(46,35,31,0.35)]">
          Order on WhatsApp
        </a>
      </div>
      <div className="fixed bottom-4 left-4 z-50">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-xs font-semibold text-[#2e231f] shadow-[0_10px_25px_rgba(46,35,31,0.2)]">
          <a href="/" className="underline underline-offset-2 hover:opacity-75">
            ES
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/en" className="underline underline-offset-2 hover:opacity-75">
            EN
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/it" className="underline underline-offset-2 hover:opacity-75">
            IT
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <span>FR</span>
        </div>
      </div>
    </div>
  )
}
