import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, onServerPrefetch, watch } from 'vue'

import { createError, showError, useRoute, useRouter } from '#imports'

import { loadCatalogPage, resolveCatalogCategory } from '@/modules/catalog/application/catalogPage'
import { parseCatalogQuery, serializeCatalogQuery } from '@/modules/catalog/domain/catalogQuery'

import type { Catalog } from '@/modules/catalog/domain/catalog'

const NOT_FOUND = { statusCode: 404, fatal: true }

const toSlugs = (param: string | string[] | undefined) =>
  (Array.isArray(param) ? param : param ? [param] : []).filter(Boolean)

export const useCatalog = () => {
  const route = useRoute()
  const router = useRouter()

  const slugs = computed(() => toSlugs(route.params.slug))
  const resolution = computed(() => resolveCatalogCategory(slugs.value))
  const categoryPath = computed(() =>
    resolution.value.status === 'ok' ? resolution.value.path : null,
  )
  if (resolution.value.status === 'not-found') throw createError(NOT_FOUND)
  watch(resolution, ({ status }) => {
    if (status === 'not-found') showError(NOT_FOUND)
  })

  const query = computed(() => parseCatalogQuery(route.query))

  const catalog = useQuery({
    queryKey: ['catalog', slugs, query],
    queryFn: () => loadCatalogPage(slugs.value, query.value),
    placeholderData: keepPreviousData,
  })
  onServerPrefetch(() => catalog.suspense())

  const hrefFor = (next: Catalog.Query) =>
    router.resolve({ path: route.path, query: serializeCatalogQuery(next) }).fullPath

  const navigate = (next: Catalog.Query) =>
    router.push({ path: route.path, query: serializeCatalogQuery(next) })

  return { slugs, categoryPath, query, catalog, hrefFor, navigate }
}
