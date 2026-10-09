import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, onServerPrefetch, watch } from 'vue'

import { createError, showError, useRoute, useRouter } from '#imports'

import { findCategoryPath } from '@/core/config'
import { findCatalogPage } from '@/domains/catalog/api/catalogRepository'
import { CatalogLoadError } from '@/domains/catalog/common/exceptions/CatalogLoadError'
import {
  parseCatalogQuery,
  serializeCatalogQuery,
} from '@/domains/catalog/common/models/catalogQuery'

import type { Catalog } from '@/domains/catalog/common/models/catalog'

const MAX_DEPTH = 3

const NOT_FOUND = { statusCode: 404, fatal: true }

const toSlugs = (param: string | string[] | undefined) =>
  (Array.isArray(param) ? param : param ? [param] : []).filter(Boolean)

export const useCatalog = () => {
  const route = useRoute()
  const router = useRouter()

  const slugs = computed(() => toSlugs(route.params.slug))
  const categoryPath = computed(() =>
    slugs.value.length > MAX_DEPTH ? null : findCategoryPath(slugs.value),
  )
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
