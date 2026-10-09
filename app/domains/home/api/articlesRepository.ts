import type { Article } from '../common/models/article'

const ARTICLES: Article.Entity[] = [
  {
    id: '1',
    title: 'Structurer un projet Nuxt par domaines',
    excerpt:
      'Routage pur, domaines métier et socle transverse : une page, une vue, un seul export public.',
    publishedAt: '2026-09-28',
    illustration: 'blog-1',
  },
  {
    id: '2',
    title: 'Rendre un carrousel accessible sans dépendance',
    excerpt: 'Scroll snap, boutons explicites, rôles ARIA et aucun défilement automatique.',
    publishedAt: '2026-09-14',
    illustration: 'blog-2',
  },
  {
    id: '3',
    title: 'TanStack Query et le rendu serveur',
    excerpt:
      'Préchargement côté serveur, état déshydraté dans la page et réhydratation au démarrage.',
    publishedAt: '2026-09-02',
    illustration: 'blog-3',
  },
]

const LATENCY_MS = import.meta.client ? 300 : 0

export const findLatestArticles = (): Promise<Article.Entity[]> =>
  new Promise((resolve) => setTimeout(() => resolve(ARTICLES), LATENCY_MS))
