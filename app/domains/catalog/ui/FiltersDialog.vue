<script setup lang="ts">
import { ref, useId } from 'vue'

import { Icon } from '@/core/ui/ui-kit'

defineProps<{ activeCount: number; total: number }>()

const isOpen = ref(false)
const titleId = useId()
</script>

<template>
  <v-dialog
    v-model="isOpen"
    :aria-labelledby="titleId"
    content-class="side-panel"
    transition="slide-x-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        variant="outlined"
        color="primary"
        class="filters-open requires-js"
        :aria-expanded="isOpen ? 'true' : 'false'"
        data-testid="catalog-filters-open"
      >
        <template #prepend>
          <Icon name="filter" />
        </template>
        Filtrer
        <span v-if="activeCount">&nbsp;({{ activeCount }})</span>
      </v-btn>
    </template>

    <div class="side-panel-body" data-testid="catalog-filters">
      <div class="d-flex align-center justify-space-between ga-2 mb-2">
        <h2 :id="titleId" class="side-panel-title">Filtres</h2>
        <v-btn icon variant="text" aria-label="Fermer les filtres" @click="isOpen = false">
          <Icon name="close" />
        </v-btn>
      </div>
      <slot />
      <v-btn color="primary" block class="mt-4" @click="isOpen = false">
        Voir les {{ total }} produits
      </v-btn>
    </div>
  </v-dialog>
</template>
