<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'

const SEVERITIES = [
  { type: 'success', text: 'Opération réussie.' },
  { type: 'info', text: 'Information utile.' },
  { type: 'warning', text: 'Attention, vérifiez ce point.' },
  { type: 'error', text: 'Une erreur est survenue.' },
] as const
</script>

<template>
  <section aria-labelledby="charte-retours" data-testid="styleguide-feedback">
    <h2 id="charte-retours">Retours</h2>
    <div class="d-flex flex-column ga-4">
      <v-alert v-for="alert in SEVERITIES" :key="alert.type" :type="alert.type" variant="tonal">
        {{ alert.text }}
      </v-alert>
      <div role="status" aria-label="Chargement d’exemple">
        <v-skeleton-loader type="list-item-two-line" aria-hidden="true" />
      </div>
      <v-alert type="info" variant="tonal">Aucun élément pour l'instant. Revenez bientôt.</v-alert>
      <v-alert type="error" variant="tonal">
        Impossible de charger les données.
        <template #append>
          <v-btn variant="text">
            <template #prepend>
              <Icon name="refresh" />
            </template>
            Réessayer
          </v-btn>
        </template>
      </v-alert>
    </div>
  </section>
</template>
