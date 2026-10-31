import { expect } from '@playwright/test'

import type { BrowserContext, Locator, Page, TestInfo } from '@playwright/test'

export const gotoHydrated = async (page: Page, url: string) => {
  const response = await page.goto(url)
  await expect(page.locator('html[data-hydrated]')).toHaveCount(1)
  return response
}

export const enableEnhancedMode = (context: BrowserContext) =>
  context.addInitScript(() => localStorage.setItem('a11y-mode', 'enhanced'))

export const enableDarkMode = (context: BrowserContext) =>
  context.addInitScript(() => localStorage.setItem('color-scheme', 'dark'))

export const isMobile = (testInfo: TestInfo) => testInfo.project.name === 'mobile'

export const linkTo = (scope: Page | Locator, testId: string, href: string) =>
  scope.getByTestId(testId).and(scope.locator(`[href="${href}"]`))
