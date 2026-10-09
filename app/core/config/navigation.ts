import { getComplianceLevel } from '@/core/a11y/complianceLevel'

import { CATALOG_ROOT, categoryHref, flattenCategories } from './categories'
import { SITE } from './site'

export interface NavigationItem {
  href: string
  label: string
  footerLabel?: string
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { href: '/', label: 'Accueil' },
  { href: '/taches', label: 'Tâches' },
  { href: '/contact', label: 'Contact' },
]

export const LEGAL_NAVIGATION: NavigationItem[] = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/donnees-personnelles', label: 'Données personnelles' },
  {
    href: '/accessibilite',
    label: 'Déclaration d’accessibilité',
    footerLabel: `Accessibilité : ${getComplianceLevel(SITE.accessibility)}`,
  },
  { href: '/plan-du-site', label: 'Plan du site' },
]

export const CATALOG_NAVIGATION: NavigationItem[] = [
  CATALOG_ROOT,
  ...flattenCategories().map(({ slugs, node }) => ({
    href: categoryHref(slugs),
    label: node.label,
  })),
]

export const ALL_NAVIGATION: NavigationItem[] = [
  ...MAIN_NAVIGATION,
  ...CATALOG_NAVIGATION,
  ...LEGAL_NAVIGATION,
]
