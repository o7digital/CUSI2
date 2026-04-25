const BRAND = {
  name: 'CUSI FLORES',
  city: 'Ciudad de Mexico',
  instagramUrl: 'https://instagram.com/cusiflores',
}

const WHATSAPP_MESSAGE =
  'Hola CUSI FLORES, quiero hacer un pedido para el Dia de las Madres 2026. Me interesa un arreglo floral.'

const whatsappUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Coleccion 10 de mayo', href: '#coleccion' },
  { label: 'Catalogo', href: '#catalogo' },
  { label: 'Pedidos', href: '#pedidos' },
  { label: 'Contacto', href: '#contacto' },
]

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

const campaignOccasions = ['Mama', 'Abuela', 'Esposa', 'Suegra', 'Tia', 'Regalo corporativo para mamas']

const emotionalPillars = [
  { title: 'Flores seleccionadas', text: 'Curaduria floral con foco en calidad, frescura y armonia visual.' },
  { title: 'Diseno con intencion', text: 'Cada arreglo se construye para comunicar emocion y elegancia.' },
  { title: 'Entrega cuidada', text: 'Atencion personalizada y entrega programada en zonas seleccionadas.' },
]

const quickCampaignPoints = ['Pedidos por WhatsApp', 'Entrega programada', 'Presentacion premium']

const ctaPrimary =
  'inline-flex items-center justify-center rounded-full bg-[#2e231f] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(46,35,31,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1f1613]'

const ctaSoft =
  'inline-flex items-center justify-center rounded-full border border-[#c8ada3] bg-white px-6 py-3 text-sm font-semibold text-[#2e231f] transition duration-300 hover:border-[#b4988e] hover:bg-[#fff8f5]'

