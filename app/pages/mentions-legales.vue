<script setup lang="ts">
import { usePageSeo } from '@/shared/seo'
import { LegalNoticeView } from '@/views/legal'

usePageSeo({
  title: 'Mentions légales',
  description:
    'Mentions légales du site : éditeur, directeur de la publication, hébergeur et propriété intellectuelle des contenus publiés.',
})
</script>

<template>
  <LegalNoticeView />
</template>
