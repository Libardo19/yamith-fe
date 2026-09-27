'use client'

import { useState } from 'react'
import { CalendarDays, Clock, MapPin, Plus, Video } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import {
  AppointmentStatusBadge,
  EmptyState,
  PageHeader,
  Panel,
  appointmentTypeLabel,
  fmtDate,
  fmtLongDate,
  fmtTime
} from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import type { Appointment } from '@/types/api'

const HOUR = 3_600_000

export default function MyAppointmentsPage() {
  const { data, error, reload } = useApi<{ upcoming: Appointment[]; past: Appointment[] }>(
    '/patient/appointments'
  )
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [now] = useState(() => Date.now())

  async function cancel(a: Appointment) {
    if (!window.confirm('¿Seguro que quieres cancelar esta cita?')) return
    setNotice(null)
    try {
      await api(`/patient/appointments/${a.id}/cancel`, { method: 'PATCH', body: {} })
      setNotice({
        tone: 'success',
        text: 'Cita cancelada. Te enviamos la confirmación por correo.'
      })
      reload()
    } catch (err) {
      setNotice({
        tone: 'error',
        text: err instanceof ApiError ? err.message : 'No se pudo cancelar.'
      })
    }
  }

  return (
    <>
      <PageHeader
        title="Mis citas"
        subtitle="Tus próximas citas y el historial."
        actions={
          <ButtonLink href="/portal/citas/nueva" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Agendar cita
          </ButtonLink>
        }
      />
      {notice ? (
        <Alert tone={notice.tone} className="mb-6">
          {notice.text}
        </Alert>
      ) : null}
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : !data ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-6">
          <Panel title="Próximas" bodyClassName={data.upcoming.length ? 'p-0' : undefined}>
            {data.upcoming.length ? (
              <ul className="divide-y divide-line">
                {data.upcoming.map((a) => {
                  const canCancel = new Date(a.startsAt).getTime() - now > 24 * HOUR
                  return (
                    <li
                      key={a.id}
                      className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center"
                    >
                      <div className="flex size-14 shrink-0 flex-col items-center justify-center bg-gold-100 text-gold-700">
                        <span className="text-[10px] font-semibold uppercase">
                          {new Date(a.startsAt).toLocaleDateString('es-CO', {
                            month: 'short',
                            timeZone: 'America/Bogota'
                          })}
                        </span>
                        <span className="font-serif text-xl leading-none">
                          {new Date(a.startsAt).toLocaleDateString('es-CO', {
                            day: 'numeric',
                            timeZone: 'America/Bogota'
                          })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-lg text-navy-900">
                          {fmtLongDate(a.startsAt)}
                        </p>
                        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {fmtTime(a.startsAt)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            {a.modality === 'VIRTUAL' ? (
                              <Video className="size-3.5" />
                            ) : (
                              <CalendarDays className="size-3.5" />
                            )}
                            {appointmentTypeLabel[a.type]}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {a.sede.name}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <AppointmentStatusBadge status={a.status} />
                        {canCancel ? (
                          <button
                            type="button"
                            onClick={() => cancel(a)}
                            className="text-xs font-semibold text-danger hover:underline"
                          >
                            Cancelar
                          </button>
                        ) : (
                          <span
                            className="text-[11px] text-muted"
                            title="Para cancelar con menos de 24 h escríbenos por WhatsApp"
                          >
                            Menos de 24 h
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <EmptyState
                title="No tienes citas próximas"
                text="Agenda tu valoración o tu control en el horario que prefieras."
                action={<ButtonLink href="/portal/citas/nueva">Agendar cita</ButtonLink>}
              />
            )}
          </Panel>
          {data.past.length ? (
            <Panel title="Historial" bodyClassName="p-0">
              <ul className="divide-y divide-line">
                {data.past.map((a) => (
                  <li key={a.id} className="flex items-center gap-4 px-6 py-3.5 text-sm">
                    <span className="w-28 text-muted tabular-nums">{fmtDate(a.startsAt)}</span>
                    <span className="flex-1 text-navy-900">
                      {appointmentTypeLabel[a.type]} · {a.sede.name}
                    </span>
                    <AppointmentStatusBadge status={a.status} />
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      )}
    </>
  )
}
