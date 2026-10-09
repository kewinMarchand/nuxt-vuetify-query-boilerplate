<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import { AppShell } from '@/core/ui/layouts'
</script>

<template>
  <AppShell>
    <NuxtPage />
  </AppShell>
  <ClientOnly>
    <VueQueryDevtools button-position="bottom-left" />
  </ClientOnly>
</template>
