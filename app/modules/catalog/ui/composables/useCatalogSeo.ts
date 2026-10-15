import { computed } from 'vue'
import { useRuntimeConfig } from '#imports'

import { usePageSeo } from '@/shared/seo'

import { PAGE_SIZE } from '@/modules/catalog/domain/catalog'
import { isRefined } from '@/modules/catalog/domain/catalogQuery'
import { categoryTrail } from '@/modules/catalog/domain/categoryPath'

import type { Catalog } from '@/modules/catalog/domain/catalog'
import type { ComputedRef, Ref } from 'vue'

export const useCatalogSeo = (
  path: ComputedRef<string>,
  title: ComputedRef<string>,
  categoryPath: ComputedRef<Catalog.CategoryPath | null>,
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
    breadcrumbTrail: () => (categoryPath.value ? categoryTrail(categoryPath.value) : null),
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
          position: (currentPage.value - 1) * PAGE_SIZE + index + 1,
          name: product.name,
          url: `${new URL(path.value, siteUrl).href}#produit-${product.slug}`,
        })),
      },
    ],
  })
}
