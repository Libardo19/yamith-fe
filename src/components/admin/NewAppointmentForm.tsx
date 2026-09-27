'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { bogotaISO, todayKey } from '@/lib/bogota'
import { cn } from '@/lib/cn'
import { useApi } from '@/lib/use-api'
import type { Paginated, PatientRow, Sede } from '@/types/api'
import { SlotPicker } from './SlotPicker'

/** Nueva cita desde el panel (cualquier tipo, incluida cirugía). */
export function NewAppointmentForm({
  sedes,
  defaultPatient,
  onCreated
}: {
  sedes: Sede[]
  defaultPatient?: { id: string; name: string }
  onCreated: (message: string) => void
}) {
  const [q, setQ] = useState('')
  const [search, setSearch] = useState('')
  const [patient, setPatient] = useState(defaultPatient ?? null)
  const [sedeId, setSedeId] = useState(sedes[0]?.id ?? '')
  const [type, setType] = useState('VALORACION')
  const [date, setDate] = useState(todayKey())
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(30)
  const [notes, setNotes] = useState('')
  const [force, setForce] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const { data: results } = useApi<Paginated<PatientRow>>(
    search.length >= 2 ? `/admin/patients?q=${encodeURIComponent(search)}&limit=6` : null
  )

  async function submit() {
    if (!patient || !time) return
    setPending(true)
    setError(null)
    try {
      await api('/admin/appointments', {
        method: 'POST',
        body: {
          patientId: patient.id,
          sedeId,
          type,
          startsAt: bogotaISO(date, time),
          durationMinutes: duration,
          notes: notes || undefined,
          force
        }
      })
      onCreated('Cita creada. Le avisamos al paciente por correo.')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear la cita.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-5">
      {patient ? (
        <div className="flex items-center justify-between border border-gold-300 bg-gold-100 px-4 py-3 text-sm">
          <span className="font-semibold text-navy-900">{patient.name}</span>
          {defaultPatient ? null : (
            <button
              type="button"
              onClick={() => setPatient(null)}
              className="text-xs font-semibold text-gold-700"
            >
              Cambiar
            </button>
          )}
        </div>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSearch(q.trim())
            }}
            className="flex items-center gap-2 border border-line px-3"
          >
            <Search className="size-4 text-muted" aria-hidden />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                if (e.target.value.trim().length >= 2) setSearch(e.target.value.trim())
              }}
              placeholder="Buscar paciente por nombre o correo"
              aria-label="Buscar paciente"
              className="w-full py-2.5 text-sm outline-none"
            />
          </form>
          {results?.items.length ? (
            <ul className="mt-2 divide-y divide-line border border-line">
              {results.items.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-cream-50"
                    onClick={() => setPatient({ id: p.id, name: `${p.firstName} ${p.lastName}` })}
                  >
                    <span className="font-semibold text-navy-900">
                      {p.firstName} {p.lastName}
                    </span>
                    <span className="block text-xs text-muted">{p.email}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : search.length >= 2 && results ? (
            <p className="mt-2 text-xs text-muted">Sin resultados.</p>
          ) : null}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Sede" htmlFor="n-sede">
          <Select id="n-sede" value={sedeId} onChange={(e) => setSedeId(e.target.value)}>
            {sedes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.city}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tipo" htmlFor="n-type">
          <Select
            id="n-type"
            value={type}
            onChange={(e) => {
              setType(e.target.value)
              if (e.target.value === 'CIRUGIA') setDuration(240)
            }}
          >
            <option value="VALORACION">Valoración</option>
            <option value="CONTROL">Control</option>
            <option value="VIRTUAL">Virtual</option>
            <option value="CIRUGIA">Cirugía</option>
          </Select>
        </Field>
        <Field label="Día" htmlFor="n-date">
          <Input id="n-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Hora" htmlFor="n-time">
          <Input
            id="n-time"
            type="time"
            step={300}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Field>
      </div>
      <SlotPicker sedeId={sedeId} date={date} value={time} onPick={setTime} />
      <Field label="Duración" htmlFor="n-duration">
        <Select
          id="n-duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          {[20, 30, 45, 60, 90, 120, 180, 240, 300].map((m) => (
            <option key={m} value={m}>
              {m < 60 ? `${m} min` : `${m / 60} h`}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Notas" htmlFor="n-notes" hint="Opcional.">
        <Textarea id="n-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Field>
      <Checkbox
        checked={force}
        onChange={(e) => setForce(e.target.checked)}
        label="Agendar aunque se cruce con otra cita"
      />
      {error ? <Alert tone="error">{error}</Alert> : null}
      <Button className={cn('w-full')} disabled={!patient || !time || pending} onClick={submit}>
        {pending ? 'Creando…' : 'Crear cita y avisar al paciente'}
      </Button>
    </div>
  )
}
