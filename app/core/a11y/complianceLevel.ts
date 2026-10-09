export declare namespace Compliance {
  type Level = 'non conforme' | 'partiellement conforme' | 'totalement conforme'

  interface Audit {
    auditDate: string | null
    complianceRate: number | null
    auditor: string | null
  }
}

const PARTIAL_COMPLIANCE_THRESHOLD = 50
const FULL_COMPLIANCE_RATE = 100

export const getComplianceLevel = ({
  auditDate,
  complianceRate,
}: Compliance.Audit): Compliance.Level => {
  if (!auditDate || complianceRate === null) return 'non conforme'
  if (complianceRate >= FULL_COMPLIANCE_RATE) return 'totalement conforme'
  if (complianceRate >= PARTIAL_COMPLIANCE_THRESHOLD) return 'partiellement conforme'
  return 'non conforme'
}
