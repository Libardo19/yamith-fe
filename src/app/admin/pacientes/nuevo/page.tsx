'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PatientForm } from '@/components/admin/PatientForm'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader, Panel } from '@/components/app/ui'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import type { Sede } from '@/types/api'

export default function NewPatientPage() {
  const router = useRouter()
  const { data: sedes } = useApi<Sede[]>('/admin/sedes')
  return (
    <>
      <Link
        href="/admin/pacientes"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver a pacientes
      </Link>
      <PageHeader
        title="Nuevo paciente"
        subtitle="Para pacientes que llegan directo al consultorio. Recibirá un correo para crear su contraseña."
      />
      <Panel className="max-w-3xl">
        {sedes ? (
          <PatientForm
            mode="create"
            sedes={sedes}
            onSubmit={async (payload) => {
              const created = await api<{ id: string }>('/admin/patients', {
                method: 'POST',
                body: payload
              })
              router.push(`/admin/pacientes/${created.id}`)
            }}
          />
        ) : (
          <LoadingBlock />
        )}
      </Panel>
    </>
  )
}
