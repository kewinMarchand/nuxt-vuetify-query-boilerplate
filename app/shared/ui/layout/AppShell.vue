<script setup lang="ts">
import { computed } from 'vue'

import { defineLazyHydrationComponent, useRoute } from '#imports'

import AppBreadcrumb from './AppBreadcrumb.vue'
import AppHeader from './AppHeader.vue'
import SkipLink from './SkipLink.vue'

const AppFooter = defineLazyHydrationComponent('visible', () => import('./AppFooter.vue'))

const { currentLabel } = defineProps<{ currentLabel?: string }>()
const route = useRoute()
const isFullBleed = computed(() => route.meta.fullBleed === true && !currentLabel)
</script>

<template>
  <v-app>
    <SkipLink />
    <AppHeader />
    <main id="main" tabindex="-1" class="flex-grow-1">
      <slot v-if="isFullBleed" />
      <div v-else class="app-container py-8">
        <AppBreadcrumb v-bind="currentLabel ? { currentLabel } : {}" />
        <slot />
      </div>
    </main>
    <AppFooter />
  </v-app>
</template>
