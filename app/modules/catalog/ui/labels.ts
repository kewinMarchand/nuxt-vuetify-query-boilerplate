import type { Catalog } from '../domain/catalog'

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
