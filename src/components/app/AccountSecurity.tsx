'use client'

import { useState, type FormEvent } from 'react'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { useSession } from '@/lib/session'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { SessionUser } from '@/types/api'
import { Panel } from './ui'

/** Cambiar contraseña y correo (ambos avisan por correo). Lo usan portal y panel. */
export function AccountSecurity() {
  const { user, setUser } = useSession()
  const pwd = useApiForm()
  const mail = useApiForm()
  const [pwdOk, setPwdOk] = useState(false)
  const [mailMsg, setMailMsg] = useState<string | null>(null)
  if (!user) return null

  async function changePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPwdOk(false)
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('newPassword') !== data.get('confirm')) {
      pwd.setFormError('Las contraseñas nuevas no coinciden.')
      return
    }
    const updated = await pwd.submit(() =>
      api<SessionUser>('/auth/password', {
        method: 'PATCH',
        body: {
          currentPassword: (data.get('currentPassword') as string) || undefined,
          newPassword: data.get('newPassword')
        }
      })
    )
    if (updated) {
      setUser(updated)
      setPwdOk(true)
      form.reset()
    }
  }

  async function changeEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMailMsg(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const ok = await mail.submit(() =>
      api<null>('/auth/email-change', {
        method: 'POST',
        body: {
          newEmail: formValue(data, 'newEmail'),
          password: (data.get('password') as string) || undefined
        }
      }).then(() => true)
    )
    if (ok) {
      setMailMsg('Te enviamos un enlace al nuevo correo. El cambio se hace cuando lo confirmes.')
      form.reset()
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title={user.hasPassword ? 'Cambiar contraseña' : 'Crear contraseña'}>
        {!user.hasPassword ? (
          <p className="mb-6 text-sm text-muted">
            Entraste con Google. Si quieres, crea una contraseña para entrar también con tu correo.
          </p>
        ) : null}
        <form onSubmit={changePassword} noValidate className="space-y-6">
          {user.hasPassword ? (
            <Field
              label="Contraseña actual"
              htmlFor="currentPassword"
              error={pwd.errors['currentPassword']}
            >
              <PasswordInput
                id="currentPassword"
                name="currentPassword"
                autoComplete="current-password"
              />
            </Field>
          ) : null}
          <Field
            label="Nueva contraseña"
            htmlFor="newPassword"
            error={pwd.errors['newPassword']}
            hint="Mínimo 8 caracteres, con letras y números."
          >
            <PasswordInput id="newPassword" name="newPassword" autoComplete="new-password" />
          </Field>
          <Field label="Confirmar nueva contraseña" htmlFor="confirm">
            <PasswordInput id="confirm" name="confirm" autoComplete="new-password" />
          </Field>
          {pwd.formError ? <Alert tone="error">{pwd.formError}</Alert> : null}
          {pwdOk ? (
            <Alert tone="success">
              Contraseña actualizada. Te enviamos un aviso por correo y cerramos tus otras sesiones.
            </Alert>
          ) : null}
          <Button type="submit" disabled={pwd.pending}>
            {pwd.pending ? 'Guardando…' : 'Guardar contraseña'}
          </Button>
        </form>
      </Panel>

      <Panel title="Cambiar correo">
        <p className="mb-6 text-sm text-muted">
          Correo actual: <strong className="text-navy-900">{user.email}</strong>
          {user.pendingEmail ? <> · pendiente de confirmar: {user.pendingEmail}</> : null}
        </p>
        <form onSubmit={changeEmail} noValidate className="space-y-6">
          <Field label="Nuevo correo" htmlFor="newEmail" error={mail.errors['newEmail']}>
            <Input id="newEmail" name="newEmail" type="email" autoComplete="email" />
          </Field>
          {user.hasPassword ? (
            <Field label="Tu contraseña" htmlFor="password" error={mail.errors['password']}>
              <PasswordInput id="password" name="password" autoComplete="current-password" />
            </Field>
          ) : null}
          {mail.formError ? <Alert tone="error">{mail.formError}</Alert> : null}
          {mailMsg ? <Alert tone="success">{mailMsg}</Alert> : null}
          <Button type="submit" variant="outline" disabled={mail.pending}>
            {mail.pending ? 'Enviando…' : 'Enviar enlace de confirmación'}
          </Button>
        </form>
      </Panel>
    </div>
  )
}
