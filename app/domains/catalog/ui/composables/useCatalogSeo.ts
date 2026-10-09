import { computed } from 'vue'

import { useRuntimeConfig } from '#imports'

import { usePageSeo } from '@/core/seo'
import { isRefined } from '@/domains/catalog/common/models/catalogQuery'

import type { Catalog } from '@/domains/catalog/common/models/catalog'
import type { ComputedRef, Ref } from 'vue'

export const useCatalogSeo = (
  path: ComputedRef<string>,
  title: ComputedRef<string>,
  query: ComputedRef<Catalog.Query>,
  page: Ref<Catalog.Page | undefined>,
  hrefForPage: (page: number) => string,
) => {
  const { siteUrl } = useRuntimeConfig().public
  const currentPage = computed(() => page.value?.page ?? 1)

  usePageSeo({
    title: () =>
      currentPage.value > 1 ? `${title.value}, page ${currentPage.value}` : title.value,
    description: () =>
      `${title.value} : plantes tropicales de la jardinerie de démonstration, filtrables par exposition, taille, prix et disponibilité.`,
    canonicalPath: () =>
      currentPage.value > 1 ? `${path.value}?page=${currentPage.value}` : path.value,
    noindex: () => isRefined(query.value),
    pagination: () => ({
      ...(currentPage.value > 1 && { prev: hrefForPage(currentPage.value - 1) }),
      ...(page.value &&
        currentPage.value < page.value.pageCount && { next: hrefForPage(currentPage.value + 1) }),
    }),
    jsonLd: () => [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title.value,
        itemListElement: (page.value?.items ?? []).map((product, index) => ({
          '@type': 'ListItem',
          position: (currentPage.value - 1) * 12 + index + 1,
          name: product.name,
          url: `${new URL(path.value, siteUrl).href}#produit-${product.slug}`,
        })),
      },
    ],
  })
}
