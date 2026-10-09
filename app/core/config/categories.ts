export interface CategoryNode {
  slug: string
  label: string
  children: CategoryNode[]
}

const leaf = (slug: string, label: string): CategoryNode => ({ slug, label, children: [] })

export const CATALOG_ROOT = { href: '/catalogue', label: 'Catalogue' }

export const CATEGORY_TREE: CategoryNode[] = [
  {
    slug: 'plantes-interieur',
    label: 'Plantes d’intérieur',
    children: [
      {
        slug: 'feuillages',
        label: 'Feuillages',
        children: [leaf('monstera', 'Monstera'), leaf('fougeres', 'Fougères')],
      },
      {
        slug: 'plantes-a-fleurs',
        label: 'Plantes à fleurs',
        children: [leaf('anthurium', 'Anthurium'), leaf('strelitzia', 'Strelitzia')],
      },
    ],
  },
  {
    slug: 'plantes-exterieur',
    label: 'Plantes d’extérieur',
    children: [
      leaf('palmiers', 'Palmiers'),
      {
        slug: 'arbustes-a-fleurs',
        label: 'Arbustes à fleurs',
        children: [leaf('heliconia', 'Héliconia'), leaf('calliandra', 'Calliandra')],
      },
    ],
  },
  {
    slug: 'plantes-aquatiques',
    label: 'Plantes aquatiques',
    children: [leaf('nenuphars', 'Nénuphars')],
  },
]

export const categoryHref = (slugs: string[]) => [CATALOG_ROOT.href, ...slugs].join('/')

export const findCategoryPath = (slugs: string[]): CategoryNode[] | null => {
  const path: CategoryNode[] = []
  let level = CATEGORY_TREE
  for (const slug of slugs) {
    const node = level.find((category) => category.slug === slug)
    if (!node) return null
    path.push(node)
    level = node.children
  }
  return path
}

export const flattenCategories = (
  nodes: CategoryNode[] = CATEGORY_TREE,
  parents: string[] = [],
): { slugs: string[]; node: CategoryNode }[] =>
  nodes.flatMap((node) => [
    { slugs: [...parents, node.slug], node },
    ...flattenCategories(node.children, [...parents, node.slug]),
  ])
