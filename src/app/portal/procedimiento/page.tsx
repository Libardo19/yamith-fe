'use client'

import { LoadingBlock } from '@/components/app/SessionShell'
import { CaseStatusBadge, EmptyState, PageHeader, Panel, fmtDate } from '@/components/app/ui'
import { CaseProgress, Timeline } from '@/components/portal/CaseView'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { TrackingCase } from '@/types/api'

export default function MyProcedurePage() {
  const { data, error } = useApi<TrackingCase[]>('/patient/procedures')
  return (
    <>
      <PageHeader title="Mi procedimiento" subtitle="El avance y el seguimiento de tu proceso." />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : !data ? (
        <LoadingBlock />
      ) : data.length === 0 ? (
        <Panel>
          <EmptyState
            title="Aún no tienes un procedimiento registrado"
            text="Después de tu valoración, el equipo registrará aquí tu plan y su seguimiento."
          />
        </Panel>
      ) : (
        <div className="space-y-8">
          {data.map((c) => (
            <div key={c.id} className="grid gap-6 xl:grid-cols-[1fr_1.5fr]">
              <Panel
                title={c.procedure.name}
                action={<CaseStatusBadge status={c.status} />}
                className="self-start"
              >
                <p className="mb-6 text-sm text-muted">
                  {c.surgeryDate ? `Cirugía el ${fmtDate(c.surgeryDate)}` : 'En valoración'}
                  {c.sede ? ` · ${c.sede.name}` : ''}
                </p>
                <CaseProgress status={c.status} />
              </Panel>
              <Panel title="Seguimiento">
                {c.events.length ? (
                  <Timeline
                    items={c.events.map((e) => ({
                      date: e.date,
                      type: e.type,
                      title: e.title,
                      ...(e.description ? { text: e.description } : {}),
                      ...(e.author ? { author: e.author.name } : {})
                    }))}
                  />
                ) : (
                  <p className="text-sm text-muted">Aún no hay registros de seguimiento.</p>
                )}
              </Panel>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
