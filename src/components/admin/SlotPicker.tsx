'use client'

import { bogotaTime } from '@/lib/bogota'
import { cn } from '@/lib/cn'
import { useApi } from '@/lib/use-api'
import type { SlotDay } from '@/types/api'

/** Horarios libres de una sede en un día (ayuda al agendar o reprogramar desde el panel). */
export function SlotPicker({
  sedeId,
  date,
  value,
  onPick
}: {
  sedeId: string
  date: string
  value: string
  onPick: (time: string) => void
}) {
  const { data, loading } = useApi<SlotDay[]>(
    sedeId && date ? `/admin/availability/slots?sedeId=${sedeId}&from=${date}&days=1` : null
  )
  const slots = data?.[0]?.slots ?? []
  if (loading && !data) return <p className="text-xs text-muted">Buscando horarios libres…</p>
  if (!slots.length) {
    return (
      <p className="text-xs text-muted">
        Sin horarios libres ese día según la disponibilidad configurada.
      </p>
    )
  }
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase">
        Horarios libres
      </p>
      <div className="flex flex-wrap gap-1.5">
        {slots.map((s) => {
          const t = bogotaTime(s.startsAt)
          return (
            <button
              key={s.startsAt}
              type="button"
              onClick={() => onPick(t)}
              className={cn(
                'border px-2.5 py-1.5 text-xs tabular-nums',
                t === value
                  ? 'border-gold-600 bg-gold-100 font-semibold text-gold-700'
                  : 'border-line hover:border-gold-500'
              )}
            >
              {t}
            </button>
          )
        })}
      </div>
    </div>
  )
}
