import { test } from '@playwright/test'

import { enableEnhancedMode, gotoHydrated } from '../support/page'

const WIDTHS = [375, 768, 1280]

test.describe('Captures de contrôle visuel', () => {
  test.skip(({ isMobile }) => isMobile, 'Largeurs fixées dans le test')

  for (const mode of ['normal', 'renforce'] as const) {
    test(`accueil et catalogue en mode ${mode}`, async ({ page, context }, testInfo) => {
      if (mode === 'renforce') await enableEnhancedMode(context)
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 })
        for (const [name, route] of [
          ['accueil', '/'],
          ['catalogue', '/catalogue'],
        ]) {
          await gotoHydrated(page, route ?? '/')
          await page.screenshot({ path: testInfo.outputPath(`${name}-${mode}-${width}.png`) })
        }
      }
    })
  }
})
