import { brotliCompressSync, gzipSync } from 'node:zlib'

const INTERNAL_ERROR_RENDER = '/__nuxt_error'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    const contentType = String(response.headers?.['content-type'] ?? '')
    if (!contentType.startsWith('text/html') || typeof response.body !== 'string') return
    if (event.path.startsWith(INTERNAL_ERROR_RENDER)) return

    const accepted = getRequestHeader(event, 'accept-encoding') ?? ''
    const encoding = accepted.includes('br') ? 'br' : accepted.includes('gzip') ? 'gzip' : null
    if (!encoding) return

    response.body = encoding === 'br' ? brotliCompressSync(response.body) : gzipSync(response.body)
    response.headers = {
      ...response.headers,
      'content-encoding': encoding,
      vary: 'Accept-Encoding',
    }
  })
})
