import {
  errorReportingConfig,
  glitchtipOptions,
  shouldReportError,
  statusOf,
} from './errorReporting'

describe('errorReportingConfig', () => {
  it('éteint le suivi sans DSN', () => {
    expect(errorReportingConfig(undefined, undefined, true)).toBeNull()
    expect(errorReportingConfig('', 'production', true)).toBeNull()
  })

  it('déduit l’environnement du framework quand il n’est pas fourni', () => {
    expect(errorReportingConfig('http://cle@glitchtip.test/1', '', true)).toEqual({
      dsn: 'http://cle@glitchtip.test/1',
      environment: 'production',
    })
    expect(errorReportingConfig('http://cle@glitchtip.test/1', undefined, false)?.environment).toBe(
      'development',
    )
    expect(errorReportingConfig('http://cle@glitchtip.test/1', 'recette', true)?.environment).toBe(
      'recette',
    )
  })
})

describe('statusOf', () => {
  it('lit statusCode ou status, et rien sur une erreur ordinaire', () => {
    expect(statusOf({ statusCode: 404 })).toBe(404)
    expect(statusOf({ status: 422 })).toBe(422)
    expect(statusOf(new Error('panne'))).toBeUndefined()
    expect(statusOf('panne')).toBeUndefined()
  })
})

describe('shouldReportError', () => {
  it('remonte les erreurs inattendues', () => {
    expect(shouldReportError({ status: undefined, scenario: undefined })).toBe(true)
    expect(shouldReportError({ status: 500, scenario: undefined })).toBe(true)
  })

  it('garde locales les 404, 422, la maintenance 503 et les scénarios de test', () => {
    for (const status of [404, 422, 503]) {
      expect(shouldReportError({ status, scenario: undefined })).toBe(false)
    }
    expect(shouldReportError({ status: 500, scenario: 'error' })).toBe(false)
  })
})

describe('glitchtipOptions', () => {
  it('n’envoie ni donnée personnelle ni trace de performance', () => {
    expect(glitchtipOptions({ dsn: 'http://cle@glitchtip.test/1', environment: 'test' })).toEqual({
      dsn: 'http://cle@glitchtip.test/1',
      environment: 'test',
      sendDefaultPii: false,
      tracesSampleRate: 0,
    })
  })
})
