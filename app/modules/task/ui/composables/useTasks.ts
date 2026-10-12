import { useQuery } from '@tanstack/vue-query'

import { findAllTasks } from '@/modules/task/infrastructure/taskRepository'
import { TasksLoadError } from '@/modules/task/infrastructure/TasksLoadError'

export const TASKS_QUERY_KEY = ['tasks'] as const

const fetchTasks = async () => {
  try {
    return await findAllTasks()
  } catch (error) {
    console.error(error)
    throw new TasksLoadError({ cause: error })
  }
}

export const useTasks = () => useQuery({ queryKey: TASKS_QUERY_KEY, queryFn: fetchTasks })
