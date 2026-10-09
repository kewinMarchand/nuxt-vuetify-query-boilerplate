<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { LegalNoticeView } from '@/domains/legal'

usePageSeo({
  title: 'Mentions légales',
  description:
    'Mentions légales du site : éditeur, directeur de la publication, hébergeur et propriété intellectuelle des contenus publiés.',
})
</script>

<template>
  <LegalNoticeView />
</template>
