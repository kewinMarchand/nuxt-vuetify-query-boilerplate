import { expect, test } from '@playwright/test'

import { gotoHydrated } from '../support/page'

test.describe('Contact', () => {
  test('signale chaque champ obligatoire dans son libellé', async ({ page }) => {
    await gotoHydrated(page, '/contact')

    for (const testId of ['contact-name', 'contact-email', 'contact-message']) {
      await expect(page.getByTestId(testId)).toHaveAttribute('required', '')
      await expect(page.getByTestId(testId)).toHaveAccessibleName(/\(obligatoire\)$/)
    }
  })

  test('affiche les erreurs de validation quand le formulaire est vide', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await page.getByTestId('contact-submit').click()

    await expect(page.getByTestId('contact-name')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByTestId('contact-email')).toHaveAccessibleDescription(
      /adresse e-mail valide/,
    )
    await expect(page.getByTestId('contact-success')).toHaveCount(0)
  })

  test('confirme l’envoi quand le formulaire est valide', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await page.getByTestId('contact-name').fill('Ada')
    await page.getByTestId('contact-email').fill('ada@exemple.fr')
    await page.getByTestId('contact-message').fill('Bonjour, ceci est un message.')
    await page.getByTestId('contact-submit').click()

    await expect(page.getByTestId('contact-success')).toBeVisible()
  })

  test('affiche sous le champ la violation 422 renvoyée par l’API', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await page.getByTestId('contact-name').fill('A'.repeat(256))
    await page.getByTestId('contact-email').fill('ada@exemple.fr')
    await page.getByTestId('contact-message').fill('Bonjour, ceci est un message.')
    await page.getByTestId('contact-submit').click()

    const name = page.getByTestId('contact-name')
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toHaveAccessibleDescription('Votre nom ne doit pas dépasser 255 caractères.')
    await expect(page.getByTestId('contact-success')).toHaveCount(0)
  })
})
