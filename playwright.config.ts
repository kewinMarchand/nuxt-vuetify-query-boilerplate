import { defineConfig, devices } from '@playwright/test'

import { PRODUCTION_PORT, PRODUCTION_URL, TEST_PORT } from './tests/support/ports'

const BASE_URL = `http://localhost:${TEST_PORT}`

export default defineConfig({
  testMatch: /.*\.(e2e|a11y)\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    locale: 'fr-FR',
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: `yarn build && PORT=${TEST_PORT} NUXT_PUBLIC_DEV_TOOLS=true yarn start`,
      url: BASE_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
    {
      command: `PORT=${PRODUCTION_PORT} yarn start`,
      url: PRODUCTION_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
    },
  ],
})
