<template>
  <a
    href="#main"
    data-testid="layout-skip-link"
    class="skip-link pa-3 rounded bg-surface text-primary"
    >Aller au contenu principal</a
  >
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: 8px;
  top: -64px;
  z-index: var(--app-z-skip-link);
}

.skip-link:focus-visible {
  top: 8px;
  outline: 3px solid currentColor;
}
</style>
