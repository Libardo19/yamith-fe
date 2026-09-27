'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Camera, Clock, MapPin, MessageCircle } from 'lucide-react'
import { LoadingBlock } from '@/components/app/SessionShell'
import {
  CaseStatusBadge,
  EmptyState,
  Panel,
  appointmentTypeLabel,
  fmtDate,
  fmtLongDate,
  fmtTime
} from '@/components/app/ui'
import { CaseProgress, Timeline } from '@/components/portal/CaseView'
import { DocumentRow } from '@/components/tracking/files'
import { ButtonLink } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { useSession } from '@/lib/session'
import { useApi } from '@/lib/use-api'
import type { PatientDashboard } from '@/types/api'

export default function PortalHome() {
  const { user } = useSession()
  const { data, error } = useApi<PatientDashboard>('/patient/dashboard')
  const firstName = user?.patient?.firstName ?? user?.name.split(' ')[0] ?? ''
  const c = data?.activeCase

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
          <p className="eyebrow text-gold-300">Hola, {firstName}</p>
          <h1 className="mt-3 max-w-xl text-3xl leading-tight text-white sm:text-4xl">
            {c ? 'Así va tu proceso.' : 'Bienvenido(a) a tu portal.'}
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/70">
            Agenda tus citas y sigue cada etapa de tu proceso con el Dr. Yamith Cuello.
          </p>
        </div>
      </section>

      {error ? <Alert tone="error">{error}</Alert> : null}
      {!data ? (
        <LoadingBlock />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-3">
            <Panel title="Tu próxima cita">
              {data.nextAppointment ? (
                <>
                  <p className="font-serif text-2xl text-navy-900">
                    {fmtLongDate(data.nextAppointment.startsAt)}
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-navy-800">
                    <li className="flex items-center gap-3">
                      <Clock className="size-4 text-gold-600" />{' '}
                      {fmtTime(data.nextAppointment.startsAt)}
                    </li>
                    <li className="flex items-center gap-3">
                      <CalendarDays className="size-4 text-gold-600" />{' '}
                      {appointmentTypeLabel[data.nextAppointment.type]}
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="size-4 text-gold-600" /> {data.nextAppointment.sede.name}
                    </li>
                  </ul>
                  <ButtonLink
                    href="/portal/citas"
                    variant="outline"
                    className="mt-6 w-full px-3 py-2.5"
                  >
                    Ver mis citas
                  </ButtonLink>
                </>
              ) : (
                <EmptyState
                  title="Sin citas próximas"
                  text="Agenda tu valoración o tu control."
                  action={<ButtonLink href="/portal/citas/nueva">Agendar cita</ButtonLink>}
                />
              )}
            </Panel>

            <Panel
              title="Tu procedimiento"
              action={c ? <CaseStatusBadge status={c.status} /> : null}
              className="xl:col-span-2"
            >
              {c ? (
                <>
                  <p className="font-serif text-2xl text-navy-900">{c.procedure.name}</p>
                  <p className="mt-1 mb-6 text-sm text-muted">
                    {c.surgeryDate ? `Cirugía el ${fmtDate(c.surgeryDate)}` : 'En valoración'}
                    {c.sede ? ` · ${c.sede.name}` : ''}
                  </p>
                  <CaseProgress status={c.status} />
                  <Link
                    href="/portal/procedimiento"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
                  >
                    Ver seguimiento completo <ArrowRight className="size-4" />
                  </Link>
                </>
              ) : (
                <EmptyState
                  title="Aún no tienes un procedimiento registrado"
                  text="Después de tu valoración, el equipo del Dr. Cuello registrará aquí tu plan y su seguimiento."
                />
              )}
            </Panel>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <Panel title="Últimas novedades">
              {c?.events.length ? (
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
                <p className="text-sm text-muted">Aquí verás las novedades de tu proceso.</p>
              )}
            </Panel>
            <div className="space-y-6">
              <Panel
                title="Tus documentos"
                bodyClassName={data.latestDocuments.length ? 'p-0' : undefined}
              >
                {data.latestDocuments.length ? (
                  <ul className="divide-y divide-line">
                    {data.latestDocuments.map((f) => (
                      <DocumentRow key={f.id} scope="patient" file={f} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">Aún no hay documentos.</p>
                )}
              </Panel>
              <Panel title="Tus fotos">
                <p className="flex items-center gap-3 text-sm text-navy-800">
                  <Camera className="size-5 text-gold-600" />
                  {data.photosCount
                    ? `${data.photosCount} foto${data.photosCount === 1 ? '' : 's'} de tu proceso`
                    : 'Aún no hay fotos'}
                </p>
                {data.photosCount ? (
                  <Link
                    href="/portal/fotos"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
                  >
                    Ver mis fotos <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </Panel>
              <Panel title="¿Necesitas ayuda?">
                <p className="text-sm text-muted">
                  Escríbenos si tienes dudas sobre tu recuperación.
                </p>
                <Link
                  href="/contacto"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
                >
                  <MessageCircle className="size-4 text-[#1f9d55]" aria-hidden /> WhatsApp de tu
                  sede
                </Link>
                <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
                  Si presentas una urgencia, comunícate de inmediato con el consultorio o acude a
                  urgencias.
                </p>
              </Panel>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
