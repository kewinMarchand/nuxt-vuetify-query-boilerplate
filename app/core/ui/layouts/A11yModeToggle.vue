<script setup lang="ts">
import { useA11yMode } from '@/core/a11y'
import { Icon } from '@/core/ui/ui-kit'

const { isEnhanced, toggle } = useA11yMode()
</script>

<template>
  <v-btn
    type="button"
    variant="outlined"
    :aria-pressed="isEnhanced ? 'true' : 'false'"
    data-testid="a11y-mode-toggle"
    @click="toggle"
  >
    <template #prepend>
      <Icon name="accessibility" />
    </template>
    Accessibilité renforcée
  </v-btn>
</template>
