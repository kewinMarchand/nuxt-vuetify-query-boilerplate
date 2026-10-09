<script setup lang="ts">
import { MAIN_NAVIGATION, SITE } from '@/core/config'

import A11yModeToggle from './A11yModeToggle.vue'
import CategoryMenu from './CategoryMenu.vue'
import MobileMenu from './MobileMenu.vue'
import NavLink from './NavLink.vue'

const [HOME, ...SECONDARY_NAVIGATION] = MAIN_NAVIGATION
</script>

<template>
  <header class="app-header bg-primary">
    <div class="app-container header-bar">
      <NuxtLink to="/" class="header-logo" data-testid="layout-logo">
        <img src="/images/logo-mark.svg" alt="" width="40" height="40" />
        <span>{{ SITE.name }}</span>
      </NuxtLink>
      <nav aria-label="Navigation principale" class="header-nav">
        <ul class="header-nav-list">
          <li v-if="HOME"><NavLink v-bind="HOME" /></li>
          <li class="header-nav-menu"><CategoryMenu /></li>
          <li v-for="item in SECONDARY_NAVIGATION" :key="item.href"><NavLink v-bind="item" /></li>
        </ul>
      </nav>
      <div class="header-actions">
        <MobileMenu />
        <A11yModeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding-block: 8px;
}

.header-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  margin-right: auto;
  color: inherit;
  font-size: calc(20px * var(--app-font-scale));
  font-weight: 600;
  text-decoration: none;
}

.header-nav-list,
.header-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.header-nav-list {
  padding: 0;
  list-style: none;
}

.header-nav-menu {
  position: relative;
}

.header-actions :deep(.v-btn) {
  color: inherit;
}

html[data-js] .header-nav {
  display: none;
}

@media (min-width: 1024px) {
  html[data-js] .header-nav {
    display: block;
  }

  .header-actions :deep([data-testid='layout-mobile-menu-toggle']) {
    display: none;
  }
}
</style>
