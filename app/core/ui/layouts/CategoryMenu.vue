<script setup lang="ts">
import { nextTick, ref, useId, useTemplateRef, watch } from 'vue'

import { CATALOG_ROOT, categoryHref } from '@/core/config'
import { Icon } from '@/core/ui/ui-kit'

import { useCategoryMenu } from './composables/useCategoryMenu'

const panelId = useId()
const root = useTemplateRef<HTMLElement>('root')
const toggleButton = useTemplateRef<HTMLButtonElement>('toggleButton')
const columnId = (depth: number) => `${panelId}-${depth}`

const { isOpen, columns, isExpanded, reveal, close, toggle, onKeydown } = useCategoryMenu(
  root,
  () => toggleButton.value?.focus(),
)

const panel = useTemplateRef<HTMLElement>('panel')
const alignEnd = ref(false)

watch([isOpen, columns], async () => {
  await nextTick()
  if (!isOpen.value || !panel.value || !toggleButton.value) return
  const button = toggleButton.value.getBoundingClientRect()
  alignEnd.value = button.left + panel.value.offsetWidth > document.documentElement.clientWidth
})
</script>

<template>
  <div ref="root" class="category-menu" @keydown="onKeydown">
    <NuxtLink :to="CATALOG_ROOT.href" class="header-link no-js-only">
      {{ CATALOG_ROOT.label }}
    </NuxtLink>
    <button
      ref="toggleButton"
      type="button"
      class="header-link requires-js"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="panelId"
      data-testid="layout-category-menu-toggle"
      @click="toggle"
    >
      {{ CATALOG_ROOT.label }}
      <Icon name="chevron-down" />
    </button>
    <div
      v-show="isOpen"
      :id="panelId"
      ref="panel"
      class="category-panel"
      :class="{ 'is-end-aligned': alignEnd }"
      data-testid="layout-category-menu"
    >
      <NuxtLink
        :to="CATALOG_ROOT.href"
        class="category-link category-all"
        data-testid="layout-category-link"
        @click="close"
      >
        Tout le catalogue
      </NuxtLink>
      <div class="category-columns">
        <ul
          v-for="column in columns"
          :id="columnId(column.depth)"
          :key="column.depth"
          class="category-column"
        >
          <li v-for="node in column.nodes" :key="node.slug">
            <NuxtLink
              :to="categoryHref([...column.parents, node.slug])"
              class="category-link"
              :aria-expanded="
                node.children.length ? isExpanded(column.depth, node.slug) : undefined
              "
              :aria-controls="
                isExpanded(column.depth, node.slug) ? columnId(column.depth + 1) : undefined
              "
              data-testid="layout-category-link"
              @mouseenter="reveal(column.depth, node)"
              @focus="reveal(column.depth, node)"
              @click="close"
            >
              {{ node.label }}
              <Icon v-if="node.children.length" name="chevron-right" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-panel {
  position: absolute;
  width: max-content;
  inset-block-start: 100%;
  inset-inline-start: 0;
  z-index: var(--app-z-menu);
  padding: 8px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  border-radius: 8px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
}

.category-panel.is-end-aligned {
  inset-inline-start: auto;
  inset-inline-end: 0;
}

.category-columns {
  display: flex;
}

.category-column {
  flex: 0 0 240px;
  padding: 0;
  list-style: none;
}

.category-column + .category-column {
  border-left: 1px solid rgb(0 0 0 / 0.12);
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding-inline: 12px;
  color: inherit;
  text-decoration: none;
  border-radius: 4px;
}

.category-link:hover,
.category-link[aria-expanded='true'] {
  background: rgba(var(--v-theme-primary), 0.08);
}

.category-all {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}
</style>
