import {
  errorReportingConfig,
  glitchtipOptions,
  shouldReportError,
  statusOf,
} from './errorReporting'

import type * as Sentry from '@sentry/nuxt'

let sentry: typeof Sentry | null = null

/** Charge le SDK serveur seulement si un DSN est fourni : sans DSN, rien n'est importé. */
export const initServerErrorReporting = async ({
  dsn,
  environment,
  isProduction,
}: {
  dsn: string | undefined
  environment: string | undefined
  isProduction: boolean
}) => {
  const config = errorReportingConfig(dsn, environment, isProduction)
  if (!config) return
  sentry = await import('@sentry/nuxt')
  sentry.init({
    ...glitchtipOptions(config),
    integrations: (defaults) =>
      defaults.map((integration) =>
        integration.name === 'Http' && sentry
          ? sentry.httpIntegration({ maxRequestBodySize: 'none' })
          : integration,
      ),
  })
}

export const reportServerError = (error: unknown, scenario: string | undefined) => {
  if (!sentry || !shouldReportError({ status: statusOf(error), scenario })) return
  sentry.captureException(error)
}