export default function CusiFloresMothersDayLanding() {
  return (
    <div className="min-h-screen bg-[#f7f1eb] text-[#2a1c19] selection:bg-[#ddc5bb] selection:text-[#2a1c19]">
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

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} px-4 py-2 text-xs md:text-sm`}>
            Pedir ahora
          </a>
        </div>
      </header>

      <main id="inicio" className="overflow-hidden">
        <section className="relative isolate">
          <div className="absolute inset-0 bg-[radial-gradient(120%_110%_at_0%_0%,#f9e8de_0%,#f6eee8_45%,#f4efe9_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[linear-gradient(180deg,rgba(244,239,233,0)_0%,rgba(244,239,233,0.9)_100%)]" />

          <div className="relative mx-auto grid min-h-[95svh] w-[92%] max-w-7xl gap-8 pt-28 pb-14 md:pt-36 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="reveal">
              <div className="mb-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em] text-[#775e56] md:text-xs">
                <span className="rounded-full border border-[#dbc4ba] bg-white/80 px-3 py-2">Edicion especial 10 de mayo</span>
                <span className="rounded-full border border-[#dbc4ba] bg-white/80 px-3 py-2">Entrega premium CDMX</span>
              </div>

              <h1 className="max-w-2xl text-4xl leading-[0.98] text-[#2a1c19] sm:text-5xl md:text-7xl">
                Flores para mama con presencia, elegancia y emocion.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5d4740] md:text-lg md:leading-8">
                Coleccion especial Dia de las Madres 2026. Ramos y arreglos premium con entrega en zonas seleccionadas de CDMX.
              </p>

              <p className="mt-4 inline-flex rounded-full bg-[#efe0d8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#60473f] md:text-sm">
                Agenda tu pedido antes del 10 de mayo
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={ctaPrimary}>
                  Pedir por WhatsApp
                </a>
                <a href="#coleccion" className={ctaSoft}>
                  Ver coleccion 10 de mayo
                </a>
              </div>
            </div>

            <div className="reveal relative h-[360px] overflow-hidden rounded-[2.2rem] border border-[#e4d1c7] bg-white p-3 shadow-[0_26px_65px_rgba(71,44,35,0.15)] md:h-[520px]">
              <img src={campaignImages[6]} alt="Arreglo floral premium Dia de las Madres" className="h-full w-full rounded-[1.5rem] object-cover" />
            </div>
          </div>
        </section>

        <section className="mx-auto -mt-6 w-[92%] max-w-7xl pb-12 md:-mt-8 md:pb-16">
          <div className="reveal rounded-[1.8rem] border border-[#e3d2c9] bg-[#fffdfb] px-5 py-5 shadow-[0_20px_50px_rgba(82,52,42,0.08)] md:px-8">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#94736a] md:text-sm">Pedidos abiertos para el 10 de mayo</p>
                <p className="mt-2 text-lg text-[#2a1c19] md:text-2xl">Cupos limitados para entregas premium en CDMX</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickCampaignPoints.map((item) => (
                  <span key={item} className="rounded-full border border-[#e4d1c7] bg-[#fbf4ef] px-4 py-2 text-xs text-[#57423c] md:text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="coleccion" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-8 md:py-14">
          <div className="reveal mb-8 md:mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Coleccion Dia de las Madres</p>
            <h2 className="mt-3 max-w-3xl text-3xl leading-tight md:text-5xl">Arreglos disenados para decir gracias con flores, belleza y presencia.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
              <article key={item.title} className="reveal overflow-hidden rounded-[1.6rem] border border-[#ead8cf] bg-[#fffdfa] shadow-[0_16px_42px_rgba(74,46,37,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(74,46,37,0.14)]">
                <div className="h-64 bg-[#f4ebe6] md:h-72">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-2xl text-[#2a1c19]">{item.title}</h3>
                  <p className="text-sm leading-6 text-[#664f48]">{item.desc}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#4e3a34]">{item.price}</p>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaSoft} w-full`}>
                    Pedir este arreglo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="catalogo" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-12 md:py-16">
          <div className="reveal rounded-[2rem] border border-[#dfccc2] bg-[#fdf8f4] p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Catalogo especial 10 de mayo</p>
            <h2 className="mt-3 text-3xl leading-tight md:text-5xl">Consulta la coleccion completa y elige el arreglo ideal para mama.</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <p className="max-w-2xl text-base leading-7 text-[#5d4740]">
                El catalogo visual de Mother&apos;s Day - CUSI Flores ya esta integrado en esta landing. Si deseas atencion personalizada o version completa, solicitalo directo por WhatsApp.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={ctaPrimary}>
                Solicitar catalogo por WhatsApp
              </a>
            </div>
            <div className="mt-7 grid grid-cols-4 gap-3 md:grid-cols-8">
              {campaignImages.map((image, index) => (
                <div key={image} className="overflow-hidden rounded-xl border border-[#ead8cf] bg-white">
                  <img src={image} alt={`Vista catalogo ${index + 1}`} className="h-20 w-full object-cover md:h-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-[92%] max-w-7xl py-6 md:py-10">
          <div className="reveal rounded-[2rem] border border-[#e4d2c9] bg-white p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Experiencia CUSI FLORES</p>
            <h2 className="mt-3 text-3xl leading-tight md:text-5xl">Un detalle que mama no olvida.</h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-[#5d4740]">
              Cada arreglo CUSI FLORES esta pensado como una experiencia: flores seleccionadas, composicion cuidada, presentacion elegante y atencion personalizada para que tu regalo llegue con intencion y belleza.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {emotionalPillars.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-[#ead8cf] bg-[#fdf8f4] p-5">
                  <h3 className="text-xl text-[#2a1c19]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#664f48]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pedidos" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-12 md:py-16">
          <div className="reveal rounded-[2rem] bg-[#2a1d1a] p-7 text-white shadow-[0_28px_70px_rgba(42,29,26,0.34)] md:p-10">
            <h2 className="text-3xl leading-tight md:text-5xl">Haz tu pedido en menos de 2 minutos</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                '1. Elige tu arreglo',
                '2. Confirma zona y horario de entrega',
                '3. Personalizamos tu pedido',
                '4. Recibe confirmacion por WhatsApp',
              ].map((step) => (
                <p key={step} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90">
                  {step}
                </p>
              ))}
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center rounded-full bg-[#f4ddd2] px-6 py-3 text-sm font-semibold text-[#2a1d1a] transition duration-300 hover:bg-[#efcfc1]">
              Ordenar ahora por WhatsApp
            </a>
          </div>
        </section>

        <section id="ocasiones" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-12">
          <div className="reveal rounded-[2rem] border border-[#e4d2c9] bg-white p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Ocasiones de campana</p>
            <h2 className="mt-3 text-3xl leading-tight md:text-5xl">Regalos para cada tipo de mama</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {campaignOccasions.map((item) => (
                <p key={item} className="rounded-full border border-[#e8d8cf] bg-[#fbf4ef] px-5 py-3 text-sm text-[#4e3a34]">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="eventos" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-14">
          <div className="reveal grid gap-5 rounded-[2rem] border border-[#dfccc2] bg-[#fff8f3] p-6 md:grid-cols-[1fr_0.9fr] md:p-9">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Eventos florales</p>
              <h2 className="mt-3 text-3xl leading-tight md:text-5xl">Eventos boutique para momentos especiales</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#5d4740]">
                Esta temporada la prioridad es Dia de las Madres, pero seguimos atendiendo eventos privados y corporativos con direccion floral premium.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaSoft} mt-6`}>
                Cotizar evento floral
              </a>
            </div>
            <div className="overflow-hidden rounded-[1.6rem] border border-[#e4d2c9] bg-white p-2">
              <img src={campaignImages[7]} alt="Evento floral premium CDMX" className="h-full min-h-[240px] w-full rounded-[1.1rem] object-cover" />
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto w-[92%] max-w-7xl scroll-mt-28 py-10 md:py-16">
          <div className="reveal grid gap-6 rounded-[2rem] border border-[#dfccc2] bg-white p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#94736a] md:text-sm">Contacto</p>
              <h2 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">Elige arreglo, confirma entrega CDMX y cierra tu pedido por WhatsApp.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5d4740]">
                Campana activa para el 10 de mayo de 2026 con cupos limitados. Recomendamos apartar con anticipacion.
              </p>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${ctaPrimary} h-fit`}>
              Pedir ahora por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[92%] max-w-7xl flex-col gap-4 border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg text-[#2a1c19]">CUSI FLORES</p>
          <p>Floreria premium en Ciudad de Mexico</p>
          <p>Coleccion Dia de las Madres 2026</p>
          <p className="mt-2 text-xs">Pedidos sujetos a disponibilidad y zona de entrega.</p>
        </div>
        <div className="flex gap-4 text-[#4e3a34]">
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:opacity-60">
            Instagram
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="transition hover:opacity-60">
            WhatsApp
          </a>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2e231f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(46,35,31,0.35)]">
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  )
}
