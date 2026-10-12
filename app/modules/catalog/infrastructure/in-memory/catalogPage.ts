import {
  countFacet,
  filterProducts,
  paginate,
  sortProducts,
} from '@/modules/catalog/domain/catalogFilters'
import {
  EXPOSURE_LABELS,
  EXPOSURES,
  SIZE_LABELS,
  SIZES,
} from '@/modules/catalog/domain/catalogQuery'
import { categoryHref, CATEGORY_TREE, findCategoryPath } from '@/shared/config'

import type { Catalog } from '@/modules/catalog/domain/catalog'

const leafSlugs = (node: Catalog.Category): string[] =>
  node.children.length ? node.children.flatMap(leafSlugs) : [node.slug]

const inBranch = (products: Catalog.Product[], node?: Catalog.Category) => {
  if (!node) return products
  const slugs = leafSlugs(node)
  return products.filter((product) => slugs.includes(product.categorySlug))
}

export const buildCatalogPage = (
  products: Catalog.Product[],
  slugs: string[],
  query: Catalog.Query,
): Catalog.Page => {
  const path = findCategoryPath(slugs) ?? []
  const current = path.at(-1)
  const branch = inBranch(products, current)
  const filtered = filterProducts(branch, query)
  const { items, page, pageCount } = paginate(sortProducts(filtered, query.sort), query.page)
  const children = current ? current.children : CATEGORY_TREE

  return {
    items,
    total: filtered.length,
    page,
    pageCount,
    facets: {
      exposures: countFacet(branch, query, 'exposures', EXPOSURES, EXPOSURE_LABELS),
      sizes: countFacet(branch, query, 'sizes', SIZES, SIZE_LABELS),
      categories: children.map((child) => ({
        slug: child.slug,
        label: child.label,
        href: categoryHref([...slugs, child.slug]),
        count: filterProducts(inBranch(products, child), query).length,
      })),
    },
  }
}
