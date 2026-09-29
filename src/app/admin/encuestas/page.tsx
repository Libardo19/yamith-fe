'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { BarList } from '@/components/app/BarList'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel, StatTile, fmtDate, table } from '@/components/app/ui'
import { Badge } from '@/components/ui/Badge'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { SurveyResults } from '@/types/api'

export default function SurveysPage() {
  const { data, error } = useApi<SurveyResults>('/admin/surveys')

  return (
    <>
      <PageHeader
        title="Encuestas"
        subtitle="Se envían solas una hora después de dar de alta un procedimiento. Cada respuesta también llega a tu correo."
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : !data ? (
        <LoadingBlock />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="Enviadas" value={data.sent} />
            <StatTile
              label="Respondidas"
              value={data.answered}
              delta={
                data.sent
                  ? `${Math.round((data.answered / data.sent) * 100)} % de respuesta`
                  : undefined
              }
            />
            <StatTile
              label="Satisfacción promedio"
              value={data.averageRating !== null ? `${data.averageRating} / 5` : '—'}
            />
            <StatTile
              label="NPS"
              value={data.nps ?? '—'}
              delta="% que recomienda (9–10) menos % que no (0–6)"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
            <Panel title="Calificaciones">
              {data.answered ? (
                <BarList
                  data={[...data.distribution].reverse().map((d) => ({
                    label: `${d.rating} estrella${d.rating === 1 ? '' : 's'}`,
                    value: d.count
                  }))}
                  unit="respuestas"
                  caption="Distribución de calificaciones de 1 a 5"
                />
              ) : (
                <p className="text-sm text-muted">Aún no hay respuestas.</p>
              )}
            </Panel>
            <Panel title="Respuestas" bodyClassName={data.items.length ? 'p-0' : undefined}>
              {data.items.length ? (
                <div className={table.wrap}>
                  <table className={table.table}>
                    <thead>
                      <tr>
                        <th className={table.th}>Paciente</th>
                        <th className={table.th}>Procedimiento</th>
                        <th className={table.th}>Calificación</th>
                        <th className={table.th}>NPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((s) => (
                        <tr key={s.id} className={table.row}>
                          <td className={table.td}>
                            <Link
                              href={`/admin/pacientes/${s.patient.id}`}
                              className="font-semibold text-navy-900 hover:text-gold-700"
                            >
                              {s.patient.firstName} {s.patient.lastName}
                            </Link>
                            {s.comment ? (
                              <span className="mt-1 block max-w-xs text-xs text-ink/70 italic">
                                “{s.comment}”
                              </span>
                            ) : null}
                          </td>
                          <td className={table.td}>
                            <span className="text-navy-800">{s.procedure}</span>
                            <span className="block text-xs text-muted">{s.city ?? ''}</span>
                          </td>
                          <td className={table.td}>
                            {s.answeredAt && s.rating ? (
                              <span className="inline-flex items-center gap-1 text-navy-900">
                                <Star className="size-4 fill-gold-500 text-gold-500" aria-hidden />{' '}
                                {s.rating} / 5
                              </span>
                            ) : (
                              <Badge tone="muted">
                                {s.sentAt && new Date(s.sentAt) > new Date()
                                  ? 'Programada'
                                  : 'Sin responder'}
                              </Badge>
                            )}
                            <span className="block text-[11px] text-muted">
                              {s.answeredAt
                                ? fmtDate(s.answeredAt)
                                : s.sentAt
                                  ? `Envío ${fmtDate(s.sentAt)}`
                                  : ''}
                            </span>
                          </td>
                          <td className={`${table.td} tabular-nums text-navy-900`}>
                            {s.nps ?? '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState
                  title="Sin encuestas"
                  text="Cuando des de alta un procedimiento, la encuesta se enviará sola."
                />
              )}
            </Panel>
          </div>
        </div>
      )}
    </>
  )
}
