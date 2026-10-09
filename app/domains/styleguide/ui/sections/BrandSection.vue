<script setup lang="ts">
import { SITE } from '@/core/config'
import { Icon, ICON_NAMES } from '@/core/ui/ui-kit'
</script>

<template>
  <section aria-labelledby="charte-icones" data-testid="styleguide-icons">
    <h2 id="charte-icones">Icônes</h2>
    <ul class="icons">
      <li v-for="name in ICON_NAMES" :key="name" class="d-flex align-center ga-2">
        <Icon :name="name" :size="24" />
        <code>{{ name }}</code>
      </li>
    </ul>
  </section>
  <section aria-labelledby="charte-logo" data-testid="styleguide-logo">
    <h2 id="charte-logo">Logo</h2>
    <div class="logos">
      <div class="logo-sample">
        <img src="/images/logo-mark.svg" alt="" width="64" height="64" />
      </div>
      <div class="logo-sample">
        <img src="/images/logo-mark.svg" alt="" width="40" height="40" />
        <span class="logo-name">{{ SITE.name }}</span>
      </div>
      <div class="logo-sample bg-primary">
        <img src="/images/logo-mark.svg" alt="" width="40" height="40" />
        <span class="logo-name">{{ SITE.name }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  padding: 0;
  list-style: none;
}

.logos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.logo-sample {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}

.logo-name {
  font-size: calc(20px * var(--app-font-scale));
  font-weight: 600;
}
</style>
