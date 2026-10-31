<script setup lang="ts">
import { TOKENS } from '@/shared/theme/tokens'

import { contrastLevel, contrastRatio } from '@/views/styleguide/contrast'

const SHOWN = [
  'primary',
  'primary-dark',
  'secondary',
  'text',
  'text-muted',
  'surface',
  'surface-muted',
  'success',
  'error',
  'info',
  'warning',
] as const

const { color } = TOKENS

const colors = SHOWN.map((token) => {
  const value = color[token]
  const isBackground = token.startsWith('surface')
  const ratio = isBackground
    ? contrastRatio(color.text, value)
    : contrastRatio(value, color.surface)
  return { token, value, isBackground, ratio: ratio.toFixed(2), level: contrastLevel(ratio) }
})
</script>

<template>
  <section aria-labelledby="charte-couleurs" data-testid="styleguide-colors">
    <h2 id="charte-couleurs">Couleurs</h2>
    <p>Valeurs du mode clair.</p>
    <ul class="swatches">
      <li v-for="sample in colors" :key="sample.token" class="swatch">
        <span class="swatch-sample" :style="{ background: `var(--bui-color-${sample.token})` }" />
        <code>--bui-color-{{ sample.token }}</code>
        <span>{{ sample.value }}</span>
        <span
          >{{ sample.isBackground ? 'Texte sur ce fond' : 'Sur le fond' }} : {{ sample.ratio }}:1,
          {{ sample.level }}</span
        >
      </li>
    </ul>
  </section>
</template>

<style scoped>
.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--bui-space-4);
  padding: 0;
  list-style: none;
}

.swatch {
  display: grid;
  gap: var(--bui-space-1);
}

.swatch-sample {
  display: block;
  height: 64px;
  border: 1px solid var(--bui-color-border-subtle);
  border-radius: var(--bui-radius-md);
}
</style>
