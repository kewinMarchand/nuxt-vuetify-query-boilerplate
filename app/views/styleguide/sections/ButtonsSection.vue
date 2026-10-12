<script setup lang="ts">
const VARIANTS = ['flat', 'tonal', 'outlined', 'text'] as const
const STATES = [
  { label: 'Défaut', props: {} },
  { label: 'Actif', props: { active: true } },
  { label: 'Désactivé', props: { disabled: true } },
  { label: 'Chargement', props: { loading: true } },
]
</script>

<template>
  <section aria-labelledby="charte-boutons" data-testid="styleguide-buttons">
    <h2 id="charte-boutons">Boutons</h2>
    <p>
      Survol et focus se vérifient en interagissant : le focus clavier affiche un contour visible.
    </p>
    <div v-for="variant in VARIANTS" :key="variant" class="mb-4">
      <h3>Variante {{ variant }}</h3>
      <div class="d-flex flex-wrap ga-2">
        <v-btn
          v-for="state in STATES"
          :key="state.label"
          :variant="variant"
          color="primary"
          v-bind="state.props"
        >
          {{ state.label }}
          <template #loader>
            <v-progress-circular
              indeterminate
              size="20"
              width="2"
              aria-label="Chargement en cours"
            />
          </template>
        </v-btn>
      </div>
    </div>
  </section>
</template>
