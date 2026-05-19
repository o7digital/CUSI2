'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

const BRAND = {
  name: 'CUSI',
  city: 'Ciudad de Mexico',
  whatsappUrl: 'https://wa.me/525521092665?text=Hola%20CUSI%20FLORES%2C%20quiero%20hacer%20un%20pedido%20premium.',
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
  { title: 'Flores seleccionadas', text: 'Curaduria floral con foco en calidad, frescura y armonia visual.' },
  { title: 'Diseno con intencion', text: 'Cada arreglo se construye para comunicar emocion y elegancia.' },
  { title: 'Entrega cuidada', text: 'Atencion personalizada y entrega programada en zonas seleccionadas.' },
]

const occasions = [
  'Cumpleanos',
  'Aniversarios',
  'Nacimiento',
  'Pedidas especiales',
  'Eventos corporativos',
  'Luxury gifting',
]

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nuestros Arreglos', href: '#coleccion' },
  { label: 'Quienes Somos', href: '/quienes-somos' },
  { label: 'Contacto', href: '#contacto' },
]

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

const footerSeoText =
  'florería premium CDMX · flores premium a domicilio en CDMX · entrega de flores CDMX · arreglos florales CDMX · ramos de flores CDMX · Día de las Madres flores Lomas de Chapultepec CDMX · arreglos florales 10 de mayo Lomas de Chapultepec CDMX · flores para mamá CDMX · bouquets premium CDMX · orquídeas a domicilio CDMX · tulipanes en ramo Lomas de Chapultepec CDMX · tulipanes en cilindro Lomas de Chapultepec CDMX · rosas premium en ramo Lomas de Chapultepec CDMX · caja rosas amarillas Lomas de Chapultepec CDMX · arreglos para cumpleaños Lomas de Chapultepec CDMX · arreglos para aniversario Lomas de Chapultepec CDMX · regalos florales CDMX · florería Bosques de las Lomas · pedidos de flores por WhatsApp Lomas de Chapultepec CDMX · CUSI Flores Lomas de Chapultepec CDMX · flores 10 de Mayo para mamá CDMX · arreglos florales 10 de Mayo para mamá CDMX · ramos de flores 10 de Mayo para mamá CDMX · regalos florales 10 de Mayo para mamá CDMX · flores para mamá 10 de Mayo CDMX'

const ctaSoft =
  'inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white/20'

const handwrittenDescriptions: Record<string, string> = {
  'Caja Rosas Amarillas': '16 rosas en caja, alegria luminosa.',
  'Rosas Premium en Ramo': 'Ramo clasico de rosas, presencia elegante.',
  'Tulipanes en ramo': '2 docenas de tulipanes, frescura delicada.',
  'Tulipanes en cilindro': '4 decenas de tulipanes, diseno con altura.',
  'Indonesia Orquídea Phalenopsis': 'Orquidea premium con gesto refinado.',
  'Orquídea Phalenopsis En Escultura de Piedra': 'Escultura floral para espacios con caracter.',
  'Orquídea en cilindro d e vidrio': 'Orquidea en cilindro de vidrio, minimalismo botanico.',
  'Orquídea Phalenopsis 8 Varas': 'Composicion de 8 varas, impacto sofisticado.',
  'Orquídea Phalenopsis En Escultura de Piedra 3 varas': '3 varas en escultura, trazo artistico.',
  'Orquídea Phalenopsis En Cilindro de Cristal': 'Orquidea en cristal, elegancia atemporal.',
  'Orquídea Fiusha Phalenopsis': 'Fiusha vibrante para un detalle inolvidable.',
}

