import {
  categoryTrail,
  listCategoryLinks,
  resolveCategoryPath,
  slugsFromPath,
  toCategoryMenu,
} from '@/modules/catalog/domain/categoryPath'
import { findCategoryTree } from '@/modules/catalog/infrastructure/catalogRepository'

export const getCategoryMenu = () => toCategoryMenu(findCategoryTree())

export const listCatalogLinks = () => listCategoryLinks(findCategoryTree())

/** Piste du fil d'Ariane d'une URL du catalogue, ou null hors du catalogue ou pour un slug inconnu. */
export const catalogTrailFor = (path: string) => {
  const slugs = slugsFromPath(path)
  const categoryPath = slugs && resolveCategoryPath(findCategoryTree(), slugs)
  return categoryPath ? categoryTrail(categoryPath) : null
}
