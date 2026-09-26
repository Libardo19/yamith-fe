import { cn } from '@/lib/cn'
import type { AppointmentType } from '@/types/api'
import { appointmentTypeLabel } from '@/components/app/ui'

export interface CalendarEvent {
  startsAt: string
  type: AppointmentType | string
  who: string
  sede: string
}

// Estado del tipo de cita: fondo suave + texto oscuro + etiqueta (nunca sólo color).
const typeStyle: Record<string, string> = {
  VALORACION: 'bg-cream-100 text-navy-800 border-l-navy-700',
  CONTROL: 'bg-gold-100 text-gold-700 border-l-gold-600',
  CIRUGIA: 'bg-navy-900 text-white border-l-gold-300',
  VIRTUAL: 'bg-white text-navy-800 border-l-muted'
}

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const hhmm = (iso: string) =>
  new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  })

/** Vista de mes (lunes a domingo) con las citas de cada día. */
export function MonthCalendar({ month, events }: { month: Date; events: CalendarEvent[] }) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: Math.ceil((offset + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - offset + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })
  const today = new Date()
  const isToday = (d: number) =>
    d === today.getDate() &&
    month.getMonth() === today.getMonth() &&
    month.getFullYear() === today.getFullYear()

  const byDay = new Map<number, CalendarEvent[]>()
  for (const e of events) {
    const d = new Date(e.startsAt)
    if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) continue
    byDay.set(
      d.getDate(),
      [...(byDay.get(d.getDate()) ?? []), e].sort((a, b) => a.startsAt.localeCompare(b.startsAt))
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
                      isToday(day)
                        ? 'rounded-full bg-navy-900 font-semibold text-white'
                        : 'text-muted'
                    )}
                  >
                    {day}
                  </span>
                  <ul className="mt-1 space-y-1">
                    {(byDay.get(day) ?? []).map((e) => (
                      <li
                        key={e.startsAt + e.who}
                        className={cn(
                          'truncate border-l-2 px-1.5 py-1 text-[11px] leading-tight',
                          typeStyle[e.type]
                        )}
                        title={`${hhmm(e.startsAt)} · ${e.who} · ${e.sede}`}
                      >
                        <span className="font-semibold tabular-nums">{hhmm(e.startsAt)}</span>{' '}
                        {e.who}
                      </li>
                    ))}
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
