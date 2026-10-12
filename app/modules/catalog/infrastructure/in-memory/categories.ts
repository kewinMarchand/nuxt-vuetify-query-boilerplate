import type { Catalog } from '@/modules/catalog/domain/catalog'

const leaf = (slug: string, label: string): Catalog.Category => ({ slug, label, children: [] })

export const CATEGORY_TREE: Catalog.Category[] = [
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
