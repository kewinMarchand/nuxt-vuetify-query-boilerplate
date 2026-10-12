<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const SAMPLES = [
  { id: 'h1', className: 'type-h1', label: 'Titre de niveau 1' },
  { id: 'h2', className: 'type-h2', label: 'Titre de niveau 2' },
  { id: 'h3', className: 'type-h3', label: 'Titre de niveau 3' },
  { id: 'h4', className: 'type-h4', label: 'Titre de niveau 4' },
  { id: 'h5', className: 'type-h5', label: 'Titre de niveau 5' },
  { id: 'h6', className: 'type-h6', label: 'Titre de niveau 6' },
  { id: 'corps', className: 'text-body-large', label: 'Corps de texte' },
  { id: 'petit', className: 'text-body-medium', label: 'Petit texte' },
]

const list = useTemplateRef<HTMLElement>('list')
const metrics = ref<Record<string, string>>({})

onMounted(() => {
  list.value?.querySelectorAll<HTMLElement>('[data-sample]').forEach((element) => {
    const style = getComputedStyle(element)
    metrics.value[element.dataset.sample ?? ''] =
      `${style.fontSize}, interligne ${style.lineHeight}`
  })
})
</script>

<template>
  <section aria-labelledby="charte-typo" data-testid="styleguide-typography">
    <h2 id="charte-typo">Typographie</h2>
    <dl ref="list">
      <div v-for="sample in SAMPLES" :key="sample.id" class="mb-4">
        <dt :class="sample.className" :data-sample="sample.id">{{ sample.label }}</dt>
        <dd class="text-body-medium">
          {{ sample.id }} : {{ metrics[sample.id] ?? 'mesuré au montage' }}
        </dd>
      </div>
    </dl>
  </section>
</template>
