'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { track } from '@/lib/analytics'
import { formValue, useApiForm } from '@/lib/use-api-form'
import { AuthCard } from './AuthCard'
import { GoogleButton } from './GoogleButton'
import { PasswordInput } from './PasswordInput'

export function RegisterForm() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const { errors, formError, pending, submit } = useApiForm()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = formValue(form, 'email')
    const ok = await submit(() =>
      api<null>('/auth/register', {
        method: 'POST',
        body: {
          firstName: formValue(form, 'firstName'),
          lastName: formValue(form, 'lastName'),
          email,
          phone: formValue(form, 'phone'),
          password: form.get('password'),
          acceptDataPolicy: form.get('acceptDataPolicy') === 'on'
        }
      }).then(() => true)
    )
    if (ok) {
      track('sign_up', { method: 'email' })
      setSentTo(email)
    }
  }

  if (sentTo) {
    return (
      <AuthCard
        eyebrow="Revisa tu correo"
        title="¡Ya casi! Confirma tu correo"
        footer={
          <Link href="/login" className="font-semibold text-gold-700 hover:underline">
            Volver a iniciar sesión
          </Link>
        }
      >
        <div className="flex gap-4 border border-line bg-white p-6">
          <MailCheck className="size-8 shrink-0 text-gold-500" aria-hidden />
          <p className="text-sm leading-relaxed text-muted">
            Te enviamos un correo de bienvenida a{' '}
            <strong className="text-navy-900">{sentTo}</strong> con un enlace para confirmar tu
            cuenta. El enlace vence en 24 horas. Si no lo ves, revisa la carpeta de spam o
            promociones.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Portal de pacientes"
      title="Crea tu cuenta"
      subtitle="Agenda tus valoraciones y sigue tu proceso desde tu portal."
      footer={
        <>
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-gold-700 hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <GoogleButton text="signup_with" />
      <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="firstName" error={errors['firstName']}>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </Field>
        <Field label="Apellido" htmlFor="lastName" error={errors['lastName']}>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </Field>
        <Field
          label="Correo electrónico"
          htmlFor="email"
          error={errors['email']}
          className="sm:col-span-2"
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tu@correo.com"
          />
        </Field>
        <Field label="Celular" htmlFor="phone" error={errors['phone']} className="sm:col-span-2">
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="300 000 0000"
          />
        </Field>
        <Field
          label="Contraseña"
          htmlFor="password"
          error={errors['password']}
          hint="Mínimo 8 caracteres, con letras y números."
          className="sm:col-span-2"
        >
          <PasswordInput id="password" name="password" autoComplete="new-password" required />
        </Field>
        <Checkbox
          name="acceptDataPolicy"
          className="sm:col-span-2"
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
              </Link>{' '}
              y acepto los{' '}
              <Link
                href="/terminos"
                target="_blank"
                className="text-gold-700 underline underline-offset-2"
              >
                términos
              </Link>
              .
            </>
          }
        />
        {formError ? (
          <Alert tone="error" className="sm:col-span-2">
            {formError}
          </Alert>
        ) : null}
        <Button type="submit" disabled={pending} className="w-full sm:col-span-2">
          {pending ? 'Creando tu cuenta…' : 'Crear mi cuenta'}
        </Button>
      </form>
    </AuthCard>
  )
}
