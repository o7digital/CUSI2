import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Livraison de fleurs CDMX | CUSI Flores',
  description: 'Livraison de fleurs premium a CDMX avec bouquets, roses, tulipes, orchidees, commandes WhatsApp et livraison planifiee.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/livraison-fleurs-cdmx' },
}

export default function FrLivraisonFleursCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Livraison de fleurs a CDMX"
      intro={[
        'CUSI Flores prepare des fleurs premium a livrer a CDMX pour des cadeaux elegants, anniversaires, attentions professionnelles et occasions speciales.',
        'Chaque commande est confirmee par WhatsApp afin de verifier la disponibilite des fleurs, l horaire, l adresse complete, le message de carte et les coordonnees du destinataire.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous confirmons les fleurs, le style de composition, le creneau de livraison et les informations du destinataire avant preparation."
      sections={[
        { title: 'Fleurs premium livrees', body: 'Bouquets, compositions florales, boites de roses, tulipes, orchidees et compositions de saison selon disponibilite.' },
        { title: 'Zones desservies a CDMX', body: 'Nous desservons des zones selectionnees comme Lomas de Chapultepec, Bosques de las Lomas, Polanco, Santa Fe et quartiers proches selon disponibilite.' },
        { title: 'Fleurs pour chaque occasion', body: 'Anniversaire, remerciement, naissance, evenement prive, cadeau romantique ou attention professionnelle.' },
        { title: 'Service personnalise', body: 'Nous aidons a choisir la composition selon l occasion, le budget, les couleurs et les details de livraison.' },
      ]}
      ctaText="Commander une livraison"
      whatsappText="Bonjour CUSI FLORES, je souhaite commander une livraison de fleurs a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Livrez-vous des fleurs a CDMX?', answer: 'Oui. Nous proposons des livraisons planifiees dans des zones selectionnees de CDMX avec confirmation WhatsApp.' },
        { question: 'Puis-je choisir le style?', answer: 'Oui. Nous orientons le choix selon l occasion, le budget, les couleurs et la disponibilite.' },
        { question: 'Comment confirmer une commande?', answer: 'La commande est confirmee par WhatsApp avec composition, prix, adresse, horaire, message et destinataire.' },
      ]}
      relatedLinks={[
        { href: '/fr/compositions-florales-cdmx', label: 'Compositions florales CDMX' },
        { href: '/fr/bouquets-fleurs-cdmx', label: 'Bouquets de fleurs CDMX' },
        { href: '/fr/livraison-orchidees-cdmx', label: 'Livraison orchidees CDMX' },
      ]}
    />
  )
}
