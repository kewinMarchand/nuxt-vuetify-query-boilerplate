import { useQuery } from '@tanstack/vue-query'
import { onServerPrefetch } from 'vue'

import { findLatestArticles } from '@/modules/blog/infrastructure/articleRepository'
import { ArticlesLoadError } from '@/modules/blog/infrastructure/ArticlesLoadError'

export const LATEST_ARTICLES_QUERY_KEY = ['articles', 'latest'] as const

const fetchLatestArticles = async () => {
  try {
    return await findLatestArticles()
  } catch (error) {
    console.error(error)
    throw new ArticlesLoadError({ cause: error })
  }
}

export const useLatestArticles = () => {
  const query = useQuery({ queryKey: LATEST_ARTICLES_QUERY_KEY, queryFn: fetchLatestArticles })
  onServerPrefetch(() => query.suspense())
  return query
}
