/**
 * Simulateur de l'API : filtre, comptage disjonctif, tri et pagination appartiennent au
 * fournisseur. Au branchement de l'API, ce dossier disparaît ou ne sert plus qu'aux tests.
 */
import { PAGE_SIZE } from '@/modules/catalog/domain/catalog'
import { eurosToCents } from '@/modules/catalog/domain/price'

import type { Catalog } from '@/modules/catalog/domain/catalog'

type FacetKey = 'exposures' | 'sizes'

export const filterProducts = (
  products: Catalog.Product[],
  query: Catalog.Query,
  ignored?: FacetKey,
): Catalog.Product[] =>
  products.filter(
    (product) =>
      (ignored === 'exposures' ||
        !query.exposures.length ||
        query.exposures.includes(product.exposure)) &&
      (ignored === 'sizes' || !query.sizes.length || query.sizes.includes(product.size)) &&
      (query.priceMin === null || product.price >= eurosToCents(query.priceMin)) &&
      (query.priceMax === null || product.price <= eurosToCents(query.priceMax)) &&
      (!query.inStock || product.inStock),
  )

export const countFacet = <TValue extends string>(
  products: Catalog.Product[],
  query: Catalog.Query,
  facet: FacetKey,
  values: TValue[],
): Catalog.FacetValue<TValue>[] => {
  const candidates = filterProducts(products, query, facet)
  const field = facet === 'exposures' ? 'exposure' : 'size'
  return values.map((value) => ({
    value,
    count: candidates.filter((product) => product[field] === value).length,
  }))
}

const NAME_COLLATOR = new Intl.Collator('fr')

export const sortProducts = (products: Catalog.Product[], sort: Catalog.Sort) => {
  const sorted = [...products]
  if (sort === 'prix-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'prix-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'nom') sorted.sort((a, b) => NAME_COLLATOR.compare(a.name, b.name))
  return sorted
}

export const paginate = <TItem>(items: TItem[], page: number, pageSize = PAGE_SIZE) => {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), pageCount)
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    pageCount,
  }
}
