import { EXPOSURE_LABELS, SIZE_LABELS } from './labels'
import { withFilters } from '../domain/catalogQuery'

import type { Catalog } from '../domain/catalog'

export interface ActiveFilter {
  id: string
  label: string
  query: Catalog.Query
}

export const describeActiveFilters = (query: Catalog.Query): ActiveFilter[] => [
  ...query.exposures.map((value) => ({
    id: `exposition-${value}`,
    label: EXPOSURE_LABELS[value],
    query: withFilters(query, { exposures: query.exposures.filter((other) => other !== value) }),
  })),
  ...query.sizes.map((value) => ({
    id: `taille-${value}`,
    label: SIZE_LABELS[value],
    query: withFilters(query, { sizes: query.sizes.filter((other) => other !== value) }),
  })),
  ...(query.priceMin !== null
    ? [
        {
          id: 'prix-min',
          label: `Dès ${query.priceMin} €`,
          query: withFilters(query, { priceMin: null }),
        },
      ]
    : []),
  ...(query.priceMax !== null
    ? [
        {
          id: 'prix-max',
          label: `Jusqu’à ${query.priceMax} €`,
          query: withFilters(query, { priceMax: null }),
        },
      ]
    : []),
  ...(query.inStock
    ? [{ id: 'en-stock', label: 'En stock', query: withFilters(query, { inStock: false }) }]
    : []),
]
