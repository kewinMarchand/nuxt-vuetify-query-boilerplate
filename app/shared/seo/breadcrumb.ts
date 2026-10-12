import { ALL_NAVIGATION } from '@/shared/config'

export declare namespace Breadcrumb {
  interface Item {
    label: string
    href: string
  }
}

const HOME: Breadcrumb.Item = { label: 'Accueil', href: '/' }

/**
 * Fil d'Ariane d'une page. Une piste fournie par un module (le catalogue) prime : le socle
 * ne connaît que la navigation statique et le libellé donné par la page.
 */
export const buildBreadcrumb = (
  path: string,
  currentLabel?: string,
  trail?: Breadcrumb.Item[] | null,
): Breadcrumb.Item[] => {
  if (path === HOME.href) return []
  if (trail) return [HOME, ...trail]

  const item = ALL_NAVIGATION.find((navigation) => navigation.href === path)
  if (item) return [HOME, { label: item.label, href: item.href }]

  return currentLabel ? [HOME, { label: currentLabel, href: path }] : [HOME]
}

export const toBreadcrumbJsonLd = (items: Breadcrumb.Item[], siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: new URL(item.href, siteUrl).href,
  })),
})
