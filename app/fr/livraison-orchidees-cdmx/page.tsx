import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Livraison orchidees CDMX | CUSI Flores',
  description: 'Livraison d orchidees a CDMX avec orchidees Phalaenopsis et compositions elegantes. Commandes WhatsApp.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/livraison-orchidees-cdmx' },
}

export default function FrLivraisonOrchideesCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Livraison d orchidees a CDMX"
      intro={[
        'Les orchidees sont un choix elegant pour cadeaux raffines, interieurs, bureaux et attentions durables.',
        'CUSI Flores prepare des orchidees Phalaenopsis et compositions avec orchidees pour livraison planifiee a CDMX.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous confirmons disponibilite, couleur, presentation, zone de livraison et destinataire avant preparation."
      sections={[
        { title: 'Orchidees Phalaenopsis', body: 'Nous travaillons avec des orchidees Phalaenopsis en presentations soignees pour maison, bureau, reception ou cadeau.' },
        { title: 'Cadeaux elegants et durables', body: 'Une orchidee transmet raffinement et presence, parfaite pour cadeaux personnels ou professionnels.' },
        { title: 'Livraison planifiee', body: 'La livraison est coordonnee a l avance afin de proteger la plante et confirmer les details.' },
        { title: 'Disponibilite saisonniere', body: 'Couleurs, tailles et presentations varient. Nous partageons les options actuelles par WhatsApp.' },
      ]}
      ctaText="Demander une orchidee"
      whatsappText="Bonjour CUSI FLORES, je souhaite une orchidee a livrer a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Livrez-vous des orchidees a CDMX?', answer: 'Oui. Nous proposons orchidees et compositions avec orchidees dans des zones selectionnees.' },
        { question: 'Puis-je choisir la couleur?', answer: 'Cela depend de la disponibilite. Nous confirmons les options par WhatsApp.' },
        { question: 'L orchidee inclut-elle un pot?', answer: 'La presentation depend du modele disponible. Nous partageons les options avant confirmation.' },
      ]}
      relatedLinks={[
        { href: '/fr/compositions-florales-cdmx', label: 'Compositions florales CDMX' },
        { href: '/fr/livraison-fleurs-cdmx', label: 'Livraison de fleurs CDMX' },
      ]}
    />
  )
}
