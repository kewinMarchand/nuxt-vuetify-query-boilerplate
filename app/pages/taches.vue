<script setup lang="ts">
import { usePageSeo } from '@/core/seo'
import { TasksView } from '@/domains/tasks'

usePageSeo({
  title: 'Tâches',
  description:
    'Démo TanStack Query : liste de tâches chargée côté client avec gestion du chargement, des erreurs et de la liste vide.',
})
</script>

<template>
  <TasksView />
</template>
