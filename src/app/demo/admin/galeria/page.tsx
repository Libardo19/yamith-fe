import { ImageIcon } from 'lucide-react'
import { PageHeader, Panel } from '@/components/app/ui'

export default function DemoGalleryPage() {
  return (
    <>
      <PageHeader
        title="Galería de resultados"
        subtitle="Antes y después que se muestran en la web. Se publican sólo con el consentimiento escrito del paciente."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {['Mastopexia', 'Lipoescultura VASER', 'Abdominoplastia'].map((p) => (
          <Panel key={p} bodyClassName="p-0">
            <div className="grid grid-cols-2 gap-px bg-line">
              {['Antes', 'Después'].map((w) => (
                <div
                  key={w}
                  className="flex aspect-[3/4] flex-col items-center justify-center gap-2 bg-cream-100 text-muted"
                >
                  <ImageIcon className="size-6" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase">{w}</span>
                </div>
              ))}
            </div>
            <p className="p-4 font-semibold text-navy-900">{p}</p>
          </Panel>
        ))}
      </div>
    </>
  )
}
