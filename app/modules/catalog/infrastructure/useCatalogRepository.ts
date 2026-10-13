import { useApiClient } from '@/shared/api/useApiClient'

import { createCatalogRepository } from './catalogRepository'

/**
 * Dépôt de la requête en cours, à créer dans un `setup`. Fichier à part : la route Nitro du
 * sitemap importe `catalogRepository.ts`, où les imports virtuels de l'app n'existent pas.
 */
export const useCatalogRepository = () => createCatalogRepository(useApiClient())
