<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { PersonalDataView } from '@/domains/legal'

usePageSeo({
  title: 'Données personnelles',
  description:
    'Traitement des données personnelles : responsable, finalité du formulaire de contact, base légale, conservation et droits.',
})
</script>

<template>
  <PersonalDataView />
</template>
