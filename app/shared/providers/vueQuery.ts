import { dehydrate, hydrate, VueQueryPlugin } from '@tanstack/vue-query'

import { defineNuxtPlugin, useState } from '#imports'

import { makeQueryClient } from './makeQueryClient'

import type { DehydratedState } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  const queryState = useState<DehydratedState | null>('vue-query', () => null)
  const queryClient = makeQueryClient()

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      queryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      if (queryState.value) hydrate(queryClient, queryState.value)
    })
  }
})
