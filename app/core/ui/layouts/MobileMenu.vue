<script setup lang="ts">
import { ref, useId, useTemplateRef, watch } from 'vue'

import { CATALOG_ROOT, MAIN_NAVIGATION } from '@/core/config'
import { Icon } from '@/core/ui/ui-kit'

import { useMenuDrillDown } from './composables/useMenuDrillDown'

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
  openCatalog,
  descend,
  back,
  reset,
  childHref,
} = useMenuDrillDown(() => title.value?.focus())

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
              @click="openCatalog"
            >
              {{ CATALOG_ROOT.label }}
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
          <li v-for="node in nodes" :key="node.slug">
            <button
              v-if="node.children.length"
              type="button"
              class="side-panel-link"
              :data-testid="`layout-mobile-menu-category-${node.slug}`"
              @click="descend(node.slug)"
            >
              {{ node.label }}
              <Icon name="chevron-right" />
            </button>
            <NuxtLink
              v-else
              :to="childHref(node.slug)"
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
