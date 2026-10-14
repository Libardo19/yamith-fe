import 'server-only'
import { fallbackSedes } from '@/content/site'
import { fallbackProcedures } from '@/content/procedures'
import type { GalleryItem, ProcedureCard, ProcedureDetail, Sede } from '@/types/api'
import { API_URL } from './api'
import { fetchPublicResource } from './public-fetch'

/**
 * Lecturas públicas del API desde Server Components.
 * Se cachean 5 min (ISR) y, si el API no responde, se usa el contenido de respaldo
 * para que la landing nunca se caiga ni falle el build.
 */
const fetchPublic = <T>(path: string) => fetchPublicResource<T>(API_URL + '/public' + path)

const fallbackCards: ProcedureCard[] = fallbackProcedures.map(
  ({ slug, name, category, summary, imageUrl, isFeatured }) => ({
    slug,
    name,
    category,
    summary,
    imageUrl,
    isFeatured
  })
)

export async function getProcedures(): Promise<ProcedureCard[]> {
  return (await fetchPublic<ProcedureCard[]>('/procedures')) ?? fallbackCards
}

export async function getProcedure(slug: string): Promise<ProcedureDetail | null> {
  const fromApi = await fetchPublic<ProcedureDetail>(`/procedures/${slug}`)
  if (fromApi !== undefined) return fromApi
  return fallbackProcedures.find((p) => p.slug === slug) ?? null
}

export async function getSedes(): Promise<Sede[]> {
  const sedes = await fetchPublic<Sede[]>('/sedes')
  return sedes ?? fallbackSedes
}

/** Resultados antes/después publicados (vacío si el API no responde). */
export async function getGallery(): Promise<GalleryItem[]> {
  return (await fetchPublic<GalleryItem[]>('/gallery')) ?? []
}
