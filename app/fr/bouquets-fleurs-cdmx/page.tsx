import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Bouquets de fleurs CDMX | CUSI Flores',
  description: 'Bouquets de fleurs premium a CDMX pour anniversaire, remerciement, cadeau et occasions speciales. Commandes WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/bouquets-fleurs-cdmx' },
}

export default function FrBouquetsFleursCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Bouquets de fleurs a CDMX"
      intro={[
        'CUSI Flores prepare des bouquets premium a CDMX pour cadeaux elegants et occasions importantes.',
        'Les bouquets peuvent inclure roses, tulipes, fleurs de saison et combinaisons selectionnees selon disponibilite.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous confirmons disponibilite, style, message de carte, zone de livraison et destinataire avant preparation."
      sections={[
        { title: 'Bouquets a offrir', body: 'Un bouquet premium convient pour anniversaire, felicitations, remerciement, anniversaire de couple ou attention spontanee.' },
        { title: 'Roses, tulipes et fleurs de saison', body: 'La disponibilite varie par saison; nous confirmons couleurs, type de fleur et volume avant commande.' },
        { title: 'Livraison a CDMX', body: 'Nous coordonnons les livraisons dans des zones selectionnees comme Lomas de Chapultepec, Bosques de las Lomas, Polanco et Santa Fe.' },
        { title: 'Message personnalise', body: 'Le bouquet peut inclure un message de carte et une signature coordonnes par WhatsApp.' },
      ]}
      ctaText="Commander un bouquet"
      whatsappText="Bonjour CUSI FLORES, je souhaite commander un bouquet de fleurs a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Proposez-vous des bouquets de roses?', answer: 'Oui. Nous pouvons preparer des bouquets de roses et autres combinaisons selon disponibilite.' },
        { question: 'Puis-je envoyer un bouquet avec carte?', answer: 'Oui. Nous coordonnons le message et la signature par WhatsApp.' },
        { question: 'Livraison le jour meme possible?', answer: 'Cela depend de la disponibilite des fleurs et de la route. Nous confirmons par WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/fr/livraison-fleurs-cdmx', label: 'Livraison de fleurs CDMX' },
        { href: '/fr/compositions-florales-cdmx', label: 'Compositions florales CDMX' },
      ]}
    />
  )
}
