<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'

defineProps<{
  filters: { id: string; label: string; href: string }[]
  clearHref: string
}>()
</script>

<template>
  <div class="active-filters a11y-chrome" data-testid="catalog-active-filters">
    <ul>
      <li v-for="filter in filters" :key="filter.id">
        <NuxtLink :to="filter.href" class="chip" data-testid="catalog-active-filter">
          <span class="d-sr-only">Retirer le filtre : </span>{{ filter.label }}
          <Icon name="close" :size="16" />
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink :to="clearHref" class="clear-link" data-testid="catalog-clear-filters">
      Tout effacer
    </NuxtLink>
  </div>
</template>

<style scoped>
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.active-filters ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.chip,
.clear-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding-inline: 12px;
  border-radius: 22px;
  color: rgb(var(--v-theme-primary));
}

.chip {
  border: 1px solid currentColor;
  text-decoration: none;
}
</style>
