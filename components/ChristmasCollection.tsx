'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { ChristmasProduct } from '../lib/christmas'

const copy = {
  es: {
    eyebrow: 'Colección de Navidad', heading: 'La Navidad florece en casa.',
    intro: 'El rojo de las nochebuenas, el encanto de celebrar juntos. Un detalle CUSI para vestir tus fiestas.',
    size: 'Elige tu tamaño', height: 'alto', diameter: 'diámetro', selected: 'Tu selección',
    order: 'Pedir por WhatsApp', note: 'Confirma disponibilidad y entrega por WhatsApp.',
    unavailable: 'Consulta nuestra colección de Navidad por WhatsApp.',
    description: '',
    names: { 'E Gde': 'Extra grande', Gde: 'Grande', Med: 'Mediano', Ch: 'Chico' },
    message: 'Hola CUSI FLORES, quiero pedir',
  },
  en: {
    eyebrow: 'Christmas collection', heading: 'Let Christmas bloom at home.',
    intro: 'Red poinsettias and the joy of celebrating together. A CUSI touch for the festive season.',
    size: 'Choose your size', height: 'height', diameter: 'diameter', selected: 'Your selection',
    order: 'Order on WhatsApp', note: 'Confirm availability and delivery on WhatsApp.',
    unavailable: 'Ask about our Christmas collection on WhatsApp.',
    description: 'Red poinsettias in a basket with a red bow and gold details. Available in four sizes for Christmas.',
    names: { 'E Gde': 'Extra large', Gde: 'Large', Med: 'Medium', Ch: 'Small' },
    message: 'Hello CUSI FLORES, I would like to order',
  },
  fr: {
    eyebrow: 'Collection de Noël', heading: 'Faites fleurir votre Noël.',
    intro: 'Le rouge des poinsettias, le plaisir de se retrouver. Une touche CUSI pour habiller vos fêtes.',
    size: 'Choisissez votre taille', height: 'hauteur', diameter: 'diamètre', selected: 'Votre sélection',
    order: 'Commander sur WhatsApp', note: 'Disponibilité et livraison à confirmer sur WhatsApp.',
    unavailable: 'Découvrez notre collection de Noël sur WhatsApp.',
    description: 'Poinsettias rouges en panier, avec un nœud rouge aux détails dorés. Quatre tailles pour célébrer Noël.',
    names: { 'E Gde': 'Très grand', Gde: 'Grand', Med: 'Moyen', Ch: 'Petit' },
    message: 'Bonjour CUSI FLORES, je souhaite commander',
  },
  it: {
    eyebrow: 'Collezione di Natale', heading: 'Il Natale fiorisce in casa.',
    intro: 'Il rosso delle stelle di Natale, la gioia di stare insieme. Un tocco CUSI per le tue feste.',
    size: 'Scegli la misura', height: 'altezza', diameter: 'diametro', selected: 'La tua scelta',
    order: 'Ordina su WhatsApp', note: 'Conferma disponibilità e consegna su WhatsApp.',
    unavailable: 'Scopri la nostra collezione di Natale su WhatsApp.',
    description: 'Stelle di Natale rosse in un cesto con fiocco rosso e dettagli dorati. Disponibile in quattro misure per Natale.',
    names: { 'E Gde': 'Extra grande', Gde: 'Grande', Med: 'Medio', Ch: 'Piccolo' },
    message: 'Ciao CUSI FLORES, vorrei ordinare',
  },
}

export default function ChristmasCollection({ product, locale = 'es' }: { product: ChristmasProduct | null; locale?: keyof typeof copy }) {
  const text = copy[locale]
  const [selectedCode, setSelectedCode] = useState('Ch')
  const selected = product?.sizes.find((size) => size.code === selectedCode) || product?.sizes[0]
  const price = (amount: number) => `${new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(amount)} MXN`
  const message = product && selected
    ? `${text.message} ${product.title}, ${selected.code} (${selected.height} cm ${text.height} × ${selected.diameter} cm ${text.diameter}), ${price(selected.price)}.`
    : `${text.message} flores de Navidad.`

  return (
    <section id="navidad" aria-labelledby="christmas-heading" className="scroll-mt-28 bg-[#123d30] py-14 text-white md:py-20">
      <div className="mx-auto w-[92%] max-w-7xl">
        <div className="mb-9 max-w-3xl md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ebd39d]">{text.eyebrow}</p>
          <h2 id="christmas-heading" className="mt-4 font-[var(--font-display)] text-4xl leading-tight md:text-6xl">{text.heading}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg">{text.intro}</p>
        </div>

        {product && selected ? (
          <article className="grid overflow-hidden rounded-[2rem] bg-white text-[#193b2f] lg:grid-cols-[1fr_1.05fr]">
            <div className="relative flex items-center justify-center border-b border-[#e4eae6] bg-white p-6 md:p-10 lg:border-b-0 lg:border-r">
              <Image src={product.image} alt={product.imageAlt} width={1026} height={1280} sizes="(min-width: 1024px) 45vw, 92vw" className="max-h-[650px] w-full object-contain" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a32c36]">CUSI · Navidad</p>
              <h3 className="mt-3 font-[var(--font-display)] text-3xl leading-tight md:text-4xl">{product.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#52645b]">{text.description || product.description}</p>

              <fieldset className="mt-7">
                <legend className="mb-3 text-base font-semibold">{text.size}</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.sizes.map((size) => (
                    <label key={size.code} className="relative cursor-pointer">
                      <input type="radio" name={`christmas-size-${locale}`} value={size.code} checked={selected.code === size.code} onChange={() => setSelectedCode(size.code)} className="peer sr-only" />
                      <span className="flex h-full flex-col rounded-xl border border-[#d6dfd9] p-4 transition hover:border-[#123d30] peer-checked:border-[#123d30] peer-checked:bg-[#edf4ef] peer-checked:shadow-[inset_0_0_0_1px_#123d30] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#123d30]">
                        <span className="flex items-center justify-between gap-2 text-base font-semibold">
                          <span>{text.names[size.code as keyof typeof text.names] || size.code}</span>
                          <span className="text-sm text-[#68786e]">{size.code}</span>
                        </span>
                        <span className="mt-1 text-sm leading-6 text-[#52645b]">{size.height} cm {text.height} × {size.diameter} cm {text.diameter}</span>
                        <span className="mt-2 text-base font-semibold">{price(size.price)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div aria-live="polite" aria-atomic="true" className="mt-7 flex flex-wrap items-end justify-between gap-2 border-t border-[#dce4de] pt-5">
                <span className="text-sm text-[#52645b]">{text.selected} · {selected.code}</span>
                <p className="font-[var(--font-display)] text-3xl font-semibold">{price(selected.price)}</p>
              </div>
              <a href={`https://wa.me/525521092665?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#a52b37] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#84202b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a52b37]">{text.order}</a>
              <p className="mt-3 text-center text-sm leading-6 text-[#52645b]">{text.note}</p>
            </div>
          </article>
        ) : (
          <a href={`https://wa.me/525521092665?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-white px-6 py-3 text-base font-semibold text-[#123d30]">{text.unavailable}</a>
        )}
      </div>
    </section>
  )
}
