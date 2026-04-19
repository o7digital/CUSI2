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
  featured: [
    'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80',
  ],
}

const featured = [
  {
    title: 'Ramo Signature',
    desc: 'Disenos florales exclusivos con seleccion premium y presentacion impecable.',
    price: 'Desde $1,290 MXN',
    image: images.featured[0],
  },
  {
    title: 'Caja Couture',
    desc: 'Arreglos en caja de lujo pensados para regalar con elegancia y presencia.',
    price: 'Desde $1,850 MXN',
    image: images.featured[1],
  },
  {
    title: 'Edicion Evento',
    desc: 'Composicion floral refinada para cenas, bodas intimas y celebraciones especiales.',
    price: 'Cotizacion personalizada',
    image: images.featured[2],
  },
]

const highlights = [
  {
    kicker: 'Editorial floral',
    title: 'Ramos de autor',
    text: 'Disenos con una estetica femenina, moderna y delicadamente aspiracional.',
    tone: 'bg-[#f8f0ea]',
  },
  {
    kicker: 'Luxury gifting',
    title: 'Regalos con impacto',
    text: 'Presentacion impecable para convertir cada entrega en una experiencia memorable.',
    tone: 'bg-[#f4e5de]',
  },
  {
    kicker: 'Boutique premium',
    title: 'Imagen aspiracional',
    text: 'Ideal para una marca floral elegante, contemporanea y con posicionamiento alto.',
    tone: 'bg-[#2b1a17] text-white',
  },
]

const servicePillars = [
  {
    title: 'Ramos couture',
    text: 'Creaciones florales con composicion editorial, suaves contrastes y acabados impecables.',
  },
  {
    title: 'Eventos boutique',
    text: 'Ambientacion floral premium para cenas privadas, bodas intimas y experiencias exclusivas.',
  },
  {
    title: 'Entrega selecta',
    text: 'Atencion cuidada y servicio enfocado en zonas premium de Ciudad de Mexico.',
  },
]

const quickStats = [
  ['Entrega same day', 'En zonas seleccionadas'],
  ['Pedidos por WhatsApp', 'Respuesta prioritaria'],
  ['Arreglos premium', 'Diseno floral exclusivo'],
  ['Eventos boutique', 'Cotizacion personalizada'],
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
  { label: 'Coleccion', href: '#coleccion' },
  { label: 'Ocasiones', href: '#ocasiones' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Contacto', href: '#contacto' },
]

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_40px_rgba(43,29,26,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d100e]'

const ctaSoft =
  'inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:bg-white/20'

const cardBase =
  'rounded-[1.6rem] border border-[#ead9d0] bg-white p-5 shadow-[0_18px_45px_rgba(83,48,37,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(83,48,37,0.1)]'

export default function CusiFloresMockup() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715] selection:bg-[#dcc1b7] selection:text-[#2b1a17]">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex w-[94%] max-w-7xl items-center justify-between rounded-full border border-white/40 bg-[#fffaf7]/75 px-4 py-3 shadow-[0_20px_60px_rgba(56,31,24,0.12)] backdrop-blur-xl md:mt-5 md:px-6 md:py-4">
          <a href="#top" className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#9b766a] md:text-[11px]">CDMX · Luxury Florals</p>
            <p className="truncate text-lg tracking-[0.14em] text-[#2b1a17] md:text-2xl" style={{ fontFamily: 'Arial, sans-serif' }}>{BRAND.name}</p>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-[#3d2a26] md:flex">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="transition duration-300 hover:opacity-60">
                {item.label}
              </a>
            ))}
            <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="transition duration-300 hover:opacity-60">
              Instagram
            </a>
          </nav>

          <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm`}>
            WhatsApp
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${images.hero}')` }} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,17,15,0.88)_0%,rgba(28,17,15,0.58)_40%,rgba(28,17,15,0.2)_100%)]" />
          <div className="relative mx-auto flex min-h-[100svh] w-[92%] max-w-7xl items-center pt-28 pb-20 md:pt-36">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-md md:text-xs">
                Floreria premium en {BRAND.city}
              </div>

              <h1 className="max-w-2xl font-serif text-4xl leading-[0.98] text-white sm:text-5xl md:text-7xl xl:text-[92px]">
                Diseno floral de lujo para regalar con presencia.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-xl md:leading-8">
                Una boutique floral pensada para clientes que buscan belleza, delicadeza y una experiencia premium en cada detalle.
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
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-14 w-[92%] max-w-7xl md:-mt-16">
          <div className="grid gap-4 rounded-[2rem] border border-[#ead9d0] bg-[#fffaf7] p-5 shadow-[0_30px_80px_rgba(66,36,30,0.08)] md:grid-cols-3 md:p-6">
            {highlights.map((item) => (
              <article key={item.title} className={`rounded-[1.5rem] p-6 ${item.tone}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#9b766a]">{item.kicker}</p>
                <h2 className="mt-3 font-serif text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#6f5750]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[92%] max-w-7xl py-6 md:py-8">
          <div className="grid gap-4 rounded-[2rem] border border-[#ead9d0] bg-white p-4 shadow-[0_20px_50px_rgba(83,48,37,0.06)] sm:grid-cols-2 md:grid-cols-4 md:p-5">
            {quickStats.map(([title, text]) => (
              <article key={title} className="rounded-[1.3rem] bg-[#fbf6f2] p-4 transition duration-300 hover:bg-[#f6ece6]">
                <h3 className="font-serif text-xl text-[#2b1a17]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6d5953]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="coleccion" className="mx-auto w-[92%] max-w-7xl scroll-mt-32 py-16 md:py-24">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Estilo de marca</p>
              <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
                Una floreria con codigo visual premium, pensada para vender lujo sin verse pesada.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {servicePillars.map((item) => (
                <article key={item.title} className={cardBase}>
                  <h3 className="font-serif text-xl text-[#2b1a17]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6d5953]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9b766a]">Coleccion destacada</p>
              <h2 className="mt-4 max-w-lg font-serif text-3xl leading-tight md:text-5xl">
                Una propuesta floral delicada, editorial y sofisticada.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#5c4842]">
                {BRAND.name} mezcla flor de temporada, direccion estetica, paletas suaves y acabados impecables para construir una marca premium con fuerte personalidad visual.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#ead9d0] bg-white p-4 shadow-[0_30px_80px_rgba(83,48,37,0.08)] md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((item) => (
                  <article key={item.title} className="overflow-hidden rounded-[1.6rem] bg-[#fbf6f2] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(83,48,37,0.14)]">
                    <div className="h-64 bg-cover bg-center md:h-72" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="p-5">
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#6d5953]">{item.desc}</p>
                      <p className="mt-4 text-sm font-medium text-[#2b1d1a]">{item.price}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
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
