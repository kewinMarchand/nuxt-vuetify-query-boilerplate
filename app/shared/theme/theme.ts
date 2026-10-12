import { PRIMARY_COLOR } from './colors'

import type { VuetifyOptions } from 'vuetify'

export const theme: VuetifyOptions = {
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        variables: { 'medium-emphasis-opacity': 0.74 },
        colors: {
          primary: PRIMARY_COLOR,
          secondary: '#7c3aed',
          error: '#b3261e',
          info: '#1d4ed8',
          success: '#1b5e20',
        },
      },
    },
  },
  defaults: {
    VBtn: { minHeight: 44, variant: 'flat' },
  },
}
