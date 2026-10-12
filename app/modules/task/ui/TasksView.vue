<script setup lang="ts">
import TasksPanel from './TasksPanel.vue'
</script>

<template>
  <h1>Tâches</h1>
  <p>
    Données chargées côté client avec TanStack Query : chargement, erreur et liste vide sont gérés.
  </p>
  <TasksPanel />
</template>
