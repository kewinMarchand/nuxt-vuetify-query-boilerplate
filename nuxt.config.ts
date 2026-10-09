import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { A11Y_MODE_BOOT_SCRIPT, JS_FLAG_SCRIPT } from './app/core/a11y/a11yModeBootScript'
import { PRIMARY_COLOR } from './app/core/theme/colors'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  telemetry: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],
  imports: { autoImport: false },
  nitro: {
    imports: { autoImport: true },
    compressPublicAssets: { gzip: true, brotli: true },
  },
  plugins: [
    '@/core/providers/vuetify',
    '@/core/providers/vueQuery',
    { src: '@/core/providers/hydrated', mode: 'client' },
  ],
  css: ['@/core/theme/global.css'],
  build: { transpile: ['vuetify'] },
  vite: { vue: { template: { transformAssetUrls } } },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
      meta: [{ name: 'theme-color', content: PRIMARY_COLOR }],
      script: [
        { innerHTML: JS_FLAG_SCRIPT, tagPosition: 'head' },
        { innerHTML: A11Y_MODE_BOOT_SCRIPT, tagPosition: 'head' },
      ],
    },
  },
  runtimeConfig: {
    public: { siteUrl: 'http://localhost:3010', devTools: process.env.NODE_ENV !== 'production' },
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin'],
        global: true,
      },
    ],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        noUnusedLocals: true,
        noUnusedParameters: true,
        types: ['vitest/globals', '@testing-library/jest-dom/vitest'],
      },
    },
    nodeTsConfig: {
      include: [
        '../vitest.config.ts',
        '../vitest.setup.ts',
        '../playwright.config.ts',
        '../tests/**/*',
      ],
    },
  },
})
