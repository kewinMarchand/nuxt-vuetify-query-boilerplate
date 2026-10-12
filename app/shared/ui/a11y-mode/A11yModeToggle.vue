<script setup lang="ts">
import { useA11yMode } from '@/shared/ui/a11y-mode'
import { Icon } from '@/shared/ui/kit'

const { isEnhanced, toggle } = useA11yMode()
</script>

<template>
  <v-btn
    type="button"
    variant="outlined"
    class="a11y-mode-toggle"
    aria-label="Accessibilité renforcée"
    :aria-pressed="isEnhanced ? 'true' : 'false'"
    data-testid="a11y-mode-toggle"
    @click="toggle"
  >
    <template #prepend>
      <Icon name="accessibility" />
    </template>
    <span class="a11y-mode-toggle-label" data-testid="a11y-mode-toggle-label"
      >Accessibilité renforcée</span
    >
  </v-btn>
</template>

<style scoped>
.a11y-mode-toggle-label {
  display: none;
}

.a11y-mode-toggle {
  min-width: 44px;
  width: 44px;
  padding: 0;
}

.a11y-mode-toggle :deep(.v-btn__prepend) {
  margin: 0;
}

@media (min-width: 1024px) {
  .a11y-mode-toggle-label {
    display: inline;
  }

  .a11y-mode-toggle {
    width: auto;
    padding-inline: 16px;
  }

  .a11y-mode-toggle :deep(.v-btn__prepend) {
    margin-inline-end: 8px;
  }
}
</style>
