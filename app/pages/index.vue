<script setup lang="ts">
import { definePageMeta, useRuntimeConfig } from '#imports'

import { SITE } from '@/core/config'
import { organizationJsonLd, usePageSeo, websiteJsonLd } from '@/core/seo'
import { HomeView } from '@/domains/home'

definePageMeta({ fullBleed: true })

const { siteUrl } = useRuntimeConfig().public

usePageSeo({
  title: 'Accueil',
  description: SITE.description,
  jsonLd: [organizationJsonLd(siteUrl), websiteJsonLd(siteUrl)],
})
</script>

<template>
  <HomeView />
</template>
