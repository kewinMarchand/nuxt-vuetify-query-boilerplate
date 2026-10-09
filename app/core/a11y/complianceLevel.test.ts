import { getComplianceLevel } from './complianceLevel'

describe('getComplianceLevel', () => {
  it('déclare le site non conforme sans audit', () => {
    expect(getComplianceLevel({ auditDate: null, complianceRate: null, auditor: null })).toBe(
      'non conforme',
    )
  })

  it('déclare le site non conforme sous 50 %', () => {
    expect(
      getComplianceLevel({ auditDate: '2026-09-01', complianceRate: 49, auditor: 'Exemple' }),
    ).toBe('non conforme')
  })

  it('déclare le site partiellement conforme à partir de 50 %', () => {
    expect(
      getComplianceLevel({ auditDate: '2026-09-01', complianceRate: 50, auditor: 'Exemple' }),
    ).toBe('partiellement conforme')
  })

  it('déclare le site totalement conforme à 100 %', () => {
    expect(
      getComplianceLevel({ auditDate: '2026-09-01', complianceRate: 100, auditor: 'Exemple' }),
    ).toBe('totalement conforme')
  })
})
