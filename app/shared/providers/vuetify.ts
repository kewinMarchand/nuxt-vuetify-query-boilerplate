import { defineNuxtPlugin } from '#imports'

import { makeVuetify } from './makeVuetify'

import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(makeVuetify())
})
