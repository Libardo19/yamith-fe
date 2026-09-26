import Link from 'next/link'
import { ArrowLeft, CalendarDays, Camera, FileText, Mail, Phone, Plus, Upload } from 'lucide-react'
import { Avatar } from '@/components/app/AppShell'
import { CaseStatusBadge, Panel, fmtDate, fmtDateTime } from '@/components/app/ui'
import { CaseProgress, Timeline } from '@/components/portal/CaseView'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { demoFicha as f } from '@/lib/demo-data'

/** Ficha del paciente (borrador): datos, procedimiento, evolución, fotos y documentos. */
export default function DemoPatientFicha() {
  const name = `${f.firstName} ${f.lastName}`
  return (
    <>
      <Link
        href="/demo/admin/pacientes"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver a pacientes
      </Link>

      <section className="border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <Avatar name={name} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl">{name}</h1>
              <Badge tone="success">Cuenta activa</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">
              {f.document} · {f.birthDate} · {f.sede}
            </p>
            <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Contacto
                </dt>
                <dd className="mt-1 space-y-1 text-navy-800">
                  <span className="flex items-center gap-2">
                    <Phone className="size-3.5 text-gold-600" />
                    {f.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="size-3.5 text-gold-600" />
                    {f.email}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Tipo de sangre
                </dt>
                <dd className="mt-1 text-navy-800">{f.bloodType}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Alergias
                </dt>
                <dd className="mt-1 font-semibold text-danger">{f.allergies}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Próxima cita
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-navy-800">
                  <CalendarDays className="size-3.5 text-gold-600" />
                  {fmtDateTime(f.nextAppointment)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="px-4 py-2.5">
              Editar ficha
            </Button>
            <Button className="px-4 py-2.5">
              <Plus className="size-4" /> Nota
            </Button>
          </div>
        </div>
      </section>

      <nav
        className="my-6 flex gap-6 overflow-x-auto border-b border-line text-[11px] font-semibold tracking-[0.16em] uppercase"
        aria-label="Secciones de la ficha"
      >
        {['Procedimientos', 'Evolución', 'Fotos', 'Documentos', 'Citas'].map((t, i) => (
          <span
            key={t}
            className={
              i === 0 ? '-mb-px border-b-2 border-gold-600 pb-3 text-navy-900' : 'pb-3 text-muted'
            }
          >
            {t}
          </span>
        ))}
      </nav>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title={f.procedure} action={<CaseStatusBadge status={f.status} />}>
            <p className="mb-6 text-sm text-muted">
              Cirugía realizada el {fmtDate(f.surgeryDate)} · {f.sede}
            </p>
            <CaseProgress status={f.status} />
          </Panel>
          <Panel
            title="Evolución"
            action={
              <Button variant="outline" className="px-3 py-2">
                <Plus className="size-3.5" /> Registrar
              </Button>
            }
          >
            <Timeline items={f.timeline} />
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel
            title="Fotos del proceso"
            action={
              <Button variant="outline" className="px-3 py-2">
                <Upload className="size-3.5" /> Subir
              </Button>
            }
          >
            <div className="grid grid-cols-3 gap-2">
              {f.photos.map((p) => (
                <div
                  key={p.stage}
                  className="flex aspect-square flex-col items-center justify-center gap-1 border border-dashed border-line bg-cream-50 p-2 text-center"
                >
                  <Camera className="size-5 text-muted" aria-hidden />
                  <span className="text-[11px] font-semibold text-navy-800">{p.stage}</span>
                  <span className="text-[10px] text-muted">
                    {p.count ? `${p.count} fotos` : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              Almacenamiento privado: sólo la paciente y el equipo médico las ven.
            </p>
          </Panel>
          <Panel title="Documentos" bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {f.documents.map((d) => (
                <li key={d.name} className="flex items-center gap-3 px-6 py-3.5">
                  <FileText className="size-5 shrink-0 text-gold-600" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-navy-900">{d.name}</span>
                    <span className="text-xs text-muted">
                      {d.kind} · {fmtDate(d.date)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}
