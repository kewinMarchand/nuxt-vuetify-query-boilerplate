import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { fr } from 'vuetify/locale'

import { theme } from '@/core/theme/theme'

export const makeVuetify = () =>
  createVuetify({
    ...theme,
    ssr: true,
    locale: { locale: 'fr', messages: { fr } },
    icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  })
