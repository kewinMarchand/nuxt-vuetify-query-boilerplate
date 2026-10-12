import { matomoConfig, pageViewCommands, setupCommands } from './matomo'

describe('matomoConfig', () => {
  it('éteint la mesure sans URL ou sans identifiant de site', () => {
    expect(matomoConfig(undefined, undefined)).toBeNull()
    expect(matomoConfig('', '1')).toBeNull()
    expect(matomoConfig('http://matomo.test/', '')).toBeNull()
  })

  it('construit les URL du script et du traceur, avec ou sans barre finale', () => {
    const expected = {
      scriptUrl: 'http://matomo.test/matomo.js',
      trackerUrl: 'http://matomo.test/matomo.php',
      siteId: '1',
    }
    expect(matomoConfig('http://matomo.test/', '1')).toEqual(expected)
    expect(matomoConfig('http://matomo.test', '1')).toEqual(expected)
  })
})

describe('setupCommands', () => {
  it('désactive les cookies avant toute autre commande', () => {
    const config = matomoConfig('http://matomo.test/', '1')
    expect(config && setupCommands(config)).toEqual([
      ['disableCookies'],
      ['setTrackerUrl', 'http://matomo.test/matomo.php'],
      ['setSiteId', '1'],
    ])
  })
})

describe('pageViewCommands', () => {
  it('envoie l’URL et le titre, et la page précédente comme référent', () => {
    expect(
      pageViewCommands({ url: 'http://site.test/', title: 'Accueil', referrer: undefined }),
    ).toEqual([
      ['setCustomUrl', 'http://site.test/'],
      ['setDocumentTitle', 'Accueil'],
      ['trackPageView'],
    ])
    expect(
      pageViewCommands({
        url: 'http://site.test/contact',
        title: 'Contact',
        referrer: 'http://site.test/',
      }),
    ).toEqual([
      ['setReferrerUrl', 'http://site.test/'],
      ['setCustomUrl', 'http://site.test/contact'],
      ['setDocumentTitle', 'Contact'],
      ['trackPageView'],
    ])
  })
})
