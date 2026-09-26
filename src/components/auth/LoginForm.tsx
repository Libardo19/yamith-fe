'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import { homeFor } from '@/lib/session'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { SessionUser } from '@/types/api'
import { AuthCard } from './AuthCard'
import { GoogleButton } from './GoogleButton'
import { PasswordInput } from './PasswordInput'

export function LoginForm() {
  const router = useRouter()
  const next = useSearchParams().get('next')
  const [tab, setTab] = useState<'paciente' | 'equipo'>(
    next?.startsWith('/admin') ? 'equipo' : 'paciente'
  )
  const [email, setEmail] = useState('')
  const [resent, setResent] = useState<string | null>(null)
  const { errors, formError, errorCode, pending, submit } = useApiForm()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResent(null)
    const form = new FormData(e.currentTarget)
    const user = await submit(() =>
      api<SessionUser>('/auth/login', {
        method: 'POST',
        body: { email: formValue(form, 'email'), password: form.get('password') }
      })
    )
    if (user) {
      track('login', { method: 'email' })
      router.replace(homeFor(user, next))
    }
  }

  async function resend() {
    await api('/auth/resend-verification', { method: 'POST', body: { email } }).catch(
      () => undefined
    )
    setResent(
      'Si tu cuenta está pendiente de confirmar, te enviamos un nuevo enlace. Revisa tu correo.'
    )
  }

  return (
    <AuthCard
      title="Acceso al portal"
      subtitle="Ingresa con tu correo y contraseña."
      footer={
        tab === 'paciente' ? (
          <>
            ¿Aún no tienes cuenta?{' '}
            <Link href="/registro" className="font-semibold text-gold-700 hover:underline">
              Regístrate
            </Link>
          </>
        ) : (
          'Las cuentas del equipo las crea el administrador.'
        )
      }
    >
      <div
        role="tablist"
        aria-label="Tipo de acceso"
        className="mb-8 grid grid-cols-2 border-b border-line"
      >
        {(['paciente', 'equipo'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              '-mb-px border-b-2 pb-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors',
              tab === t
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-muted hover:text-navy-900'
            )}
          >
            {t === 'paciente' ? 'Paciente' : 'Equipo'}
          </button>
        ))}
      </div>

      {tab === 'paciente' ? <GoogleButton /> : null}

      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <Field label="Correo electrónico" htmlFor="email" error={errors['email']}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Contraseña" htmlFor="password" error={errors['password']}>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
          />
        </Field>
        <div className="-mt-2 text-right">
          <Link
            href="/olvide-contrasena"
            className="text-xs font-semibold text-gold-700 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {formError ? (
          <Alert tone="error">
            {formError}
            {errorCode === 'EMAIL_NOT_VERIFIED' ? (
              <button
                type="button"
                onClick={resend}
                className="mt-2 block font-semibold underline underline-offset-2"
              >
                Reenviar correo de confirmación
              </button>
            ) : null}
          </Alert>
        ) : null}
        {resent ? <Alert tone="success">{resent}</Alert> : null}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Ingresando…' : 'Ingresar al portal'}{' '}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </AuthCard>
  )
}
