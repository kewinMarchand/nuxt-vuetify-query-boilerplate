import {
  countFacet,
  filterProducts,
  paginate,
  sortProducts,
} from '@/modules/catalog/domain/catalogFilters'
import { EXPOSURES, SIZES } from '@/modules/catalog/domain/catalogQuery'
import { categoryHref } from '@/modules/catalog/domain/categoryPath'
import { collectLeafSlugs, findCategoryChain } from '@/modules/catalog/domain/categoryTree'

import { CATEGORY_TREE } from './categories'

import type { Catalog } from '@/modules/catalog/domain/catalog'

const inBranch = (products: Catalog.Product[], node?: Catalog.Category) => {
  if (!node) return products
  const slugs = collectLeafSlugs(node)
  return products.filter((product) => slugs.includes(product.categorySlug))
}

export const buildCatalogPage = (
  products: Catalog.Product[],
  slugs: string[],
  query: Catalog.Query,
): Catalog.Page => {
  const path = findCategoryChain(CATEGORY_TREE, slugs) ?? []
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
      exposures: countFacet(branch, query, 'exposures', EXPOSURES),
      sizes: countFacet(branch, query, 'sizes', SIZES),
      categories: children.map((child) => ({
        slug: child.slug,
        label: child.label,
        href: categoryHref([...slugs, child.slug]),
        count: filterProducts(inBranch(products, child), query).length,
      })),
    },
  }
}
