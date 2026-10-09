import { SITE } from '@/core/config'

export const organizationJsonLd = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.publisher.companyName,
  url: new URL('/', siteUrl).href,
  logo: new URL('/icon-512.png', siteUrl).href,
  email: SITE.publisher.email,
})

export const websiteJsonLd = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: new URL('/', siteUrl).href,
  inLanguage: 'fr',
})
