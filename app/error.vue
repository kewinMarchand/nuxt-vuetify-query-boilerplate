<script setup lang="ts">
import { computed } from 'vue'

import type { NuxtError } from '#app'

import { useCatalogNavigation } from '@/modules/catalog'
import { usePageSeo } from '@/shared/seo'
import { AppShell } from '@/shared/ui/layout'
import { ErrorView } from '@/views/errors'

const { error } = defineProps<{ error: NuxtError }>()
const { categoryMenu } = await useCatalogNavigation()
const isNotFound = computed(() => error.status === 404)
const title = computed(() => (isNotFound.value ? 'Page introuvable' : 'Une erreur est survenue'))

usePageSeo({
  title,
  description: () =>
    isNotFound.value
      ? 'La page demandée n’existe pas ou a été déplacée. Retrouvez l’accueil, le plan du site ou le catalogue.'
      : 'Le service a rencontré un problème inattendu. Réessayez dans quelques instants ou revenez à l’accueil.',
  noindex: true,
  breadcrumbLabel: title.value,
})
</script>

<template>
  <AppShell :category-menu="categoryMenu" :current-label="title">
    <ErrorView :not-found="isNotFound" :title="title" />
  </AppShell>
</template>
