import { computed, onBeforeUnmount, ref, watch } from 'vue'

import { CATEGORY_TREE } from '@/core/config'

import type { CategoryNode } from '@/core/config'
import type { Ref } from 'vue'

export interface MenuColumn {
  depth: number
  parents: string[]
  nodes: CategoryNode[]
}

export const useCategoryMenu = (root: Ref<HTMLElement | null>, onEscape: () => void) => {
  const isOpen = ref(false)
  const openPath = ref<string[]>([])

  const columns = computed<MenuColumn[]>(() => {
    const result: MenuColumn[] = [{ depth: 0, parents: [], nodes: CATEGORY_TREE }]
    let nodes = CATEGORY_TREE
    openPath.value.forEach((slug, depth) => {
      const node = nodes.find((candidate) => candidate.slug === slug)
      if (!node?.children.length) return
      nodes = node.children
      result.push({ depth: depth + 1, parents: openPath.value.slice(0, depth + 1), nodes })
    })
    return result
  })

  const isExpanded = (depth: number, slug: string) => openPath.value[depth] === slug

  const reveal = (depth: number, node: CategoryNode) => {
    const parents = openPath.value.slice(0, depth)
    openPath.value = node.children.length ? [...parents, node.slug] : parents
  }

  const close = () => {
    isOpen.value = false
    openPath.value = []
  }

  const toggle = () => {
    if (isOpen.value) close()
    else isOpen.value = true
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.target instanceof Node && !root.value?.contains(event.target)) close()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !isOpen.value) return
    close()
    onEscape()
  }

  watch(isOpen, (open) => {
    if (open) document.addEventListener('pointerdown', onPointerDown)
    else document.removeEventListener('pointerdown', onPointerDown)
  })

  onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))

  return { isOpen, columns, isExpanded, reveal, close, toggle, onKeydown }
}
