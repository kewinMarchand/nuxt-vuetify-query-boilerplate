import { useQuery } from '@tanstack/vue-query'
import { onServerPrefetch } from 'vue'

import { findLatestArticles } from '@/domains/home/api/articlesRepository'
import { ArticlesLoadError } from '@/domains/home/common/exceptions/ArticlesLoadError'

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
