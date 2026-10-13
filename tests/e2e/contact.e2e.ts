import { expect, test } from '@playwright/test'

import { field, gotoHydrated } from '../support/page'

test.describe('Contact', () => {
  test('annonce que tous les champs sont obligatoires', async ({ page }) => {
    await gotoHydrated(page, '/contact')

    await expect(page.getByTestId('contact-required-notice')).toBeVisible()
    for (const testId of ['contact-name', 'contact-email', 'contact-message']) {
      await expect(field(page, testId)).toHaveAttribute('required', '')
    }
  })

  test('affiche les erreurs de validation quand le formulaire est vide', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await page.getByTestId('contact-submit').click()

    await expect(field(page, 'contact-name')).toHaveAttribute('aria-invalid', 'true')
    await expect(field(page, 'contact-email')).toHaveAccessibleDescription(/adresse e-mail valide/)
    await expect(page.getByTestId('contact-success')).toHaveCount(0)
  })

  test('confirme l’envoi quand le formulaire est valide', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await field(page, 'contact-name').fill('Ada')
    await field(page, 'contact-email').fill('ada@exemple.fr')
    await field(page, 'contact-message').fill('Bonjour, ceci est un message.')
    await page.getByTestId('contact-submit').click()

    await expect(page.getByTestId('contact-success')).toBeVisible()
  })

  test('affiche sous le champ la violation 422 renvoyée par l’API', async ({ page }) => {
    await gotoHydrated(page, '/contact')
    await field(page, 'contact-name').fill('A'.repeat(256))
    await field(page, 'contact-email').fill('ada@exemple.fr')
    await field(page, 'contact-message').fill('Bonjour, ceci est un message.')
    await page.getByTestId('contact-submit').click()

    const name = field(page, 'contact-name')
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toHaveAccessibleDescription('Votre nom ne doit pas dépasser 255 caractères.')
    await expect(page.getByTestId('contact-success')).toHaveCount(0)
  })
})
