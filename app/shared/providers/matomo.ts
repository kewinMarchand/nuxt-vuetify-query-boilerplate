import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

import { matomoConfig, startMatomo } from '@/shared/observability'

/**
 * Une page vue par navigation, après la mise à jour du head : `app:suspense:resolve` pour la
 * première page, `page:finish` hors hydratation pour les suivantes.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { matomoUrl, matomoSiteId } = useRuntimeConfig().public
  const config = matomoConfig(matomoUrl, matomoSiteId)
  if (!config) return
  const tracker = startMatomo(config)

  let firstPageTracked = false
  nuxtApp.hook('app:suspense:resolve', () => {
    if (firstPageTracked) return
    firstPageTracked = true
    tracker.trackPageView()
  })
  nuxtApp.hook('page:finish', () => {
    if (!nuxtApp.isHydrating && firstPageTracked) tracker.trackPageView()
  })
})
