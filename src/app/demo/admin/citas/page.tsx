import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { MonthCalendar } from '@/components/admin/MonthCalendar'
import { PageHeader, Panel, capitalizeFirst } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { demoCalendar } from '@/lib/demo-data'

export default function DemoCalendarPage() {
  const month = new Date()
  const label = capitalizeFirst(
    month.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  )
  return (
    <>
      <PageHeader
        title="Citas"
        subtitle="Calendario de valoraciones, controles y cirugías. Arrastra una cita para reprogramarla."
        actions={
          <Button className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nueva cita
          </Button>
        }
      />
      <Panel bodyClassName="p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center border border-line"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="min-w-40 text-center font-serif text-xl">{label}</p>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center border border-line"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <select className="border border-line bg-white px-3 py-2 text-sm" defaultValue="">
              <option value="">Todas las sedes</option>
              <option>Pereira</option>
              <option>Barranquilla</option>
              <option>Valledupar</option>
            </select>
            <span className="inline-flex border border-line text-xs font-semibold">
              <span className="bg-navy-900 px-3 py-2 text-white">Mes</span>
              <span className="px-3 py-2 text-muted">Semana</span>
            </span>
          </div>
        </div>
        <MonthCalendar month={month} events={demoCalendar} />
      </Panel>
    </>
  )
}
