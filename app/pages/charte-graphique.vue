<script setup lang="ts">
import { createError, useRuntimeConfig } from '#imports'

import { usePageSeo } from '@/core/seo'
import { StyleguideView } from '@/domains/styleguide'

if (!useRuntimeConfig().public.devTools) {
  throw createError({ statusCode: 404, fatal: true })
}

usePageSeo({
  title: 'Charte graphique',
  description:
    'Charte graphique du boilerplate : couleurs, typographie, espacements, composants et icônes, en développement uniquement.',
  noindex: true,
})
</script>

<template>
  <StyleguideView />
</template>
