type FaqItem = {
  question: string
  answer: string
}

type RelatedLink = {
  href: string
  label: string
}

type SeoLandingPageProps = {
  title: string
  intro: string[]
  sections: Array<{
    title: string
    body: string
  }>
  ctaText: string
  whatsappText: string
  faq: FaqItem[]
  relatedLinks?: RelatedLink[]
}

const phoneUrl = (message: string) => `https://wa.me/525521092665?text=${encodeURIComponent(message)}`

export default function SeoLandingPage({
  title,
  intro,
  sections,
  ctaText,
  whatsappText,
  faq,
  relatedLinks = [],
}: SeoLandingPageProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <section className="mx-auto w-[92%] max-w-5xl py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#94736a]">CUSI Flores CDMX</p>
        <h1 className="mt-4 text-3xl leading-tight md:text-5xl">{title}</h1>
        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-5 text-base leading-8 text-[#4e3a34]">
            {paragraph}
          </p>
        ))}

        <div className="mt-8 rounded-2xl border border-[#ead8cf] bg-white p-6 shadow-[0_16px_42px_rgba(74,46,37,0.08)]">
          <h2 className="text-2xl md:text-3xl">Pedidos por WhatsApp y entrega programada</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Confirmamos disponibilidad de flores, estilo del arreglo, horario de entrega y datos del destinatario antes de preparar cada pedido.
          </p>
          <a
            href={phoneUrl(whatsappText)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-[#2b1a17] px-6 py-3 text-sm font-semibold text-white"
          >
            {ctaText}
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-[#ead8cf] bg-[#fffdfa] p-6">
              <h2 className="text-2xl leading-tight">{section.title}</h2>
              <p className="mt-3 text-base leading-8 text-[#4e3a34]">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-[#ead8cf] bg-white p-6">
          <h2 className="text-2xl md:text-3xl">Preguntas frecuentes</h2>
          <div className="mt-5 space-y-5">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-2 text-base leading-7 text-[#4e3a34]">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedLinks.length ? (
          <nav className="mt-8 flex flex-wrap gap-3 text-sm text-[#6f5851]" aria-label="Paginas relacionadas">
            {relatedLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full border border-[#d8c4bb] bg-white px-4 py-2 underline-offset-2 hover:underline">
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
