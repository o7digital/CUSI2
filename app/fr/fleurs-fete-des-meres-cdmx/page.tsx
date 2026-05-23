import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Fleurs fete des meres CDMX | CUSI Flores',
  description: 'Fleurs pour la fete des meres a CDMX: bouquets, roses, tulipes, orchidees et compositions premium.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/fleurs-fete-des-meres-cdmx' },
}

export default function FrFleursFeteDesMeresCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Fleurs pour la fete des meres a CDMX"
      intro={[
        'CUSI Flores prepare des compositions florales premium pour la fete des meres a CDMX.',
        'Pour le 10 mai, nous recommandons de commander a l avance afin de garantir disponibilite, horaire et presentation.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous confirmons disponibilite, horaire, message de carte et destinataire avant preparation."
      sections={[
        { title: 'Fleurs pour maman', body: 'Compositions elegantes pour exprimer affection, gratitude et celebration.' },
        { title: 'Commandes anticipees pour le 10 mai', body: 'La fete des meres est une periode de forte demande; commander tot facilite la coordination.' },
        { title: 'Bouquets, roses, tulipes et orchidees', body: 'La disponibilite varie selon saison et demande. Nous confirmons les options avant commande.' },
        { title: 'Livraison a CDMX', body: 'Nous desservons des zones selectionnees avec livraison planifiee et suivi WhatsApp.' },
      ]}
      ctaText="Commander pour maman"
      whatsappText="Bonjour CUSI FLORES, je souhaite commander des fleurs pour la fete des meres a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Quand commander?', answer: 'Nous recommandons de commander a l avance, surtout pour le 10 mai.' },
        { question: 'Quelles compositions pour maman?', answer: 'Bouquets premium, boites de roses, tulipes et orchidees sont des options frequentes.' },
        { question: 'Peut-on inclure une carte?', answer: 'Oui. Nous coordonnons le texte et la signature par WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/fr/livraison-fleurs-cdmx', label: 'Livraison de fleurs CDMX' },
        { href: '/fr/bouquets-fleurs-cdmx', label: 'Bouquets de fleurs CDMX' },
      ]}
    />
  )
}
