<script setup lang="ts">
import type { IconName } from './iconNames'

const SPRITE = '/icons.svg'

/** Symbole du sprite `public/icons.svg` (Lucide), décoratif sauf si un libellé est fourni. */
const {
  name,
  size = 20,
  label,
} = defineProps<{
  name: IconName
  size?: number
  label?: string
}>()
</script>

<template>
  <svg v-if="label" :width="size" :height="size" role="img" :aria-label="label">
    <use :href="`${SPRITE}#${name}`" />
  </svg>
  <svg v-else :width="size" :height="size" aria-hidden="true" focusable="false">
    <use :href="`${SPRITE}#${name}`" />
  </svg>
</template>
