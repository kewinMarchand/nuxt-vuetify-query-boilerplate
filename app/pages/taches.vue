<script setup lang="ts">
import { TasksView } from '@/modules/task'
import { usePageSeo } from '@/shared/seo'

usePageSeo({
  title: 'Tâches',
  description:
    'Démo TanStack Query : liste de tâches chargée côté client avec gestion du chargement, des erreurs et de la liste vide.',
})
</script>

<template>
  <TasksView />
</template>
