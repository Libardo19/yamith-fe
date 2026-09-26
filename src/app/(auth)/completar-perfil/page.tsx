'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { homeFor } from '@/lib/session'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { SessionUser } from '@/types/api'

/** Tras registrarse con Google: pedir celular y el consentimiento de datos. */
export default function CompleteProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const { errors, formError, pending, submit } = useApiForm()

  useEffect(() => {
    api<SessionUser>('/auth/me')
      .then((me) => (me.needsProfile ? setUser(me) : router.replace(homeFor(me))))
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) router.replace('/login')
      })
  }, [router])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const updated = await submit(() =>
      api<SessionUser>('/auth/complete-profile', {
        method: 'PATCH',
        body: {
          firstName: formValue(form, 'firstName') || undefined,
          lastName: formValue(form, 'lastName') || undefined,
          phone: formValue(form, 'phone'),
          acceptDataPolicy: form.get('acceptDataPolicy') === 'on'
        }
      })
    )
    if (updated) router.replace(homeFor(updated))
  }

  if (!user) return null
  return (
    <AuthCard
      eyebrow="Un último paso"
      title="Completa tu perfil"
      subtitle="Necesitamos tu celular para coordinar tus citas y tu autorización para el tratamiento de datos."
    >
      <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
        <Field label="Nombre" htmlFor="firstName" error={errors['firstName']}>
          <Input id="firstName" name="firstName" defaultValue={user.patient?.firstName ?? ''} />
        </Field>
        <Field label="Apellido" htmlFor="lastName" error={errors['lastName']}>
          <Input id="lastName" name="lastName" defaultValue={user.patient?.lastName ?? ''} />
        </Field>
        <Field label="Celular" htmlFor="phone" error={errors['phone']} className="sm:col-span-2">
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            placeholder="300 000 0000"
          />
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
          {pending ? 'Guardando…' : 'Continuar a mi portal'}
        </Button>
      </form>
    </AuthCard>
  )
}
