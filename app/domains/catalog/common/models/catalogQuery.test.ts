import {
  clearFilters,
  DEFAULT_QUERY,
  parseCatalogQuery,
  serializeCatalogQuery,
  withFilters,
} from './catalogQuery'

describe('parseCatalogQuery', () => {
  it('lit les clés répétées, les prix en euros et ignore les valeurs invalides', () => {
    expect(
      parseCatalogQuery({
        exposition: ['ombre', 'lune', 'soleil'],
        taille: 'XL',
        prix_min: '10',
        prix_max: '-4',
        en_stock: '1',
        tri: 'hasard',
        vue: 'liste',
        page: '0',
      }),
    ).toEqual({
      ...DEFAULT_QUERY,
      exposures: ['soleil', 'ombre'],
      priceMin: 10,
      inStock: true,
      view: 'liste',
    })
  })

  it('fait l’aller-retour avec la sérialisation sans paramètre par défaut', () => {
    const raw = { exposition: ['mi-ombre'], tri: 'prix-asc', vue: 'liste', page: '2' }
    expect(serializeCatalogQuery(parseCatalogQuery(raw))).toEqual(raw)
    expect(serializeCatalogQuery(DEFAULT_QUERY)).toEqual({})
  })
})

describe('withFilters et clearFilters', () => {
  const query = {
    ...DEFAULT_QUERY,
    sizes: ['L' as const],
    sort: 'nom' as const,
    view: 'liste' as const,
    page: 3,
  }

  it('remet la page à 1 et conserve les autres paramètres', () => {
    expect(withFilters(query, { inStock: true })).toEqual({ ...query, inStock: true, page: 1 })
  })

  it('retire filtres et tri mais garde la vue', () => {
    expect(clearFilters(query)).toEqual({ ...DEFAULT_QUERY, view: 'liste' })
  })
})
