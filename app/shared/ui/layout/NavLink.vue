<script setup lang="ts">
import type { NavigationItem } from '@/shared/config'

const { href, label } = defineProps<NavigationItem>()
</script>

<template>
  <NuxtLink :to="href" class="header-link" data-testid="layout-nav-link">{{ label }}</NuxtLink>
</template>
