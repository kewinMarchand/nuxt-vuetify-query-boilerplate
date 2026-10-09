import { ALL_NAVIGATION } from '@/core/config'

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const urls = ALL_NAVIGATION.map(
    ({ href }) => `  <url><loc>${new URL(href, siteUrl).href}</loc></url>`,
  ).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
