import Link from 'next/link'
import { CalendarCheck2, Inbox, Stethoscope, Users } from 'lucide-react'
import { BarList } from '@/components/app/BarList'
import { Avatar } from '@/components/app/AppShell'
import { EmptyState, Panel, StatTile, appointmentTypeLabel, fmtTime } from '@/components/app/ui'
import type { Overview } from '@/types/api'

/** Vista general del panel: KPIs, casos por sede y agenda del día. */
export function OverviewView({ data, base }: { data: Overview; base: string }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Pacientes activos"
          value={data.activePatients}
          icon={<Users className="size-5" />}
        />
        <StatTile
          label="Citas esta semana"
          value={data.weekAppointments}
          icon={<CalendarCheck2 className="size-5" />}
        />
        <StatTile
          label="Procedimientos del mes"
          value={data.monthCases}
          icon={<Stethoscope className="size-5" />}
        />
        <StatTile
          label="Solicitudes nuevas"
          value={data.newLeads}
          icon={<Inbox className="size-5" />}
          delta={
            data.newLeads ? (
              <Link
                href={`${base}/solicitudes`}
                className="font-semibold text-gold-700 hover:underline"
              >
                Responder ahora →
              </Link>
            ) : (
              'Todo al día'
            )
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Procedimientos por sede"
          action={<span className="text-xs text-muted">Histórico</span>}
        >
          <p className="-mt-1 mb-6 text-xs text-muted">Casos registrados en cada sede.</p>
          <BarList
            data={data.casesBySede.map((s) => ({ label: s.city, value: s.total }))}
            unit="procedimientos"
            caption="Procedimientos por sede"
          />
        </Panel>

        <Panel
          title="Citas de hoy"
          action={
            <span className="bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
              {data.today.length}
            </span>
          }
          bodyClassName="p-0"
        >
          {data.today.length ? (
            <ul className="divide-y divide-line">
              {data.today.map((a) => {
                const name = `${a.patient.firstName} ${a.patient.lastName}`
                return (
                  <li key={a.id} className="flex items-center gap-4 px-6 py-4">
                    <Avatar name={name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`${base}/pacientes/${a.patient.id}`}
                        className="block truncate text-sm font-semibold text-navy-900 hover:text-gold-700"
                      >
                        {name}
                      </Link>
                      <p className="text-[11px] tracking-wide text-muted uppercase">
                        {appointmentTypeLabel[a.type]} · {a.sede.name.replace('Sede ', '')}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-navy-800 tabular-nums">
                      {fmtTime(a.startsAt)}
                    </span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <EmptyState
              title="Sin citas para hoy"
              text="Cuando se agenden citas aparecerán aquí."
            />
          )}
        </Panel>
      </div>
    </div>
  )
}
