<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { SitemapView } from '@/domains/legal'

usePageSeo({
  title: 'Plan du site',
  description:
    'Plan du site : liste de toutes les pages, des pages principales aux informations légales, générée depuis la navigation.',
})
</script>

<template>
  <SitemapView />
</template>
