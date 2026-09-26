import { CheckCircle2 } from 'lucide-react'
import { CaseStatusBadge, PageHeader, Panel, fmtDate } from '@/components/app/ui'
import { CaseProgress, Timeline } from '@/components/portal/CaseView'
import { demoFicha as f } from '@/lib/demo-data'

const care = [
  'Usa la prenda de compresión día y noche durante las primeras semanas.',
  'Camina varias veces al día; evita el ejercicio intenso hasta que el doctor lo autorice.',
  'Asiste a tus sesiones de cámara hiperbárica y Tensamax programadas.',
  'Toma los medicamentos de tu fórmula en los horarios indicados.'
]

export default function DemoMyProcedure() {
  return (
    <>
      <PageHeader title="Mi procedimiento" subtitle={`${f.procedure} · ${f.sede}`} />
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title="Avance" action={<CaseStatusBadge status={f.status} />}>
            <p className="mb-6 text-sm text-muted">
              Cirugía realizada el {fmtDate(f.surgeryDate)}.
            </p>
            <CaseProgress status={f.status} />
          </Panel>
          <Panel title="Seguimiento">
            <Timeline items={f.timeline} />
          </Panel>
        </div>
        <Panel title="Tus indicaciones">
          <ul className="space-y-4">
            {care.map((c) => (
              <li key={c} className="flex gap-3 text-sm leading-relaxed text-navy-800">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 text-xs text-muted">
            Estas indicaciones las registra el equipo médico para tu caso. Ante cualquier duda,
            consulta con el consultorio.
          </p>
        </Panel>
      </div>
    </>
  )
}
