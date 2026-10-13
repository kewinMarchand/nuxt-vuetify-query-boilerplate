import { useRequestHeader, useRuntimeConfig } from '#imports'

import { createApiClient } from './client'

/**
 * Client de la requête en cours, à créer dans un `setup` : origine relue à l'exécution
 * (`runtimeConfig.public.apiUrl`, alimentée par `API_URL`) et, côté serveur, `X-Scenario` reçu
 * relayé à l'API. Dans le navigateur, l'en-tête éventuel est posé par le client lui-même.
 */
export const useApiClient = () =>
  createApiClient(
    useRuntimeConfig().public.apiUrl,
    import.meta.server ? useRequestHeader('x-scenario') : undefined,
  )
