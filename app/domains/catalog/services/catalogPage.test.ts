import { buildCatalogPage } from './catalogPage'
import { PRODUCTS } from '../api/products'
import { DEFAULT_QUERY } from '../common/models/catalogQuery'

describe('buildCatalogPage', () => {
  it('liste les 24 produits à la racine, 12 par page', () => {
    const page = buildCatalogPage(PRODUCTS, [], DEFAULT_QUERY)
    expect(page.total).toBe(24)
    expect(page.items).toHaveLength(12)
    expect(page.pageCount).toBe(2)
  })

  it('restreint aux produits de la branche et compte ses sous-catégories', () => {
    const page = buildCatalogPage(PRODUCTS, ['plantes-interieur', 'feuillages'], DEFAULT_QUERY)
    expect(page.total).toBe(6)
    expect(page.facets.categories).toEqual([
      {
        slug: 'monstera',
        label: 'Monstera',
        href: '/catalogue/plantes-interieur/feuillages/monstera',
        count: 3,
      },
      {
        slug: 'fougeres',
        label: 'Fougères',
        href: '/catalogue/plantes-interieur/feuillages/fougeres',
        count: 3,
      },
    ])
  })
})
