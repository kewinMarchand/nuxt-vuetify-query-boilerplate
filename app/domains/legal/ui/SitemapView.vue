<script setup lang="ts">
import { CATALOG_NAVIGATION, LEGAL_NAVIGATION, MAIN_NAVIGATION } from '@/core/config'

const SECTIONS = [
  { id: 'plan-du-site-principal', title: 'Pages principales', items: MAIN_NAVIGATION },
  { id: 'plan-du-site-catalogue', title: 'Catalogue', items: CATALOG_NAVIGATION },
  { id: 'plan-du-site-legal', title: 'Informations légales', items: LEGAL_NAVIGATION },
]
</script>

<template>
  <h1>Plan du site</h1>
  <section v-for="section in SECTIONS" :key="section.id" :aria-labelledby="section.id">
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
