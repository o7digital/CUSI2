'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { ChristmasProduct } from '../lib/christmas'
import type { SiteContent, SiteCopy } from '../lib/studio'

const defaults = {
  es: { eyebrow: 'CUSI · Navidad', heading: 'Esta Navidad, regala vida.', body: '<p>Nochebuenas premium para llenar de color tu casa y celebrar con quienes más quieres.</p>', cta: 'Elegir mis Nochebuenas', delivery: 'Entregas del 25 nov. al 9 dic.', slogan: 'Después se acaban.', collection: 'Ver todos los arreglos', from: 'Desde', previous: 'Foto anterior', next: 'Siguiente foto', pause: 'Pausar fotos', play: 'Reproducir fotos' },
  en: { eyebrow: 'CUSI · Christmas', heading: 'A little life. A lot of Christmas.', body: '<p>Premium poinsettias to fill your home with colour and celebrate the people you love.</p>', cta: 'Choose my poinsettias', delivery: 'Delivery Nov 25 – Dec 9', slogan: 'After that, they’re gone.', collection: 'Explore all arrangements', from: 'From', previous: 'Previous photo', next: 'Next photo', pause: 'Pause photos', play: 'Play photos' },
  fr: { eyebrow: 'CUSI · Noël', heading: 'À Noël, offrez la vie.', body: '<p>Des poinsettias premium pour faire fleurir votre maison et célébrer ceux que vous aimez.</p>', cta: 'Choisir mes poinsettias', delivery: 'Livraisons du 25 nov. au 9 déc.', slogan: 'Après, il n’y en aura plus.', collection: 'Voir tous les arrangements', from: 'Dès', previous: 'Photo précédente', next: 'Photo suivante', pause: 'Pause des photos', play: 'Lire les photos' },
  it: { eyebrow: 'CUSI · Natale', heading: 'A Natale, regala la vita.', body: '<p>Stelle di Natale premium per colorare la tua casa e celebrare le persone che ami.</p>', cta: 'Scegli le mie stelle di Natale', delivery: 'Consegne dal 25 nov. al 9 dic.', slogan: 'Poi finiscono.', collection: 'Scopri tutte le composizioni', from: 'Da', previous: 'Foto precedente', next: 'Foto successiva', pause: 'Pausa foto', play: 'Riproduci foto' },
}

export default function HomeHero({ products, content, locale = 'es' }: { products: ChristmasProduct[]; content: SiteContent; locale?: keyof typeof defaults }) {
  const text = defaults[locale]
  const seasonal = products.map(product => ({ id: `wp-${product.id}`, image: product.image, alt: product.imageAlt, kind: 'christmas' as const, product_slug: product.slug }))
  const slides = content.slides.length ? content.slides : [...seasonal, ...['/orquidea.png', '/2.png', '/3.png', '/4.png'].map((image, i) => ({ id: `flowers-${i}`, image, alt: 'Arreglo floral CUSI', kind: 'flowers' as const, product_slug: '' }))]
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = slides[index % slides.length]
  const section = slide.kind === 'christmas' ? 'christmas_hero' : 'flowers_hero'
  const copy = content.copy.find(row => row.locale === locale && row.section === section)
  const product = products.find(row => row.slug === slide.product_slug)
  const price = product ? Math.min(...product.sizes.map(size => size.price)) : null
  const field = (key: keyof SiteCopy) => copy ? { 'data-cusi-copy': copy.id, 'data-cusi-field': key } : {}
  const move = (delta: number) => { setPaused(true); setIndex(value => (value + delta + slides.length) % slides.length) }

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % slides.length), 8500)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  return (
    <section aria-label={text.eyebrow} className="relative overflow-hidden bg-[#fffdf9] pt-32 text-[#193b2f] md:pt-40">
      <div className="mx-auto grid w-[92%] max-w-7xl items-center gap-4 pb-8 md:min-h-[660px] md:grid-cols-[1fr_1.1fr] md:gap-10 md:pb-12">
        <div className="relative z-10 pt-4 md:py-8">
          <p {...field('eyebrow')} className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a32c36]">{copy?.eyebrow || text.eyebrow}</p>
          <h1 {...field('heading')} className="mt-5 max-w-xl font-[var(--font-display)] text-[2.7rem] leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">{copy?.heading || text.heading}</h1>
          <div {...field('body')} data-cusi-rich="true" className="studio-rich mt-6 max-w-lg text-base leading-7 text-[#52645b] md:text-lg" dangerouslySetInnerHTML={{ __html: copy?.body || text.body }} />
          {slide.kind === 'christmas' && <div className="mt-6 border-l-2 border-[#a32c36] pl-4"><p {...field('delivery')} className="text-base font-semibold">{copy?.delivery || text.delivery}</p><p {...field('slogan')} className="mt-1 text-sm text-[#a32c36]">{copy?.slogan || text.slogan}</p></div>}
          <div className="mt-7 flex flex-wrap gap-3">
            <a {...field('cta')} href={slide.kind === 'christmas' ? `#${product?.slug || 'navidad'}` : '#coleccion'} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#a52b37] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#84202b]">{copy?.cta || text.cta}</a>
            <a href="#coleccion" className="inline-flex min-h-12 items-center justify-center px-2 py-3 text-sm font-medium underline underline-offset-4">{text.collection}</a>
          </div>
        </div>
        <div className="relative min-w-0">
          <div className="relative h-[340px] sm:h-[440px] md:h-[530px]">
            {slides.map((item, i) => <Image key={item.id} data-cusi-slide={item.id} src={item.image} alt={item.alt} fill priority={i === 0} sizes="(min-width: 768px) 52vw, 92vw" className={`object-contain transition-opacity duration-700 ${i === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />)}
          </div>
          <div aria-live="polite" className="mt-2 flex min-h-12 flex-wrap items-center justify-between gap-2 border-t border-[#dce4de] pt-4 text-sm">
            <span className="max-w-[70%]">{product?.title || slide.alt}</span>
            {price !== null && <span className="font-semibold">{text.from} {new Intl.NumberFormat('es-MX').format(price)} MXN</span>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center gap-3 border-t border-[#dce4de] py-5">
        <button onClick={() => move(-1)} aria-label={text.previous} className="h-10 w-10 rounded-full border border-[#cdd8d0] text-xl">‹</button>
        <div className="flex flex-wrap gap-2">{slides.map((item, i) => <button key={item.id} onClick={() => { setPaused(true); setIndex(i) }} aria-label={`${i + 1}: ${item.alt}`} aria-pressed={index === i} className={`h-10 w-10 overflow-hidden rounded-lg border-2 ${index === i ? 'border-[#a52b37]' : 'border-transparent'}`}><Image src={item.image} alt="" width={40} height={40} className="h-full w-full object-contain" /></button>)}</div>
        <button onClick={() => move(1)} aria-label={text.next} className="h-10 w-10 rounded-full border border-[#cdd8d0] text-xl">›</button>
        <button onClick={() => setPaused(value => !value)} aria-label={paused ? text.play : text.pause} className="ml-auto h-10 min-w-10 rounded-full border border-[#cdd8d0] px-3">{paused ? '▶' : 'Ⅱ'}</button>
      </div>
    </section>
  )
}
