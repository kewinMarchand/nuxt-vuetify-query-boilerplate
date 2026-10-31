<script setup lang="ts">
import { TOKENS } from '@/shared/theme/tokens'

const SPACING_STEPS = Object.entries(TOKENS.space)
const RADII = Object.entries(TOKENS.radius)
</script>

<template>
  <section aria-labelledby="charte-espacements" data-testid="styleguide-spacing">
    <h2 id="charte-espacements">Espacements et rayons</h2>
    <ul class="bars">
      <li v-for="[step, value] in SPACING_STEPS" :key="step" class="bar-row">
        <code class="bar-label">--bui-space-{{ step }} ({{ value }})</code>
        <span class="bar" :style="{ width: `var(--bui-space-${step})` }" />
      </li>
    </ul>
    <ul class="radii">
      <li
        v-for="[name, value] in RADII"
        :key="name"
        class="radius"
        :style="{ borderRadius: `var(--bui-radius-${name})` }"
      >
        <code>--bui-radius-{{ name }} ({{ value }})</code>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.bars,
.radii {
  padding: 0;
  list-style: none;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: var(--bui-space-4);
}

.bar-label {
  min-width: 200px;
}

.bar {
  height: 16px;
  background: var(--bui-color-primary);
}

.radii {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.radius {
  display: grid;
  place-items: center;
  min-width: 120px;
  height: 64px;
  padding-inline: var(--bui-space-4);
  background: var(--bui-color-secondary);
  color: var(--bui-color-on-secondary);
}
</style>
