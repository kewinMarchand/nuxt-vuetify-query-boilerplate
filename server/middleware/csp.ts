import { CSP_HEADER, siteCsp } from '@/shared/security'

export default defineEventHandler((event) => {
  const { apiUrl, matomoUrl, glitchtipDsn } = useRuntimeConfig(event).public
  setHeader(event, CSP_HEADER, siteCsp({ apiUrl, matomoUrl, glitchtipDsn }))
})
