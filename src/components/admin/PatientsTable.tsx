import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import { Avatar } from '@/components/app/AppShell'
import { AccountStatusBadge, CaseStatusBadge, fmtDate, table } from '@/components/app/ui'
import type { PatientRow } from '@/types/api'

export function PatientsTable({ rows, base }: { rows: PatientRow[]; base: string }) {
  return (
    <div className={table.wrap}>
      <table className={table.table}>
        <thead>
          <tr>
            <th className={table.th}>Paciente</th>
            <th className={table.th}>Sede</th>
            <th className={table.th}>Procedimiento</th>
            <th className={table.th}>Próxima cita</th>
            <th className={table.th}>Cuenta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const name = `${p.firstName} ${p.lastName}`
            return (
              <tr key={p.id} className={table.row}>
                <td className={table.td}>
                  <Link
                    href={`${base}/pacientes/${p.id}`}
                    className="group flex items-center gap-3"
                  >
                    <Avatar name={name} size="sm" />
                    <span>
                      <span className="block font-semibold text-navy-900 group-hover:text-gold-700">
                        {name}
                      </span>
                      <span className="text-xs text-muted">{p.email}</span>
                    </span>
                  </Link>
                </td>
                <td className={`${table.td} text-navy-800`}>{p.sede?.city ?? '—'}</td>
                <td className={table.td}>
                  {p.lastCase ? (
                    <span className="flex flex-col items-start gap-1">
                      <span className="text-navy-800">{p.lastCase.procedure}</span>
                      <CaseStatusBadge status={p.lastCase.status} />
                    </span>
                  ) : (
                    <span className="text-muted">Sin procedimiento</span>
                  )}
                </td>
                <td className={table.td}>
                  {p.nextAppointment ? (
                    <span className="inline-flex items-center gap-2 text-navy-800">
                      <CalendarDays className="size-4 text-gold-600" aria-hidden />
                      {fmtDate(p.nextAppointment.startsAt)}
                    </span>
                  ) : (
                    <span className="text-muted italic">Sin agendar</span>
                  )}
                </td>
                <td className={table.td}>
                  <AccountStatusBadge status={p.accountStatus} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
