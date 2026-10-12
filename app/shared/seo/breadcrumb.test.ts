import { buildBreadcrumb, toBreadcrumbJsonLd } from './breadcrumb'

describe('buildBreadcrumb', () => {
  it('ne produit aucun fil sur l’accueil', () => {
    expect(buildBreadcrumb('/')).toEqual([])
  })

  it('utilise le titre de la navigation pour une page statique', () => {
    expect(buildBreadcrumb('/accessibilite')).toEqual([
      { label: 'Accueil', href: '/' },
      { label: 'Déclaration d’accessibilité', href: '/accessibilite' },
    ])
  })

  it('préfixe par l’accueil la piste fournie par un module', () => {
    const trail = [
      { label: 'Catalogue', href: '/catalogue' },
      { label: 'Feuillages', href: '/catalogue/feuillages' },
    ]
    expect(buildBreadcrumb('/catalogue/feuillages', undefined, trail)).toEqual([
      { label: 'Accueil', href: '/' },
      ...trail,
    ])
  })

  it('prend le libellé fourni pour une page hors navigation', () => {
    expect(buildBreadcrumb('/inconnue', 'Page introuvable')).toEqual([
      { label: 'Accueil', href: '/' },
      { label: 'Page introuvable', href: '/inconnue' },
    ])
  })

  it('produit un JSON-LD aux URL absolues et aux positions ordonnées', () => {
    const jsonLd = toBreadcrumbJsonLd(buildBreadcrumb('/contact'), 'https://exemple.fr')
    expect(jsonLd.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://exemple.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://exemple.fr/contact' },
    ])
  })
})
