import { cspReportHandler } from '@/shared/security'

export default defineEventHandler((event) => cspReportHandler(toWebRequest(event)))
