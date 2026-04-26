const BRAND = {
  name: 'CUSI FLORES',
  city: 'Ciudad de Mexico',
  whatsappUrl: 'https://wa.me/5215512345678?text=Hola%20CUSI%20FLORES%2C%20quiero%20hacer%20un%20pedido%20premium.',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const images = {
  hero: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=2200&q=80',
  occasions: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1600&q=80',
  events: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80',
}

const campaignImages = [
  '/mothers-day-2026/image-1-1.jpeg',
  '/mothers-day-2026/image-2-1.jpeg',
  '/mothers-day-2026/image-3-1.jpeg',
  '/mothers-day-2026/image-4-1.jpeg',
  '/mothers-day-2026/image-5-1.jpeg',
  '/mothers-day-2026/image-6-1.jpeg',
  '/mothers-day-2026/image-7-1.jpeg',
  '/mothers-day-2026/image-8-1.jpeg',
]

const products = [
  {
    title: 'Ramo Mama Signature',
    desc: 'Una composicion elegante para agradecer con presencia, suavidad y estilo boutique.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[0],
  },
  {
    title: 'Caja Floral Couture',
    desc: 'Flores seleccionadas en formato de lujo para un regalo memorable el 10 de mayo.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[1],
  },
  {
    title: 'Arreglo Amor de Mama',
    desc: 'Diseno con volumen armonico y tono emocional para celebrar a mama con intencion.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[2],
  },
  {
    title: 'Edicion Rosas Premium',
    desc: 'Rosas de presencia alta y acabados finos para una entrega premium en CDMX.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[3],
  },
  {
    title: 'Composicion Primavera',
    desc: 'Paleta fresca y femenina para regalar belleza con una lectura editorial.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[4],
  },
  {
    title: 'Diseno Personalizado',
    desc: 'Propuesta floral a medida segun estilo de mama, zona y horario de entrega.',
    price: 'Cotizar por WhatsApp',
    image: campaignImages[5],
  },
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
  { label: 'Coleccion 10 de mayo', href: '#coleccion' },
  { label: 'Catalogo', href: '#catalogo' },
  { label: 'Pedidos', href: '#pedidos' },
  { label: 'Contacto', href: '#contacto' },
]

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

const ctaSoft =
  'inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white/20'

export default function CusiFloresMockup() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715] selection:bg-[#dcc1b7] selection:text-[#2b1a17]">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex w-[94%] max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fffaf7]/85 px-4 py-3 shadow-[0_15px_45px_rgba(62,38,31,0.15)] backdrop-blur-xl md:mt-5 md:px-6">
          <a href="#inicio" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#94736a] md:text-[11px]">Floreria premium CDMX</p>
            <p className="truncate text-base tracking-[0.14em] text-[#2a1c19] md:text-xl">{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-[#3c2a25] lg:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition duration-300 hover:opacity-60">
                {item.label}
              </a>
            ))}
          </nav>

          <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} px-4 py-2 text-xs md:text-sm`}>
            Pedir ahora
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${images.hero}')` }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,17,15,0.88)_0%,rgba(28,17,15,0.58)_40%,rgba(28,17,15,0.2)_100%)]" />
          <div className="relative mx-auto grid min-h-[100svh] w-[92%] max-w-7xl items-center gap-8 pt-28 pb-20 md:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-md md:text-xs">
                Floreria premium en {BRAND.city}
              </div>

              <h1 className="max-w-2xl font-serif text-4xl leading-[0.98] text-white sm:text-5xl md:text-7xl xl:text-[92px]">
                Flores para mama con presencia, elegancia y emocion
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-xl md:leading-8">
                Coleccion especial Dia de las Madres 2026. Ramos y arreglos premium con entrega en zonas seleccionadas de CDMX.
              </p>

              <p className="mt-4 inline-flex rounded-full bg-[#efe0d8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#60473f] md:text-sm">
                Agenda tu pedido antes del 10 de mayo
              </p>

              <div className="mt-9 flex flex-wrap gap-3 md:gap-4">
                <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f2ddd4] px-7 py-3.5 text-sm font-medium text-[#2b1a17] shadow-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-[#edd2c6]">
                  Pedir ramo premium
                </a>
                <a href="#contacto" className={ctaSoft}>
                  Cotizar diseno personalizado
                </a>
              </div>

              <p className="mt-5 text-sm text-white/80">Pedidos por WhatsApp · Entrega premium · Atencion personalizada</p>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
                {[
                  ['Entrega premium', 'En zonas seleccionadas de CDMX'],
                  ['Diseno editorial', 'Composicion floral con lenguaje visual refinado'],
                  ['Atencion boutique', 'Experiencia calida, elegante y personalizada'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md md:rounded-[28px] md:p-5">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal hidden h-[520px] overflow-hidden rounded-[2.2rem] border border-[#e4d1c7] bg-white/95 p-8 shadow-[0_26px_65px_rgba(71,44,35,0.15)] backdrop-blur-sm lg:flex lg:-translate-y-[2cm] lg:flex-col lg:justify-between">
              <p className="text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Este ano para asegurar la calidad de nuestra flor nos requieren los Pedidos Confirmados 10 dias antes, Lunes 29 de Abril 9 pm&rdquo;
              </p>
              <p className="text-center text-3xl leading-[1.35] text-[#6a9448]">
                &ldquo;Todo se entregara el 7, 8 y 9 de mayo para conveniencia de todos y solo x excepcion el 10.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section id="coleccion" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-14">
          <div className="mb-8 md:mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Coleccion Dia de las Madres</p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-tight md:text-5xl">Arreglos disenados para decir gracias con flores, belleza y presencia.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[1.6rem] border border-[#ead8cf] bg-[#fffdfa] shadow-[0_16px_42px_rgba(74,46,37,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(74,46,37,0.14)]">
                <div className="h-64 bg-[#f4ebe6] md:h-72">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-2xl text-[#2a1c19]">{item.title}</h3>
                  <p className="text-sm leading-6 text-[#664f48]">{item.desc}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#4e3a34]">{item.price}</p>
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#c8ada3] bg-white px-6 py-3 text-sm font-semibold text-[#2e231f] transition duration-300 hover:border-[#b4988e] hover:bg-[#fff8f5]"
                  >
                    Pedir este arreglo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="ocasiones" className="scroll-mt-32 bg-white py-16 md:py-24">
          <div className="mx-auto grid w-[92%] max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative h-[460px] overflow-hidden rounded-[2.4rem] shadow-[0_30px_90px_rgba(83,48,37,0.12)] md:h-[560px]">
              <img src={images.occasions} alt="Arreglo floral premium" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-[1.5rem] bg-white/85 p-5 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.28em] text-[#9b766a]">Signature gifting</p>
                <p className="mt-2 font-serif text-2xl text-[#2b1a17]">Diseno floral con presencia</p>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Momentos especiales</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
                Para cada ocasion, una propuesta floral elegante y deseable.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5c4842]">
                Desde un detalle romantico hasta una ambientacion boutique, cada arreglo busca transmitir emocion, belleza y un lujo sutil pero evidente.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {occasions.map((item) => (
                  <p key={item} className="rounded-full border border-[#eadfd8] bg-[#faf6f3] px-5 py-3 text-sm text-[#3a2a26] transition duration-300 hover:bg-[#f4ebe6]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-[92%] max-w-7xl scroll-mt-32 py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <div className="rounded-[2.2rem] bg-[#2b1a17] p-8 text-white shadow-[0_30px_80px_rgba(43,29,26,0.24)] md:p-12">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d8b8ab]">Eventos & decoracion floral</p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight md:text-5xl">
                Eventos con direccion floral de nivel boutique.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80">
                Cenas privadas, hoteles boutique, bodas intimas, gifts corporativos y experiencias especiales. {BRAND.name} puede convertirse en una marca con lenguaje visual fuerte y muy aspiracional.
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
                <img src={images.events} alt="Evento floral premium" className="h-72 w-full object-cover" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-[1.8rem] bg-white p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="font-serif text-3xl">Same day</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Respuesta agil para pedidos premium y arreglos de ocasion especial.</p>
                </article>
                <article className="rounded-[1.8rem] bg-[#efe2da] p-6 shadow-[0_20px_50px_rgba(83,48,37,0.08)]">
                  <h3 className="font-serif text-3xl">CDMX</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6d5953]">Cobertura selectiva con enfoque boutique y experiencia cuidada.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-32 bg-[#efe2da] py-16 md:py-24">
          <div className="mx-auto grid w-[92%] max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Contacto</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
                {BRAND.name} puede verse como una marca floral realmente premium en CDMX.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#5c4842]">
                Este mockup esta pensado para posicionar a {BRAND.name} como una boutique floral aspiracional en CDMX, con una imagen elegante, contemporanea y muy vendible.
              </p>
            </div>

            <aside className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(83,48,37,0.1)]">
              <p className="text-sm uppercase tracking-[0.25em] text-[#9b766a]">{BRAND.name}</p>
              <div className="mt-4 space-y-2 text-base leading-7 text-[#3a2a26]">
                <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="block transition hover:opacity-70">
                  WhatsApp directo
                </a>
                <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="block transition hover:opacity-70">
                  Instagram boutique
                </a>
                <p>Disenos premium a pedido</p>
                <p>Entregas selectas en CDMX</p>
              </div>
              <p className="mt-5 rounded-[1.5rem] bg-[#fbf6f2] p-4 text-sm leading-6 text-[#6d5953]">
                Ideal para cerrar ventas rapidas desde Instagram y WhatsApp con una imagen mucho mas premium.
              </p>
              <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} mt-6 w-full`}>
                Solicitar pedido personalizado
              </a>
            </aside>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[92%] max-w-7xl flex-col items-center justify-between gap-3 py-8 text-center text-xs uppercase tracking-[0.24em] text-[#8f6b60] md:flex-row md:text-left">
        <p>{BRAND.name} · Floreria premium · CDMX</p>
        <div className="flex items-center gap-4">
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:opacity-60">
            Instagram
          </a>
          <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="transition hover:opacity-60">
            WhatsApp
          </a>
        </div>
      </footer>

      <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 md:hidden">
        <div className="flex items-center justify-between rounded-full bg-[#2b1a17] px-5 py-3 text-white shadow-[0_20px_50px_rgba(43,29,26,0.28)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">{BRAND.name}</p>
            <p className="text-sm font-medium">Pedir por WhatsApp</p>
          </div>
          <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#f2ddd4] px-4 py-2 text-sm font-medium text-[#2b1a17] transition duration-300 hover:bg-[#edd2c6]">
            Pedir ahora
          </a>
        </div>
      </div>
    </div>
  )
}