export default function CusiFloresMockup() {
  const [menuVisible, setMenuVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(null)
  const [products, setProducts] = useState<ProductCard[]>([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState<string | null>(null)
  const productsJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: products.slice(0, 12).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          image: product.image.startsWith('http') ? product.image : `https://www.cusiflores.com${product.image}`,
          description: handwrittenDescriptions[product.title] || product.desc,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'MXN',
            price: product.price.replace(/[^0-9.]/g, ''),
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    }),
    [products]
  )

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
        const response = await fetch(`/api/products?t=${Date.now()}`, { cache: 'no-store' })
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
          setProductsError('No pudimos cargar los productos por el momento. Intenta de nuevo en unos minutos.')
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

  useEffect(() => {
    if (!selectedProduct) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715] selection:bg-[#dcc1b7] selection:text-[#2b1a17]">
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${menuVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-auto mt-3 flex w-[94%] max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fffaf7]/85 px-4 py-3 shadow-[0_15px_45px_rgba(62,38,31,0.15)] backdrop-blur-xl md:mt-5 md:px-6">
          <a href="#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Florería premium CDMX</p>
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
              <span>ES</span>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en" className="underline underline-offset-2 hover:opacity-75">
                EN
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it" className="underline underline-offset-2 hover:opacity-75">
                IT
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/fr" className="underline underline-offset-2 hover:opacity-75">
                FR
              </a>
            </div>
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-[#2b1a17] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                {mobileMenuOpen ? <path fill="currentColor" d="M6.2 5.15 12 10.94l5.8-5.8L19.2 6.56 13.41 12l5.8 5.8-1.42 1.4-5.8-5.79-5.8 5.8-1.4-1.42 5.79-5.8-5.8-5.8z" /> : <path fill="currentColor" d="M3 6.75h18v1.5H3zm0 4.5h18v1.5H3zm0 4.5h18v1.5H3z" />}
              </svg>
            </button>

            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} hidden px-4 py-2 text-xs md:text-sm lg:inline-flex`}>
              Pedir ahora
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mx-auto mt-2 w-[94%] max-w-7xl rounded-3xl border border-[#e4d2c9] bg-[#fffaf7] p-4 shadow-[0_20px_45px_rgba(62,38,31,0.12)] lg:hidden">
            <nav className="flex flex-col gap-2 text-base text-[#3c2a25]">
              <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
                <span>ES</span>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/en" className="underline underline-offset-2 hover:opacity-75">
                  EN
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/it" className="underline underline-offset-2 hover:opacity-75">
                  IT
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/fr" className="underline underline-offset-2 hover:opacity-75">
                  FR
                </a>
              </div>
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#f7eee9]">
                  {item.label}
                </a>
              ))}
              <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className="mt-2 inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-5 py-2.5 text-sm font-medium text-white">
                Pedir ahora
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
                Flores que hablan por ti, incluso cuando las palabras no alcanzan
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-xl md:leading-8">
                Arreglos premium para celebrar, agradecer, acompanar y transformar cada gesto en una presencia inolvidable.
              </p>

              <p className="mt-4 inline-flex rounded-full bg-[#efe0d8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#60473f] md:text-sm">
                Agenda tu arreglo con atencion personalizada
              </p>

              <div className="mt-9 flex flex-wrap gap-3 md:gap-4">
                <a href="#pedidos" className={ctaSoft}>
                  Solicitar Arreglo
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
                {[
                  ['Entrega en CDMX', ''],
                  ['Diseño editorial', 'Composicion floral con lenguaje visual refinado'],
                  ['Atencion boutique', 'Experiencia calida, elegante y personalizada'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md md:rounded-[28px] md:p-5">
                    <p className="font-[var(--font-display)] text-base font-medium md:text-lg">{title}</p>
                    {desc ? <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal hidden h-[520px] overflow-hidden rounded-[2.2rem] border border-white/45 bg-white/65 p-8 shadow-[0_26px_65px_rgba(71,44,35,0.12)] backdrop-blur-md lg:flex lg:-translate-y-[2cm] lg:flex-col lg:justify-between">
              <p className="font-[var(--font-display)] text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Cada arreglo se disena con flores seleccionadas, equilibrio visual y una intencion clara: emocionar con elegancia.&rdquo;
              </p>
              <p className="-translate-y-[1.5cm] font-[var(--font-display)] text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Recomendamos confirmar tu pedido con anticipacion para cuidar cada detalle y programar la entrega en CDMX.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section id="coleccion" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-14">
          <div className="mb-8 md:mb-10">
            <p className="text-sm uppercase tracking-[0.24em] text-[#94736a] md:text-base">Nuestros Arreglos</p>
            <h2 className="mt-3 max-w-3xl text-[1.35rem] leading-tight [font-family:Arial,sans-serif] md:text-[2.295rem]">Composiciones florales para regalar belleza, calma y presencia.</h2>
            {productsLoading ? <p className="mt-3 text-sm text-[#6f5851]">Cargando productos...</p> : null}
            {productsError ? <p className="mt-3 text-sm text-[#6f5851]">{productsError}</p> : null}
          </div>

          <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <article key={item.title} className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#ead8cf] bg-[#fffdfa] shadow-[0_16px_42px_rgba(74,46,37,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(74,46,37,0.14)]">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(item)}
                  className="group relative flex h-52 items-center justify-center overflow-hidden bg-[#f7efea] px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8d6c62] focus-visible:ring-offset-2 md:h-56"
                  aria-label={`Ver imagen ampliada de ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={`Arreglo floral ${item.title} CUSI CDMX`}
                    className="h-full w-full scale-[1.2] object-contain transition duration-500 ease-out group-hover:scale-[1.36] group-focus-visible:scale-[1.36]"
                    loading="lazy"
                  />
                  <span className="pointer-events-none absolute inset-x-4 bottom-3 translate-y-2 rounded-full border border-white/60 bg-[#2b1a17]/70 px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-[0_10px_28px_rgba(43,26,23,0.18)] backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    Ver detalle
                  </span>
                </button>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="min-h-[3.4rem] text-[1.512rem] leading-[1.02] text-[#2a1c19] [font-family:var(--font-script)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                    {item.title}
                  </h3>
                  <p className="text-[1.08rem] leading-tight text-[#8d6c62] italic tracking-[0.01em] [font-family:Arial,sans-serif]">
                    {handwrittenDescriptions[item.title] || 'Diseno floral con sello CUSI.'}
                  </p>
                  {item.title === 'Caja Rosas Amarillas' ? <p className="text-sm font-medium text-[#664f48]">16 Rosas</p> : null}
                  {item.title === 'Tulipanes en ramo' ? <p className="text-sm font-medium text-[#664f48]">2 docenas</p> : null}
                  {item.title === 'Tulipanes en cilindro' ? <p className="text-sm font-medium text-[#664f48]">4 Decenas</p> : null}
                  <div className="mt-auto space-y-2">
                    <p className="text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-[#4e3a34]">{item.price}</p>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#c8ada3] bg-white px-6 py-2.5 text-sm font-semibold text-[#2e231f] transition duration-300 hover:border-[#b4988e] hover:bg-[#fff8f5]"
                    >
                      Comprar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!productsLoading && !products.length ? (
            <div className="mt-4 rounded-2xl border border-[#ead8cf] bg-[#fffdfa] p-5 text-sm text-[#6f5851]">
              No hay productos disponibles para mostrar en este momento.
            </div>
          ) : null}
        </section>

        {selectedProduct ? (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1e1210]/85 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada de ${selectedProduct.title}`}
            onClick={() => setSelectedProduct(null)}
          >
            <div className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-[#fffaf7] shadow-[0_32px_90px_rgba(0,0,0,0.42)]" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2b1a17] text-2xl leading-none text-white shadow-[0_12px_30px_rgba(43,26,23,0.28)] transition hover:bg-[#1d100e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b1a17]"
                aria-label="Cerrar imagen ampliada"
              >
                ×
              </button>
              <div className="flex min-h-0 flex-1 items-center justify-center bg-[#f4ebe5] p-4 md:p-8">
                <img src={selectedProduct.image} alt={`Arreglo floral ${selectedProduct.title} CUSI CDMX`} className="max-h-[68svh] w-full object-contain" />
              </div>
              <div className="border-t border-[#ead8cf] bg-[#fffdfa] p-5 md:flex md:items-center md:justify-between md:gap-6">
                <div>
                  <h3 className="[font-family:var(--font-script)] text-3xl leading-tight text-[#2a1c19] md:text-4xl">{selectedProduct.title}</h3>
                  <p className="mt-1 text-sm italic text-[#8d6c62]">{handwrittenDescriptions[selectedProduct.title] || selectedProduct.desc}</p>
                </div>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#4e3a34] md:mt-0">{selectedProduct.price}</p>
              </div>
            </div>
          </div>
        ) : null}

        <section id="ocasiones" className="scroll-mt-32 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-[92%] max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative h-[460px] overflow-hidden rounded-[2.4rem] shadow-[0_30px_90px_rgba(83,48,37,0.12)] md:h-[560px]">
              <Image src={images.occasions} alt="Arreglo floral premium para ocasiones especiales en CDMX" fill className="object-cover scale-[0.7]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Momentos especiales</p>
              <h2 className="mt-4 [font-family:var(--font-script)] text-[1.6875rem] leading-tight md:text-[2.8125rem]">
                Para cada ocasion, una propuesta floral fina y elegante.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5c4842]">
                Desde un detalle romantico hasta una ambientacion boutique, cada arreglo busca transmitir emocion, belleza y un lujo sutil pero evidente.
              </p>
            </div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-[92%] max-w-7xl scroll-mt-32 py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div className="rounded-[2.2rem] bg-[#2b1a17] p-8 text-white shadow-[0_30px_80px_rgba(43,29,26,0.24)] md:p-12">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d8b8ab]">Eventos & decoracion floral</p>
              <h2 className="mt-4 max-w-xl text-3xl leading-tight md:text-5xl">
                Eventos con diseño floral de nivel boutique.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">
                Cenas privadas, hoteles boutique, bodas intimas, gifts corporativos y experiencias especiales.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
                <a href="#contacto" className="inline-flex items-center justify-center rounded-full bg-[#f2ddd4] px-6 py-3 text-sm font-medium text-[#2b1a17] transition duration-300 hover:-translate-y-0.5 hover:bg-[#edd2c6]">
                  Cotizar evento floral
                </a>
                <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition duration-300 hover:bg-white/10">
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[2rem]">
                <Image src={images.events} alt="Decoracion floral premium para eventos en CDMX" width={1200} height={600} className="h-72 w-full object-cover" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.8rem] bg-white p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="text-3xl">Same day</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Respuesta agil para pedidos premium y arreglos de ocasion especial.</p>
                </article>
                <article className="rounded-[1.8rem] bg-[#efe2da] p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="text-3xl">CDMX</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Cobertura selectiva con enfoque boutique y experiencia cuidada.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[92%] max-w-7xl py-6 md:py-10">
          <div className="rounded-[2rem] border border-[#e4d2c9] bg-white p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Experiencia CUSI</p>
            <h2 className="mt-3 [font-family:var(--font-script)] text-[1.6875rem] leading-tight md:text-[2.8125rem]">Un detalle que Mama no olvidara.</h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#5d4740]">
              Cada arreglo CUSI esta pensado como una experiencia: flores seleccionadas, composicion cuidada, presentacion elegante y atencion personalizada para que tu regalo llegue con intencion y belleza.
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
            <h2 className="text-3xl leading-tight md:text-5xl">Requisitos para entrega de tu Arreglo</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                'Arreglo',
                'Copia ficha de Transferencia',
              ].map((step) => (
                <p key={step} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
                  {step}
                </p>
              ))}
            </div>

            <form action="https://formspree.io/f/xqewoabn" method="POST" encType="multipart/form-data" className="mt-7 grid gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="comprobante_transferencia_pdf" className="mb-2 block text-sm font-medium text-white/90">
                  Copia ficha de Transferencia (PDF) * Campo Obligatorio
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
              <input type="text" name="nombre" required placeholder="Nombre de quien hace el pedido" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="para_quien" required placeholder="Para quien es el arreglo" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="que_debe_decir_el_sobre" placeholder="Que debe decir el sobre" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="texto_tarjeta" required placeholder="Texto de la tarjeta" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="quien_firma" required placeholder="Quien firma" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <input type="text" name="direccion_entrega" required placeholder="Direccion completa de entrega * Campo Obligatorio" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45 md:col-span-2" />
              <input type="tel" name="telefono_entrega" required placeholder="Telefono de contacto para la entrega" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45" />
              <div>
                <label htmlFor="dia_entrega" className="mb-2 block text-sm font-medium text-white/90">
                  Fecha de entrega
                </label>
                <input id="dia_entrega" type="date" name="dia_entrega" required className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-0 focus:border-white/45" />
              </div>
              <textarea name="mensaje" placeholder="Detalles adicionales del pedido" rows={3} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/65 outline-none ring-0 focus:border-white/45 md:col-span-2" />
              <input type="hidden" name="_subject" value="Nuevo pedido CUSI" />
              <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1] md:col-span-2 md:justify-self-start">
                Enviar pedido
              </button>
            </form>

            <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-white/80 md:text-sm">
              <li>Despues de 5 km de Bosques de las Lomas habra un cargo por envio con taxi de confianza, que se anade al precio del arreglo.</li>
            </ul>

          </div>
        </section>

        <section id="contacto" className="scroll-mt-32" />

        <section className="mx-auto w-[92%] max-w-7xl py-10 md:py-14">
          <div className="rounded-[2rem] border border-[#e4d2c9] bg-white p-6 md:p-10">
            <h2 className="text-3xl leading-tight md:text-5xl">Florería en CDMX: entrega, zonas y tiempos</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[#5d4740]">
              Atendemos pedidos en Ciudad de México y zona metropolitana con cobertura selectiva. Gestionamos entregas programadas, arreglos para cumpleaños, aniversario, nacimientos y eventos corporativos.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
              <li>Zonas frecuentes: Bosques de las Lomas, Polanco, Lomas, Santa Fe, Roma, Condesa y zonas cercanas.</li>
              <li>Tiempo de respuesta: confirmación por WhatsApp y validación de disponibilidad el mismo día.</li>
              <li>Entrega: costo final segun distancia, horario y tipo de arreglo.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-10 bg-[#1f2024] text-white">
        <div className="mx-auto w-[92%] max-w-7xl py-14 md:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            <a href="#coleccion" className="group relative block min-h-[180px] overflow-hidden rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30">
              <span className="text-3xl font-light tracking-wide text-white/95">COLECCION</span>
              <span className="mt-3 block text-sm text-white/70">Arreglos premium y temporada</span>
            </a>
            <a href="#pedido" className="group relative block min-h-[180px] overflow-hidden rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30">
              <span className="text-3xl font-light tracking-wide text-white/95">PEDIDOS</span>
              <span className="mt-3 block text-sm text-white/70">Cotiza y confirma por WhatsApp</span>
            </a>
            <a href="#contacto" className="group relative block min-h-[180px] overflow-hidden rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30">
              <span className="text-3xl font-light tracking-wide text-white/95">CONTACTO</span>
              <span className="mt-3 block text-sm text-white/70">Atencion personalizada en CDMX</span>
            </a>
          </div>

          <div className="mt-12 border-t border-white/15 pt-10 text-center">
            <p className="text-4xl text-[#b99657] md:text-6xl">Haz tu Pedido</p>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-7 inline-flex min-h-[58px] min-w-[320px] items-center justify-center rounded-sm bg-[#b99657] px-8 text-sm font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-[#a7864d]"
            >
              Haz tu pedido por WhatsApp ahora
            </a>
          </div>
        </div>

        <div className="bg-black py-6">
          <div className="mx-auto flex w-[92%] max-w-7xl flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/90">
              <p>© Copyright 2026 CUSI Flores |</p>
              <div className="flex items-center gap-3">
                <a href="/aviso-de-privacidad" className="transition hover:text-white">Aviso de Privacidad</a>
                <a href="/pago-de-impuestos" className="transition hover:text-white">Pago de Impuestos</a>
                <a href="/condiciones-generales-de-uso" className="transition hover:text-white">Condiciones de Uso</a>
                <a href="/flores-lomas-de-chapultepec" className="transition hover:text-white">Lomas de Chapultepec</a>
                <a href="/flores-bosques-de-las-lomas" className="transition hover:text-white">Bosques de las Lomas</a>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram CUSI" className="transition hover:opacity-80">Instagram</a>
              </div>
            </div>
            <div className="mx-auto mt-5 max-w-[1200px] border-t border-white/10 px-5 pt-5 text-center text-[12px] leading-[1.8] text-white/65">
              {footerSeoText}
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2e231f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(46,35,31,0.35)]">
          Pedir por WhatsApp
        </a>
      </div>
      <div className="fixed bottom-4 left-4 z-50">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-xs font-semibold text-[#2e231f] shadow-[0_10px_25px_rgba(46,35,31,0.2)]">
          <span>ES</span>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/en" className="underline underline-offset-2 hover:opacity-75">
            EN
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/it" className="underline underline-offset-2 hover:opacity-75">
            IT
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/fr" className="underline underline-offset-2 hover:opacity-75">
            FR
          </a>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }} />
    </div>
  )
}
