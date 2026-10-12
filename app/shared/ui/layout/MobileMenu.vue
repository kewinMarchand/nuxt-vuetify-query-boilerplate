<script setup lang="ts">
import { ref, useId, useTemplateRef, watch } from 'vue'

import { MAIN_NAVIGATION } from '@/shared/config'
import { Icon } from '@/shared/ui/kit'

import { useMenuDrillDown } from './composables/useMenuDrillDown'

import type { NavigationNode } from '@/shared/config'

const { menu } = defineProps<{ menu: NavigationNode }>()

const isOpen = ref(false)
const titleId = useId()
const panelId = useId()
const title = useTemplateRef<HTMLElement>('title')

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
} = useMenuDrillDown(
  () => menu,
  () => title.value?.focus(),
)

const close = () => {
  isOpen.value = false
}

watch(isOpen, (open) => {
  if (!open) reset()
})
</script>

<template>
  <v-dialog
    v-model="isOpen"
    :aria-labelledby="titleId"
    content-class="side-panel"
    transition="slide-x-reverse-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="outlined"
        class="requires-js"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-controls="panelId"
        data-testid="layout-mobile-menu-toggle"
      >
        <template #prepend>
          <Icon name="menu" />
        </template>
        Menu
      </v-btn>
    </template>

    <div :id="panelId" class="side-panel-body" data-testid="layout-mobile-menu">
      <div class="d-flex align-center justify-space-between ga-2 mb-4">
        <h2
          :id="titleId"
          ref="title"
          tabindex="-1"
          class="side-panel-title"
          data-testid="layout-mobile-menu-title"
        >
          {{ levelTitle }}
        </h2>
        <v-btn icon variant="text" aria-label="Fermer le menu" @click="close">
          <Icon name="close" />
        </v-btn>
      </div>

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
          class="side-panel-link font-weight-bold"
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
    </div>
  </v-dialog>
</template>
