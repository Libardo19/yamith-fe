import 'server-only'
import { fallbackSedes } from '@/content/site'
import { fallbackProcedures } from '@/content/procedures'
import type { GalleryItem, ProcedureCard, ProcedureDetail, Sede } from '@/types/api'
import { API_URL } from './api'

/**
 * Lecturas públicas del API desde Server Components.
 * Se cachean 5 min (ISR) y, si el API no responde, se usa el contenido de respaldo
 * para que la landing nunca se caiga ni falle el build.
 */
const REVALIDATE = 300

async function fetchPublic<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/public${path}`, { next: { revalidate: REVALIDATE } })
    if (!res.ok) return null
    const json = (await res.json()) as { success: boolean; data: T }
    return json.success ? json.data : null
  } catch {
    return null
  }
}

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
  if (fromApi) return fromApi
  return fallbackProcedures.find((p) => p.slug === slug) ?? null
}

export async function getSedes(): Promise<Sede[]> {
  const sedes = await fetchPublic<Sede[]>('/sedes')
  return sedes?.length ? sedes : fallbackSedes
}

/** Resultados antes/después publicados (vacío si el API no responde). */
export async function getGallery(): Promise<GalleryItem[]> {
  return (await fetchPublic<GalleryItem[]>('/gallery')) ?? []
}
