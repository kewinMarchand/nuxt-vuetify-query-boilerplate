<script setup lang="ts">
import { useId } from 'vue'

import { useOppositionMesure } from '@/shared/observability'

const { refusee, changer } = useOppositionMesure()
const inputId = useId()
</script>

<template>
  <div class="opposition-mesure">
    <input
      :id="inputId"
      type="checkbox"
      :checked="refusee"
      data-testid="legal-opposition-mesure"
      @change="changer(($event.target as HTMLInputElement).checked)"
    />
    <label :for="inputId">Ne pas mesurer mes visites sur ce site</label>
  </div>
  <p role="status" aria-live="polite" data-testid="legal-opposition-etat">
    {{
      refusee
        ? 'Vos visites ne sont plus mesurées depuis ce navigateur.'
        : 'Vos visites sont mesurées, de façon anonyme.'
    }}
  </p>
</template>

<style scoped>
.opposition-mesure {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
}

.opposition-mesure input {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
