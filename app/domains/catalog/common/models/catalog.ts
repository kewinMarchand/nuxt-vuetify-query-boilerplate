import type { CategoryNode } from '@/core/config'

export declare namespace Catalog {
  type Exposure = 'soleil' | 'mi-ombre' | 'ombre'
  type Size = 'S' | 'M' | 'L'
  type Sort = 'pertinence' | 'prix-asc' | 'prix-desc' | 'nom'
  type View = 'grille' | 'liste'
  type Category = CategoryNode

  interface Product {
    id: string
    slug: string
    name: string
    categorySlug: string
    price: number
    exposure: Exposure
    size: Size
    inStock: boolean
    image: number
  }

  interface Query {
    exposures: Exposure[]
    sizes: Size[]
    priceMin: number | null
    priceMax: number | null
    inStock: boolean
    sort: Sort
    view: View
    page: number
  }

  interface FacetValue<TValue extends string> {
    value: TValue
    label: string
    count: number
  }

  interface CategoryFacet {
    slug: string
    label: string
    href: string
    count: number
  }

  interface Facet {
    exposures: FacetValue<Exposure>[]
    sizes: FacetValue<Size>[]
    categories: CategoryFacet[]
  }

  interface Page {
    items: Product[]
    total: number
    page: number
    pageCount: number
    facets: Facet
  }
}
