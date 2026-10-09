import { PRODUCTS } from './products'
import { buildCatalogPage } from '../services/catalogPage'

import type { Catalog } from '../common/models/catalog'

const LATENCY_MS = import.meta.client ? 300 : 0

export const findCatalogPage = (slugs: string[], query: Catalog.Query): Promise<Catalog.Page> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(buildCatalogPage(PRODUCTS, slugs, query)), LATENCY_MS),
  )
