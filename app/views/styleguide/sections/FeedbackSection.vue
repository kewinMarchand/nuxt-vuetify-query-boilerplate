<script setup lang="ts">
import { Alert, Button, Skeleton } from '@kewinmarchand/boilerplates-ui/vue'

import { Icon } from '@/shared/ui/kit'

const VARIANTS = [
  { variant: 'success', text: 'Opération réussie.' },
  { variant: 'info', text: 'Information utile.' },
  { variant: 'warning', text: 'Attention, vérifiez ce point.' },
  { variant: 'error', text: 'Une erreur est survenue.' },
] as const
</script>

<template>
  <section aria-labelledby="charte-retours" data-testid="styleguide-feedback">
    <h2 id="charte-retours">Retours</h2>
    <div class="feedback-list">
      <Alert v-for="alert in VARIANTS" :key="alert.variant" :variant="alert.variant">
        {{ alert.text }}
      </Alert>
      <div role="status" aria-label="Chargement d’exemple" class="feedback-loading">
        <Skeleton height="48px" />
        <Skeleton height="48px" />
      </div>
      <Alert>Aucun élément pour l'instant. Revenez bientôt.</Alert>
      <Alert variant="error">
        Impossible de charger les données.
        <template #action>
          <Button variant="ghost">
            <Icon name="rotate-cw" />
            Réessayer
          </Button>
        </template>
      </Alert>
    </div>
  </section>
</template>

<style scoped>
.feedback-list,
.feedback-loading {
  display: flex;
  flex-direction: column;
  gap: var(--bui-space-4);
}

.feedback-loading {
  gap: var(--bui-space-2);
}
</style>
