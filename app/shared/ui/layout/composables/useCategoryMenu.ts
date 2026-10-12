import { computed, onBeforeUnmount, ref, watch } from 'vue'

import type { NavigationNode } from '@/shared/config'
import type { Ref } from 'vue'

export interface MenuColumn {
  depth: number
  nodes: NavigationNode[]
}

export const useCategoryMenu = (
  root: Ref<HTMLElement | null>,
  menu: () => NavigationNode,
  onEscape: () => void,
) => {
  const isOpen = ref(false)
  const openPath = ref<string[]>([])

  const columns = computed<MenuColumn[]>(() => {
    let nodes = menu().children
    const result: MenuColumn[] = [{ depth: 0, nodes }]
    openPath.value.forEach((id, depth) => {
      const node = nodes.find((candidate) => candidate.id === id)
      if (!node?.children.length) return
      nodes = node.children
      result.push({ depth: depth + 1, nodes })
    })
    return result
  })

  const isExpanded = (depth: number, id: string) => openPath.value[depth] === id

  const reveal = (depth: number, node: NavigationNode) => {
    const parents = openPath.value.slice(0, depth)
    openPath.value = node.children.length ? [...parents, node.id] : parents
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
