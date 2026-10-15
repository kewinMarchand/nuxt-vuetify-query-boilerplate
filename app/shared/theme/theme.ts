import { LIGHT_COLORS } from './tokens'

import type { VuetifyOptions } from 'vuetify'

export const theme: VuetifyOptions = {
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        variables: { 'medium-emphasis-opacity': 0.74 },
        colors: LIGHT_COLORS,
      },
    },
  },
  defaults: {
    VBtn: { minHeight: 44, variant: 'flat' },
  },
}
