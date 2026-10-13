import { ApiError, createApiClient } from '@/shared/api/client'

import { toCatalogPage, toCategory, toProductsQuery } from './http/catalogTranslation'

import type { Catalog } from '../domain/catalog'
import type { ApiClient } from '@/shared/api/client'

export interface CatalogRepository {
  findCategoryTree: () => Promise<Catalog.Category[]>
  findCatalogPage: (slugs: string[], query: Catalog.Query) => Promise<Catalog.Page>
}

export const createCatalogRepository = (api: ApiClient): CatalogRepository => ({
  findCategoryTree: async () => {
    const { data, response } = await api.GET('/api/categories')
    if (!data) throw new ApiError(response)
    return data.map(toCategory)
  },
  findCatalogPage: async (slugs, query) => {
    const { data, response } = await api.GET('/api/products', {
      params: { query: toProductsQuery(slugs, query) },
    })
    if (!data) throw new ApiError(response)
    return toCatalogPage(data, slugs)
  },
})

/** Dépôt d'une route serveur Nitro, hors application Vue. */
export const serverCatalogRepository = (apiUrl: string, scenario?: string | null) =>
  createCatalogRepository(createApiClient(apiUrl, scenario))
