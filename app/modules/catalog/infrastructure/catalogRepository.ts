import { buildCatalogPage } from './in-memory/catalogPage'
import { CATEGORY_TREE } from './in-memory/categories'
import { PRODUCTS } from './in-memory/products'

import type { Catalog } from '../domain/catalog'

const LATENCY_MS = import.meta.client ? 300 : 0

export const findCatalogPage = (slugs: string[], query: Catalog.Query): Promise<Catalog.Page> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(buildCatalogPage(PRODUCTS, slugs, query)), LATENCY_MS),
  )

export const findCategoryTree = (): Catalog.Category[] => CATEGORY_TREE
