<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { computed } from 'vue'

import { useRoute } from '#imports'

import { useCatalogNavigation } from '@/modules/catalog'
import { AppShell } from '@/shared/ui/layout'

const route = useRoute()
const { categoryMenu, trailFor } = await useCatalogNavigation()
const breadcrumbTrail = computed(() => trailFor(route.path))
</script>

<template>
  <AppShell :category-menu="categoryMenu" :breadcrumb-trail="breadcrumbTrail">
    <NuxtPage />
  </AppShell>
  <ClientOnly>
    <VueQueryDevtools button-position="bottom-left" />
  </ClientOnly>
</template>
