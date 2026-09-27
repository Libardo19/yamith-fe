'use client'

import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, Trash2, Upload } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel } from '@/components/app/ui'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select } from '@/components/ui/Form'
import { api, API_URL, ApiError } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import type { AdminProcedure, GalleryItem } from '@/types/api'

/** Las imágenes del panel se piden con la sesión (incluye no publicadas). */
const staffImage = (id: string, which: 'antes' | 'despues') =>
  `${API_URL}/admin/gallery/${id}/${which}`

export default function GalleryAdminPage() {
  const { data, error, reload } = useApi<GalleryItem[]>('/admin/gallery')
  const { data: procedures } = useApi<AdminProcedure[]>('/admin/procedures')
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [pending, setPending] = useState(false)

  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const body = new FormData()
    for (const k of ['before', 'after']) {
      const file = f.get(k) as File | null
      if (file?.size) body.set(k, file)
    }
    for (const k of ['procedureId', 'description', 'consentRef'])
      body.set(k, (f.get(k) as string) ?? '')
    body.set('isPublished', f.get('isPublished') === 'on' ? 'true' : 'false')
    setPending(true)
    setNotice(null)
    try {
      const res = await fetch(`${API_URL}/admin/gallery`, {
        method: 'POST',
        credentials: 'include',
        body
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) {
        const detail = json?.details
          ? Object.values(json.details as Record<string, string[]>)
              .flat()
              .filter(Boolean)[0]
          : null
        throw new ApiError(detail ?? json?.message ?? `Error ${res.status}`, res.status)
      }
      form.reset()
      setNotice({ tone: 'success', text: 'Resultado guardado.' })
      reload()
    } catch (err) {
      setNotice({
        tone: 'error',
        text: err instanceof ApiError ? err.message : 'No se pudo guardar.'
      })
    } finally {
      setPending(false)
    }
  }

  async function update(id: string, body: Record<string, unknown>) {
    await api(`/admin/gallery/${id}`, { method: 'PATCH', body })
    reload()
  }

  return (
    <>
      <PageHeader
        title="Galería de resultados"
        subtitle="Antes y después que se muestran en la web. Publica sólo con el consentimiento escrito del paciente."
      />
      {notice ? (
        <Alert tone={notice.tone} className="mb-6">
          {notice.text}
        </Alert>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div>
          {error ? (
            <Alert tone="error">{error}</Alert>
          ) : !data ? (
            <LoadingBlock />
          ) : data.length === 0 ? (
            <Panel>
              <EmptyState
                title="Aún no hay resultados"
                text="Sube el primer antes y después con su consentimiento."
              />
            </Panel>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {data.map((g) => (
                <article key={g.id} className="border border-line bg-white">
                  <div className="grid grid-cols-2 gap-px bg-line">
                    {(['antes', 'despues'] as const).map((w) => (
                      <figure key={w} className="relative aspect-[3/4] bg-cream-100">
                        {/* eslint-disable-next-line @next/next/no-img-element -- imagen privada servida por el API */}
                        <img src={staffImage(g.id, w)} alt={w} className="size-full object-cover" />
                        <figcaption className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase">
                          {w === 'antes' ? 'Antes' : 'Después'}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-navy-900">
                        {g.procedure?.name ?? 'Sin procedimiento'}
                      </span>
                      {g.isPublished ? (
                        <Badge tone="success">
                          <Eye className="size-3" /> Publicado
                        </Badge>
                      ) : (
                        <Badge tone="muted">
                          <EyeOff className="size-3" /> Oculto
                        </Badge>
                      )}
                    </div>
                    {g.description ? (
                      <p className="mt-1 text-sm text-muted">{g.description}</p>
                    ) : null}
                    <p className="mt-2 text-[11px] text-muted">Consentimiento: {g.consentRef}</p>
                    <div className="mt-3 flex gap-4 text-xs font-semibold">
                      <button
                        type="button"
                        className="text-gold-700 hover:underline"
                        onClick={() => update(g.id, { isPublished: !g.isPublished })}
                      >
                        {g.isPublished ? 'Ocultar de la web' : 'Publicar en la web'}
                      </button>
                      <button
                        type="button"
                        className="ml-auto inline-flex items-center gap-1 text-danger hover:underline"
                        onClick={async () => {
                          if (!window.confirm('¿Eliminar este resultado y sus fotos?')) return
                          await api(`/admin/gallery/${g.id}`, { method: 'DELETE' })
                          reload()
                        }}
                      >
                        <Trash2 className="size-3.5" /> Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        <Panel title="Nuevo resultado" className="self-start">
          <form onSubmit={create} className="space-y-4">
            <Field label="Foto de antes" htmlFor="g-before">
              <input
                id="g-before"
                name="before"
                type="file"
                accept="image/*"
                required
                className="block w-full text-sm"
              />
            </Field>
            <Field label="Foto de después" htmlFor="g-after">
              <input
                id="g-after"
                name="after"
                type="file"
                accept="image/*"
                required
                className="block w-full text-sm"
              />
            </Field>
            <Field label="Procedimiento" htmlFor="g-proc">
              <Select id="g-proc" name="procedureId" defaultValue="">
                <option value="">Sin procedimiento</option>
                {procedures?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Descripción"
              htmlFor="g-desc"
              hint="Opcional. Sin datos que identifiquen al paciente."
            >
              <Input id="g-desc" name="description" maxLength={300} />
            </Field>
            <Field
              label="Consentimiento"
              htmlFor="g-consent"
              hint="Ej.: Consentimiento de uso de imagen firmado el 20/09/2026, archivo físico Pereira."
            >
              <Input id="g-consent" name="consentRef" required />
            </Field>
            <Checkbox name="isPublished" label="Publicar de una vez en la web" />
            <Button type="submit" className="w-full" disabled={pending}>
              <Upload className="size-4" /> {pending ? 'Guardando…' : 'Guardar resultado'}
            </Button>
          </form>
        </Panel>
      </div>
    </>
  )
}
