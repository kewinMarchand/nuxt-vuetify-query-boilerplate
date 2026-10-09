<script setup lang="ts">
import { computed } from 'vue'

import type { NuxtError } from '#app'

import { usePageSeo } from '@/core/seo'
import { AppShell } from '@/core/ui/layouts'

const { error } = defineProps<{ error: NuxtError }>()
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

const reload = () => window.location.reload()
</script>

<template>
  <AppShell :current-label="title">
    <h1>{{ title }}</h1>
    <template v-if="isNotFound">
      <p>La page demandée n'existe pas ou a été déplacée.</p>
      <ul class="error-links">
        <li><NuxtLink to="/" data-testid="error-home-link">Retour à l'accueil</NuxtLink></li>
        <li>
          <NuxtLink to="/plan-du-site" data-testid="error-sitemap-link"
            >Consulter le plan du site</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/catalogue" data-testid="error-catalog-link"
            >Parcourir le catalogue</NuxtLink
          >
        </li>
      </ul>
    </template>
    <template v-else>
      <p>Le service a rencontré un problème inattendu. Réessayez dans quelques instants.</p>
      <div class="d-flex flex-wrap ga-4">
        <v-btn color="primary" data-testid="error-retry" @click="reload">Réessayer</v-btn>
        <v-btn to="/" variant="outlined" color="primary" data-testid="error-home-link">
          Retour à l'accueil
        </v-btn>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>
.error-links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: rgb(var(--v-theme-primary));
}
</style>
