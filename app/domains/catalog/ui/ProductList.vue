<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'

import ProductCard from './ProductCard.vue'

import type { Catalog } from '../common/models/catalog'

const EAGER_COUNT = 4

defineProps<{
  status: 'pending' | 'error' | 'success'
  products: Catalog.Product[] | undefined
  view: Catalog.View
  clearHref: string
  errorMessage?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    v-if="status === 'pending'"
    role="status"
    aria-busy="true"
    aria-label="Chargement des produits"
    class="product-grid"
  >
    <v-skeleton-loader v-for="key in 4" :key="key" type="image, article" aria-hidden="true" />
  </div>

  <v-alert v-else-if="status === 'error'" type="error" variant="tonal" data-testid="catalog-error">
    {{ errorMessage }}
    <template #append>
      <v-btn variant="text" data-testid="catalog-retry" @click="emit('retry')">
        <template #prepend>
          <Icon name="refresh" />
        </template>
        Réessayer
      </v-btn>
    </template>
  </v-alert>

  <div v-else-if="!products?.length" class="catalog-empty" data-testid="catalog-empty">
    <p>Aucun produit ne correspond à ces filtres.</p>
    <v-btn :to="clearHref" color="primary" variant="outlined">Tout effacer</v-btn>
  </div>

  <div v-else class="product-grid" :class="{ 'is-list': view === 'liste' }">
    <ProductCard
      v-for="(product, index) in products"
      :key="product.id"
      :product="product"
      :eager="index < EAGER_COUNT"
      :priority="index === 0"
    />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

.catalog-empty {
  padding: 24px;
  border: 1px dashed rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

@media (min-width: 480px) {
  .product-grid:not(.is-list) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
