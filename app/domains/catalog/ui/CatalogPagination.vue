<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/core/ui/ui-kit'

import { paginationWindow } from '../common/models/catalogFilters'

const { page, pageCount, hrefFor } = defineProps<{
  page: number
  pageCount: number
  hrefFor: (page: number) => string
}>()

const entries = computed(() => paginationWindow(page, pageCount))
</script>

<template>
  <nav
    v-if="pageCount > 1"
    aria-label="Pagination"
    class="pagination a11y-chrome"
    data-testid="catalog-pagination"
  >
    <ul>
      <li>
        <NuxtLink
          v-if="page > 1"
          :to="hrefFor(page - 1)"
          rel="prev"
          class="page-link"
          data-testid="catalog-pagination-prev"
        >
          <Icon name="chevron-left" />
          Précédent
        </NuxtLink>
        <span v-else class="page-link is-disabled">
          <Icon name="chevron-left" />
          Précédent
        </span>
      </li>
      <li v-for="(entry, index) in entries" :key="`${entry}-${index}`">
        <span v-if="entry === 'ellipsis'" class="page-link">…</span>
        <span v-else-if="entry === page" class="page-link is-current" aria-current="page">
          <span class="d-sr-only">Page </span>{{ entry }}
        </span>
        <NuxtLink
          v-else
          :to="hrefFor(entry)"
          class="page-link"
          :data-testid="`catalog-pagination-page-${entry}`"
        >
          <span class="d-sr-only">Page </span>{{ entry }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          v-if="page < pageCount"
          :to="hrefFor(page + 1)"
          rel="next"
          class="page-link"
          data-testid="catalog-pagination-next"
        >
          Suivant
          <Icon name="chevron-right" />
        </NuxtLink>
        <span v-else class="page-link is-disabled">
          Suivant
          <Icon name="chevron-right" />
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  list-style: none;
  margin-block: 32px 0;
}

.page-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 44px;
  min-height: 44px;
  padding-inline: 8px;
  border-radius: 4px;
  color: rgb(var(--v-theme-primary));
}

.is-current {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  font-weight: 700;
}

.is-disabled {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
</style>
