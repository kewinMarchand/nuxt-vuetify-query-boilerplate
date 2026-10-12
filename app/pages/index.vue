<script setup lang="ts">
import { definePageMeta, useRuntimeConfig } from '#imports'

import { SITE } from '@/shared/config'
import { organizationJsonLd, usePageSeo, websiteJsonLd } from '@/shared/seo'
import { HomeView } from '@/views/home'

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
