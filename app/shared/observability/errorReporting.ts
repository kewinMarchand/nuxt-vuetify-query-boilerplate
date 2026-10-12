export interface ErrorReportingConfig {
  dsn: string
  environment: string
}

export const SCENARIO_HEADER = 'x-scenario'

const MAINTENANCE_STATUS = 503

/** Sans DSN, le suivi des erreurs est éteint : aucun SDK chargé, aucune requête. */
export const errorReportingConfig = (
  dsn: string | undefined,
  environment: string | undefined,
  isProduction: boolean,
): ErrorReportingConfig | null =>
  dsn ? { dsn, environment: environment || (isProduction ? 'production' : 'development') } : null

/** Statut HTTP porté par une erreur Nuxt ou h3 (`statusCode`, ou `status` depuis Nuxt 4). */
export const statusOf = (error: unknown): number | undefined => {
  if (!error || typeof error !== 'object') return undefined
  const status = 'statusCode' in error ? error.statusCode : 'status' in error ? error.status : null
  return typeof status === 'number' ? status : undefined
}

/**
 * Seules les erreurs inattendues remontent. Les 4xx (404, 422 de validation), la maintenance 503
 * et les scénarios de test (en-tête X-Scenario) restent locaux.
 */
export const shouldReportError = ({
  status,
  scenario,
}: {
  status: number | undefined
  scenario: string | null | undefined
}) => !scenario && (status === undefined || (status >= 500 && status !== MAINTENANCE_STATUS))

/** Aucune donnée personnelle, aucune trace de performance, aucun rejeu de session. */
export const glitchtipOptions = ({ dsn, environment }: ErrorReportingConfig) => ({
  dsn,
  environment,
  sendDefaultPii: false,
  tracesSampleRate: 0,
})
