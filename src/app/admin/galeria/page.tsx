'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Eye, EyeOff, Pencil, Trash2, Upload, X } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel } from '@/components/app/ui'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select } from '@/components/ui/Form'
import { findTechnique, isAbdominoplasty, techniques } from '@/content/techniques'
import { api, API_URL, ApiError } from '@/lib/api'
import { cn } from '@/lib/cn'
import { useApi } from '@/lib/use-api'
import type { AdminProcedure, GalleryItem } from '@/types/api'

type StaffItem = GalleryItem & { procedureId?: string | null; updatedAt?: string }

/**
 * Las imágenes del panel se piden con la sesión (incluye no publicadas).
 * `v` cambia al editar, para que al cambiar una foto no se vea la anterior en caché.
 */
const staffImage = (g: StaffItem, which: 'antes' | 'despues') =>
  `${API_URL}/admin/gallery/${g.id}/${which}?v=${g.updatedAt ? Date.parse(g.updatedAt) : 0}`

/** fetch multipart (api() envía JSON) con el mismo manejo de errores. */
async function sendForm(path: string, method: 'POST' | 'PUT', body: FormData) {
  const res = await fetch(`${API_URL}${path}`, { method, credentials: 'include', body })
  const json = await res.json().catch(() => null)
  if (!res.ok) {
    const detail = json?.details
      ? Object.values(json.details as Record<string, string[]>)
          .flat()
          .filter(Boolean)[0]
      : null
    throw new ApiError(detail ?? json?.message ?? `Error ${res.status}`, res.status)
  }
}

const errorText = (err: unknown) =>
  err instanceof ApiError ? err.message : 'No se pudo guardar. Inténtalo de nuevo.'

