import { Download, FileText } from 'lucide-react'
import { PageHeader, Panel, fmtDate } from '@/components/app/ui'
import { demoFicha as f } from '@/lib/demo-data'

export default function DemoDocumentsPage() {
  return (
    <>
      <PageHeader
        title="Mis documentos"
        subtitle="Consentimientos, indicaciones, órdenes y fórmulas de tu proceso."
      />
      <Panel bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {f.documents.map((d) => (
            <li key={d.name} className="flex items-center gap-4 px-6 py-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center bg-gold-100 text-gold-700">
                <FileText className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-navy-900">{d.name}</span>
                <span className="text-xs text-muted">
                  {d.kind} · {fmtDate(d.date)} · PDF
                </span>
              </span>
              <span className="inline-flex items-center gap-2 border border-line px-3 py-2 text-xs font-semibold text-navy-900">
                <Download className="size-3.5" aria-hidden /> Descargar
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  )
}
