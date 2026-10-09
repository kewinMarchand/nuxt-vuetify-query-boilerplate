<script setup lang="ts">
const SPACING_STEPS = [1, 2, 3, 4, 6, 8, 12, 16]
const RADII = ['rounded-sm', 'rounded', 'rounded-lg', 'rounded-xl', 'rounded-pill']
</script>

<template>
  <section aria-labelledby="charte-espacements" data-testid="styleguide-spacing">
    <h2 id="charte-espacements">Espacements et rayons</h2>
    <ul class="bars">
      <li v-for="step in SPACING_STEPS" :key="step" class="d-flex align-center ga-4">
        <code class="bar-label">pa-{{ step }}</code>
        <span class="bar bg-primary" :class="`pl-${step}`" />
      </li>
    </ul>
    <ul class="radii">
      <li v-for="radius in RADII" :key="radius" class="radius bg-secondary" :class="radius">
        <code>{{ radius }}</code>
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

.bar-label {
  min-width: 64px;
}

.bar {
  height: 16px;
}

.radii {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.radius {
  display: grid;
  place-items: center;
  width: 120px;
  height: 64px;
}
</style>
