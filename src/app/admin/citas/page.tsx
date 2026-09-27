'use client'

import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { AppointmentDetail } from '@/components/admin/AppointmentDetail'
import { Drawer } from '@/components/admin/Drawer'
import { MonthCalendar } from '@/components/admin/MonthCalendar'
import { NewAppointmentForm } from '@/components/admin/NewAppointmentForm'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader, Panel, capitalizeFirst } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { bogotaISO, todayKey } from '@/lib/bogota'
import { useApi } from '@/lib/use-api'
import type { Appointment, Sede } from '@/types/api'

const pad = (n: number) => String(n).padStart(2, '0')

export default function AppointmentsPage() {
  const [today] = useState(todayKey)
  const [ym, setYm] = useState({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) })
  const [sedeId, setSedeId] = useState('')
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [creating, setCreating] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const next = ym.m === 12 ? { y: ym.y + 1, m: 1 } : { y: ym.y, m: ym.m + 1 }
  const from = bogotaISO(`${ym.y}-${pad(ym.m)}-01`, '00:00')
  const to = bogotaISO(`${next.y}-${pad(next.m)}-01`, '00:00')
  const { data, error, reload } = useApi<Appointment[]>(
    `/admin/appointments?from=${from}&to=${to}${sedeId ? `&sedeId=${sedeId}` : ''}`
  )
  const { data: sedes } = useApi<Sede[]>('/admin/sedes')

  const move = (delta: number) =>
    setYm(({ y, m }) => {
      const total = y * 12 + (m - 1) + delta
      return { y: Math.floor(total / 12), m: (total % 12) + 1 }
    })

  const done = useCallback(
    (message: string) => {
      setSelected(null)
      setCreating(false)
      setNotice(message)
      reload()
    },
    [reload]
  )

  const label = capitalizeFirst(
    new Date(Date.UTC(ym.y, ym.m - 1, 15)).toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    })
  )

  return (
    <>
      <PageHeader
        title="Citas"
        subtitle="Valoraciones, controles y cirugías de las tres sedes. Haz clic en una cita para verla o cambiarla."
        actions={
          <Button className="px-5 py-2.5" onClick={() => setCreating(true)} disabled={!sedes}>
            <Plus className="size-4" aria-hidden /> Nueva cita
          </Button>
        }
      />
      {notice ? (
        <Alert tone="success" className="mb-6">
          {notice}
        </Alert>
      ) : null}
      <Panel bodyClassName="p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              className="inline-flex size-9 items-center justify-center border border-line"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="min-w-44 text-center font-serif text-xl">{label}</p>
            <button
              type="button"
              onClick={() => move(1)}
              className="inline-flex size-9 items-center justify-center border border-line"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setYm({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) })}
              className="ml-2 text-xs font-semibold text-gold-700 hover:underline"
            >
              Hoy
            </button>
          </div>
          <select
            aria-label="Sede"
            className="border border-line bg-white px-3 py-2 text-sm"
            value={sedeId}
            onChange={(e) => setSedeId(e.target.value)}
          >
            <option value="">Todas las sedes</option>
            {sedes?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.city}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <Alert tone="error">{error}</Alert>
        ) : !data ? (
          <LoadingBlock />
        ) : (
          <MonthCalendar
            year={ym.y}
            month={ym.m}
            today={today}
            events={data.map((a) => ({
              id: a.id,
              startsAt: a.startsAt,
              type: a.type,
              status: a.status,
              who: a.patient ? `${a.patient.firstName} ${a.patient.lastName}` : '—',
              sede: a.sede.city
            }))}
            onSelect={(e) => setSelected(data.find((a) => a.id === e.id) ?? null)}
          />
        )}
      </Panel>

      {selected && sedes ? (
        <Drawer title="Cita" onClose={() => setSelected(null)}>
          <AppointmentDetail appointment={selected} sedes={sedes} onChanged={done} />
        </Drawer>
      ) : null}
      {creating && sedes ? (
        <Drawer title="Nueva cita" onClose={() => setCreating(false)}>
          <NewAppointmentForm sedes={sedes} onCreated={done} />
        </Drawer>
      ) : null}
    </>
  )
}
