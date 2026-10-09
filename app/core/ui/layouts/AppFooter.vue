<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

import { LEGAL_NAVIGATION, SITE } from '@/core/config'

const { devTools } = useRuntimeConfig().public
</script>

<template>
  <v-sheet tag="footer" color="grey-lighten-4" class="py-6">
    <div class="app-container">
      <nav aria-label="Liens légaux">
        <ul class="footer-links d-flex flex-wrap ga-4 mb-4">
          <li v-for="item in LEGAL_NAVIGATION" :key="item.href">
            <NuxtLink
              :to="item.href"
              class="footer-link text-body-medium"
              data-testid="layout-footer-link"
            >
              {{ item.footerLabel ?? item.label }}
            </NuxtLink>
          </li>
          <li v-if="devTools">
            <NuxtLink
              to="/charte-graphique"
              class="footer-link text-body-medium"
              data-testid="layout-styleguide-link"
            >
              Charte graphique (dev)
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="footer-brand text-body-medium text-medium-emphasis mb-0">
        <img src="/images/logo-mark.svg" alt="" width="24" height="24" />
        {{ SITE.name }}
      </p>
    </div>
  </v-sheet>
</template>

<style scoped>
.footer-links {
  padding: 0;
  list-style: none;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: inherit;
}
</style>
