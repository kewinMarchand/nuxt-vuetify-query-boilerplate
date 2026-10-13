import createClient from 'openapi-fetch'

import type { paths } from './schema'

export type { components, operations } from './schema'

export type ApiClient = ReturnType<typeof createApiClient>

/**
 * Client typé de l'API. `X-Scenario` (error, empty) n'a d'effet qu'en dev et en test côté API :
 * le relayer permet aux tests e2e de provoquer les états d'erreur et de liste vide.
 */
export const createApiClient = (baseUrl: string, scenario?: string | null) =>
  createClient<paths, 'application/json'>({
    baseUrl,
    headers: scenario ? { 'X-Scenario': scenario } : {},
  })

export class ApiError extends Error {
  constructor(response: Response) {
    super(`Réponse ${response.status} de l'API (${response.url})`)
    this.name = 'ApiError'
  }
}
