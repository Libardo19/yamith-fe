'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import {
  AppointmentStatusBadge,
  appointmentTypeLabel,
  fmtLongDate,
  fmtTime
} from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { bogotaDateKey, bogotaISO, bogotaTime } from '@/lib/bogota'
import type { Appointment, Sede } from '@/types/api'
import { SlotPicker } from './SlotPicker'

/** Detalle de una cita en el panel, con cambio de estado y reprogramación. */
export function AppointmentDetail({
  appointment: a,
  sedes,
  onChanged
}: {
  appointment: Appointment
  sedes: Sede[]
  onChanged: (message: string) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [moving, setMoving] = useState(false)
  const [date, setDate] = useState(bogotaDateKey(a.startsAt))
  const [time, setTime] = useState(bogotaTime(a.startsAt))
  const [sedeId, setSedeId] = useState(a.sede.id ?? '')
  const [force, setForce] = useState(false)
  const active = a.status === 'CONFIRMADA' || a.status === 'PENDIENTE'
  const name = a.patient ? `${a.patient.firstName} ${a.patient.lastName}` : 'Paciente'

  async function run(fn: () => Promise<unknown>, message: string) {
    setPending(true)
    setError(null)
    try {
      await fn()
      onChanged(message)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo completar la acción.')
    } finally {
      setPending(false)
    }
  }

  const setStatus = (status: string, message: string, reason?: string) =>
    run(
      () =>
        api(`/admin/appointments/${a.id}`, {
          method: 'PATCH',
          body: { status, ...(reason ? { reason } : {}) }
        }),
      message
    )

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <AppointmentStatusBadge status={a.status} />
          <span className="text-xs text-muted">{appointmentTypeLabel[a.type]}</span>
        </div>
        <p className="mt-3 font-serif text-2xl text-navy-900">{fmtLongDate(a.startsAt)}</p>
        <p className="text-sm text-muted">
          {fmtTime(a.startsAt)} – {fmtTime(a.endsAt)} · {a.sede.name}
        </p>
      </div>

      {a.patient ? (
        <div className="border border-line p-4">
          <Link
            href={`/admin/pacientes/${a.patient.id}`}
            className="font-semibold text-navy-900 hover:text-gold-700"
          >
            {name}
          </Link>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <Phone className="size-3.5" />
            {a.patient.phone ?? '—'}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted">
            <Mail className="size-3.5" />
            {a.patient.user.email}
          </p>
          {a.case ? (
            <p className="mt-2 text-xs text-muted">Procedimiento: {a.case.procedure.name}</p>
          ) : null}
        </div>
      ) : null}

      {a.notes ? <p className="text-sm text-ink/80">“{a.notes}”</p> : null}
      {a.cancelReason ? (
        <p className="text-sm text-danger">Motivo de cancelación: {a.cancelReason}</p>
      ) : null}
      {error ? <Alert tone="error">{error}</Alert> : null}

      {active ? (
        <div className="space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase">
            Acciones
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="px-3 py-2.5"
              disabled={pending}
              onClick={() => setStatus('ATENDIDA', 'Cita marcada como atendida.')}
            >
              Atendida
            </Button>
            <Button
              variant="outline"
              className="px-3 py-2.5"
              disabled={pending}
              onClick={() => setStatus('NO_ASISTIO', 'Cita marcada como no asistió.')}
            >
              No asistió
            </Button>
            <Button
              variant="outline"
              className="px-3 py-2.5"
              disabled={pending}
              onClick={() => setMoving((v) => !v)}
            >
              Reprogramar
            </Button>
            <Button
              variant="outline"
              className="border-danger/40 px-3 py-2.5 text-danger hover:border-danger"
              disabled={pending}
              onClick={() => {
                const reason =
                  window.prompt('Motivo de la cancelación (se guarda en la cita):') ?? undefined
                if (reason === undefined) return
                void setStatus(
                  'CANCELADA',
                  'Cita cancelada. Le avisamos al paciente por correo.',
                  reason || undefined
                )
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}

      {moving ? (
        <div className="space-y-4 border-t border-line pt-6">
          <p className="font-serif text-xl">Nueva fecha</p>
          <Field label="Sede" htmlFor="r-sede">
            <Select id="r-sede" value={sedeId} onChange={(e) => setSedeId(e.target.value)}>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.city}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Día" htmlFor="r-date">
              <Input
                id="r-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Hora" htmlFor="r-time">
              <Input
                id="r-time"
                type="time"
                step={300}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Field>
          </div>
          <SlotPicker sedeId={sedeId} date={date} value={time} onPick={setTime} />
          <Checkbox
            checked={force}
            onChange={(e) => setForce(e.target.checked)}
            label="Agendar aunque se cruce con otra cita"
          />
          <Button
            className="w-full"
            disabled={pending || !date || !time}
            onClick={() =>
              run(
                () =>
                  api(`/admin/appointments/${a.id}/reschedule`, {
                    method: 'POST',
                    body: { startsAt: bogotaISO(date, time), sedeId, force }
                  }),
                'Cita reprogramada. Le avisamos al paciente por correo.'
              )
            }
          >
            Guardar nueva fecha
          </Button>
        </div>
      ) : null}
    </div>
  )
}
