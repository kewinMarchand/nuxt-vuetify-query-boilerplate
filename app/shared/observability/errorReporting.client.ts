import { glitchtipOptions } from './errorReporting'

import type { ErrorReportingConfig } from './errorReporting'

const EXCLUDED_INTEGRATIONS = new Set(['BrowserTracing', 'BrowserSession', 'Replay'])

const pending: unknown[] = []
let capture: ((error: unknown) => void) | null = null
let scheduled = false

const afterDisplay = (task: () => void) => {
  const schedule = () =>
    'requestIdleCallback' in window ? window.requestIdleCallback(task) : setTimeout(task, 0)
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
}

/** Le SDK navigateur se charge après l'affichage, et seulement si un DSN est fourni. */
export const scheduleClientErrorReporting = (config: ErrorReportingConfig | null) => {
  if (!config) return
  scheduled = true
  afterDisplay(async () => {
    const { captureException, init } = await import('@sentry/nuxt')
    init({
      ...glitchtipOptions(config),
      integrations: (defaults) =>
        defaults.filter((integration) => !EXCLUDED_INTEGRATIONS.has(integration.name)),
    })
    capture = (error) => captureException(error)
    pending.splice(0).forEach(capture)
  })
}

/** Les erreurs survenues avant le chargement du SDK attendent dans une file. */
export const reportClientError = (error: unknown) => {
  if (!scheduled) return
  if (capture) capture(error)
  else pending.push(error)
}
