import { ApiError } from '@/shared/api/client'
import { useApiClient } from '@/shared/api/useApiClient'

import { toArticle } from './http/articleTranslation'

/** Dépôt de la requête en cours, à créer dans un `setup`. */
export const useArticleRepository = () => {
  const api = useApiClient()
  return {
    findLatest: async () => {
      const { data, response } = await api.GET('/api/articles')
      if (!data) throw new ApiError(response)
      return data.map(toArticle)
    },
  }
}
