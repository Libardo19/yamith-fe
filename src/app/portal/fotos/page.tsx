'use client'

import { Lock } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel, fmtDate } from '@/components/app/ui'
import { SecureImage, openFile, stageLabel } from '@/components/tracking/files'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { MediaFile } from '@/types/api'

const GROUPS: Array<{ key: MediaFile['stage'] | 'OTRAS'; title: string }> = [
  { key: 'ANTES', title: 'Antes' },
  { key: 'CONTROL', title: 'Controles' },
  { key: 'DESPUES', title: 'Después' },
  { key: 'OTRAS', title: 'Otras fotos' }
]

export default function MyPhotosPage() {
  const { data, error } = useApi<MediaFile[]>('/patient/files?kind=fotos')
  return (
    <>
      <PageHeader
        title="Mis fotos"
        subtitle={
          <span className="inline-flex items-center gap-2">
            <Lock className="size-3.5 text-gold-600" aria-hidden /> Privadas: sólo tú y el equipo
            médico pueden verlas.
          </span>
        }
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : !data ? (
        <LoadingBlock />
      ) : data.length === 0 ? (
        <Panel>
          <EmptyState
            title="Aún no hay fotos"
            text="Las fotos de tu proceso aparecerán aquí después de tus controles."
          />
        </Panel>
      ) : (
        <div className="space-y-6">
          {GROUPS.map((g) => {
            const photos = data.filter((f) => (g.key === 'OTRAS' ? !f.stage : f.stage === g.key))
            if (!photos.length) return null
            return (
              <Panel key={g.key} title={g.title}>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {photos.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => openFile('patient', f.id)}
                      className="group text-left"
                    >
                      <SecureImage
                        scope="patient"
                        file={f}
                        className="aspect-[3/4] transition group-hover:opacity-90"
                      />
                      <span className="mt-1.5 block text-xs text-muted">
                        {f.stage ? stageLabel[f.stage] : 'Foto'} ·{' '}
                        {fmtDate(f.takenAt ?? f.createdAt)}
                      </span>
                    </button>
                  ))}
                </div>
              </Panel>
            )
          })}
        </div>
      )}
    </>
  )
}
