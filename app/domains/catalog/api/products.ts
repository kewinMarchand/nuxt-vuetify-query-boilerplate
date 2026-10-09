import type { Catalog } from '../common/models/catalog'

type Row = [string, string, number, Catalog.Exposure, Catalog.Size, boolean]

const ROWS: Row[] = [
  ['Monstera deliciosa', 'monstera', 3490, 'mi-ombre', 'L', true],
  ['Monstera adansonii', 'monstera', 2290, 'mi-ombre', 'M', true],
  ['Monstera variegata', 'monstera', 8900, 'mi-ombre', 'S', false],
  ['Fougère de Boston', 'fougeres', 1890, 'ombre', 'M', true],
  ['Fougère nid d’oiseau', 'fougeres', 2490, 'ombre', 'S', true],
  ['Fougère arborescente', 'fougeres', 12900, 'mi-ombre', 'L', true],
  ['Anthurium rouge', 'anthurium', 2990, 'mi-ombre', 'M', true],
  ['Anthurium blanc', 'anthurium', 3190, 'mi-ombre', 'M', false],
  ['Anthurium Clarinervium', 'anthurium', 4590, 'ombre', 'S', true],
  ['Strelitzia reginae', 'strelitzia', 3990, 'soleil', 'M', true],
  ['Strelitzia nicolai', 'strelitzia', 6990, 'soleil', 'L', true],
  ['Strelitzia juncea', 'strelitzia', 5490, 'soleil', 'S', false],
  ['Palmier de Chine', 'palmiers', 7990, 'soleil', 'L', true],
  ['Palmier nain', 'palmiers', 3490, 'soleil', 'M', true],
  ['Palmier bleu du Mexique', 'palmiers', 9900, 'soleil', 'L', true],
  ['Héliconia rostrata', 'heliconia', 4290, 'soleil', 'L', true],
  ['Héliconia psittacorum', 'heliconia', 3290, 'mi-ombre', 'M', true],
  ['Héliconia bihai', 'heliconia', 4890, 'soleil', 'L', false],
  ['Calliandra haematocephala', 'calliandra', 3790, 'soleil', 'M', true],
  ['Calliandra surinamensis', 'calliandra', 3590, 'soleil', 'M', true],
  ['Calliandra nain', 'calliandra', 2190, 'mi-ombre', 'S', true],
  ['Nénuphar blanc', 'nenuphars', 1990, 'soleil', 'S', true],
  ['Nénuphar rose', 'nenuphars', 2190, 'soleil', 'S', true],
  ['Lotus sacré', 'nenuphars', 2990, 'soleil', 'M', false],
]

const CATEGORY_IMAGES: Record<string, number[]> = {
  monstera: [6],
  fougeres: [7],
  anthurium: [2],
  strelitzia: [4],
  palmiers: [8, 9, 11],
  heliconia: [1],
  calliandra: [3],
  nenuphars: [5],
}

const imageFor = (categorySlug: string, index: number) => {
  const images = CATEGORY_IMAGES[categorySlug] ?? [12]
  return images[index % images.length] ?? 12
}

const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const PRODUCTS: Catalog.Product[] = ROWS.map(
  ([name, categorySlug, price, exposure, size, inStock], index) => ({
    id: String(index + 1),
    slug: slugify(name),
    name,
    categorySlug,
    price,
    exposure,
    size,
    inStock,
    image: imageFor(categorySlug, index),
  }),
)
