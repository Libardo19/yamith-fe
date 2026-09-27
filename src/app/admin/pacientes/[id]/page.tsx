'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, CalendarDays, Mail, Phone, Send } from 'lucide-react'
import { Drawer } from '@/components/admin/Drawer'
import { NewAppointmentForm } from '@/components/admin/NewAppointmentForm'
import { PatientForm } from '@/components/admin/PatientForm'
import { TrackingSection } from '@/components/admin/TrackingSection'
import { Avatar } from '@/components/app/AppShell'
import { LoadingBlock } from '@/components/app/SessionShell'
import {
  AccountStatusBadge,
  AppointmentStatusBadge,
  EmptyState,
  Panel,
  appointmentTypeLabel,
  fmtDate,
  fmtDateTime
} from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import type { PatientDetail, Sede } from '@/types/api'

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: p, error, setData, reload } = useApi<PatientDetail>(`/admin/patients/${id}`)
  const { data: sedes } = useApi<Sede[]>('/admin/sedes')
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [booking, setBooking] = useState(false)

  if (error) return <Alert tone="error">{error}</Alert>
  if (!p || !sedes) return <LoadingBlock />
  const name = `${p.firstName} ${p.lastName}`

  async function action(fn: () => Promise<unknown>, ok: string) {
    setNotice(null)
    try {
      await fn()
      setNotice({ tone: 'success', text: ok })
    } catch (err) {
      setNotice({
        tone: 'error',
        text: err instanceof ApiError ? err.message : 'No se pudo completar la acción.'
      })
    }
  }

  const canInvite = p.accountStatus === 'invited'

  return (
    <>
      <Link
        href="/admin/pacientes"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver a pacientes
      </Link>

      <section className="border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <Avatar name={name} url={p.user.avatarUrl} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl">{name}</h1>
              <AccountStatusBadge status={p.accountStatus} />
            </div>
            <p className="mt-1 text-sm text-muted">
              {[
                p.documentType && p.documentNumber ? `${p.documentType} ${p.documentNumber}` : null,
                p.sede?.name,
                `Desde ${fmtDate(p.createdAt)}`
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
            <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Contacto
                </dt>
                <dd className="mt-1 space-y-1 text-navy-800">
                  <span className="flex items-center gap-2">
                    <Phone className="size-3.5 text-gold-600" />
                    {p.phone ?? '—'}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="size-3.5 shrink-0 text-gold-600" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">{p.user.email}</span>
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Tipo de sangre
                </dt>
                <dd className="mt-1 text-navy-800">{p.bloodType ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Alergias
                </dt>
                <dd
                  className={p.allergies ? 'mt-1 font-semibold text-danger' : 'mt-1 text-navy-800'}
                >
                  {p.allergies ?? 'Ninguna registrada'}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">
                  Último ingreso
                </dt>
                <dd className="mt-1 text-navy-800">
                  {p.user.lastLoginAt ? fmtDateTime(p.user.lastLoginAt) : 'Nunca'}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-wrap gap-3">
            {canInvite ? (
              <Button
                variant="outline"
                className="px-4 py-2.5"
                onClick={() =>
                  action(
                    () => api(`/admin/patients/${p.id}/invite`, { method: 'POST' }),
                    'Invitación reenviada por correo.'
                  )
                }
              >
                <Send className="size-4" /> Reenviar invitación
              </Button>
            ) : null}
            <Button variant="outline" className="px-4 py-2.5" onClick={() => setEditing((v) => !v)}>
              {editing ? 'Cancelar' : 'Editar ficha'}
            </Button>
          </div>
        </div>
        {notice ? (
          <Alert tone={notice.tone} className="mt-6">
            {notice.text}
          </Alert>
        ) : null}
      </section>

      {editing ? (
        <Panel title="Editar datos" className="mt-6">
          <PatientForm
            mode="edit"
            sedes={sedes}
            initial={p}
            onSubmit={async (payload) => {
              const updated = await api<PatientDetail>(`/admin/patients/${p.id}`, {
                method: 'PATCH',
                body: payload
              })
              setData(updated)
              setEditing(false)
              setNotice({ tone: 'success', text: 'Cambios guardados.' })
            }}
            footer={
              <button
                type="button"
                className="ml-auto text-xs font-semibold text-danger hover:underline"
                onClick={() =>
                  action(
                    async () => {
                      const updated = await api<PatientDetail>(`/admin/patients/${p.id}`, {
                        method: 'PATCH',
                        body: { isActive: !p.user.isActive }
                      })
                      setData(updated)
                    },
                    p.user.isActive
                      ? 'Cuenta desactivada: ya no puede entrar al portal.'
                      : 'Cuenta reactivada.'
                  )
                }
              >
                {p.user.isActive ? 'Desactivar cuenta' : 'Reactivar cuenta'}
              </button>
            }
          />
        </Panel>
      ) : null}

      <div className="mt-6">
        <Panel
          title="Citas"
          bodyClassName="p-0"
          action={
            <Button variant="outline" className="px-3 py-2" onClick={() => setBooking(true)}>
              Nueva cita
            </Button>
          }
        >
          {p.appointments.length ? (
            <ul className="divide-y divide-line">
              {p.appointments.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-6 py-4">
                  <CalendarDays className="size-4 text-gold-600" aria-hidden />
                  <span className="flex-1 text-sm text-navy-900">{fmtDateTime(a.startsAt)}</span>
                  <span className="text-xs text-muted">
                    {appointmentTypeLabel[a.type]} · {a.sede.name}
                  </span>
                  <AppointmentStatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Sin citas"
              text="Agenda una cita para este paciente o deja que la agende desde su portal."
            />
          )}
        </Panel>
      </div>

      <div className="mt-10">
        <TrackingSection
          patientId={p.id}
          sedes={sedes}
          notify={(tone, text) => setNotice({ tone, text })}
        />
      </div>

      {booking ? (
        <Drawer title="Nueva cita" onClose={() => setBooking(false)}>
          <NewAppointmentForm
            sedes={sedes}
            defaultPatient={{ id: p.id, name }}
            onCreated={(message) => {
              setBooking(false)
              setNotice({ tone: 'success', text: message })
              reload()
            }}
          />
        </Drawer>
      ) : null}
    </>
  )
}
