<script setup lang="ts">
import { createError, useRuntimeConfig } from '#imports'

const { devTools } = useRuntimeConfig().public
throw createError(devTools ? { statusCode: 500, fatal: true } : { statusCode: 404, fatal: true })
</script>

<template>
  <div />
</template>
