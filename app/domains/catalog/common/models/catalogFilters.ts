import type { Catalog } from './catalog'

type FacetKey = 'exposures' | 'sizes'

const CENTS_PER_EURO = 100
export const PAGE_SIZE = 12
const MAX_PAGES_WITHOUT_ELLIPSIS = 7

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
      (query.priceMin === null || product.price >= query.priceMin * CENTS_PER_EURO) &&
      (query.priceMax === null || product.price <= query.priceMax * CENTS_PER_EURO) &&
      (!query.inStock || product.inStock),
  )

export const countFacet = <TValue extends string>(
  products: Catalog.Product[],
  query: Catalog.Query,
  facet: FacetKey,
  values: TValue[],
  labels: Record<TValue, string>,
): Catalog.FacetValue<TValue>[] => {
  const candidates = filterProducts(products, query, facet)
  const field = facet === 'exposures' ? 'exposure' : 'size'
  return values.map((value) => ({
    value,
    label: labels[value],
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

export type PaginationEntry = number | 'ellipsis'

export const paginationWindow = (page: number, pageCount: number): PaginationEntry[] => {
  if (pageCount <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }
  const pages = [1, page - 1, page, page + 1, pageCount].filter(
    (candidate, index, list) =>
      candidate >= 1 && candidate <= pageCount && list.indexOf(candidate) === index,
  )
  return pages.flatMap((current, index) => {
    const previous = pages[index - 1]
    return previous !== undefined && current - previous > 1
      ? ['ellipsis' as const, current]
      : [current]
  })
}
