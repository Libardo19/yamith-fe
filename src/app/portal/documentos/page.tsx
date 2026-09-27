'use client'

import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel } from '@/components/app/ui'
import { DocumentRow } from '@/components/tracking/files'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { MediaFile } from '@/types/api'

export default function MyDocumentsPage() {
  const { data, error } = useApi<MediaFile[]>('/patient/files?kind=documentos')
  return (
    <>
      <PageHeader
        title="Mis documentos"
        subtitle="Consentimientos, indicaciones y otros documentos de tu proceso."
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : !data ? (
        <LoadingBlock />
      ) : (
        <Panel bodyClassName={data.length ? 'p-0' : undefined}>
          {data.length ? (
            <ul className="divide-y divide-line">
              {data.map((f) => (
                <DocumentRow key={f.id} scope="patient" file={f} />
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Aún no hay documentos"
              text="Cuando el equipo agregue documentos te avisaremos por correo."
            />
          )}
        </Panel>
      )}
    </>
  )
}
