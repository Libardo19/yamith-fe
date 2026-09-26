import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  MessageCircle,
  Video
} from 'lucide-react'
import { CaseStatusBadge, Panel, fmtDate, fmtLongDate, fmtTime } from '@/components/app/ui'
import { CaseProgress, Timeline } from '@/components/portal/CaseView'
import { ButtonLink } from '@/components/ui/Button'
import { demoFicha as f } from '@/lib/demo-data'

/** Portal del paciente (borrador): bienvenida, próxima cita, avance y últimas novedades. */
export default function DemoPortalHome() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden bg-navy-900 p-8 text-white sm:p-10">
        <Image
          src="/images/recepcion-logo.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="relative">
          <p className="eyebrow text-gold-300">Hola, {f.firstName}</p>
          <h1 className="mt-3 max-w-xl text-3xl leading-tight text-white sm:text-4xl">
            Vas muy bien en tu recuperación.
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/70">
            Día 10 después de tu cirugía. Sigue usando tu prenda de compresión y asiste a tus
            terapias.
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Tu próxima cita" className="xl:col-span-1">
          <p className="font-serif text-2xl text-navy-900">{fmtLongDate(f.nextAppointment)}</p>
          <ul className="mt-5 space-y-3 text-sm text-navy-800">
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-gold-600" /> {fmtTime(f.nextAppointment)}
            </li>
            <li className="flex items-center gap-3">
              <CalendarDays className="size-4 text-gold-600" /> Control posoperatorio
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-gold-600" /> {f.sede}
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <ButtonLink href="/demo/portal/citas" variant="outline" className="flex-1 px-3 py-2.5">
              Reprogramar
            </ButtonLink>
            <ButtonLink href="/demo/portal/citas" className="flex-1 px-3 py-2.5">
              Agendar
            </ButtonLink>
          </div>
        </Panel>

        <Panel
          title="Tu procedimiento"
          action={<CaseStatusBadge status={f.status} />}
          className="xl:col-span-2"
        >
          <p className="font-serif text-2xl text-navy-900">{f.procedure}</p>
          <p className="mt-1 mb-6 text-sm text-muted">
            Cirugía el {fmtDate(f.surgeryDate)} · {f.sede}
          </p>
          <CaseProgress status={f.status} />
          <Link
            href="/demo/portal/procedimiento"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
          >
            Ver seguimiento completo <ArrowRight className="size-4" />
          </Link>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Últimas novedades">
          <Timeline items={f.timeline.slice(-3)} />
        </Panel>
        <div className="space-y-6">
          <Panel title="Tus documentos" bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {f.documents.slice(0, 3).map((d) => (
                <li key={d.name} className="flex items-center gap-3 px-6 py-3.5">
                  <FileText className="size-5 shrink-0 text-gold-600" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-sm text-navy-900">{d.name}</span>
                  <span className="text-xs font-semibold text-gold-700">Descargar</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="¿Necesitas ayuda?">
            <p className="text-sm text-muted">Escríbenos si tienes dudas sobre tu recuperación.</p>
            <div className="mt-4 flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-sm text-navy-800">
                <MessageCircle className="size-4 text-[#1f9d55]" /> WhatsApp de la sede
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-navy-800">
                <Video className="size-4 text-gold-600" /> Control virtual
              </span>
            </div>
            <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
              Si presentas una urgencia, comunícate de inmediato con el consultorio o acude a
              urgencias.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
