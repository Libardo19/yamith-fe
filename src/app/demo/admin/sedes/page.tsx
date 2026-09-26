import { MapPin, MessageCircle } from 'lucide-react'
import { PageHeader, Panel } from '@/components/app/ui'
import { fallbackSedes } from '@/content/site'

export default function DemoSedesPage() {
  return (
    <>
      <PageHeader
        title="Sedes"
        subtitle="Dirección, WhatsApp y horario de atención de cada sede."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {fallbackSedes.map((s) => (
          <Panel key={s.slug} title={s.name}>
            <p className="flex items-start gap-2 text-sm text-navy-800">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden /> {s.address}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-navy-800">
              <MessageCircle className="size-4 text-gold-600" aria-hidden /> WhatsApp pendiente
            </p>
            <p className="mt-6 text-xs text-muted">
              Horario de atención: se configura en F3 (agenda).
            </p>
          </Panel>
        ))}
      </div>
    </>
  )
}
