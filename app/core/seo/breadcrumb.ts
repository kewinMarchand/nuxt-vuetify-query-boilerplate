import { ALL_NAVIGATION, CATALOG_ROOT, categoryHref, findCategoryPath } from '@/core/config'

export declare namespace Breadcrumb {
  interface Item {
    label: string
    href: string
  }
}

const HOME: Breadcrumb.Item = { label: 'Accueil', href: '/' }

const catalogTrail = (path: string): Breadcrumb.Item[] | null => {
  const slugs = path.slice(CATALOG_ROOT.href.length).split('/').filter(Boolean)
  const categories = findCategoryPath(slugs)
  if (!categories) return null
  return [
    CATALOG_ROOT,
    ...categories.map((category, depth) => ({
      label: category.label,
      href: categoryHref(slugs.slice(0, depth + 1)),
    })),
  ]
}

export const buildBreadcrumb = (path: string, currentLabel?: string): Breadcrumb.Item[] => {
  if (path === HOME.href) return []

  const isCatalog = path === CATALOG_ROOT.href || path.startsWith(`${CATALOG_ROOT.href}/`)
  const trail = isCatalog ? catalogTrail(path) : null
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
