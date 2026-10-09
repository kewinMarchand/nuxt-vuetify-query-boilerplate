import { expect, test } from '@playwright/test'

import { enableEnhancedMode, gotoHydrated, linkTo } from '../support/page'
import { ROUTES } from '../support/routes'

const WIDTHS = [375, 768, 1280]
const MAX_GROWTH = 1.4

test.describe('Footer collé en bas', () => {
  test('le bas du footer touche le bas du viewport sur la 404', async ({ page }) => {
    await page.goto('/route-inexistante')
    const footerBottom = await page
      .locator('footer')
      .evaluate((footer) => footer.getBoundingClientRect().bottom)
    const viewportHeight = await page.evaluate(() => window.innerHeight)
    expect(Math.abs(footerBottom - viewportHeight)).toBeLessThanOrEqual(1)
  })
})

for (const mode of ['normal', 'renforcé'] as const) {
  test.describe(`Aucun débordement horizontal en mode ${mode}`, () => {
    test.skip(({ isMobile }) => isMobile, 'Largeurs fixées dans le test, un seul projet suffit')

    test.beforeEach(async ({ context }) => {
      if (mode === 'renforcé') await enableEnhancedMode(context)
    })

    for (const width of WIDTHS) {
      test(`à ${width} px sur chaque route`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        for (const route of ROUTES) {
          await gotoHydrated(page, route)
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - window.innerWidth,
          )
          expect(overflow, route).toBeLessThanOrEqual(0)
        }
      })
    }
  })
}

test.describe('Le mode renforcé garde la structure du header', () => {
  test.skip(({ isMobile }) => isMobile, 'Mesure à 1280 px')

  test('header et h1 ne grandissent pas au-delà de 1,4 fois', async ({ browser }) => {
    const measure = async (enhanced: boolean, route: string) => {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
      if (enhanced) await enableEnhancedMode(context)
      const page = await context.newPage()
      await gotoHydrated(page, route)
      const header = await page
        .locator('header')
        .first()
        .evaluate((element) => element.getBoundingClientRect().height)
      const h1Top = await page
        .getByRole('heading', { level: 1 })
        .evaluate((element) => element.getBoundingClientRect().top + window.scrollY)
      await context.close()
      return { header, h1Top }
    }

    for (const route of ROUTES) {
      const normal = await measure(false, route)
      const enhanced = await measure(true, route)
      expect(enhanced.header, route).toBeLessThanOrEqual(normal.header * MAX_GROWTH)
      expect(enhanced.h1Top, route).toBeLessThanOrEqual(normal.h1Top * MAX_GROWTH)
    }
  })
})

test.describe('Logo', () => {
  test('le lien logo porte le nom du site et aria-current sur l’accueil', async ({ page }) => {
    await gotoHydrated(page, '/')
    const logo = page.getByTestId('layout-logo')
    await expect(logo).toHaveAccessibleName('Nuxt Vuetify Query Boilerplate')
    await expect(logo).toHaveAttribute('aria-current', 'page')

    await gotoHydrated(page, '/contact')
    await expect(page.getByTestId('layout-logo')).not.toHaveAttribute('aria-current')
  })
})

test.describe('Fil d’Ariane', () => {
  test('absent sur l’accueil', async ({ page }) => {
    await gotoHydrated(page, '/')
    await expect(page.getByTestId('layout-breadcrumb')).toHaveCount(0)
  })

  test('présent sur une page interne, dernier élément courant, JSON-LD cohérent', async ({
    page,
  }) => {
    await gotoHydrated(page, '/catalogue/plantes-interieur/feuillages')
    const breadcrumb = page.getByTestId('layout-breadcrumb')
    await expect(breadcrumb.getByRole('listitem')).toHaveCount(4)
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('Feuillages')

    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
    const breadcrumbList = scripts
      .map((text) => JSON.parse(text))
      .find((data) => data['@type'] === 'BreadcrumbList')
    expect(breadcrumbList.itemListElement).toHaveLength(4)
    expect(breadcrumbList.itemListElement[3].item).toMatch(
      /^https?:\/\/.+\/catalogue\/plantes-interieur\/feuillages$/,
    )
  })

  test('sur la 404 : Accueil puis Page introuvable', async ({ page }) => {
    await page.goto('/route-inexistante')
    await expect(page.getByTestId('layout-breadcrumb').locator('[aria-current="page"]')).toHaveText(
      'Page introuvable',
    )
  })
})

test.describe('Libellés de la déclaration d’accessibilité', () => {
  test('le titre court partout, l’état de conformité dans le footer seulement', async ({
    page,
  }) => {
    await gotoHydrated(page, '/accessibilite')
    await expect(page.getByTestId('layout-breadcrumb').locator('[aria-current="page"]')).toHaveText(
      'Déclaration d’accessibilité',
    )
    await expect(linkTo(page, 'layout-footer-link', '/accessibilite')).toHaveText(
      'Accessibilité : non conforme',
    )

    await gotoHydrated(page, '/plan-du-site')
    const sitemapEntry = page
      .getByTestId('legal-sitemap-item')
      .filter({ has: page.locator('[href="/accessibilite"]') })
    await expect(sitemapEntry).toHaveText('Déclaration d’accessibilité')
  })
})
