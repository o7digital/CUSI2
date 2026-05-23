import type { Metadata } from 'next'
import SeoLandingPage from '../../../components/SeoLandingPage'

export const metadata: Metadata = {
  title: 'Fleurs anniversaire CDMX | CUSI Flores',
  description: 'Fleurs pour anniversaire a CDMX avec bouquets premium, compositions florales, roses, tulipes et orchidees.',
  alternates: { canonical: 'https://www.cusiflores.com/fr/fleurs-anniversaire-cdmx' },
}

export default function FrFleursAnniversaireCdmxPage() {
  return (
    <SeoLandingPage
      eyebrow="CUSI Flores CDMX"
      title="Fleurs pour anniversaire a CDMX"
      intro={[
        'CUSI Flores prepare des fleurs pour anniversaire a CDMX avec compositions premium, bouquets frais et presentations elegantes.',
        'Chaque commande peut inclure une carte personnalisee et se coordonne par WhatsApp pour style, couleurs, budget et horaire.',
      ]}
      orderTitle="Commandes WhatsApp et livraison planifiee"
      orderBody="Nous confirmons composition, message de carte, horaire et destinataire avant preparation."
      sections={[
        { title: 'Compositions anniversaire', body: 'Bouquets, boites de roses, tulipes, orchidees ou compositions mixtes pour famille, amis, clients ou partenaire.' },
        { title: 'Message personnalise', body: 'Nous coordonnons le texte de carte et la signature pour un cadeau complet.' },
        { title: 'Livraison maison ou bureau', body: 'Livraison possible a domicile, bureau, restaurant ou hotel dans des zones selectionnees de CDMX.' },
        { title: 'Style selon le destinataire', body: 'Nous proposons des options sobres, romantiques, colorees ou elegantes selon la personne.' },
      ]}
      ctaText="Commander des fleurs anniversaire"
      whatsappText="Bonjour CUSI FLORES, je souhaite commander des fleurs pour anniversaire a CDMX."
      faqTitle="Questions frequentes"
      relatedLabel="Pages associees"
      faq={[
        { question: 'Quelles fleurs recommandez-vous?', answer: 'Bouquets mixtes, roses, tulipes et orchidees selon gout, budget et disponibilite.' },
        { question: 'Livrez-vous au bureau?', answer: 'Oui. Nous coordonnons les livraisons en bureaux et domiciles dans des zones selectionnees.' },
        { question: 'Une carte peut-elle etre incluse?', answer: 'Oui. Nous coordonnons le texte de carte par WhatsApp.' },
      ]}
      relatedLinks={[
        { href: '/fr/bouquets-fleurs-cdmx', label: 'Bouquets de fleurs CDMX' },
        { href: '/fr/compositions-florales-cdmx', label: 'Compositions florales CDMX' },
      ]}
    />
  )
}
