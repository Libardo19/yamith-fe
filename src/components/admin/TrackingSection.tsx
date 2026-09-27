'use client'

import { useState, type FormEvent } from 'react'
import { EyeOff, Plus, Trash2, Upload } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { CaseStatusBadge, EmptyState, Panel, fmtDate } from '@/components/app/ui'
import { CaseProgress } from '@/components/portal/CaseView'
import { DocumentRow, SecureImage, openFile, stageLabel } from '@/components/tracking/files'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { api, API_URL, ApiError } from '@/lib/api'
import { bogotaISO, todayKey } from '@/lib/bogota'
import { useApi } from '@/lib/use-api'
import type { AdminProcedure, CaseStatus, MediaFile, Sede, TrackingCase } from '@/types/api'

const STATUS_OPTIONS: Array<[CaseStatus, string]> = [
  ['VALORACION', 'Valoración'],
  ['PROGRAMADO', 'Cirugía programada'],
  ['POSTOP', 'Posoperatorio'],
  ['FINALIZADO', 'Finalizado (alta)'],
  ['CANCELADO', 'Cancelado']
]

const eventTypeLabel = {
  VALORACION: 'Valoración',
  CIRUGIA: 'Cirugía',
  CONTROL: 'Control',
  NOTA: 'Nota'
}

type Notify = (tone: 'success' | 'error', text: string) => void

function errorText(err: unknown) {
  return err instanceof ApiError ? err.message : 'No se pudo completar la acción.'
}

// ── Un procedimiento del paciente ────────────────────────────

