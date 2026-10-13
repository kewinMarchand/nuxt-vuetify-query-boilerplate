import { ApiError } from '@/shared/api/client'
import { useApiClient } from '@/shared/api/useApiClient'

import { toTask } from './http/taskTranslation'

/** Dépôt de la requête en cours, à créer dans un `setup`. Les tâches se chargent dans le navigateur. */
export const useTaskRepository = () => {
  const api = useApiClient()
  return {
    findAll: async () => {
      const { data, response } = await api.GET('/api/tasks')
      if (!data) throw new ApiError(response)
      return data.map(toTask)
    },
  }
}
