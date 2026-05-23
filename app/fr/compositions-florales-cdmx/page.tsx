import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Compositions florales CDMX | CUSI Flores',
  description: 'Compositions florales premium a CDMX pour anniversaires, cadeaux, evenements et occasions speciales. Commandes WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/compositions-florales-cdmx' },
}

export default function FrCompositionsFloralesCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Compositions florales premium a CDMX"
      intro={[
        'CUSI Flores cree des compositions florales premium a CDMX avec fleurs fraiches, couleurs equilibrees et presentation elegante.',
        'Chaque composition est preparee selon l occasion et la disponibilite, avec une attention personnalisee par WhatsApp avant confirmation.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous verifions occasion, budget, message de carte, adresse et disponibilite avant de confirmer la composition."
      sections={[
        { title: 'Design floral intentionnel', body: 'Chaque composition exprime celebration, gratitude, affection, elegance ou presence par la couleur, la forme et le volume.' },
        { title: 'Fleurs fraiches et de saison', body: 'Selon disponibilite, nous proposons roses, tulipes, orchidees, bouquets premium et melanges floraux.' },
        { title: 'Cadeaux et evenements', body: 'Les compositions conviennent aux maisons, bureaux, hotels, restaurants, diners prives et attentions professionnelles.' },
        { title: 'Service boutique', body: 'Nous guidons le choix selon le destinataire, l occasion, la zone de livraison et le style souhaite.' },
      ]}
      ctaText="Demander une composition"
      whatsappText="Bonjour CUSI FLORES, je souhaite une composition florale a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Quelles compositions proposez-vous?', answer: 'Bouquets, boites de roses, orchidees, tulipes et compositions de saison selon disponibilite.' },
        { question: 'Puis-je demander une composition personnalisee?', answer: 'Oui. Nous pouvons orienter la composition selon occasion, couleurs, style et budget.' },
        { question: 'La livraison est-elle incluse?', answer: 'La livraison est coordonnee par WhatsApp selon zone, horaire et disponibilite.' },
      ]}
      relatedLinks={[
        { href: '/fr/livraison-fleurs-cdmx', label: 'Livraison de fleurs CDMX' },
        { href: '/fr/fleurs-anniversaire-cdmx', label: 'Fleurs anniversaire CDMX' },
        { href: '/fr/fleurs-fete-des-meres-cdmx', label: 'Fleurs fete des meres CDMX' },
      ]}
    />
  )
}
