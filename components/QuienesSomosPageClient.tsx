'use client'

import { useEffect, useState } from 'react'

const BRAND = {
  name: 'CUSI',
  city: 'Ciudad de Mexico',
  whatsappUrl: 'https://wa.me/525521092665?text=Hola%20CUSI%20FLORES%2C%20quiero%20hacer%20un%20pedido%20premium.',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const navLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Coleccion 10 de mayo', href: '/#coleccion' },
  { label: 'Quienes Somos', href: '/quienes-somos' },
  { label: 'Contacto', href: '/#contacto' },
]

const footerSeoText =
  'florería premium CDMX · flores premium a domicilio en CDMX · entrega de flores CDMX · arreglos florales CDMX · ramos de flores CDMX · Día de las Madres flores Lomas de Chapultepec CDMX · arreglos florales 10 de mayo Lomas de Chapultepec CDMX · flores para mamá CDMX · bouquets premium CDMX · orquídeas a domicilio CDMX · tulipanes en ramo Lomas de Chapultepec CDMX · tulipanes en cilindro Lomas de Chapultepec CDMX · rosas premium en ramo Lomas de Chapultepec CDMX · caja rosas amarillas Lomas de Chapultepec CDMX · arreglos para cumpleaños Lomas de Chapultepec CDMX · arreglos para aniversario Lomas de Chapultepec CDMX · regalos florales CDMX · florería Bosques de las Lomas · pedidos de flores por WhatsApp Lomas de Chapultepec CDMX · CUSI Flores Lomas de Chapultepec CDMX · flores 10 de Mayo para mamá CDMX · arreglos florales 10 de Mayo para mamá CDMX · ramos de flores 10 de Mayo para mamá CDMX · regalos florales 10 de Mayo para mamá CDMX · flores para mamá 10 de Mayo CDMX'

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

