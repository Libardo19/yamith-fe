import type { MetadataRoute } from 'next'
import { getProcedures } from '@/lib/public-data'
import { siteConfig } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const procedures = await getProcedures()
  const now = new Date()
  const page = (path: string, priority: number) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    priority
  })
  return [
    page('/', 1),
    page('/procedimientos', 0.9),
    page('/sobre-el-doctor', 0.8),
    page('/contacto', 0.8),
    ...procedures.map((p) => page(`/procedimientos/${p.slug}`, 0.7)),
    page('/privacidad', 0.2),
    page('/terminos', 0.2)
  ]
}
