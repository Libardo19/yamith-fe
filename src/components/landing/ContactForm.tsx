'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { track } from '@/lib/analytics'
import type { ProcedureCard, Sede } from '@/types/api'

type Errors = Record<string, string | undefined>

/** Formulario de agendamiento visible (no popup). POST /public/leads → correo al doctor. */
export function ContactForm({
  sedes,
  procedures,
  defaultProcedure
}: {
  sedes: Sede[]
  procedures: ProcedureCard[]
  defaultProcedure?: string
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const value = (k: string) => (form.get(k) as string | null) ?? ''
    setErrors({})
    setFormError(null)
    setStatus('sending')
    try {
      await api('/public/leads', {
        method: 'POST',
        body: {
          name: value('name'),
          phone: value('phone'),
          email: value('email') || undefined,
          sede: value('sede') || undefined,
          procedure: value('procedure') || undefined,
          modality: value('modality') || undefined,
          message: value('message') || undefined,
          acceptDataPolicy: form.get('acceptDataPolicy') === 'on',
          website: value('website')
        }
      })
      track('lead_submit', { sede: value('sede'), procedimiento: value('procedure') })
      setStatus('sent')
    } catch (err) {
      setStatus('idle')
      if (err instanceof ApiError && err.details) {
        setErrors(Object.fromEntries(Object.entries(err.details).map(([k, v]) => [k, v[0]])))
      } else {
        setFormError(
          err instanceof ApiError
            ? err.message
            : 'No pudimos enviar tu solicitud. Inténtalo de nuevo.'
        )
      }
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="size-12 text-gold-500" aria-hidden />
        <h3 className="mt-5 text-2xl">¡Gracias! Recibimos tu solicitud</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Te contactaremos muy pronto por WhatsApp o correo para coordinar tu valoración.
        </p>
        <Link
          href="/registro"
          className="mt-6 text-sm font-semibold text-gold-700 underline underline-offset-4"
        >
          Crea tu cuenta en el portal de pacientes
        </Link>
      </div>
    )
  }

  const err = (k: string) => errors[k]
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field label="Nombre completo" htmlFor="name" error={err('name')} className="sm:col-span-2">
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Tu nombre"
          aria-invalid={!!err('name')}
        />
      </Field>
      <Field label="Celular / WhatsApp" htmlFor="phone" error={err('phone')}>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder="300 000 0000"
          aria-invalid={!!err('phone')}
        />
      </Field>
      <Field label="Correo electrónico" htmlFor="email" error={err('email')} hint="Opcional">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          aria-invalid={!!err('email')}
        />
      </Field>
      <Field label="Sede de interés" htmlFor="sede" error={err('sede')}>
        <Select id="sede" name="sede" defaultValue="">
          <option value="">Selecciona una sede</option>
          {sedes.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.city}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Procedimiento de interés" htmlFor="procedure" error={err('procedure')}>
        <Select id="procedure" name="procedure" defaultValue={defaultProcedure ?? ''}>
          <option value="">Aún no lo sé</option>
          {procedures.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase">
          Tipo de valoración
        </legend>
        <div className="mt-3 flex gap-6 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="modality"
              value="PRESENCIAL"
              defaultChecked
              className="accent-gold-600"
            />{' '}
            Presencial
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="modality" value="VIRTUAL" className="accent-gold-600" />{' '}
            Virtual
          </label>
        </div>
      </fieldset>
      <Field
        label="Mensaje"
        htmlFor="message"
        error={err('message')}
        hint="Opcional"
        className="sm:col-span-2"
      >
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Cuéntanos qué te gustaría mejorar"
        />
      </Field>

      {/* Honeypot: invisible para personas */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Checkbox
        name="acceptDataPolicy"
        className="sm:col-span-2"
        error={err('acceptDataPolicy')}
        label={
          <>
            Autorizo el tratamiento de mis datos personales según la{' '}
            <Link
              href="/privacidad"
              className="text-gold-700 underline underline-offset-2"
              target="_blank"
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

      <Button type="submit" disabled={status === 'sending'} className="w-full sm:col-span-2">
        {status === 'sending' ? 'Enviando…' : 'Solicitar valoración'}
      </Button>
    </form>
  )
}
