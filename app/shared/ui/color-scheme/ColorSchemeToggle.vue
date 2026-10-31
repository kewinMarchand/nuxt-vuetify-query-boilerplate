<script setup lang="ts">
import { computed } from 'vue'

import { Menu } from '@kewinmarchand/boilerplates-ui/vue'

import { COLOR_SCHEMES } from './colorSchemeBootScript'
import { useColorScheme } from './useColorScheme'

import type { ColorScheme } from './colorSchemeBootScript'

const LABELS: Record<ColorScheme, string> = { auto: 'système', light: 'clair', dark: 'sombre' }
const ICONS = { auto: 'monitor', light: 'sun', dark: 'moon' } as const

const ITEMS = COLOR_SCHEMES.map((scheme) => ({
  id: scheme,
  label: LABELS[scheme].charAt(0).toUpperCase() + LABELS[scheme].slice(1),
  testId: `color-scheme-option-${scheme}`,
}))

const { colorScheme, isEnhanced, choose } = useColorScheme()

// Le mode renforcé impose le clair : un autre choix reste mémorisé mais suspendu.
const label = computed(
  () =>
    `Thème : ${LABELS[colorScheme.value]}${isEnhanced.value && colorScheme.value !== 'light' ? ", suspendu par l'accessibilité renforcée" : ''}`,
)

const onSelect = (id: string) => {
  const scheme = COLOR_SCHEMES.find((candidate) => candidate === id)
  if (scheme) choose(scheme)
}
</script>

<template>
  <Menu
    id="color-scheme"
    :label="label"
    :items="ITEMS"
    :checked="colorScheme"
    :trigger-icon="ICONS[colorScheme]"
    trigger-variant="nav"
    test-id="color-scheme-toggle"
    class="requires-js"
    @select="onSelect"
  />
</template>
