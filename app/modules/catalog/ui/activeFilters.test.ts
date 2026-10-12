import { describeActiveFilters } from './activeFilters'
import { DEFAULT_QUERY } from '../domain/catalogQuery'

describe('describeActiveFilters', () => {
  it('décrit chaque filtre avec son libellé et la requête qui le retire, page remise à 1', () => {
    const query = { ...DEFAULT_QUERY, exposures: ['mi-ombre' as const], inStock: true, page: 2 }

    expect(describeActiveFilters(query)).toEqual([
      { id: 'exposition-mi-ombre', label: 'Mi-ombre', query: { ...query, exposures: [], page: 1 } },
      { id: 'en-stock', label: 'En stock', query: { ...query, inStock: false, page: 1 } },
    ])
  })
})
