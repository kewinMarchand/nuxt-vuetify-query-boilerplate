import { toArticle } from './articleTranslation'

describe('toArticle', () => {
  it('garde le contenu et associe l’illustration à l’identifiant', () => {
    expect(
      toArticle({
        id: 2,
        slug: 'un-carrousel-accessible-sans-dependance',
        title: 'Un carrousel accessible sans dépendance',
        excerpt: 'Défilement natif, boutons explicites, pas de lecture automatique.',
        publishedAt: '2026-09-22',
      }),
    ).toEqual({
      id: '2',
      title: 'Un carrousel accessible sans dépendance',
      excerpt: 'Défilement natif, boutons explicites, pas de lecture automatique.',
      publishedAt: '2026-09-22',
      illustration: 'blog-2',
    })
  })
})
