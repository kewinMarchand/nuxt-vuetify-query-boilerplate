import { expect, test } from '@playwright/test'

import { enableEnhancedMode, gotoHydrated, linkTo } from '../support/page'

import type { Locator } from '@playwright/test'

const category = (menu: Locator, path: string) =>
  linkTo(menu, 'layout-category-link', `/catalogue/${path}`)

const ANCHOR_TOLERANCE = 12

test.describe('Menu de catégories desktop', () => {
  test.skip(({ isMobile }) => isMobile, 'Menu en cascade réservé au desktop')

  test('s’ouvre au clic, révèle les enfants au survol et au focus, se ferme avec Échap', async ({
    page,
  }) => {
    await gotoHydrated(page, '/')
    const toggle = page.getByTestId('layout-category-menu-toggle')
    const menu = page.getByTestId('layout-category-menu')
    await expect(menu).toBeHidden()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()

    const parent = category(menu, 'plantes-interieur')
    await parent.hover()
    await expect(parent).toHaveAttribute('aria-expanded', 'true')
    await expect(category(menu, 'plantes-interieur/feuillages')).toBeVisible()

    await category(menu, 'plantes-exterieur').focus()
    await expect(category(menu, 'plantes-exterieur/palmiers')).toBeVisible()
    await expect(category(menu, 'plantes-interieur/feuillages')).toHaveCount(0)

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('cliquer une feuille navigue et met à jour le fil d’Ariane', async ({ page }) => {
    await gotoHydrated(page, '/')
    await page.getByTestId('layout-category-menu-toggle').click()
    const menu = page.getByTestId('layout-category-menu')
    await category(menu, 'plantes-interieur').hover()
    await category(menu, 'plantes-interieur/feuillages').hover()
    await category(menu, 'plantes-interieur/feuillages/monstera').click()

    await expect(page).toHaveURL(/\/catalogue\/plantes-interieur\/feuillages\/monstera$/)
    await expect(page.getByTestId('layout-breadcrumb').locator('[aria-current="page"]')).toHaveText(
      'Monstera',
    )
    await expect(menu).toBeHidden()
  })

  for (const mode of ['normal', 'renforcé'] as const) {
    test(`le panneau est ancré à son bouton en mode ${mode}`, async ({ page, context }) => {
      if (mode === 'renforcé') await enableEnhancedMode(context)
      await gotoHydrated(page, '/catalogue')
      const header = page.locator('header').first()
      const headerHeight = (await header.boundingBox())?.height
      const h1Top = (await page.getByRole('heading', { level: 1 }).boundingBox())?.y

      const toggle = page.getByTestId('layout-category-menu-toggle')
      await toggle.click()
      const button = await toggle.boundingBox()
      const panel = await page.getByTestId('layout-category-menu').boundingBox()
      if (!button || !panel) throw new Error('Bouton ou panneau introuvable')

      expect(Math.abs(panel.y - (button.y + button.height))).toBeLessThan(ANCHOR_TOLERANCE)
      const viewportWidth = page.viewportSize()?.width ?? 0
      const fitsFromButton = button.x + panel.width <= viewportWidth
      const leftAligned = Math.abs(panel.x - button.x) < ANCHOR_TOLERANCE
      const rightAligned =
        Math.abs(panel.x + panel.width - (button.x + button.width)) < ANCHOR_TOLERANCE
      expect(fitsFromButton ? leftAligned : rightAligned).toBe(true)
      expect((await header.boundingBox())?.height).toBe(headerHeight)
      expect((await page.getByRole('heading', { level: 1 }).boundingBox())?.y).toBe(h1Top)
    })
  }
})

test.describe('Menu mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Menu par niveaux réservé aux petits écrans')

  test('descend dans les niveaux, revient, et déplace le focus sur le titre', async ({ page }) => {
    await gotoHydrated(page, '/')
    const toggle = page.getByTestId('layout-mobile-menu-toggle')
    await toggle.click()
    const menu = page.getByTestId('layout-mobile-menu')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const title = page.getByTestId('layout-mobile-menu-title')
    await page.getByTestId('layout-mobile-menu-catalog').click()
    await expect(title).toBeFocused()
    await expect(title).toHaveText('Catalogue')

    await page.getByTestId('layout-mobile-menu-category-plantes-interieur').click()
    await expect(title).toBeFocused()
    await expect(title).toHaveText('Plantes d’intérieur')
    await expect(page.getByTestId('layout-mobile-menu-back')).toHaveText(/Retour à Catalogue/)

    await page.getByTestId('layout-mobile-menu-back').click()
    await expect(title).toBeFocused()
    await expect(title).toHaveText('Catalogue')

    await page.keyboard.press('Escape')
    await expect(menu).toHaveCount(0)
    await expect(toggle).toBeFocused()
  })

  test('une feuille navigue et ferme le panneau', async ({ page }) => {
    await gotoHydrated(page, '/')
    await page.getByTestId('layout-mobile-menu-toggle').click()
    const menu = page.getByTestId('layout-mobile-menu')
    await page.getByTestId('layout-mobile-menu-catalog').click()
    await page.getByTestId('layout-mobile-menu-category-plantes-aquatiques').click()
    await category(menu, 'plantes-aquatiques/nenuphars').click()

    await expect(page).toHaveURL(/\/catalogue\/plantes-aquatiques\/nenuphars$/)
    await expect(menu).toHaveCount(0)
  })
})
