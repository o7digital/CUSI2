import type { Metadata } from 'next'

const legalLinks = [
  { label: 'Politique de confidentialité', href: '/fr/privacy-policy' },
  { label: 'Informations fiscales', href: '/fr/tax-information' },
  { label: "Conditions d'utilisation", href: '/fr/terms-of-use' },
]

export const metadata: Metadata = {
  title: 'Politique de confidentialité | CUSI Flowers',
  description:
    'Politique de confidentialité de CUSI Flowers : traitement des données personnelles, finalités, droits et canaux de contact.',
  alternates: {
    canonical: 'https://www.cusiflores.com/fr/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPageFr() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/fr" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c7be] bg-white px-3 py-1 text-xs font-semibold text-[#2e231f]">
              <a href="/aviso-de-privacidad" className="underline underline-offset-2 hover:opacity-75">ES</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/en/privacy-policy" className="underline underline-offset-2 hover:opacity-75">EN</a>
              <span className="text-[#b8a9a2]">|</span>
              <a href="/it/privacy-policy" className="underline underline-offset-2 hover:opacity-75">IT</a>
              <span className="text-[#b8a9a2]">|</span>
              <span>FR</span>
            </div>
            <a href="/fr" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Retour à l'accueil</a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 text-[#2a1c19] md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Politique de confidentialité</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Dernière mise à jour : avril 2026</p>
          <p className="mt-5 text-base leading-8 text-[#4e3a34]">
            Cette politique explique comment CUSI collecte, utilise, protège et partage les données personnelles lorsque vous nous contactez, passez une commande ou utilisez ce site.
          </p>
        </section>

        <section className="mt-6 space-y-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <article>
            <h2 className="text-2xl md:text-3xl">1. Responsable du traitement</h2>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">
              CUSI (RFC : CUGC470830RU2), C. Monte Carpatos 990 Int. 2, Colonia Lomas Virreyes, C.P. 11000, Mexico, Mexique.
            </p>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">Email : contacto@cusiflores.com</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">2. Données collectées</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
              <li>Nom complet, téléphone, email</li>
              <li>Adresse de livraison et détails de commande</li>
              <li>Informations de facturation si demandées</li>
              <li>Messages envoyés via formulaires, WhatsApp, réseaux sociaux ou email</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">3. Finalités</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
              <li>Répondre aux demandes et devis</li>
              <li>Traiter les commandes et coordonner les livraisons</li>
              <li>Confirmer les paiements et émettre des factures</li>
              <li>Assurer le suivi client</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">4. Vos droits</h2>
            <p className="mt-3 text-base leading-8 text-[#4e3a34]">
              Vous pouvez demander l'accès, la rectification, l'annulation ou l'opposition de vos données en écrivant à contacto@cusiflores.com.
            </p>
          </article>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informations légales</p>
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
