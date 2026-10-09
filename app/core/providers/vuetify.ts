import 'vuetify/styles'

import { defineNuxtPlugin } from '#imports'

import { makeVuetify } from './makeVuetify'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(makeVuetify())
})