export default function GalleryAdminPage() {
  const { data, error, reload } = useApi<StaffItem[]>('/admin/gallery')
  const { data: procedures } = useApi<AdminProcedure[]>('/admin/procedures')
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [editing, setEditing] = useState<StaffItem | null>(null)
  const formPanel = useRef<HTMLDivElement>(null)

  function startEdit(g: StaffItem) {
    setNotice(null)
    setEditing(g)
    // En celular el formulario queda debajo de las tarjetas: se lleva a la vista.
    requestAnimationFrame(() =>
      formPanel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    )
  }

  async function togglePublished(g: StaffItem) {
    try {
      await api(`/admin/gallery/${g.id}`, {
        method: 'PATCH',
        body: { isPublished: !g.isPublished }
      })
      reload()
    } catch (err) {
      setNotice({ tone: 'error', text: errorText(err) })
    }
  }

  async function remove(g: StaffItem) {
    if (!window.confirm('¿Eliminar este resultado y sus fotos? No se puede deshacer.')) return
    try {
      await api(`/admin/gallery/${g.id}`, { method: 'DELETE' })
      if (editing?.id === g.id) setEditing(null)
      setNotice({ tone: 'success', text: 'Resultado eliminado.' })
      reload()
    } catch (err) {
      setNotice({ tone: 'error', text: errorText(err) })
    }
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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.map((g) => {
                const technique = findTechnique(g.technique)
                return (
                  <article
                    key={g.id}
                    className={cn(
                      'border bg-white',
                      editing?.id === g.id ? 'border-gold-500 ring-1 ring-gold-500' : 'border-line'
                    )}
                  >
                    <BeforeAfterSlider
                      before={staffImage(g, 'antes')}
                      after={staffImage(g, 'despues')}
                      label={technique?.title ?? g.procedure?.name ?? 'el procedimiento'}
                      className="aspect-[3/4]"
                      hint={false}
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-navy-900">
                            {g.procedure?.name ?? 'Sin procedimiento'}
                          </p>
                          {technique ? (
                            <p className="text-xs text-gold-700">{technique.title}</p>
                          ) : null}
                        </div>
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
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 text-navy-900 hover:underline"
                          onClick={() => startEdit(g)}
                        >
                          <Pencil className="size-3.5" /> Editar
                        </button>
                        <button
                          type="button"
                          className="text-gold-700 hover:underline"
                          onClick={() => togglePublished(g)}
                        >
                          {g.isPublished ? 'Ocultar de la web' : 'Publicar en la web'}
                        </button>
                        <button
                          type="button"
                          className="ml-auto inline-flex items-center gap-1 text-danger hover:underline"
                          onClick={() => remove(g)}
                        >
                          <Trash2 className="size-3.5" /> Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
        <div ref={formPanel} className="scroll-mt-24 self-start">
          <GalleryForm
            // key: al pasar de "nuevo" a "editar" (o entre resultados) el formulario se reinicia
            key={editing?.id ?? 'nuevo'}
            item={editing}
            procedures={procedures ?? []}
            onCancel={() => setEditing(null)}
            onSaved={(text) => {
              setEditing(null)
              setNotice({ tone: 'success', text })
              reload()
            }}
            onError={(text) => setNotice({ tone: 'error', text })}
          />
        </div>
      </div>
    </>
  )
}

/** Formulario de "Nuevo resultado" y de "Editar resultado". */
function GalleryForm({
  item,
  procedures,
  onCancel,
  onSaved,
  onError
}: {
  item: StaffItem | null
  procedures: AdminProcedure[]
  onCancel: () => void
  onSaved: (message: string) => void
  onError: (message: string) => void
}) {
  const editing = Boolean(item)
  const [procedureId, setProcedureId] = useState(item?.procedureId ?? item?.procedure?.id ?? '')
  const [pending, setPending] = useState(false)
  const selected = procedures.find((p) => p.id === procedureId)
  const showTechnique = isAbdominoplasty(selected?.slug)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const files = new FormData()
    for (const k of ['before', 'after']) {
      const file = f.get(k) as File | null
      if (file?.size) files.set(k, file)
    }
    const technique = showTechnique ? ((f.get('technique') as string) ?? '') : ''
    const description = ((f.get('description') as string) ?? '').trim()
    const consentRef = ((f.get('consentRef') as string) ?? '').trim()
    const isPublished = f.get('isPublished') === 'on'
    setPending(true)
    try {
      if (item) {
        await api(`/admin/gallery/${item.id}`, {
          method: 'PATCH',
          body: {
            procedureId: procedureId || null,
            technique: technique || null,
            description: description || null,
            consentRef,
            isPublished
          }
        })
        if (files.has('before') || files.has('after'))
          await sendForm(`/admin/gallery/${item.id}/images`, 'PUT', files)
        onSaved('Cambios guardados.')
      } else {
        files.set('procedureId', procedureId)
        files.set('technique', technique)
        files.set('description', description)
        files.set('consentRef', consentRef)
        files.set('isPublished', isPublished ? 'true' : 'false')
        await sendForm('/admin/gallery', 'POST', files)
        form.reset()
        setProcedureId('')
        onSaved('Resultado guardado.')
      }
    } catch (err) {
      onError(errorText(err))
    } finally {
      setPending(false)
    }
  }

  const keepHint = editing ? 'Déjalo vacío para conservar la foto actual.' : undefined

  return (
    <Panel
      title={editing ? 'Editar resultado' : 'Nuevo resultado'}
      action={
        editing ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-navy-900"
          >
            <X className="size-3.5" /> Cancelar
          </button>
        ) : undefined
      }
    >
      <form onSubmit={submit} className="space-y-4">
        {item ? (
          <div className="grid grid-cols-2 gap-2">
            {(['antes', 'despues'] as const).map((w) => (
              <figure key={w} className="relative aspect-[3/4] bg-cream-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- imagen privada servida por el API */}
                <img src={staffImage(item, w)} alt="" className="size-full object-cover" />
                <figcaption className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase">
                  {w === 'antes' ? 'Antes actual' : 'Después actual'}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        <Field
          label={editing ? 'Nueva foto de antes' : 'Foto de antes'}
          htmlFor="g-before"
          {...(keepHint ? { hint: keepHint } : {})}
        >
          <input
            id="g-before"
            name="before"
            type="file"
            accept="image/*"
            required={!editing}
            className="block w-full text-sm"
          />
        </Field>
        <Field
          label={editing ? 'Nueva foto de después' : 'Foto de después'}
          htmlFor="g-after"
          {...(keepHint ? { hint: keepHint } : {})}
        >
          <input
            id="g-after"
            name="after"
            type="file"
            accept="image/*"
            required={!editing}
            className="block w-full text-sm"
          />
        </Field>
        <Field label="Procedimiento" htmlFor="g-proc">
          <Select
            id="g-proc"
            name="procedureId"
            value={procedureId}
            onChange={(e) => setProcedureId(e.target.value)}
          >
            <option value="">Sin procedimiento</option>
            {procedures.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        {showTechnique ? (
          <Field
            label="Técnica"
            htmlFor="g-tech"
            hint="La técnica insignia (efecto corset) se destaca en la página de inicio."
          >
            <Select id="g-tech" name="technique" defaultValue={item?.technique ?? ''}>
              <option value="">Sin especificar</option>
              {techniques.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.title}
                  {t.subtitle ? ` (${t.subtitle})` : ''}
                </option>
              ))}
            </Select>
          </Field>
        ) : null}
        <Field
          label="Descripción"
          htmlFor="g-desc"
          hint="Opcional. Sin datos que identifiquen al paciente."
        >
          <Input
            id="g-desc"
            name="description"
            maxLength={300}
            defaultValue={item?.description ?? ''}
          />
        </Field>
        <Field
          label="Consentimiento"
          htmlFor="g-consent"
          hint="Ej.: Consentimiento de uso de imagen firmado el 20/09/2026, archivo físico Pereira."
        >
          <Input
            id="g-consent"
            name="consentRef"
            required
            minLength={5}
            defaultValue={item?.consentRef ?? ''}
          />
        </Field>
        <Checkbox
          name="isPublished"
          label={editing ? 'Publicado en la web' : 'Publicar de una vez en la web'}
          defaultChecked={item?.isPublished ?? false}
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {editing ? <Pencil className="size-4" /> : <Upload className="size-4" />}{' '}
          {pending ? 'Guardando…' : editing ? 'Guardar cambios' : 'Guardar resultado'}
        </Button>
      </form>
    </Panel>
  )
}
