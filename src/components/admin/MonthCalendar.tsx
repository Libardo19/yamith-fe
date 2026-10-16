'use client'

import { cn } from '@/lib/cn'
import { bogotaDateKey, bogotaTime } from '@/lib/bogota'
import { appointmentTypeLabel } from '@/components/app/ui'

export interface CalendarEvent {
  id?: string
  startsAt: string
  type: string
  who: string
  sede: string
  status?: string
}

// Tipo de cita: fondo suave + texto oscuro + leyenda (nunca sólo color).
const typeStyle: Record<string, string> = {
  VALORACION: 'bg-cream-100 text-navy-800 border-l-navy-700',
  CONTROL: 'bg-gold-100 text-gold-700 border-l-gold-600',
  CIRUGIA: 'bg-navy-900 text-white border-l-gold-300',
  VIRTUAL: 'bg-white text-navy-800 border-l-muted'
}

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Vista de mes (lunes a domingo). Los días se calculan en hora de Colombia, así que
 * no depende de la zona horaria del servidor ni del navegador.
 * `year`/`month` (1–12) indican el mes; `today` es 'YYYY-MM-DD'.
 */
export function MonthCalendar({
  year,
  month,
  today,
  events,
  onSelect
}: {
  year: number
  month: number
  today: string
  events: CalendarEvent[]
  onSelect?: (event: CalendarEvent) => void
}) {
  const first = new Date(Date.UTC(year, month - 1, 1))
  const offset = (first.getUTCDay() + 6) % 7
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - offset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })
  const keyOf = (day: number) => `${year}-${pad(month)}-${pad(day)}`

  const byDay = new Map<string, CalendarEvent[]>()
  for (const e of events) {
    const k = bogotaDateKey(e.startsAt)
    byDay.set(
      k,
      [...(byDay.get(k) ?? []), e].sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted">
        {Object.entries(appointmentTypeLabel).map(([k, label]) => (
          <span key={k} className="inline-flex items-center gap-2">
            <span className={cn('size-3 border-l-4', typeStyle[k])} aria-hidden />
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2 line-through">Cancelada</span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-7 border-t border-l border-line bg-white">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="border-r border-b border-line bg-cream-50 px-3 py-2 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase"
            >
              {w}
            </div>
          ))}
          {cells.map((day, i) => (
            <div
              key={i}
              className={cn('min-h-28 border-r border-b border-line p-2', !day && 'bg-cream-50/60')}
            >
              {day ? (
                <>
                  <span
                    className={cn(
                      'inline-flex size-6 items-center justify-center text-xs tabular-nums',
                      keyOf(day) === today
                        ? 'rounded-full bg-navy-900 font-semibold text-white'
                        : 'text-muted'
                    )}
                  >
                    {day}
                  </span>
                  <ul className="mt-1 space-y-1">
                    {(byDay.get(keyOf(day)) ?? []).map((e) => {
                      const cancelled = e.status === 'CANCELADA' || e.status === 'NO_ASISTIO'
                      const label = (
                        <>
                          <span className="font-semibold tabular-nums">
                            {bogotaTime(e.startsAt)}
                          </span>{' '}
                          {e.who}
                        </>
                      )
                      const cls = cn(
                        'block w-full truncate border-l-2 px-1.5 py-1 text-left text-[11px] leading-tight',
                        typeStyle[e.type],
                        cancelled && 'line-through opacity-50'
                      )
                      const title = `${bogotaTime(e.startsAt)} · ${e.who} · ${e.sede}`
                      return (
                        <li key={(e.id ?? '') + e.startsAt + e.who}>
                          {onSelect ? (
                            <button
                              type="button"
                              className={cn(cls, 'hover:brightness-95')}
                              title={title}
                              onClick={() => onSelect(e)}
                            >
                              {label}
                            </button>
                          ) : (
                            <span className={cls} title={title}>
                              {label}
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
