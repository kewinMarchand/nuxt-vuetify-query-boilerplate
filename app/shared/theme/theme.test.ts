import { readFileSync } from 'node:fs'

import { ENHANCED_COLORS } from './tokens'

// Lu depuis la racine du projet : Vitest neutralise les imports de CSS, `?raw` compris
const GLOBAL_CSS = readFileSync('app/shared/theme/global.css', 'utf8')

const channels = (hex: string) =>
  [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16)).join(', ')

describe('mode renforcé', () => {
  it.each(Object.entries(ENHANCED_COLORS))(
    'reprend la couleur %s du thème « enhanced » des tokens',
    (name, hex) => {
      expect(GLOBAL_CSS).toContain(`--v-theme-${name}: ${channels(hex)};`)
    },
  )
})
