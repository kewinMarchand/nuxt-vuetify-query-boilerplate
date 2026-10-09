<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

import { contrastLevel, contrastRatio } from '@/domains/styleguide/services/contrast'

const TOKENS = [
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
  'background',
  'surface',
  'on-surface',
  'on-background',
]

const theme = useTheme()
const colors = computed(() => {
  const palette = theme.current.value.colors
  const background = typeof palette.background === 'string' ? palette.background : '#ffffff'
  return TOKENS.flatMap((token) => {
    const value = palette[token]
    if (typeof value !== 'string') return []
    const ratio = contrastRatio(value, background)
    return [{ token, value, ratio: ratio.toFixed(2), level: contrastLevel(ratio) }]
  })
})
</script>

<template>
  <section aria-labelledby="charte-couleurs" data-testid="styleguide-colors">
    <h2 id="charte-couleurs">Couleurs</h2>
    <ul class="swatches">
      <li v-for="color in colors" :key="color.token" class="swatch">
        <span class="swatch-sample" :style="{ background: color.value }" />
        <code>{{ color.token }}</code>
        <span>{{ color.value }}</span>
        <span>{{ color.ratio }}:1 sur le fond, {{ color.level }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 0;
  list-style: none;
}

.swatch {
  display: grid;
  gap: 4px;
}

.swatch-sample {
  display: block;
  height: 64px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}
</style>
