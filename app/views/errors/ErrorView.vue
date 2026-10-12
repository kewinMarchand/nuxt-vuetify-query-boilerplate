<script setup lang="ts">
const { notFound, title } = defineProps<{ notFound: boolean; title: string }>()

const reload = () => window.location.reload()
</script>

<template>
  <h1>{{ title }}</h1>
  <template v-if="notFound">
    <p>La page demandée n'existe pas ou a été déplacée.</p>
    <ul class="error-links">
      <li><NuxtLink to="/" data-testid="error-home-link">Retour à l'accueil</NuxtLink></li>
      <li>
        <NuxtLink to="/plan-du-site" data-testid="error-sitemap-link"
          >Consulter le plan du site</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/catalogue" data-testid="error-catalog-link">Parcourir le catalogue</NuxtLink>
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
</template>

<style scoped>
.error-links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: rgb(var(--v-theme-primary));
}
</style>
