import type { Compliance } from '@/core/a11y/complianceLevel'

export interface SiteConfig {
  name: string
  description: string
  locale: string
  publisher: {
    companyName: string
    address: string
    siret: string
    publicationDirector: string
    email: string
  }
  host: {
    name: string
    address: string
  }
  accessibility: Compliance.Audit
}

export const SITE: SiteConfig = {
  name: 'Nuxt Vuetify Query Boilerplate',
  description:
    'Boilerplate Nuxt 4 avec Vuetify, TanStack Query, vee-validate et zod, outillé pour la QA, l’accessibilité et les tests end-to-end.',
  locale: 'fr_FR',
  publisher: {
    companyName: 'Exemple SAS (société fictive)',
    address: '1 rue de l’Exemple, 13000 Marseille (adresse fictive)',
    siret: '000 000 000 00000 (numéro fictif)',
    publicationDirector: 'Camille Exemple (personne fictive)',
    email: 'contact@exemple.fr',
  },
  host: {
    name: 'Hébergeur Exemple (société fictive)',
    address: '2 avenue de l’Exemple, 75000 Paris (adresse fictive)',
  },
  accessibility: { auditDate: null, complianceRate: null, auditor: null },
}
