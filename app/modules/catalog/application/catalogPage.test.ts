import { CatalogLoadError } from './CatalogLoadError'
import { loadCatalogPage, resolveCatalogCategory } from './catalogPage'
import { DEFAULT_QUERY } from '../domain/catalogQuery'
import { findCatalogPage } from '../infrastructure/catalogRepository'

import type * as CatalogRepository from '../infrastructure/catalogRepository'

vi.mock('../infrastructure/catalogRepository', async (importOriginal) => {
  const original = await importOriginal<typeof CatalogRepository>()
  return { ...original, findCatalogPage: vi.fn(original.findCatalogPage) }
})

describe('resolveCatalogCategory', () => {
  it('résout une catégorie connue en chemin de catégories', () => {
    const resolution = resolveCatalogCategory(['plantes-interieur', 'feuillages'])

    expect(resolution.status).toBe('ok')
    if (resolution.status !== 'ok') throw new Error('chemin attendu')
    expect(resolution.path.map((link) => link.slug)).toEqual(['plantes-interieur', 'feuillages'])
  })

  it('déclare introuvables une catégorie inconnue et un chemin trop profond', () => {
    expect(resolveCatalogCategory(['inconnue'])).toEqual({ status: 'not-found' })
    expect(resolveCatalogCategory(['a', 'b', 'c', 'd'])).toEqual({ status: 'not-found' })
  })
})

describe('loadCatalogPage', () => {
  it('renvoie la page de résultats du dépôt', async () => {
    const page = await loadCatalogPage(['plantes-aquatiques'], DEFAULT_QUERY)
    expect(page.total).toBe(3)
  })

  it('traduit un échec du dépôt en erreur de chargement qui garde la cause', async () => {
    const failure = new Error('panne')
    vi.mocked(findCatalogPage).mockRejectedValueOnce(failure)
    vi.spyOn(console, 'error').mockImplementationOnce(() => {})

    const error = await loadCatalogPage([], DEFAULT_QUERY).catch((caught: unknown) => caught)

    expect(error).toBeInstanceOf(CatalogLoadError)
    expect(error).toMatchObject({
      message: 'Impossible de charger les produits pour le moment.',
      cause: failure,
    })
  })
})
