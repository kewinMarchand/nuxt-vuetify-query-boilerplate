import { computed, nextTick, ref } from 'vue'

import { CATALOG_ROOT, categoryHref, CATEGORY_TREE, findCategoryPath } from '@/core/config'

import type { CategoryNode } from '@/core/config'

const ROOT_TITLE = 'Menu'

export const useMenuDrillDown = (focusTitle: () => void) => {
  const level = ref<string[] | null>(null)

  const trail = computed(() => (level.value ? (findCategoryPath(level.value) ?? []) : []))
  const nodes = computed<CategoryNode[]>(() =>
    level.value === null ? [] : (trail.value.at(-1)?.children ?? CATEGORY_TREE),
  )
  const title = computed(() => {
    if (level.value === null) return ROOT_TITLE
    return trail.value.at(-1)?.label ?? CATALOG_ROOT.label
  })
  const parentTitle = computed(() => {
    if (!level.value?.length) return ROOT_TITLE
    return trail.value.at(-2)?.label ?? CATALOG_ROOT.label
  })
  const currentHref = computed(() => categoryHref(level.value ?? []))

  const goTo = async (next: string[] | null) => {
    level.value = next
    await nextTick()
    focusTitle()
  }

  return {
    level,
    nodes,
    title,
    parentTitle,
    currentHref,
    openCatalog: () => goTo([]),
    descend: (slug: string) => goTo([...(level.value ?? []), slug]),
    back: () => goTo(level.value?.length ? level.value.slice(0, -1) : null),
    reset: () => {
      level.value = null
    },
    childHref: (slug: string) => categoryHref([...(level.value ?? []), slug]),
  }
}
