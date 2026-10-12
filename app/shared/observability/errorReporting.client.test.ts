import { reportClientError, scheduleClientErrorReporting } from './errorReporting.client'

describe('scheduleClientErrorReporting', () => {
  it('sans DSN, ne programme rien et ignore les erreurs', () => {
    const addEventListener = vi.spyOn(window, 'addEventListener')
    const scriptsBefore = document.scripts.length

    scheduleClientErrorReporting(null)
    reportClientError(new Error('ignorée'))

    expect(addEventListener).not.toHaveBeenCalledWith('load', expect.anything(), expect.anything())
    expect(document.scripts.length).toBe(scriptsBefore)
  })
})
