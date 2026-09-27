'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CalendarX2, CheckCircle2, Loader2, MapPin, Video } from 'lucide-react'
import { Panel, capitalizeFirst } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { bogotaTime, todayKey } from '@/lib/bogota'
import { cn } from '@/lib/cn'
import { useApi } from '@/lib/use-api'
import type { Sede, SlotDay } from '@/types/api'

const TYPES = [
  { value: 'VALORACION', label: 'Valoración presencial' },
  { value: 'CONTROL', label: 'Control' },
  { value: 'VIRTUAL', label: 'Valoración virtual' }
] as const

const dayLabel = (date: string) =>
  capitalizeFirst(
    new Date(`${date}T12:00:00Z`).toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC'
    })
  )

/** Agendar: sede → tipo → día → hora → confirmar. Horarios reales del API (F3). */
export function BookingFlow() {
  const { data: sedes } = useApi<Sede[]>('/public/sedes')
  const [sedeId, setSedeId] = useState<string | null>(null)
  const [type, setType] = useState<(typeof TYPES)[number]['value']>('VALORACION')
  const [dayIndex, setDayIndex] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  const activeSede = sedeId ?? sedes?.[0]?.id ?? null
  const {
    data: days,
    loading,
    reload
  } = useApi<SlotDay[]>(
    activeSede ? `/patient/slots?sedeId=${activeSede}&from=${todayKey()}&days=21` : null
  )
  const available = (days ?? []).filter((d) => d.slots.length)
  const day = available[Math.min(dayIndex, Math.max(available.length - 1, 0))]
  const sede = sedes?.find((s) => s.id === activeSede)

  async function confirm() {
    if (!slot || !activeSede) return
    setPending(true)
    setError(null)
    try {
      await api('/patient/appointments', {
        method: 'POST',
        body: { sedeId: activeSede, type, startsAt: slot }
      })
      setDone(slot)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos agendar la cita.')
      setSlot(null)
      reload()
    } finally {
      setPending(false)
    }
  }

  if (done) {
    return (
      <Panel className="mx-auto max-w-xl">
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 className="size-12 text-gold-500" aria-hidden />
          <h1 className="mt-5 text-3xl">¡Cita agendada!</h1>
          <p className="mt-3 text-sm text-muted">
            {TYPES.find((t) => t.value === type)?.label} · {dayLabel(day?.date ?? todayKey())} a las{' '}
            {bogotaTime(done)} · {sede?.name}
          </p>
          <p className="mt-6 max-w-sm text-xs text-muted">
            Te enviamos la confirmación a tu correo y te recordaremos 24 horas antes.
          </p>
          <Link
            href="/portal/citas"
            className="mt-8 text-sm font-semibold text-gold-700 hover:underline"
          >
            Ver mis citas
          </Link>
        </div>
      </Panel>
    )
  }

  const chip = (active: boolean) =>
    cn(
      'border px-4 py-2.5 text-sm transition-colors',
      active
        ? 'border-navy-900 bg-navy-900 text-white'
        : 'border-line bg-white text-navy-800 hover:border-gold-500'
    )

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <Panel title="1. Sede">
          <div className="flex flex-wrap gap-2">
            {sedes?.map((s) => (
              <button
                key={s.id}
                type="button"
                className={chip(s.id === activeSede)}
                onClick={() => {
                  setSedeId(s.id)
                  setDayIndex(0)
                  setSlot(null)
                }}
              >
                <MapPin className="mr-1.5 inline size-4" aria-hidden /> {s.city}
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="2. Tipo de cita">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                className={chip(t.value === type)}
                onClick={() => setType(t.value)}
              >
                {t.value === 'VIRTUAL' ? (
                  <Video className="mr-1.5 inline size-4" aria-hidden />
                ) : null}
                {t.label}
              </button>
            ))}
          </div>
        </Panel>
        <Panel title="3. Día y hora">
          {loading && !days ? (
            <Loader2 className="size-6 animate-spin text-gold-500" aria-label="Cargando horarios" />
          ) : available.length === 0 ? (
            <div className="flex items-start gap-3 text-sm text-muted">
              <CalendarX2 className="size-5 shrink-0 text-gold-600" aria-hidden />
              No hay horarios disponibles en esta sede en las próximas tres semanas. Prueba otra
              sede o escríbenos por WhatsApp.
            </div>
          ) : (
            <>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {available.map((d, i) => {
                  const date = new Date(`${d.date}T12:00:00Z`)
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => {
                        setDayIndex(i)
                        setSlot(null)
                      }}
                      className={cn(
                        'flex min-w-16 flex-col items-center border px-3 py-2.5',
                        d.date === day?.date
                          ? 'border-navy-900 bg-navy-900 text-white'
                          : 'border-line bg-white text-navy-800 hover:border-gold-500'
                      )}
                    >
                      <span className="text-[10px] font-semibold uppercase">
                        {date.toLocaleDateString('es-CO', { weekday: 'short', timeZone: 'UTC' })}
                      </span>
                      <span className="font-serif text-xl">{date.getUTCDate()}</span>
                    </button>
                  )
                })}
              </div>
              {day ? (
                <>
                  <p className="mt-5 mb-3 text-xs text-muted">{dayLabel(day.date)}</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {day.slots.map((s) => (
                      <button
                        key={s.startsAt}
                        type="button"
                        onClick={() => setSlot(s.startsAt)}
                        className={cn(
                          'border py-2.5 text-sm tabular-nums',
                          s.startsAt === slot
                            ? 'border-gold-600 bg-gold-100 font-semibold text-gold-700'
                            : 'border-line bg-white text-navy-800 hover:border-gold-500'
                        )}
                      >
                        {bogotaTime(s.startsAt)}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </>
          )}
        </Panel>
      </div>

      <Panel title="Resumen" className="self-start xl:sticky xl:top-24">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
              Sede
            </dt>
            <dd className="mt-1 text-navy-900">{sede?.name ?? '—'}</dd>
            {sede && type !== 'VIRTUAL' ? (
              <dd className="text-xs text-muted">{sede.address}</dd>
            ) : null}
          </div>
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
              Tipo
            </dt>
            <dd className="mt-1 text-navy-900">{TYPES.find((t) => t.value === type)?.label}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
              Fecha y hora
            </dt>
            <dd className="mt-1 text-navy-900">
              {slot && day
                ? `${dayLabel(day.date)} · ${bogotaTime(slot)}`
                : 'Selecciona un horario'}
            </dd>
          </div>
        </dl>
        {error ? (
          <Alert tone="error" className="mt-6">
            {error}
          </Alert>
        ) : null}
        <Button className="mt-8 w-full" disabled={!slot || pending} onClick={confirm}>
          {pending ? 'Agendando…' : 'Confirmar cita'}
        </Button>
        <p className="mt-3 text-center text-xs text-muted">Recibirás la confirmación por correo.</p>
      </Panel>
    </div>
  )
}
