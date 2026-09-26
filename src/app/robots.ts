import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Portal, panel y borradores nunca se indexan.
      disallow: ['/portal', '/admin', '/demo', '/login', '/registro', '/api']
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  }
}
