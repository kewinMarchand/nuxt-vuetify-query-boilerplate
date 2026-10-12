import { z } from 'zod'

import type { Catalog } from './catalog'

export const EXPOSURES: Catalog.Exposure[] = ['soleil', 'mi-ombre', 'ombre']
export const SIZES: Catalog.Size[] = ['S', 'M', 'L']
export const SORTS: Catalog.Sort[] = ['pertinence', 'prix-asc', 'prix-desc', 'nom']

export const EXPOSURE_LABELS: Record<Catalog.Exposure, string> = {
  soleil: 'Soleil',
  'mi-ombre': 'Mi-ombre',
  ombre: 'Ombre',
}
export const SIZE_LABELS: Record<Catalog.Size, string> = {
  S: 'Petite (S)',
  M: 'Moyenne (M)',
  L: 'Grande (L)',
}
export const SORT_LABELS: Record<Catalog.Sort, string> = {
  pertinence: 'Pertinence',
  'prix-asc': 'Prix croissant',
  'prix-desc': 'Prix décroissant',
  nom: 'Nom',
}

export const DEFAULT_QUERY: Catalog.Query = {
  exposures: [],
  sizes: [],
  priceMin: null,
  priceMax: null,
  inStock: false,
  sort: 'pertinence',
  view: 'grille',
  page: 1,
}

type RawQuery = Record<string, string | null | (string | null)[] | undefined>

const toArray = (value: unknown) => (Array.isArray(value) ? value : value == null ? [] : [value])
const first = (value: unknown) => toArray(value)[0]

const listOf = <TValue extends string>(allowed: readonly TValue[]) =>
  z.preprocess(
    toArray,
    z
      .array(z.unknown())
      .transform((values) => allowed.filter((candidate) => values.includes(candidate))),
  )

const euros = z.preprocess((value) => {
  const raw = first(value)
  return raw === undefined || raw === null || raw === '' ? null : Number(raw)
}, z.number().int().nonnegative().nullable().catch(null))

const querySchema = z.object({
  exposition: listOf(EXPOSURES),
  taille: listOf(SIZES),
  prix_min: euros,
  prix_max: euros,
  en_stock: z.preprocess(first, z.literal('1').optional().catch(undefined)),
  tri: z.preprocess(first, z.enum(SORTS).catch('pertinence')),
  vue: z.preprocess(first, z.enum(['grille', 'liste']).catch('grille')),
  page: z.preprocess(first, z.coerce.number().int().min(1).catch(1)),
})

export const parseCatalogQuery = (raw: RawQuery): Catalog.Query => {
  const parsed = querySchema.parse(raw)
  return {
    exposures: parsed.exposition,
    sizes: parsed.taille,
    priceMin: parsed.prix_min,
    priceMax: parsed.prix_max,
    inStock: parsed.en_stock === '1',
    sort: parsed.tri,
    view: parsed.vue,
    page: parsed.page,
  }
}

export const serializeCatalogQuery = (query: Catalog.Query): Record<string, string | string[]> => ({
  ...(query.exposures.length && { exposition: query.exposures }),
  ...(query.sizes.length && { taille: query.sizes }),
  ...(query.priceMin !== null && { prix_min: String(query.priceMin) }),
  ...(query.priceMax !== null && { prix_max: String(query.priceMax) }),
  ...(query.inStock && { en_stock: '1' }),
  ...(query.sort !== 'pertinence' && { tri: query.sort }),
  ...(query.view !== 'grille' && { vue: query.view }),
  ...(query.page > 1 && { page: String(query.page) }),
})

export const hasActiveFilters = (query: Catalog.Query) =>
  query.exposures.length > 0 ||
  query.sizes.length > 0 ||
  query.priceMin !== null ||
  query.priceMax !== null ||
  query.inStock

export const isRefined = (query: Catalog.Query) =>
  hasActiveFilters(query) || query.sort !== 'pertinence'

export const activeFilterCount = (query: Catalog.Query) =>
  query.exposures.length +
  query.sizes.length +
  Number(query.priceMin !== null) +
  Number(query.priceMax !== null) +
  Number(query.inStock)

export const withFilters = (
  query: Catalog.Query,
  patch: Partial<Catalog.Query>,
): Catalog.Query => ({
  ...query,
  ...patch,
  page: 1,
})

export const clearFilters = (query: Catalog.Query): Catalog.Query => ({
  ...DEFAULT_QUERY,
  view: query.view,
})

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

export const toFormFields = (query: Catalog.Query, omitted: string[]) =>
  Object.entries(serializeCatalogQuery({ ...query, page: 1 }))
    .filter(([name]) => !omitted.includes(name))
    .flatMap(([name, value]) =>
      (Array.isArray(value) ? value : [value]).map((item) => ({ name, value: item })),
    )

export const formDataToQuery = (formData: FormData, current: Catalog.Query): Catalog.Query => {
  const raw: Record<string, string[]> = {}
  formData.forEach((value, key) => {
    if (typeof value === 'string') raw[key] = [...(raw[key] ?? []), value]
  })
  return { ...parseCatalogQuery(raw), page: 1, view: current.view }
}
