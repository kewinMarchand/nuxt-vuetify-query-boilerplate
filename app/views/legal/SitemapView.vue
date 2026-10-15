<script setup lang="ts">
import { computed } from 'vue'

import { LEGAL_NAVIGATION, MAIN_NAVIGATION } from '@/shared/config'

import { CATALOG_ROOT, useCatalogNavigation } from '@/modules/catalog'

const { catalogLinks } = await useCatalogNavigation()
const sections = computed(() => [
  { id: 'plan-du-site-principal', title: 'Pages principales', items: MAIN_NAVIGATION },
  {
    id: 'plan-du-site-catalogue',
    title: 'Catalogue',
    items: [CATALOG_ROOT, ...catalogLinks.value],
  },
  { id: 'plan-du-site-legal', title: 'Informations légales', items: LEGAL_NAVIGATION },
])
</script>

<template>
  <h1>Plan du site</h1>
  <section v-for="section in sections" :key="section.id" :aria-labelledby="section.id">
    <h2 :id="section.id">{{ section.title }}</h2>
    <ul class="sitemap-list">
      <li v-for="item in section.items" :key="item.href" data-testid="legal-sitemap-item">
        <NuxtLink :to="item.href" class="sitemap-link text-primary">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.sitemap-list {
  padding-left: 24px;
}

.sitemap-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
</style>
