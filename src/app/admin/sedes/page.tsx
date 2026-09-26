'use client'

import { useState, type FormEvent } from 'react'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader, Panel } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Input } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { Sede } from '@/types/api'

function SedeForm({ sede }: { sede: Sede }) {
  const { errors, formError, pending, submit } = useApiForm()
  const [ok, setOk] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOk(false)
    const f = new FormData(e.currentTarget)
    const saved = await submit(() =>
      api(`/admin/sedes/${sede.id}`, {
        method: 'PATCH',
        body: {
          address: formValue(f, 'address'),
          whatsapp: formValue(f, 'whatsapp'),
          phone: formValue(f, 'phone') || null,
          mapUrl: formValue(f, 'mapUrl') || null
        }
      }).then(() => true)
    )
    if (saved) setOk(true)
  }

  const id = (k: string) => `${sede.slug}-${k}`
  return (
    <Panel title={sede.name}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field label="Dirección" htmlFor={id('address')} error={errors['address']}>
          <Input id={id('address')} name="address" defaultValue={sede.address} />
        </Field>
        <Field
          label="WhatsApp"
          htmlFor={id('whatsapp')}
          error={errors['whatsapp']}
          hint="Con indicativo, sólo números: 573001234567"
        >
          <Input
            id={id('whatsapp')}
            name="whatsapp"
            inputMode="numeric"
            defaultValue={/^570+$/.test(sede.whatsapp) ? '' : sede.whatsapp}
          />
        </Field>
        <Field label="Teléfono fijo" htmlFor={id('phone')} error={errors['phone']}>
          <Input id={id('phone')} name="phone" defaultValue={sede.phone ?? ''} />
        </Field>
        <Field label="Enlace de Google Maps" htmlFor={id('mapUrl')} error={errors['mapUrl']}>
          <Input id={id('mapUrl')} name="mapUrl" defaultValue={sede.mapUrl ?? ''} />
        </Field>
        {formError ? <Alert tone="error">{formError}</Alert> : null}
        {ok ? (
          <Alert tone="success">Sede actualizada. La web la mostrará en unos minutos.</Alert>
        ) : null}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? 'Guardando…' : 'Guardar'}
        </Button>
      </form>
    </Panel>
  )
}

export default function SedesPage() {
  const { data, error } = useApi<Sede[]>('/admin/sedes')
  return (
    <>
      <PageHeader
        title="Sedes"
        subtitle="Dirección y WhatsApp de cada sede, tal como aparecen en la web."
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : data ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {data.map((s) => (
            <SedeForm key={s.id} sede={s} />
          ))}
        </div>
      ) : (
        <LoadingBlock />
      )}
    </>
  )
}
