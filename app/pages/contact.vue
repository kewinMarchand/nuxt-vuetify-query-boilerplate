<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { ContactView } from '@/domains/contact'

usePageSeo({
  title: 'Contact',
  description:
    'Démo de formulaire : validation par schéma zod avec vee-validate, erreurs liées aux champs et envoi par mutation TanStack Query.',
})
</script>

<template>
  <ContactView />
</template>
