<script setup lang="ts">
import { computed } from 'vue'

import { defineLazyHydrationComponent, useRoute } from '#imports'

import AppBreadcrumb from './AppBreadcrumb.vue'
import AppHeader from './AppHeader.vue'
import SkipLink from './SkipLink.vue'

import type { NavigationNode } from '@/shared/config'
import type { Breadcrumb } from '@/shared/seo'

const AppFooter = defineLazyHydrationComponent('visible', () => import('./AppFooter.vue'))

const { categoryMenu, breadcrumbTrail, currentLabel } = defineProps<{
  categoryMenu: NavigationNode
  breadcrumbTrail?: Breadcrumb.Item[] | null
  currentLabel?: string
}>()
const route = useRoute()
const isFullBleed = computed(() => route.meta.fullBleed === true && !currentLabel)
</script>

<template>
  <v-app>
    <SkipLink />
    <AppHeader :category-menu="categoryMenu" />
    <main id="main" tabindex="-1" class="flex-grow-1">
      <slot v-if="isFullBleed" />
      <div v-else class="app-container py-8">
        <AppBreadcrumb
          v-bind="currentLabel ? { currentLabel } : {}"
          :page-trail="breadcrumbTrail ?? null"
        />
        <slot />
      </div>
    </main>
    <AppFooter />
  </v-app>
</template>
