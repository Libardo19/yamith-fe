'use client'

import { useState } from 'react'
import { CheckCircle2, MapPin, Video } from 'lucide-react'
import { PageHeader, Panel, capitalizeFirst } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { demoSlots } from '@/lib/demo-data'

const sedes = ['Pereira', 'Barranquilla', 'Valledupar']
const types = ['Control posoperatorio', 'Valoración', 'Control virtual']

/** Agendar cita (borrador del flujo de F3): sede → tipo → día → hora → confirmar. */
export default function DemoBookingPage() {
  const [days] = useState(() =>
    Array.from({ length: 10 }, (_, i) => new Date(Date.now() + (i + 1) * 86_400_000)).filter(
      (d) => d.getDay() !== 0
    )
  )
  const [sede, setSede] = useState(sedes[0]!)
  const [type, setType] = useState(types[0]!)
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const selectedDay = days[day]!
  const dayLabel = capitalizeFirst(
    selectedDay.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
  )

  if (done) {
    return (
      <Panel className="mx-auto max-w-xl">
        <div className="flex flex-col items-center py-8 text-center">
          <CheckCircle2 className="size-12 text-gold-500" aria-hidden />
          <h1 className="mt-5 text-3xl">¡Cita agendada!</h1>
          <p className="mt-3 text-sm text-muted">
            {type} · {dayLabel} a las {slot} · Sede {sede}
          </p>
          <p className="mt-6 max-w-sm text-xs text-muted">
            Te enviamos la confirmación a tu correo y te recordaremos 24 horas antes. El Dr. Cuello
            también recibe el aviso.
          </p>
          <Button
            variant="outline"
            className="mt-8"
            onClick={() => {
              setDone(false)
              setSlot(null)
            }}
          >
            Agendar otra cita
          </Button>
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
    <>
      <PageHeader
        title="Agendar una cita"
        subtitle="Elige la sede, el tipo de cita y un horario disponible."
      />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Panel title="1. Sede">
            <div className="flex flex-wrap gap-2">
              {sedes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={chip(s === sede)}
                  onClick={() => setSede(s)}
                >
                  <MapPin className="mr-1.5 inline size-4" aria-hidden /> {s}
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="2. Tipo de cita">
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={chip(t === type)}
                  onClick={() => setType(t)}
                >
                  {t.includes('virtual') ? (
                    <Video className="mr-1.5 inline size-4" aria-hidden />
                  ) : null}
                  {t}
                </button>
              ))}
            </div>
          </Panel>
          <Panel title="3. Día y hora">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map((d, i) => (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => {
                    setDay(i)
                    setSlot(null)
                  }}
                  className={cn(
                    'flex min-w-16 flex-col items-center border px-3 py-2.5',
                    i === day
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-line bg-white text-navy-800 hover:border-gold-500'
                  )}
                >
                  <span className="text-[10px] font-semibold uppercase">
                    {d.toLocaleDateString('es-CO', { weekday: 'short' })}
                  </span>
                  <span className="font-serif text-xl">{d.getDate()}</span>
                </button>
              ))}
            </div>
            <p className="mt-5 mb-3 text-xs text-muted ">{dayLabel}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {demoSlots.map((s, i) => {
                const taken = (i + day) % 4 === 1
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={taken}
                    onClick={() => setSlot(s)}
                    className={cn(
                      'border py-2.5 text-sm tabular-nums',
                      taken
                        ? 'cursor-not-allowed border-line bg-cream-50 text-muted/50 line-through'
                        : s === slot
                          ? 'border-gold-600 bg-gold-100 font-semibold text-gold-700'
                          : 'border-line bg-white text-navy-800 hover:border-gold-500'
                    )}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </Panel>
        </div>
        <Panel title="Resumen" className="self-start xl:sticky xl:top-24">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                Sede
              </dt>
              <dd className="mt-1 text-navy-900">{sede}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                Tipo
              </dt>
              <dd className="mt-1 text-navy-900">{type}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                Fecha
              </dt>
              <dd className="mt-1 text-navy-900 ">{dayLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                Hora
              </dt>
              <dd className="mt-1 text-navy-900">{slot ?? 'Selecciona un horario'}</dd>
            </div>
          </dl>
          <Button className="mt-8 w-full" disabled={!slot} onClick={() => setDone(true)}>
            Confirmar cita
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Recibirás la confirmación por correo.
          </p>
        </Panel>
      </div>
    </>
  )
}
