<script setup lang="ts">
import { AppBreadcrumb } from '@/core/ui/layouts'
import { ActiveFilters, CatalogPagination } from '@/domains/catalog'

const TRAIL = [
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Plantes d’intérieur', href: '/catalogue/plantes-interieur' },
]
const FILTERS = [
  { id: 'mi-ombre', label: 'Mi-ombre', href: '/catalogue' },
  { id: 'en-stock', label: 'En stock', href: '/catalogue' },
]
const hrefFor = (page: number) => `/catalogue?page=${page}`
</script>

<template>
  <section aria-labelledby="charte-navigation" data-testid="styleguide-navigation">
    <h2 id="charte-navigation">Navigation</h2>
    <AppBreadcrumb :trail="TRAIL" />
    <CatalogPagination :page="5" :page-count="10" :href-for="hrefFor" />
    <ActiveFilters :filters="FILTERS" clear-href="/catalogue" />
    <p>
      Lien interne : <NuxtLink to="/contact" class="text-primary">page de contact</NuxtLink>. Lien
      externe :
      <a href="https://www.w3.org/WAI/" class="text-primary" rel="noopener">WAI du W3C</a>.
    </p>
  </section>
</template>
