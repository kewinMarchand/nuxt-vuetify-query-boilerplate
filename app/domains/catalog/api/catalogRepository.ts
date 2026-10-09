import { PRODUCTS } from './products'
import { buildCatalogPage } from '../services/catalogPage'

import type { Catalog } from '../common/models/catalog'

const LATENCY_MS = 300

export const findCatalogPage = (slugs: string[], query: Catalog.Query): Promise<Catalog.Page> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(buildCatalogPage(PRODUCTS, slugs, query)), LATENCY_MS),
  )
