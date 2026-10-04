'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const labels = {
  es: { open: 'Ver detalle', close: 'Cerrar', zoom: 'Acercar', reset: 'Alejar' },
  fr: { open: 'Voir en grand', close: 'Fermer', zoom: 'Zoomer', reset: 'Dézoomer' },
  en: { open: 'View details', close: 'Close', zoom: 'Zoom in', reset: 'Zoom out' },
  it: { open: 'Ingrandisci', close: 'Chiudi', zoom: 'Zoom avanti', reset: 'Zoom indietro' },
}

export default function ProductImageViewer({ image, title, locale = 'es' }: {
  image: string; title: string; locale?: keyof typeof labels
}) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const text = labels[locale]

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
      trigger.current?.focus()
    }
  }, [open])

  function close() { setOpen(false); setZoom(false) }

  return <>
    <button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label={`${text.open}: ${title}`}
      className="group relative flex h-52 w-full cursor-zoom-in items-center justify-center overflow-hidden bg-[#f7efea] px-4 py-3 focus-visible:ring-2 focus-visible:ring-[#8d6c62] md:h-56">
      <Image src={image} alt={title} fill sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 92vw"
        className="h-full w-full scale-[1.2] object-contain transition duration-300 group-hover:scale-[1.3]" />
      <span className="absolute bottom-3 right-3 rounded-full bg-[#2b1a17]/80 px-3 py-1.5 text-xs text-white">{text.open} ↗</span>
    </button>
    {open && createPortal(
      <dialog ref={dialog} aria-label={`${text.open}: ${title}`} onCancel={close}
        onClick={event => { if (event.target === event.currentTarget) close() }}
        className="fixed inset-0 m-auto h-[90svh] max-h-none w-[94vw] max-w-5xl overflow-hidden rounded-2xl bg-[#fffaf7] p-0 text-[#2a1c19] backdrop:bg-black/80">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-[#ead8cf] p-3">
            <h2 className="truncate text-lg">{title}</h2>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => setZoom(!zoom)} aria-pressed={zoom} className="rounded-full border border-[#c8ada3] px-4 py-2">{zoom ? text.reset : text.zoom}</button>
              <button type="button" onClick={close} aria-label={text.close} className="rounded-full bg-[#2b1a17] px-4 py-2 text-white">×</button>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-auto bg-[#f4ebe5]">
            <button type="button" aria-label={zoom ? text.reset : text.zoom} onClick={() => setZoom(!zoom)}
              style={{ width: zoom ? '200%' : '100%', height: zoom ? '200%' : '100%' }}
              className={`relative block ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
              <Image src={image} alt={title} fill unoptimized sizes="100vw" className="object-contain" />
            </button>
          </div>
        </div>
      </dialog>, document.body
    )}
  </>
}
