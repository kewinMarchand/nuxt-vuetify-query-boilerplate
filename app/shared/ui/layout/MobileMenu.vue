<script setup lang="ts">
import { ref, useId, watch } from 'vue'

import { Drawer } from '@kewinmarchand/boilerplates-ui/vue'

import { MAIN_NAVIGATION } from '@/shared/config'
import { Icon } from '@/shared/ui/kit'

import { useMenuDrillDown } from './composables/useMenuDrillDown'

import type { NavigationNode } from '@/shared/config'

const { menu } = defineProps<{ menu: NavigationNode }>()

const isOpen = ref(false)
const panelId = useId()

const {
  level,
  nodes,
  title: levelTitle,
  parentTitle,
  currentHref,
  openRoot,
  descend,
  back,
  reset,
} = useMenuDrillDown(() => menu)

const close = () => {
  isOpen.value = false
}

watch(isOpen, (open) => {
  if (!open) reset()
})
</script>

<template>
  <button
    type="button"
    class="bui-button bui-button--nav bui-button--icon mobile-menu-toggle requires-js"
    aria-label="Menu"
    aria-haspopup="dialog"
    :aria-expanded="isOpen ? 'true' : 'false'"
    :aria-controls="panelId"
    data-testid="layout-mobile-menu-toggle"
    @click="isOpen = true"
  >
    <Icon name="menu" />
  </button>

  <Drawer
    :id="panelId"
    :title="levelTitle"
    :open="isOpen"
    close-label="Fermer le menu"
    focus-title
    data-testid="layout-mobile-menu"
    @close="close"
  >
    <nav v-if="level === null" aria-label="Navigation principale">
      <ul class="side-panel-list">
        <li v-for="item in MAIN_NAVIGATION" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="side-panel-link"
            data-testid="layout-mobile-menu-link"
            @click="close"
            >{{ item.label }}</NuxtLink
          >
        </li>
        <li>
          <button
            type="button"
            class="side-panel-link"
            data-testid="layout-mobile-menu-catalog"
            @click="openRoot"
          >
            {{ menu.label }}
            <Icon name="chevron-right" />
          </button>
        </li>
      </ul>
    </nav>

    <nav v-else :aria-label="`Catalogue : ${levelTitle}`">
      <button
        type="button"
        class="side-panel-link side-panel-back"
        data-testid="layout-mobile-menu-back"
        @click="back"
      >
        <Icon name="chevron-left" />
        Retour à {{ parentTitle }}
      </button>
      <NuxtLink
        :to="currentHref"
        class="side-panel-link side-panel-all"
        data-testid="layout-mobile-menu-all"
        @click="close"
      >
        {{ level.length ? 'Voir toute la catégorie' : 'Tout le catalogue' }}
      </NuxtLink>
      <ul class="side-panel-list">
        <li v-for="node in nodes" :key="node.id">
          <button
            v-if="node.children.length"
            type="button"
            class="side-panel-link"
            :data-testid="`layout-mobile-menu-category-${node.id}`"
            @click="descend(node.id)"
          >
            {{ node.label }}
            <Icon name="chevron-right" />
          </button>
          <NuxtLink
            v-else
            :to="node.href"
            class="side-panel-link"
            data-testid="layout-category-link"
            @click="close"
          >
            {{ node.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Drawer>
</template>

<style scoped>
.mobile-menu-toggle {
  border-color: currentcolor;
}

.side-panel-all {
  font-weight: var(--bui-font-weight-bold);
}
</style>
