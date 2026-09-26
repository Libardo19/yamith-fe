'use client'

import { useState, type FormEvent } from 'react'
import { Avatar } from '@/components/app/AppShell'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader, Panel, fmtDateTime, table } from '@/components/app/ui'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input, Select } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import { useSession } from '@/lib/session'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { StaffUser } from '@/types/api'

export default function TeamPage() {
  const { user } = useSession()
  const { data, error, reload } = useApi<StaffUser[]>('/admin/users')
  const { errors, formError, pending, submit } = useApiForm()
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)

  async function invite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const ok = await submit(() =>
      api('/admin/users', {
        method: 'POST',
        body: {
          name: formValue(f, 'name'),
          email: formValue(f, 'email'),
          role: formValue(f, 'role')
        }
      }).then(() => true)
    )
    if (ok) {
      form.reset()
      setNotice({ tone: 'success', text: 'Invitación enviada por correo.' })
      reload()
    }
  }

  async function update(id: string, body: Record<string, unknown>, text: string) {
    setNotice(null)
    try {
      await api(`/admin/users/${id}`, { method: 'PATCH', body })
      setNotice({ tone: 'success', text })
      reload()
    } catch (err) {
      setNotice({
        tone: 'error',
        text: err instanceof ApiError ? err.message : 'No se pudo actualizar.'
      })
    }
  }

  return (
    <>
      <PageHeader
        title="Equipo"
        subtitle="Personas con acceso al panel. Cada una recibe una invitación por correo."
      />
      {notice ? (
        <Alert tone={notice.tone} className="mb-6">
          {notice.text}
        </Alert>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel bodyClassName="p-0">
          {error ? (
            <Alert tone="error" className="m-4">
              {error}
            </Alert>
          ) : !data ? (
            <LoadingBlock />
          ) : (
            <div className={table.wrap}>
              <table className={table.table}>
                <thead>
                  <tr>
                    <th className={table.th}>Persona</th>
                    <th className={table.th}>Rol</th>
                    <th className={table.th}>Estado</th>
                    <th className={table.th}>
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((t) => (
                    <tr key={t.id} className={table.row}>
                      <td className={table.td}>
                        <span className="flex items-center gap-3">
                          <Avatar name={t.name} size="sm" />
                          <span>
                            <span className="block font-semibold text-navy-900">{t.name}</span>
                            <span className="text-xs text-muted">{t.email}</span>
                            {t.lastLoginAt ? (
                              <span className="block text-[11px] text-muted">
                                Último ingreso {fmtDateTime(t.lastLoginAt)}
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </td>
                      <td className={table.td}>
                        <select
                          aria-label={`Rol de ${t.name}`}
                          value={t.role}
                          disabled={t.id === user?.id}
                          onChange={(e) =>
                            update(t.id, { role: e.target.value }, 'Rol actualizado.')
                          }
                          className="border border-line bg-white px-2 py-1.5 text-xs disabled:opacity-60"
                        >
                          <option value="ADMIN">Administrador</option>
                          <option value="STAFF">Equipo</option>
                        </select>
                      </td>
                      <td className={table.td}>
                        {!t.isActive ? (
                          <Badge tone="muted">Desactivado</Badge>
                        ) : t.activated ? (
                          <Badge tone="success">Activo</Badge>
                        ) : (
                          <Badge tone="gold">Invitación enviada</Badge>
                        )}
                      </td>
                      <td
                        className={`${table.td} space-x-3 text-right text-xs font-semibold whitespace-nowrap`}
                      >
                        {!t.activated && t.isActive ? (
                          <button
                            type="button"
                            className="text-gold-700 hover:underline"
                            onClick={async () => {
                              try {
                                await api(`/admin/users/${t.id}/invite`, { method: 'POST' })
                                setNotice({ tone: 'success', text: 'Invitación reenviada.' })
                              } catch (err) {
                                setNotice({
                                  tone: 'error',
                                  text:
                                    err instanceof ApiError ? err.message : 'No se pudo reenviar.'
                                })
                              }
                            }}
                          >
                            Reenviar
                          </button>
                        ) : null}
                        {t.id !== user?.id ? (
                          <button
                            type="button"
                            className={
                              t.isActive
                                ? 'text-danger hover:underline'
                                : 'text-navy-900 hover:underline'
                            }
                            onClick={() =>
                              update(
                                t.id,
                                { isActive: !t.isActive },
                                t.isActive ? 'Acceso desactivado.' : 'Acceso reactivado.'
                              )
                            }
                          >
                            {t.isActive ? 'Desactivar' : 'Reactivar'}
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
        <Panel title="Invitar al equipo" className="self-start">
          <form onSubmit={invite} noValidate className="space-y-5">
            <Field label="Nombre" htmlFor="name" error={errors['name']}>
              <Input id="name" name="name" />
            </Field>
            <Field label="Correo" htmlFor="email" error={errors['email']}>
              <Input id="email" name="email" type="email" />
            </Field>
            <Field label="Rol" htmlFor="role" error={errors['role']}>
              <Select id="role" name="role" defaultValue="STAFF">
                <option value="STAFF">Equipo (pacientes, citas, catálogo)</option>
                <option value="ADMIN">Administrador (todo, incluido el equipo)</option>
              </Select>
            </Field>
            {formError ? <Alert tone="error">{formError}</Alert> : null}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? 'Enviando…' : 'Enviar invitación'}
            </Button>
          </form>
        </Panel>
      </div>
    </>
  )
}
