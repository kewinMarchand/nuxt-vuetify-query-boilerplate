import { defineNuxtPlugin, injectHead, useRuntimeConfig } from '#imports'

import { matomoConfig, mesureRefusee, startMatomo } from '@/shared/observability'

/**
 * Une page vue par navigation, avec le titre à jour. La première page part à
 * `app:suspense:resolve`. Les suivantes partent au premier rendu du head qui suit `page:finish` :
 * Nuxt émet `page:finish` deux fois par navigation, et le titre n'est écrit qu'au rendu
 * asynchrone du head.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { matomoUrl, matomoSiteId } = useRuntimeConfig().public
  const config = matomoConfig(matomoUrl, matomoSiteId)
  // Refus lu avant la première commande (section 16 de la spec) : ni file, ni script, ni requête.
  if (!config || mesureRefusee()) return
  const tracker = startMatomo(config)

  let firstPageTracked = false
  let navigationPending = false
  nuxtApp.hook('app:suspense:resolve', () => {
    if (firstPageTracked) return
    firstPageTracked = true
    tracker.trackPageView()
  })
  nuxtApp.hook('page:finish', () => {
    if (!nuxtApp.isHydrating && firstPageTracked) navigationPending = true
  })
  injectHead(nuxtApp)?.hooks?.hook('dom:rendered', () => {
    if (!navigationPending) return
    navigationPending = false
    tracker.trackPageView()
  })
})
