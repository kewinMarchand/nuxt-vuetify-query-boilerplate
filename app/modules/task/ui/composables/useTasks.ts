import { useQuery } from '@tanstack/vue-query'

import { useTaskRepository } from '@/modules/task/infrastructure/taskRepository'
import { TasksLoadError } from '@/modules/task/infrastructure/TasksLoadError'

export const TASKS_QUERY_KEY = ['tasks'] as const

export const useTasks = () => {
  const repository = useTaskRepository()
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: async () => {
      try {
        return await repository.findAll()
      } catch (error) {
        console.error(error)
        throw new TasksLoadError({ cause: error })
      }
    },
  })
}
