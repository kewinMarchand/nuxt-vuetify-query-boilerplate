import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, onServerPrefetch, watch } from 'vue'

import { createError, showError, useRoute, useRouter } from '#imports'

import { parseCatalogQuery, serializeCatalogQuery } from '@/modules/catalog/domain/catalogQuery'
import { resolveCategoryPath } from '@/modules/catalog/domain/categoryPath'
import { CatalogLoadError } from '@/modules/catalog/infrastructure/CatalogLoadError'
import {
  findCatalogPage,
  findCategoryTree,
} from '@/modules/catalog/infrastructure/catalogRepository'

import type { Catalog } from '@/modules/catalog/domain/catalog'

const NOT_FOUND = { statusCode: 404, fatal: true }

const toSlugs = (param: string | string[] | undefined) =>
  (Array.isArray(param) ? param : param ? [param] : []).filter(Boolean)

export const useCatalog = () => {
  const route = useRoute()
  const router = useRouter()

  const slugs = computed(() => toSlugs(route.params.slug))
  const categoryPath = computed(() => resolveCategoryPath(findCategoryTree(), slugs.value))
  if (!categoryPath.value) throw createError(NOT_FOUND)
  watch(categoryPath, (path) => {
    if (!path) showError(NOT_FOUND)
  })

  const query = computed(() => parseCatalogQuery(route.query))

  const catalog = useQuery({
    queryKey: ['catalog', slugs, query],
    queryFn: async () => {
      try {
        return await findCatalogPage(slugs.value, query.value)
      } catch (error) {
        console.error(error)
        throw new CatalogLoadError({ cause: error })
      }
    },
    placeholderData: keepPreviousData,
  })
  onServerPrefetch(() => catalog.suspense())

  const hrefFor = (next: Catalog.Query) =>
    router.resolve({ path: route.path, query: serializeCatalogQuery(next) }).fullPath

  const navigate = (next: Catalog.Query) =>
    router.push({ path: route.path, query: serializeCatalogQuery(next) })

  return { slugs, categoryPath, query, catalog, hrefFor, navigate }
}
