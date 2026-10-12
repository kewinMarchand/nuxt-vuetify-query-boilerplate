import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

import {
  errorReportingConfig,
  reportClientError,
  scheduleClientErrorReporting,
  shouldReportError,
  statusOf,
} from '@/shared/observability'

export default defineNuxtPlugin((nuxtApp) => {
  const { glitchtipDsn, glitchtipEnvironment } = useRuntimeConfig().public
  const config = errorReportingConfig(glitchtipDsn, glitchtipEnvironment, !import.meta.dev)
  if (!config) return
  scheduleClientErrorReporting(config)

  const report = (error: unknown) => {
    if (shouldReportError({ status: statusOf(error), scenario: undefined }))
      reportClientError(error)
  }
  nuxtApp.hook('app:error', report)
  nuxtApp.hook('vue:error', report)
})
