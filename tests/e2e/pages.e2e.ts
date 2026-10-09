import { expect, test } from '@playwright/test'

import { gotoHydrated } from '../support/page'
import { PRODUCTION_URL } from '../support/ports'
import { DEV_ROUTES, ROUTES } from '../support/routes'

const TECHNICAL_WORDS = /error|stack|exception|undefined|not found/i

for (const route of [...ROUTES, ...DEV_ROUTES]) {
  test(`la page ${route} répond 200 sans erreur console`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    const response = await gotoHydrated(page, route)

    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
  })
}

for (const route of ['/route-inexistante', '/catalogue/categorie-inconnue']) {
  test(`${route} affiche la page 404 avec ses liens`, async ({ page }) => {
    const response = await page.goto(route)

    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible()
    await expect(page.getByTestId('error-home-link')).toHaveAttribute('href', '/')
    await expect(page.getByTestId('error-sitemap-link')).toHaveAttribute('href', '/plan-du-site')
    await expect(page.getByTestId('error-catalog-link')).toHaveAttribute('href', '/catalogue')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })
}

test('la route de test affiche la page 500 sans texte technique', async ({ page }) => {
  const response = await page.goto('/_erreur-test')

  expect(response?.status()).toBe(500)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Une erreur est survenue' }),
  ).toBeVisible()
  await expect(page.getByTestId('error-retry')).toBeVisible()
  await expect(page.locator('main')).not.toContainText(TECHNICAL_WORDS)
})

test.describe('Build de production', () => {
  for (const route of ['/charte-graphique', '/_erreur-test']) {
    test(`${route} répond 404`, async ({ page }) => {
      const response = await page.goto(`${PRODUCTION_URL}${route}`)
      expect(response?.status()).toBe(404)
    })
  }

  test('le lien vers la charte graphique est absent du footer', async ({ page }) => {
    await page.goto(PRODUCTION_URL)
    await expect(page.getByTestId('layout-footer-link')).toHaveCount(4)
    await expect(page.getByTestId('layout-styleguide-link')).toHaveCount(0)
  })
})

test('la charte graphique présente toutes ses sections en développement', async ({ page }) => {
  await gotoHydrated(page, '/charte-graphique')
  for (const section of [
    'colors',
    'typography',
    'spacing',
    'buttons',
    'forms',
    'feedback',
    'navigation',
    'media',
    'icons',
    'logo',
  ]) {
    await expect(page.getByTestId(`styleguide-${section}`)).toBeVisible()
  }
})
