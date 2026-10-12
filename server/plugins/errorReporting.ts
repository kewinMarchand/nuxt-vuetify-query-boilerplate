import {
  initServerErrorReporting,
  reportServerError,
  SCENARIO_HEADER,
} from '@/shared/observability/index.server'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()
  await initServerErrorReporting({
    dsn: config.glitchtipDsn,
    environment: config.public.glitchtipEnvironment,
    isProduction: !import.meta.dev,
  })
  nitroApp.hooks.hook('error', (error, { event }) => {
    reportServerError(error, event ? getHeader(event, SCENARIO_HEADER) : undefined)
  })
})
