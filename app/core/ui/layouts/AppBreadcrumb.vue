<script setup lang="ts">
import { computed } from 'vue'

import { useRoute } from '#imports'

import { buildBreadcrumb } from '@/core/seo'

import type { Breadcrumb } from '@/core/seo'

const { currentLabel, trail } = defineProps<{ currentLabel?: string; trail?: Breadcrumb.Item[] }>()
const route = useRoute()
const items = computed(() => trail ?? buildBreadcrumb(route.path, currentLabel))
</script>

<template>
  <nav
    v-if="items.length > 1"
    aria-label="Fil d'Ariane"
    class="breadcrumb"
    data-testid="layout-breadcrumb"
  >
    <ol>
      <li v-for="(item, index) in items" :key="item.href">
        <span v-if="index === items.length - 1" aria-current="page">{{ item.label }}</span>
        <NuxtLink v-else :to="item.href">{{ item.label }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  list-style: none;
  margin-bottom: 16px;
  font-size: calc(14px * var(--app-font-scale));
}

.breadcrumb li {
  display: inline-flex;
  align-items: center;
}

.breadcrumb li + li::before {
  content: '›';
  margin-inline: 8px;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.breadcrumb a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: rgb(var(--v-theme-primary));
}
</style>
