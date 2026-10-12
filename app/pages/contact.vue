<script setup lang="ts">
import { ContactView } from '@/modules/contact'
import { usePageSeo } from '@/shared/seo'

usePageSeo({
  title: 'Contact',
  description:
    'Démo de formulaire : validation par schéma zod avec vee-validate, erreurs liées aux champs et envoi par mutation TanStack Query.',
})
</script>

<template>
  <ContactView />
</template>
