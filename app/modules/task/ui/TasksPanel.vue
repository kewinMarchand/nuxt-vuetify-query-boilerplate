<script setup lang="ts">
import { useTasks } from './composables/useTasks'
import TaskList from './TaskList.vue'

const { status, data, error, refetch } = useTasks()
</script>

<template>
  <div aria-live="polite">
    <TaskList
      :status="status"
      :tasks="data"
      v-bind="error ? { errorMessage: error.message } : {}"
      @retry="refetch()"
    />
  </div>
</template>