function CaseCard({
  c,
  onChange,
  notify
}: {
  c: TrackingCase
  onChange: () => void
  notify: Notify
}) {
  const [adding, setAdding] = useState(false)
  const [pending, setPending] = useState(false)

  async function patch(body: Record<string, unknown>, message: string) {
    try {
      await api(`/admin/cases/${c.id}`, { method: 'PATCH', body })
      notify('success', message)
      onChange()
    } catch (err) {
      notify('error', errorText(err))
    }
  }

  async function addEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setPending(true)
    try {
      await api(`/admin/cases/${c.id}/events`, {
        method: 'POST',
        body: {
          type: f.get('type'),
          date: bogotaISO(f.get('date') as string, '12:00'),
          title: f.get('title'),
          description: f.get('description') || undefined,
          visibleToPatient: f.get('visible') === 'on'
        }
      })
      setAdding(false)
      notify(
        'success',
        f.get('visible') === 'on'
          ? 'Registro agregado. Le avisamos al paciente por correo.'
          : 'Registro interno agregado.'
      )
      onChange()
    } catch (err) {
      notify('error', errorText(err))
    } finally {
      setPending(false)
    }
  }

  return (
    <Panel title={c.procedure.name} action={<CaseStatusBadge status={c.status} />}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Estado" htmlFor={`st-${c.id}`}>
          <Select
            id={`st-${c.id}`}
            value={c.status}
            onChange={(e) => patch({ status: e.target.value }, 'Estado actualizado.')}
          >
            {STATUS_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Fecha de cirugía" htmlFor={`sd-${c.id}`}>
          <Input
            id={`sd-${c.id}`}
            type="date"
            defaultValue={c.surgeryDate ? c.surgeryDate.slice(0, 10) : ''}
            onBlur={(e) => {
              const v = e.target.value
              const current = c.surgeryDate ? c.surgeryDate.slice(0, 10) : ''
              if (v !== current)
                void patch(
                  { surgeryDate: v ? bogotaISO(v, '07:00') : null },
                  'Fecha de cirugía guardada.'
                )
            }}
          />
        </Field>
      </div>
      <div className="my-6">
        <CaseProgress status={c.status} />
      </div>
      {c.survey ? (
        <p className="mb-6 text-xs text-muted">
          Encuesta:{' '}
          {c.survey.answeredAt
            ? `respondida · ${c.survey.rating ?? '—'}/5 · NPS ${c.survey.nps ?? '—'}`
            : 'enviada, sin responder'}
        </p>
      ) : null}

      <div className="flex items-center justify-between border-t border-line pt-5">
        <p className="font-serif text-lg">Evolución</p>
        <Button variant="outline" className="px-3 py-2" onClick={() => setAdding((v) => !v)}>
          <Plus className="size-3.5" /> {adding ? 'Cerrar' : 'Registrar'}
        </Button>
      </div>

      {adding ? (
        <form
          onSubmit={addEvent}
          className="mt-4 grid gap-4 border border-line bg-cream-50 p-4 sm:grid-cols-2"
        >
          <Field label="Tipo" htmlFor={`et-${c.id}`}>
            <Select id={`et-${c.id}`} name="type" defaultValue="CONTROL">
              {Object.entries(eventTypeLabel).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Fecha" htmlFor={`ed-${c.id}`}>
            <Input id={`ed-${c.id}`} name="date" type="date" defaultValue={todayKey()} required />
          </Field>
          <Field label="Título" htmlFor={`eti-${c.id}`} className="sm:col-span-2">
            <Input id={`eti-${c.id}`} name="title" required placeholder="Control día 3" />
          </Field>
          <Field label="Detalle" htmlFor={`ede-${c.id}`} className="sm:col-span-2">
            <Textarea id={`ede-${c.id}`} name="description" rows={3} />
          </Field>
          <Checkbox
            name="visible"
            defaultChecked
            className="sm:col-span-2"
            label="Visible para el paciente (le llega un aviso por correo)"
          />
          <Button type="submit" disabled={pending} className="sm:col-span-2">
            {pending ? 'Guardando…' : 'Guardar registro'}
          </Button>
        </form>
      ) : null}

      {c.events.length ? (
        <ol className="mt-5 space-y-5 border-l border-line pl-6">
          {c.events.map((e) => (
            <li key={e.id} className="relative">
              <span
                className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-gold-500 ring-4 ring-white"
                aria-hidden
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted">
                    {fmtDate(e.date)} · {eventTypeLabel[e.type]}
                    {e.author ? ` · ${e.author.name}` : ''}
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-navy-900">{e.title}</p>
                  {e.description ? (
                    <p className="mt-1 text-sm text-ink/80">{e.description}</p>
                  ) : null}
                  {!e.visibleToPatient ? (
                    <Badge tone="muted" className="mt-2">
                      <EyeOff className="size-3" /> Interno
                    </Badge>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Eliminar registro"
                  className="p-1 text-muted hover:text-danger"
                  onClick={async () => {
                    if (!window.confirm('¿Eliminar este registro?')) return
                    try {
                      await api(`/admin/events/${e.id}`, { method: 'DELETE' })
                      onChange()
                    } catch (err) {
                      notify('error', errorText(err))
                    }
                  }}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-4 text-sm text-muted">Sin registros todavía.</p>
      )}
    </Panel>
  )
}

// ── Subida de archivos ───────────────────────────────────────

function UploadForm({
  patientId,
  cases,
  onDone,
  notify
}: {
  patientId: string
  cases: TrackingCase[]
  onDone: () => void
  notify: Notify
}) {
  const [type, setType] = useState('FOTO')
  const [pending, setPending] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const files = (data.getAll('file') as File[]).filter((f) => f.size)
    if (!files.length) return notify('error', 'Elige al menos un archivo.')
    setPending(true)
    let ok = 0
    for (const file of files) {
      const body = new FormData()
      body.set('file', file)
      body.set('type', type)
      for (const k of ['stage', 'caseId', 'title']) {
        const v = data.get(k) as string
        if (v) body.set(k, v)
      }
      body.set('visibleToPatient', data.get('visible') === 'on' ? 'true' : 'false')
      try {
        // Multipart: se usa fetch directo (api() envía JSON).
        const res = await fetch(`${API_URL}/admin/patients/${patientId}/files`, {
          method: 'POST',
          credentials: 'include',
          body
        })
        const json = await res.json().catch(() => null)
        if (!res.ok)
          throw new ApiError(json?.message ?? `Error ${res.status}`, res.status, json?.code)
        ok++
      } catch (err) {
        notify('error', `${file.name}: ${errorText(err)}`)
      }
    }
    setPending(false)
    if (ok) {
      form.reset()
      notify('success', `${ok} archivo${ok === 1 ? '' : 's'} guardado${ok === 1 ? '' : 's'}.`)
      onDone()
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field
        label="Archivos"
        htmlFor="up-file"
        hint="Fotos (JPG, PNG, WEBP, HEIC) o PDF · máx. 15 MB c/u."
      >
        <input
          id="up-file"
          name="file"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
          className="block w-full text-sm file:mr-3 file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:tracking-wider file:text-white file:uppercase"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Tipo" htmlFor="up-type">
          <Select id="up-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="FOTO">Foto</option>
            <option value="CONSENTIMIENTO">Consentimiento</option>
            <option value="INDICACIONES">Indicaciones</option>
            <option value="OTRO">Otro documento</option>
          </Select>
        </Field>
        {type === 'FOTO' ? (
          <Field label="Etapa" htmlFor="up-stage">
            <Select id="up-stage" name="stage" defaultValue="CONTROL">
              <option value="ANTES">Antes</option>
              <option value="CONTROL">Control</option>
              <option value="DESPUES">Después</option>
            </Select>
          </Field>
        ) : (
          <Field label="Título" htmlFor="up-title">
            <Input id="up-title" name="title" placeholder="Indicaciones posoperatorias" />
          </Field>
        )}
      </div>
      {cases.length ? (
        <Field label="Procedimiento" htmlFor="up-case">
          <Select id="up-case" name="caseId" defaultValue={cases[0]?.id}>
            <option value="">Sin procedimiento</option>
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.procedure.name}
              </option>
            ))}
          </Select>
        </Field>
      ) : null}
      <Checkbox
        name="visible"
        defaultChecked
        label="Visible para el paciente (le avisamos por correo, sin adjuntar el archivo)"
      />
      <Button type="submit" disabled={pending} className="w-full">
        <Upload className="size-4" /> {pending ? 'Subiendo…' : 'Subir'}
      </Button>
    </form>
  )
}

// ── Sección completa ─────────────────────────────────────────

export function TrackingSection({
  patientId,
  sedes,
  notify
}: {
  patientId: string
  sedes: Sede[]
  notify: Notify
}) {
  const { data, error, reload } = useApi<{ cases: TrackingCase[]; files: MediaFile[] }>(
    `/admin/patients/${patientId}/tracking`
  )
  const { data: procedures } = useApi<AdminProcedure[]>('/admin/procedures')
  const [addingCase, setAddingCase] = useState(false)

  if (error) return <Alert tone="error">{error}</Alert>
  if (!data) return <LoadingBlock />

  const allFiles = [
    ...data.cases.flatMap((c) =>
      (c.files ?? []).map((f) => ({ ...f, case: { procedure: { name: c.procedure.name } } }))
    ),
    ...data.files
  ]
  const photos = allFiles.filter((f) => f.type === 'FOTO')
  const documents = allFiles.filter((f) => f.type !== 'FOTO')

  async function addCase(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    try {
      await api(`/admin/patients/${patientId}/cases`, {
        method: 'POST',
        body: {
          procedureId: f.get('procedureId'),
          sedeId: (f.get('sedeId') as string) || null,
          status: f.get('status'),
          surgeryDate: f.get('surgeryDate')
            ? bogotaISO(f.get('surgeryDate') as string, '07:00')
            : null
        }
      })
      setAddingCase(false)
      notify('success', 'Procedimiento agregado.')
      reload()
    } catch (err) {
      notify('error', errorText(err))
    }
  }

  const fileActions = (f: MediaFile) => (
    <>
      <button
        type="button"
        className="text-[11px] font-semibold text-gold-700 hover:underline"
        onClick={async () => {
          await api(`/admin/files/${f.id}`, {
            method: 'PATCH',
            body: { visibleToPatient: !f.visibleToPatient }
          })
          reload()
        }}
      >
        {f.visibleToPatient ? 'Ocultar' : 'Mostrar'}
      </button>
      <button
        type="button"
        aria-label={`Eliminar ${f.originalName}`}
        className="p-1 text-muted hover:text-danger"
        onClick={async () => {
          if (!window.confirm('¿Eliminar este archivo? No se puede deshacer.')) return
          await api(`/admin/files/${f.id}`, { method: 'DELETE' })
          reload()
        }}
      >
        <Trash2 className="size-4" />
      </button>
    </>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Procedimientos y seguimiento</h2>
        <Button variant="outline" className="px-4 py-2.5" onClick={() => setAddingCase((v) => !v)}>
          <Plus className="size-4" /> {addingCase ? 'Cerrar' : 'Agregar procedimiento'}
        </Button>
      </div>

      {addingCase ? (
        <Panel>
          <form
            onSubmit={addCase}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
          >
            <Field label="Procedimiento" htmlFor="nc-proc">
              <Select id="nc-proc" name="procedureId" required>
                {procedures?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Sede" htmlFor="nc-sede">
              <Select id="nc-sede" name="sedeId" defaultValue="">
                <option value="">La del paciente</option>
                {sedes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.city}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Estado" htmlFor="nc-status">
              <Select id="nc-status" name="status" defaultValue="VALORACION">
                {STATUS_OPTIONS.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Fecha de cirugía" htmlFor="nc-date" hint="Opcional">
              <Input id="nc-date" name="surgeryDate" type="date" />
            </Field>
            <Button type="submit" className="sm:col-span-2 lg:col-span-4">
              Guardar procedimiento
            </Button>
          </form>
        </Panel>
      ) : null}

      {data.cases.length ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {data.cases.map((c) => (
            <CaseCard key={c.id} c={c} onChange={reload} notify={notify} />
          ))}
        </div>
      ) : (
        <Panel>
          <EmptyState
            title="Sin procedimientos"
            text="Agrega el procedimiento del paciente para registrar su evolución."
          />
        </Panel>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title={`Fotos (${photos.length})`}>
            {photos.length ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {photos.map((f) => (
                  <div key={f.id}>
                    <button
                      type="button"
                      onClick={() => openFile('admin', f.id)}
                      className="block w-full"
                    >
                      <SecureImage scope="admin" file={f} className="aspect-[3/4]" />
                    </button>
                    <div className="mt-1.5 flex items-center justify-between gap-1 text-[11px] text-muted">
                      <span className="truncate">
                        {f.stage ? stageLabel[f.stage] : 'Foto'} ·{' '}
                        {fmtDate(f.takenAt ?? f.createdAt)}
                        {!f.visibleToPatient ? ' · oculta' : ''}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">{fileActions(f)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">Sin fotos.</p>
            )}
          </Panel>
          <Panel
            title={`Documentos (${documents.length})`}
            bodyClassName={documents.length ? 'p-0' : undefined}
          >
            {documents.length ? (
              <ul className="divide-y divide-line">
                {documents.map((f) => (
                  <DocumentRow key={f.id} scope="admin" file={f} actions={fileActions(f)} />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">Sin documentos.</p>
            )}
          </Panel>
        </div>
        <Panel title="Subir fotos o documentos" className="self-start">
          <UploadForm patientId={patientId} cases={data.cases} onDone={reload} notify={notify} />
        </Panel>
      </div>
    </div>
  )
}
