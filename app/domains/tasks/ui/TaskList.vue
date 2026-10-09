<script setup lang="ts">
import { Icon } from '@/core/ui/ui-kit'

import type { Task } from '../common/models/task'

defineProps<{
  status: 'pending' | 'error' | 'success'
  tasks: Task.Entity[] | undefined
  errorMessage?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    v-if="status === 'pending'"
    role="status"
    aria-busy="true"
    aria-label="Chargement des tâches"
    class="d-flex flex-column ga-2"
    data-testid="tasks-loading"
  >
    <v-skeleton-loader v-for="key in 3" :key="key" type="list-item" aria-hidden="true" />
  </div>

  <v-alert v-else-if="status === 'error'" type="error" variant="tonal" data-testid="tasks-error">
    {{ errorMessage }}
    <template #append>
      <v-btn variant="text" data-testid="tasks-retry" @click="emit('retry')">
        <template #prepend>
          <Icon name="refresh" />
        </template>
        Réessayer
      </v-btn>
    </template>
  </v-alert>

  <v-alert v-else-if="!tasks?.length" type="info" variant="tonal" data-testid="tasks-empty">
    Aucune tâche pour l'instant. Tout est à jour.
  </v-alert>

  <v-list v-else data-testid="tasks-list">
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :subtitle="task.done ? 'Terminée' : 'À faire'"
      data-testid="tasks-item"
    >
      <template #prepend>
        <Icon :name="task.done ? 'check-circle' : 'circle-outline'" class="mr-4" />
      </template>
    </v-list-item>
  </v-list>
</template>
