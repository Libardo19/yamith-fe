'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { MailCheck } from 'lucide-react'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { formValue, useApiForm } from '@/lib/use-api-form'

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null)
  const { errors, formError, pending, submit } = useApiForm()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = formValue(new FormData(e.currentTarget), 'email')
    const ok = await submit(() =>
      api<null>('/auth/forgot-password', { method: 'POST', body: { email } }).then(() => true)
    )
    if (ok) {
      setMessage(
        `Si ${email} está registrado, te llegará un enlace para crear una contraseña nueva. El enlace vence en 1 hora.`
      )
    }
  }

  return (
    <AuthCard
      eyebrow="Seguridad"
      title="¿Olvidaste tu contraseña?"
      subtitle="Escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva."
      footer={
        <Link href="/login" className="font-semibold text-gold-700 hover:underline">
          Volver a iniciar sesión
        </Link>
      }
    >
      {message ? (
        <div className="flex gap-4 border border-line bg-white p-6">
          <MailCheck className="size-8 shrink-0 text-gold-500" aria-hidden />
          <p className="text-sm leading-relaxed text-muted">
            {message} Revisa también la carpeta de spam.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <Field label="Correo electrónico" htmlFor="email" error={errors['email']}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@correo.com"
            />
          </Field>
          {formError ? <Alert tone="error">{formError}</Alert> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Enviando…' : 'Enviar enlace'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
