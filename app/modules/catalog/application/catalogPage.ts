import { resolveCategoryPath } from '../domain/categoryPath'
import { CatalogLoadError } from './CatalogLoadError'

import type { Catalog } from '../domain/catalog'
import type { CatalogRepository } from '../infrastructure/catalogRepository'

export type CategoryResolution =
  { status: 'not-found' } | { status: 'ok'; path: Catalog.CategoryPath }

/**
 * Cas d'utilisation « ouvrir une catégorie du catalogue » : valide les slugs contre l'arbre servi
 * par l'API. Introuvable (slug inconnu, chemin trop profond) : la couche de routage en fait un 404.
 */
export const resolveCatalogCategory = (
  tree: Catalog.Category[],
  slugs: string[],
): CategoryResolution => {
  const path = resolveCategoryPath(tree, slugs)
  return path ? { status: 'ok', path } : { status: 'not-found' }
}

/**
 * Cas d'utilisation « afficher une page du catalogue » : interroge le dépôt et traduit son échec
 * en erreur de chargement, que l'interface affiche avec une relance.
 */
export const loadCatalogPage = async (
  repository: CatalogRepository,
  slugs: string[],
  query: Catalog.Query,
): Promise<Catalog.Page> => {
  try {
    return await repository.findCatalogPage(slugs, query)
  } catch (error) {
    console.error(error)
    throw new CatalogLoadError({ cause: error })
  }
}

/** Page demandée au-delà de la dernière : la couche de routage en fait un 404, comme une catégorie inconnue. */
export const isBeyondLastPage = (page: Catalog.Page, query: Catalog.Query) =>
  query.page > page.pageCount
