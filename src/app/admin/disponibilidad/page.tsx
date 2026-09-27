'use client'

import { useState, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel, fmtDateTime } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input, Select } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { WEEKDAY_NAMES, bogotaISO, todayKey } from '@/lib/bogota'
import { useApi } from '@/lib/use-api'
import type { AvailabilityBlock, AvailabilityRule, Sede } from '@/types/api'

// Lunes primero, como en el calendario.
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]

function SedeSchedule({
  sede,
  rules,
  onChange,
  onError
}: {
  sede: Sede
  rules: AvailabilityRule[]
  onChange: () => void
  onError: (m: string) => void
}) {
  const [pending, setPending] = useState(false)

  async function call(fn: () => Promise<unknown>) {
    setPending(true)
    try {
      await fn()
      onChange()
    } catch (err) {
      onError(err instanceof ApiError ? err.message : 'No se pudo guardar.')
    } finally {
      setPending(false)
    }
  }

  async function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    await call(() =>
      api('/admin/availability/rules', {
        method: 'POST',
        body: {
          sedeId: sede.id,
          weekday: Number(f.get('weekday')),
          startTime: f.get('startTime'),
          endTime: f.get('endTime'),
          slotMinutes: Number(f.get('slotMinutes'))
        }
      })
    )
  }

  const sorted = [...rules].sort(
    (a, b) =>
      WEEK_ORDER.indexOf(a.weekday) - WEEK_ORDER.indexOf(b.weekday) ||
      a.startTime.localeCompare(b.startTime)
  )

  return (
    <Panel title={sede.name} bodyClassName="p-0">
      {sorted.length ? (
        <ul className="divide-y divide-line">
          {sorted.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-6 py-3 text-sm">
              <span className="w-24 shrink-0 font-semibold text-navy-900">
                {WEEKDAY_NAMES[r.weekday]}
              </span>
              <span
                className={
                  r.isActive
                    ? 'flex-1 whitespace-nowrap tabular-nums text-navy-800'
                    : 'flex-1 whitespace-nowrap tabular-nums text-muted line-through'
                }
              >
                {r.startTime} – {r.endTime}
                <span className="block text-xs text-muted">cada {r.slotMinutes} min</span>
              </span>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  call(() =>
                    api(`/admin/availability/rules/${r.id}`, {
                      method: 'PATCH',
                      body: { isActive: !r.isActive }
                    })
                  )
                }
                className="text-xs font-semibold text-gold-700 hover:underline"
              >
                {r.isActive ? 'Pausar' : 'Activar'}
              </button>
              <button
                type="button"
                disabled={pending}
                aria-label={`Eliminar horario ${WEEKDAY_NAMES[r.weekday]} ${r.startTime}`}
                onClick={() =>
                  call(() => api(`/admin/availability/rules/${r.id}`, { method: 'DELETE' }))
                }
                className="p-1 text-muted hover:text-danger"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="Sin horarios"
          text="Los pacientes no pueden agendar en esta sede hasta que agregues un horario."
        />
      )}
      <form onSubmit={add} className="grid grid-cols-2 gap-4 border-t border-line bg-cream-50 p-5">
        <Field label="Día" htmlFor={`${sede.id}-weekday`}>
          <Select id={`${sede.id}-weekday`} name="weekday" defaultValue={1}>
            {WEEK_ORDER.map((d) => (
              <option key={d} value={d}>
                {WEEKDAY_NAMES[d]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Desde" htmlFor={`${sede.id}-start`}>
          <Input
            id={`${sede.id}-start`}
            name="startTime"
            type="time"
            defaultValue="08:00"
            step={900}
          />
        </Field>
        <Field label="Hasta" htmlFor={`${sede.id}-end`}>
          <Input id={`${sede.id}-end`} name="endTime" type="time" defaultValue="12:00" step={900} />
        </Field>
        <Field label="Cada" htmlFor={`${sede.id}-slot`}>
          <Select id={`${sede.id}-slot`} name="slotMinutes" defaultValue={30}>
            {[15, 20, 30, 45, 60].map((m) => (
              <option key={m} value={m}>
                {m} min
              </option>
            ))}
          </Select>
        </Field>
        <Button
          type="submit"
          variant="outline"
          className="col-span-2 px-4 py-2.5"
          disabled={pending}
        >
          <Plus className="size-4" /> Agregar
        </Button>
      </form>
    </Panel>
  )
}

export default function AvailabilityPage() {
  const { data: sedes } = useApi<Sede[]>('/admin/sedes')
  const rules = useApi<AvailabilityRule[]>('/admin/availability/rules')
  const blocks = useApi<AvailabilityBlock[]>('/admin/availability/blocks')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function addBlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    setPending(true)
    setError(null)
    try {
      await api('/admin/availability/blocks', {
        method: 'POST',
        body: {
          sedeId: (f.get('sedeId') as string) || null,
          startsAt: bogotaISO(
            f.get('fromDate') as string,
            (f.get('fromTime') as string) || '00:00'
          ),
          endsAt: bogotaISO(f.get('toDate') as string, (f.get('toTime') as string) || '23:59'),
          reason: (f.get('reason') as string) || undefined
        }
      })
      form.reset()
      blocks.reload()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar el bloqueo.')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Disponibilidad"
        subtitle="Horario semanal de atención en cada sede. Los pacientes sólo ven los horarios libres dentro de estos rangos."
      />
      {error ? (
        <Alert tone="error" className="mb-6">
          {error}
        </Alert>
      ) : null}
      {!sedes || !rules.data ? (
        <LoadingBlock />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
          {sedes.map((s) => (
            <SedeSchedule
              key={s.id}
              sede={s}
              rules={rules.data!.filter((r) => r.sedeId === s.id)}
              onChange={() => {
                setError(null)
                rules.reload()
              }}
              onError={setError}
            />
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Bloqueos próximos" bodyClassName="p-0">
          {blocks.data?.length ? (
            <ul className="divide-y divide-line">
              {blocks.data.map((b) => (
                <li key={b.id} className="flex items-center gap-4 px-6 py-3.5 text-sm">
                  <span className="flex-1">
                    <span className="block text-navy-900">
                      {fmtDateTime(b.startsAt)} → {fmtDateTime(b.endsAt)}
                    </span>
                    <span className="text-xs text-muted">
                      {b.sede ? b.sede.name : 'Todas las sedes'}
                      {b.reason ? ` · ${b.reason}` : ''}
                    </span>
                  </span>
                  <button
                    type="button"
                    aria-label="Eliminar bloqueo"
                    onClick={async () => {
                      await api(`/admin/availability/blocks/${b.id}`, { method: 'DELETE' })
                      blocks.reload()
                    }}
                    className="p-1 text-muted hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Sin bloqueos"
              text="Bloquea días u horas por vacaciones, cirugías o viajes."
            />
          )}
        </Panel>
        <Panel title="Bloquear agenda" className="self-start">
          <form onSubmit={addBlock} className="space-y-4">
            <Field label="Sede" htmlFor="b-sede">
              <Select id="b-sede" name="sedeId" defaultValue="">
                <option value="">Todas las sedes</option>
                {sedes?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.city}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Desde (día)" htmlFor="b-fd">
                <Input id="b-fd" name="fromDate" type="date" required defaultValue={todayKey()} />
              </Field>
              <Field label="Hora" htmlFor="b-ft" hint="Vacío = todo el día">
                <Input id="b-ft" name="fromTime" type="time" />
              </Field>
              <Field label="Hasta (día)" htmlFor="b-td">
                <Input id="b-td" name="toDate" type="date" required defaultValue={todayKey()} />
              </Field>
              <Field label="Hora" htmlFor="b-tt">
                <Input id="b-tt" name="toTime" type="time" />
              </Field>
            </div>
            <Field label="Motivo" htmlFor="b-reason" hint="Opcional (no lo ven los pacientes).">
              <Input id="b-reason" name="reason" />
            </Field>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Guardando…' : 'Bloquear'}
            </Button>
          </form>
        </Panel>
      </div>
    </>
  )
}
