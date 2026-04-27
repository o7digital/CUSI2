import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' },
  { label: 'Pago de Impuestos', href: '/pago-de-impuestos' },
  { label: 'Condiciones Generales de Uso', href: '/condiciones-generales-de-uso' },
]

export const metadata: Metadata = {
  title: 'Pago de Impuestos | CUSI Flores',
  description:
    'Informacion fiscal de CUSI Flores: facturacion CFDI, requisitos de datos fiscales y acreditacion de pagos.',
  alternates: {
    canonical: 'https://www.cusiflores.com/pago-de-impuestos',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PagoDeImpuestosPage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <span>FR</span>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/tax-information" className="underline underline-offset-2 hover:opacity-75">
                EN
              </a>
            </div>
            <a href="/" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Volver al inicio</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#94736a]">Informacion fiscal</p>
          <h1 className="mt-3 text-3xl leading-tight md:text-5xl">Pago de Impuestos</h1>
          <p className="mt-4 text-base leading-8 text-[#5d4740]">
            CUSI cumple con sus obligaciones fiscales conforme a la legislacion mexicana vigente. Esta seccion informa de manera clara como se realiza la emision de comprobantes fiscales y el tratamiento de datos necesarios para facturacion.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">1. Facturacion y comprobantes fiscales</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>Los precios publicados incluyen la informacion fiscal aplicable conforme al regimen vigente.</li>
            <li>La factura CFDI se emite cuando el cliente la solicita y proporciona sus datos completos.</li>
            <li>Para facturar, se requiere RFC, razon social, codigo postal fiscal y uso de CFDI.</li>
            <li>La solicitud de factura debe realizarse dentro del plazo fiscal correspondiente.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">2. Pagos y acreditacion</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
            <li>El pedido se considera confirmado una vez validado el pago correspondiente.</li>
            <li>Los pagos pueden realizarse por los medios habilitados por CUSI.</li>
            <li>Cuando aplique, se emitira el comprobante fiscal y/o recibo del servicio.</li>
            <li>En caso de aclaraciones, el cliente puede contactar directamente al area administrativa.</li>
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl">3. Datos fiscales de CUSI</h2>
          <div className="mt-4 rounded-2xl border border-[#ead8cf] bg-[#fdf8f4] p-5 text-base leading-8 text-[#5d4740]">
            <p className="font-semibold text-[#2a1c19]">CUSI</p>
            <p>RFC: CUGC470830RU2</p>
            <p>C. Monte Carpatos 990 Int. 2</p>
            <p>Colonia Lomas Virreyes</p>
            <p>C.P. 11000, Ciudad de Mexico, Mexico</p>
            <p>
              Telefono:{' '}
              <a href="tel:+525521092665" className="font-semibold underline underline-offset-2">
                +52 1 55 2109 2665
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informacion legal</p>
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
