<script setup lang="ts">
import { Button } from '@kewinmarchand/boilerplates-ui/vue'

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const
const STATES = [
  { label: 'Défaut', className: '' },
  { label: 'Survol', className: 'bui-is-hover' },
  { label: 'Focus', className: 'bui-is-focus' },
  { label: 'Actif', className: 'bui-is-active' },
] as const
</script>

<template>
  <section aria-labelledby="charte-boutons" data-testid="styleguide-buttons">
    <h2 id="charte-boutons">Boutons</h2>
    <p>
      Survol, focus et actif sont simulés par les classes d'état de la bibliothèque. Les vrais états
      se testent au pointeur et au clavier sur la ligne « Défaut ».
    </p>
    <div v-for="variant in VARIANTS" :key="variant" class="button-group">
      <h3>Variante {{ variant }}</h3>
      <div class="button-row">
        <Button
          v-for="state in STATES"
          :key="state.label"
          :variant="variant"
          :class="state.className"
        >
          {{ state.label }}
        </Button>
        <Button :variant="variant" disabled>Désactivé</Button>
        <Button :variant="variant" loading>Chargement</Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.button-group {
  margin-block-end: var(--bui-space-4);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bui-space-2);
}
</style>
