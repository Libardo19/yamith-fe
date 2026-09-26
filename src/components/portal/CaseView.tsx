import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { fmtDate } from '@/components/app/ui'
import type { CaseStatus } from '@/types/api'

const STEPS: Array<{ status: CaseStatus; label: string }> = [
  { status: 'VALORACION', label: 'Valoración' },
  { status: 'PROGRAMADO', label: 'Cirugía programada' },
  { status: 'POSTOP', label: 'Recuperación' },
  { status: 'FINALIZADO', label: 'Alta' }
]

/** Avance del caso en 4 pasos. */
export function CaseProgress({ status }: { status: CaseStatus }) {
  const current = STEPS.findIndex((s) => s.status === status)
  return (
    <ol className="grid grid-cols-4 gap-2">
      {STEPS.map((s, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={s.status} className="flex flex-col gap-2">
            <span className={cn('h-1', done || active ? 'bg-gold-500' : 'bg-line')} />
            <span className="flex items-center gap-1.5 text-[11px] leading-tight">
              {done ? <Check className="size-3.5 shrink-0 text-gold-600" aria-hidden /> : null}
              <span
                className={cn(
                  active ? 'font-semibold text-navy-900' : done ? 'text-navy-800' : 'text-muted'
                )}
              >
                {s.label}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export interface TimelineItem {
  date: string
  type: string
  title: string
  text?: string
  author?: string
}

/** Línea de tiempo del seguimiento (más reciente arriba). */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <ol className="relative space-y-8 border-l border-line pl-8">
      {sorted.map((e, i) => (
        <li key={e.date + e.title} className="relative">
          <span
            className={cn(
              'absolute top-1 -left-[37px] size-[11px] rounded-full ring-4 ring-white',
              i === 0 ? 'bg-gold-500' : e.type === 'CIRUGIA' ? 'bg-navy-900' : 'bg-line'
            )}
            aria-hidden
          />
          <p className="text-xs text-muted tabular-nums">{fmtDate(e.date)}</p>
          <p className="mt-1 font-serif text-lg text-navy-900">{e.title}</p>
          {e.text ? <p className="mt-1 text-sm leading-relaxed text-ink/80">{e.text}</p> : null}
          {e.author ? <p className="mt-2 text-xs text-muted">{e.author}</p> : null}
        </li>
      ))}
    </ol>
  )
}
