import { expect, test } from '@playwright/test'

import { ROUTES } from '../support/routes'

test.describe('Métadonnées SEO rendues côté serveur', () => {
  test.use({ javaScriptEnabled: false })

  for (const route of ROUTES) {
    test(`la page ${route} porte ses métadonnées`, async ({ page }) => {
      await page.goto(route)

      expect((await page.title()).length).toBeGreaterThan(0)

      await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description?.length ?? 0).toBeGreaterThanOrEqual(50)
      expect(description?.length ?? 0).toBeLessThanOrEqual(160)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//)
      for (const property of ['og:title', 'og:description', 'og:image']) {
        await expect(page.locator(`meta[property="${property}"]`)).toHaveAttribute('content', /.+/)
      }
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /^https?:\/\//,
      )

      for (const json of await page
        .locator('script[type="application/ld+json"]')
        .allTextContents()) {
        expect(() => JSON.parse(json)).not.toThrow()
      }
    })
  }

  test('chaque page a un titre unique', async ({ page }) => {
    const titles: string[] = []
    for (const route of ROUTES) {
      await page.goto(route)
      titles.push(await page.title())
    }
    expect(new Set(titles).size).toBe(ROUTES.length)
  })

  test('l’accueil déclare Organization et WebSite', async ({ page }) => {
    await page.goto('/')
    const types = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(
      (json) => JSON.parse(json)['@type'],
    )
    expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite']))
  })
})
