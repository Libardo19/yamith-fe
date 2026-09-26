import { Camera, Lock } from 'lucide-react'
import { PageHeader, Panel, fmtDate } from '@/components/app/ui'
import { demoFicha as f } from '@/lib/demo-data'

export default function DemoPhotosPage() {
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
      <div className="space-y-6">
        {f.photos.map((p) => (
          <Panel
            key={p.stage}
            title={p.stage}
            action={<span className="text-xs text-muted">{fmtDate(p.date)}</span>}
          >
            {p.count ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: p.count }, (_, i) => (
                  <div
                    key={i}
                    className="flex aspect-[3/4] flex-col items-center justify-center gap-2 bg-cream-100 text-muted"
                  >
                    <Camera className="size-6" aria-hidden />
                    <span className="text-[11px]">Vista {i + 1}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted">
                Las fotos de este control se tomarán en tu próxima cita.
              </p>
            )}
          </Panel>
        ))}
      </div>
    </>
  )
}
