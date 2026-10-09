import { buildSources } from '@/domains/home/services/imageSources'

import type { Carousel } from '@/features/carousel'

const SLIDE_WIDTHS = [640, 1280]

const slideImage = (base: string) => ({
  src: `/images/${base}-1280.webp`,
  sources: buildSources(base, SLIDE_WIDTHS),
  width: 1280,
  height: 720,
})

export const HOME_SLIDES: Carousel.Slide[] = [
  {
    id: 'heliconia',
    title: 'Une architecture lisible',
    text: 'Routage, domaines, features et socle : chaque fichier a une place évidente.',
    image: slideImage('slide-1'),
  },
  {
    id: 'anthurium',
    title: 'La qualité outillée',
    text: 'Lint, types, tests unitaires, end-to-end, accessibilité et Lighthouse en une commande.',
    image: slideImage('slide-2'),
  },
  {
    id: 'calliandra',
    title: 'L’accessibilité par défaut',
    text: 'Navigation au clavier, contrastes vérifiés et mode accessibilité renforcée.',
    image: slideImage('slide-3'),
  },
  {
    id: 'strelitzia',
    title: 'Le rendu serveur',
    text: 'Contenu indexable dès le premier octet, données réhydratées sans second appel.',
    image: slideImage('slide-4'),
  },
  {
    id: 'nenuphar',
    title: 'Prêt pour l’API',
    text: 'Les dépôts en mémoire laissent la place à l’API sans toucher à l’interface.',
    image: slideImage('slide-5'),
  },
]