export default function QuienesSomosPageClient() {
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
          <a href="/#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Floreria premium CDMX</p>
            <p className="truncate text-[1.3rem] tracking-[0.14em] text-[#2a1c19] md:text-[1.625rem]">{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-5 text-base text-[#3c2a25] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className={`transition duration-300 hover:opacity-60 ${item.label === 'Quienes Somos' ? 'font-semibold' : ''}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <span>ES</span>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
                EN
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">
                IT
              </a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/fr/about" className="underline underline-offset-2 hover:opacity-75">
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
                <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
                  EN
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">
                  IT
                </a>
                <span className="text-[#b8a9a2]">|</span>
                <a href="/fr/about" className="underline underline-offset-2 hover:opacity-75">
                  FR
                </a>
              </div>
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className={`rounded-xl px-3 py-2 transition hover:bg-[#f7eee9] ${item.label === 'Quienes Somos' ? 'font-semibold' : ''}`}>
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

      <main className="mx-auto w-[92%] max-w-7xl space-y-8 py-28 md:space-y-10 md:py-36">
        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Nuestra esencia</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight text-[#2a1c19] md:text-6xl">Flores con intencion, belleza y presencia.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d4740] md:text-xl">
            CUSI nace como una boutique floral pensada para quienes buscan regalar algo mas que flores: una experiencia delicada, elegante y memorable.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-white p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">Una boutique floral con sensibilidad contemporanea</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[#5d4740]">
            <p>
              En CUSI creemos que cada arreglo debe transmitir una emocion. Nuestro trabajo combina flores de temporada, composicion estetica, paletas suaves y una atencion cuidada para crear piezas florales con personalidad propia.
            </p>
            <p>
              Cada ramo, caja o arreglo se disena con intencion: cuidar el color, la textura, el equilibrio visual y la forma en que sera recibido. No buscamos hacer arreglos comunes, sino detalles florales que se sientan especiales desde el primer momento.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e4d2c9] bg-[#fffdfa] p-7 md:p-12">
          <h2 className="text-3xl leading-tight text-[#2a1c19] md:text-5xl">Nuestros valores</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Diseno con intencion</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Cada composicion se piensa como una pieza visual: armonia, color, textura y presencia.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Atencion boutique</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Ofrecemos una experiencia cercana, personalizada y cuidada para cada pedido.</p>
            </article>
            <article className="rounded-[1.5rem] border border-[#ead8cf] bg-white p-5">
              <h3 className="text-2xl text-[#2a1c19]">Elegancia natural</h3>
              <p className="mt-2 text-sm leading-7 text-[#664f48]">Trabajamos con una estetica suave, contemporanea y femenina, sin perder frescura ni naturalidad.</p>
            </article>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">Nuestra mision</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              Nuestra mision es convertir cada entrega floral en una experiencia memorable. Queremos que cada cliente sienta que esta regalando belleza, cuidado y emocion, con un servicio confiable y una presentacion impecable.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-[#e4d2c9] bg-white p-7 md:p-10">
            <h2 className="text-3xl text-[#2a1c19] md:text-4xl">Nuestra vision</h2>
            <p className="mt-4 text-base leading-8 text-[#5d4740]">
              Queremos posicionar a CUSI como una referencia de diseno floral premium en Ciudad de Mexico, reconocida por su estilo delicado, su atencion personalizada y su capacidad para crear momentos especiales a traves de las flores.
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] bg-[#2a1d1a] p-7 text-white shadow-[0_28px_70px_rgba(42,29,26,0.34)] md:p-10">
          <h2 className="text-3xl leading-tight md:text-5xl">Quieres crear un arreglo especial?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/85">
            Cuentanos la ocasion, el estilo y el mensaje que quieres transmitir. En CUSI podemos ayudarte a disenar una propuesta floral personalizada.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1]">
              Escribir por WhatsApp
            </a>
            <a href="/#coleccion" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition duration-300 hover:bg-white/10">
              Ver coleccion
            </a>
          </div>
        </section>
      </main>

            <footer className="mt-10 bg-[#1f2024] text-white">
        <div className="mx-auto w-[92%] max-w-7xl py-14 md:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            <a href="/#coleccion" className="group block min-h-[180px] rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30"><span className="text-3xl font-light tracking-wide text-white/95">COLECCION</span></a>
            <a href="/#pedido" className="group block min-h-[180px] rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30"><span className="text-3xl font-light tracking-wide text-white/95">PEDIDOS</span></a>
            <a href="/#contacto" className="group block min-h-[180px] rounded-md border border-white/10 bg-[#26272d] px-6 py-7 transition duration-300 hover:border-white/30"><span className="text-3xl font-light tracking-wide text-white/95">CONTACTO</span></a>
          </div>
          <div className="mt-12 border-t border-white/15 pt-10 text-center">
            <p className="text-4xl text-[#b99657] md:text-6xl">Haz tu Pedido</p>
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="mx-auto mt-7 inline-flex min-h-[58px] min-w-[320px] items-center justify-center rounded-sm bg-[#b99657] px-8 text-sm font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-[#a7864d]">Haz tu pedido por WhatsApp ahora</a>
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
              </div>
            </div>
            <div className="mx-auto mt-5 max-w-[1200px] border-t border-white/10 px-5 pt-5 text-center text-[12px] leading-[1.8] text-white/65">{footerSeoText}</div>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-4 left-4 z-50">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-2 text-xs font-semibold text-[#2e231f] shadow-[0_10px_25px_rgba(46,35,31,0.2)]">
          <span>ES</span>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/en/about" className="underline underline-offset-2 hover:opacity-75">
            EN
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/it/about" className="underline underline-offset-2 hover:opacity-75">
            IT
          </a>
          <span className="text-[#b8a9a2]">|</span>
          <a href="/fr/about" className="underline underline-offset-2 hover:opacity-75">
            FR
          </a>
        </div>
      </div>
    </div>
  )
}
