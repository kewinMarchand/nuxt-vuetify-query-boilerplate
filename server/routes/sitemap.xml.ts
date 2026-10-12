import { CATALOG_ROOT, listCatalogLinks } from '@/modules/catalog/index.server'
import { LEGAL_NAVIGATION, MAIN_NAVIGATION } from '@/shared/config'

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const pages = [...MAIN_NAVIGATION, CATALOG_ROOT, ...listCatalogLinks(), ...LEGAL_NAVIGATION]
  const urls = pages
    .map(({ href }) => `  <url><loc>${new URL(href, siteUrl).href}</loc></url>`)
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
