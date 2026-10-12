<script lang="ts">
import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckCircleOutline,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiEmailOutline,
  mdiFilterVariant,
  mdiMenu,
  mdiRefresh,
  mdiViewGridOutline,
  mdiViewListOutline,
  mdiWheelchairAccessibility,
} from '@mdi/js'

const ICONS = {
  accessibility: mdiWheelchairAccessibility,
  'check-circle': mdiCheckCircleOutline,
  'chevron-down': mdiChevronDown,
  'chevron-left': mdiChevronLeft,
  'chevron-right': mdiChevronRight,
  'circle-outline': mdiCheckboxBlankCircleOutline,
  close: mdiClose,
  email: mdiEmailOutline,
  filter: mdiFilterVariant,
  menu: mdiMenu,
  refresh: mdiRefresh,
  'view-grid': mdiViewGridOutline,
  'view-list': mdiViewListOutline,
} as const

export type IconName = keyof typeof ICONS

export const ICON_NAMES = Object.keys(ICONS).filter((name): name is IconName => name in ICONS)
</script>

<script setup lang="ts">
const {
  name,
  size = 20,
  label,
} = defineProps<{
  name: IconName
  size?: number
  label?: string
}>()
</script>

<template>
  <svg
    v-if="label"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    :aria-label="label"
  >
    <path :d="ICONS[name]" />
  </svg>
  <svg
    v-else
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="ICONS[name]" />
  </svg>
</template>
