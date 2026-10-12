import { CatalogLoadError } from './CatalogLoadError'
import { resolveCategoryPath } from '../domain/categoryPath'
import { findCatalogPage, findCategoryTree } from '../infrastructure/catalogRepository'

import type { Catalog } from '../domain/catalog'

export type CategoryResolution =
  { status: 'not-found' } | { status: 'ok'; path: Catalog.CategoryPath }

/**
 * Cas d'utilisation « ouvrir une catégorie du catalogue » : valide les slugs contre l'arbre servi
 * par le dépôt. Introuvable (slug inconnu, chemin trop profond) : la couche de routage en fait un 404.
 */
export const resolveCatalogCategory = (slugs: string[]): CategoryResolution => {
  const path = resolveCategoryPath(findCategoryTree(), slugs)
  return path ? { status: 'ok', path } : { status: 'not-found' }
}

/**
 * Cas d'utilisation « afficher une page du catalogue » : interroge le dépôt et traduit son échec
 * en erreur de chargement, que l'interface affiche avec une relance.
 */
export const loadCatalogPage = async (
  slugs: string[],
  query: Catalog.Query,
): Promise<Catalog.Page> => {
  try {
    return await findCatalogPage(slugs, query)
  } catch (error) {
    console.error(error)
    throw new CatalogLoadError({ cause: error })
  }
}
