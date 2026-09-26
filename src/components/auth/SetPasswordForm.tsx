'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { homeFor } from '@/lib/session'
import { useApiForm } from '@/lib/use-api-form'
import type { SessionUser } from '@/types/api'
import { AuthCard } from './AuthCard'
import { PasswordInput } from './PasswordInput'

/** Crear contraseña desde un enlace: restablecer (reset) o activar cuenta (invitación). */
export function SetPasswordForm({ token, mode }: { token: string; mode: 'reset' | 'invite' }) {
  const router = useRouter()
  const { errors, formError, pending, submit, setFormError } = useApiForm()
  const invite = mode === 'invite'

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get('password') as string
    if (password !== form.get('confirm')) {
      setFormError('Las contraseñas no coinciden.')
      return
    }
    const user = await submit(() =>
      api<SessionUser>(invite ? '/auth/accept-invite' : '/auth/reset-password', {
        method: 'POST',
        body: invite
          ? { token, password, acceptDataPolicy: form.get('acceptDataPolicy') === 'on' }
          : { token, password }
      })
    )
    if (user) router.replace(homeFor(user))
  }

  return (
    <AuthCard
      eyebrow={invite ? 'Bienvenido(a)' : 'Seguridad'}
      title={invite ? 'Crea tu contraseña' : 'Crea una contraseña nueva'}
      subtitle={
        invite
          ? 'Con esta contraseña entrarás a tu portal.'
          : 'Por seguridad cerraremos las demás sesiones abiertas de tu cuenta.'
      }
      footer={
        <Link href="/login" className="font-semibold text-gold-700 hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <Field
          label="Contraseña"
          htmlFor="password"
          error={errors['password']}
          hint="Mínimo 8 caracteres, con letras y números."
        >
          <PasswordInput id="password" name="password" autoComplete="new-password" required />
        </Field>
        <Field label="Confirmar contraseña" htmlFor="confirm">
          <PasswordInput id="confirm" name="confirm" autoComplete="new-password" required />
        </Field>
        {invite ? (
          <Checkbox
            name="acceptDataPolicy"
            error={errors['acceptDataPolicy']}
            label={
              <>
                Autorizo el tratamiento de mis datos personales y de salud según la{' '}
                <Link
                  href="/privacidad"
                  target="_blank"
                  className="text-gold-700 underline underline-offset-2"
                >
                  política de tratamiento de datos
                </Link>
                .
              </>
            }
          />
        ) : null}
        {formError ? <Alert tone="error">{formError}</Alert> : null}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Guardando…' : invite ? 'Activar mi cuenta' : 'Guardar contraseña'}
        </Button>
      </form>
    </AuthCard>
  )
}
