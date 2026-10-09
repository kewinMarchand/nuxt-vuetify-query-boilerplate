<script setup lang="ts">
import { computed, useId } from 'vue'

import { formDataToQuery, toFormFields } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

const { query, facets, action } = defineProps<{
  query: Catalog.Query
  facets: Catalog.Facet
  action: string
}>()

const emit = defineEmits<{ change: [query: Catalog.Query] }>()

const prefix = useId()
const hiddenFields = computed(() =>
  toFormFields(query, ['exposition', 'taille', 'prix_min', 'prix_max', 'en_stock']),
)

const onChange = (event: Event) => {
  const form = event.currentTarget
  if (form instanceof HTMLFormElement) emit('change', formDataToQuery(new FormData(form), query))
}
</script>

<template>
  <form
    method="get"
    :action="action"
    class="catalog-filters a11y-chrome"
    @change="onChange"
    @submit.prevent="onChange"
  >
    <input
      v-for="field in hiddenFields"
      :key="`${field.name}-${field.value}`"
      type="hidden"
      :name="field.name"
      :value="field.value"
    />

    <details v-if="facets.categories.length" open class="facet">
      <summary>Catégorie</summary>
      <ul class="facet-links">
        <li v-for="category in facets.categories" :key="category.slug">
          <NuxtLink :to="category.href">{{ category.label }} ({{ category.count }})</NuxtLink>
        </li>
      </ul>
    </details>

    <details open class="facet">
      <summary>Exposition</summary>
      <fieldset>
        <legend class="d-sr-only">Exposition</legend>
        <label v-for="option in facets.exposures" :key="option.value" class="facet-option">
          <input
            type="checkbox"
            name="exposition"
            :value="option.value"
            :checked="query.exposures.includes(option.value)"
            :disabled="option.count === 0 && !query.exposures.includes(option.value)"
            :data-testid="`catalog-filter-exposure-${option.value}`"
          />
          {{ option.label }} ({{ option.count }})
        </label>
      </fieldset>
    </details>

    <details open class="facet">
      <summary>Taille</summary>
      <fieldset>
        <legend class="d-sr-only">Taille</legend>
        <label v-for="option in facets.sizes" :key="option.value" class="facet-option">
          <input
            type="checkbox"
            name="taille"
            :value="option.value"
            :checked="query.sizes.includes(option.value)"
            :disabled="option.count === 0 && !query.sizes.includes(option.value)"
            :data-testid="`catalog-filter-size-${option.value}`"
          />
          {{ option.label }} ({{ option.count }})
        </label>
      </fieldset>
    </details>

    <details open class="facet">
      <summary>Prix</summary>
      <fieldset class="facet-price">
        <legend class="d-sr-only">Prix</legend>
        <label :for="`${prefix}-min`">Minimum (€)</label>
        <input
          :id="`${prefix}-min`"
          type="number"
          name="prix_min"
          inputmode="numeric"
          min="0"
          class="native-input"
          :value="query.priceMin ?? ''"
          data-testid="catalog-filter-price-min"
        />
        <label :for="`${prefix}-max`">Maximum (€)</label>
        <input
          :id="`${prefix}-max`"
          type="number"
          name="prix_max"
          inputmode="numeric"
          min="0"
          class="native-input"
          :value="query.priceMax ?? ''"
          data-testid="catalog-filter-price-max"
        />
      </fieldset>
    </details>

    <details open class="facet">
      <summary>Disponibilité</summary>
      <fieldset>
        <legend class="d-sr-only">Disponibilité</legend>
        <label class="facet-option">
          <input
            type="checkbox"
            role="switch"
            name="en_stock"
            value="1"
            :checked="query.inStock"
            :aria-checked="query.inStock ? 'true' : 'false'"
            data-testid="catalog-filter-in-stock"
          />
          En stock uniquement
        </label>
      </fieldset>
    </details>

    <button type="submit" class="native-button no-js-only" data-testid="catalog-filters-apply">
      Appliquer les filtres
    </button>
  </form>
</template>

<style scoped>
.facet {
  padding-block: 8px;
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.facet summary {
  display: flex;
  align-items: center;
  min-height: 44px;
  font-weight: 600;
  cursor: pointer;
}

.facet fieldset {
  min-width: 0;
  border: 0;
}

.facet-option,
.facet-links a {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
}

.facet-option input {
  width: 20px;
  height: 20px;
  accent-color: rgb(var(--v-theme-primary));
}

.facet-links {
  padding: 0;
  list-style: none;
}

.facet-links a {
  color: rgb(var(--v-theme-primary));
}

.facet-price {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
}
</style>
