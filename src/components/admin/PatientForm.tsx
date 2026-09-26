'use client'

import type { FormEvent, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { PatientDetail, Sede } from '@/types/api'

export type PatientPayload = Record<string, string | boolean | null | undefined>

/** Formulario de datos del paciente (crear y editar). */
export function PatientForm({
  sedes,
  initial,
  mode,
  onSubmit,
  footer
}: {
  sedes: Sede[]
  initial?: PatientDetail
  mode: 'create' | 'edit'
  onSubmit: (payload: PatientPayload) => Promise<unknown>
  footer?: ReactNode
}) {
  const { errors, formError, pending, submit } = useApiForm()
  const e = (k: string) => errors[k]

  async function handle(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    const opt = (k: string) => formValue(f, k) || null
    const payload: PatientPayload = {
      firstName: formValue(f, 'firstName'),
      lastName: formValue(f, 'lastName'),
      phone: formValue(f, 'phone'),
      documentType: opt('documentType'),
      documentNumber: opt('documentNumber'),
      birthDate: opt('birthDate'),
      bloodType: opt('bloodType'),
      allergies: opt('allergies'),
      notes: opt('notes'),
      sedeId: opt('sedeId'),
      ...(mode === 'create'
        ? { email: formValue(f, 'email'), sendInvite: f.get('sendInvite') === 'on' }
        : {})
    }
    await submit(() => onSubmit(payload))
  }

  return (
    <form onSubmit={handle} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field label="Nombres" htmlFor="firstName" error={e('firstName')}>
        <Input id="firstName" name="firstName" defaultValue={initial?.firstName} required />
      </Field>
      <Field label="Apellidos" htmlFor="lastName" error={e('lastName')}>
        <Input id="lastName" name="lastName" defaultValue={initial?.lastName} required />
      </Field>
      {mode === 'create' ? (
        <Field label="Correo" htmlFor="email" error={e('email')}>
          <Input id="email" name="email" type="email" required />
        </Field>
      ) : null}
      <Field label="Celular" htmlFor="phone" error={e('phone')}>
        <Input id="phone" name="phone" type="tel" defaultValue={initial?.phone ?? ''} required />
      </Field>
      <Field label="Tipo de documento" htmlFor="documentType" error={e('documentType')}>
        <Select id="documentType" name="documentType" defaultValue={initial?.documentType ?? 'CC'}>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="PA">Pasaporte</option>
          <option value="TI">Tarjeta de identidad</option>
        </Select>
      </Field>
      <Field label="Número de documento" htmlFor="documentNumber" error={e('documentNumber')}>
        <Input
          id="documentNumber"
          name="documentNumber"
          defaultValue={initial?.documentNumber ?? ''}
        />
      </Field>
      <Field label="Fecha de nacimiento" htmlFor="birthDate" error={e('birthDate')}>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          defaultValue={initial?.birthDate?.slice(0, 10) ?? ''}
        />
      </Field>
      <Field label="Sede" htmlFor="sedeId" error={e('sedeId')}>
        <Select id="sedeId" name="sedeId" defaultValue={initial?.sedeId ?? ''}>
          <option value="">Sin sede</option>
          {sedes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.city}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Tipo de sangre" htmlFor="bloodType" error={e('bloodType')}>
        <Input
          id="bloodType"
          name="bloodType"
          defaultValue={initial?.bloodType ?? ''}
          placeholder="O+"
        />
      </Field>
      <Field label="Alergias" htmlFor="allergies" error={e('allergies')} className="sm:col-span-2">
        <Input
          id="allergies"
          name="allergies"
          defaultValue={initial?.allergies ?? ''}
          placeholder="Ninguna conocida"
        />
      </Field>
      <Field
        label="Notas internas"
        htmlFor="notes"
        error={e('notes')}
        hint="Sólo las ve el equipo."
        className="sm:col-span-2"
      >
        <Textarea id="notes" name="notes" rows={3} defaultValue={initial?.notes ?? ''} />
      </Field>
      {mode === 'create' ? (
        <Checkbox
          name="sendInvite"
          defaultChecked
          className="sm:col-span-2"
          label="Enviar la invitación por correo para que cree su contraseña y entre a su portal."
        />
      ) : null}
      {formError ? (
        <Alert tone="error" className="sm:col-span-2">
          {formError}
        </Alert>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? 'Guardando…' : mode === 'create' ? 'Crear paciente' : 'Guardar cambios'}
        </Button>
        {footer}
      </div>
    </form>
  )
}
