import { DEFAULT_QUERY, EXPOSURES } from '@/modules/catalog/domain/catalogQuery'
import { Price } from '@/modules/catalog/domain/price'

import { countFacet, filterProducts, paginate, sortProducts } from './productSearch'

import type { Catalog } from '@/modules/catalog/domain/catalog'

const product = (id: string, overrides: Partial<Catalog.Product>): Catalog.Product => ({
  id,
  slug: `produit-${id}`,
  name: `Produit ${id}`,
  categorySlug: 'monstera',
  price: Price.fromCents(1000),
  exposure: 'soleil',
  size: 'M',
  inStock: true,
  image: 1,
  ...overrides,
})

const PRODUCTS = [
  product('1', { name: 'Calathea', price: Price.fromCents(2500), exposure: 'ombre', size: 'S' }),
  product('2', {
    name: 'Anthurium',
    price: Price.fromCents(1500),
    exposure: 'mi-ombre',
    size: 'M',
    inStock: false,
  }),
  product('3', { name: 'Begonia', price: Price.fromCents(4000), exposure: 'mi-ombre', size: 'L' }),
  product('4', { name: 'Ficus', price: Price.fromCents(900), exposure: 'soleil', size: 'M' }),
]

describe('filterProducts', () => {
  it('cumule les valeurs d’une facette en OU et les facettes entre elles en ET', () => {
    const query = {
      ...DEFAULT_QUERY,
      exposures: ['mi-ombre', 'ombre'],
      sizes: ['M'],
    } satisfies Catalog.Query
    expect(filterProducts(PRODUCTS, query).map(({ id }) => id)).toEqual(['2'])
  })

  it('filtre par prix en euros et par disponibilité', () => {
    const query = {
      ...DEFAULT_QUERY,
      priceMin: 10,
      priceMax: 30,
      inStock: true,
    } satisfies Catalog.Query
    expect(filterProducts(PRODUCTS, query).map(({ id }) => id)).toEqual(['1'])
  })
})

describe('countFacet', () => {
  it('compte chaque valeur en ignorant sa propre facette (comptage disjonctif)', () => {
    const query = { ...DEFAULT_QUERY, exposures: ['ombre'], sizes: ['M'] } satisfies Catalog.Query
    expect(countFacet(PRODUCTS, query, 'exposures', EXPOSURES)).toEqual([
      { value: 'soleil', count: 1 },
      { value: 'mi-ombre', count: 1 },
      { value: 'ombre', count: 0 },
    ])
  })
})

describe('sortProducts', () => {
  it('trie par prix croissant, décroissant et par nom', () => {
    expect(sortProducts(PRODUCTS, 'prix-asc').map(({ id }) => id)).toEqual(['4', '2', '1', '3'])
    expect(sortProducts(PRODUCTS, 'prix-desc').map(({ id }) => id)).toEqual(['3', '1', '2', '4'])
    expect(sortProducts(PRODUCTS, 'nom').map(({ name }) => name)).toEqual([
      'Anthurium',
      'Begonia',
      'Calathea',
      'Ficus',
    ])
  })

  it('garde l’ordre d’origine en pertinence', () => {
    expect(sortProducts(PRODUCTS, 'pertinence')).toEqual(PRODUCTS)
  })
})

describe('paginate', () => {
  it('découpe par pages et borne la page demandée', () => {
    const items = Array.from({ length: 25 }, (_, index) => index)
    expect(paginate(items, 3, 12)).toEqual({ items: [24], page: 3, pageCount: 3 })
    expect(paginate(items, 9, 12).page).toBe(3)
    expect(paginate([], 1, 12)).toEqual({ items: [], page: 1, pageCount: 1 })
  })
})
