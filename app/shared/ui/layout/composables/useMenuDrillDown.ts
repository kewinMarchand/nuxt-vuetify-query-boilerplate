import { computed, ref } from 'vue'

import type { NavigationNode } from '@/shared/config'

const ROOT_TITLE = 'Menu'

const findChain = (root: NavigationNode, ids: string[]): NavigationNode[] => {
  const chain: NavigationNode[] = []
  let level = root.children
  for (const id of ids) {
    const node = level.find((candidate) => candidate.id === id)
    if (!node) break
    chain.push(node)
    level = node.children
  }
  return chain
}

export const useMenuDrillDown = (menu: () => NavigationNode) => {
  const level = ref<string[] | null>(null)

  const trail = computed(() => (level.value ? findChain(menu(), level.value) : []))
  const nodes = computed<NavigationNode[]>(() =>
    level.value === null ? [] : (trail.value.at(-1)?.children ?? menu().children),
  )
  const title = computed(() => {
    if (level.value === null) return ROOT_TITLE
    return trail.value.at(-1)?.label ?? menu().label
  })
  const parentTitle = computed(() => {
    if (!level.value?.length) return ROOT_TITLE
    return trail.value.at(-2)?.label ?? menu().label
  })
  const currentHref = computed(() => trail.value.at(-1)?.href ?? menu().href)

  const goTo = (next: string[] | null) => {
    level.value = next
  }

  return {
    level,
    nodes,
    title,
    parentTitle,
    currentHref,
    openRoot: () => goTo([]),
    descend: (id: string) => goTo([...(level.value ?? []), id]),
    back: () => goTo(level.value?.length ? level.value.slice(0, -1) : null),
    reset: () => {
      level.value = null
    },
  }
}
