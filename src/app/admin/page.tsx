'use client'

import { Plus } from 'lucide-react'
import { OverviewView } from '@/components/admin/OverviewView'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import { useSession } from '@/lib/session'
import type { Overview } from '@/types/api'

export default function AdminHome() {
  const { user } = useSession()
  const { data, error } = useApi<Overview>('/admin/stats/overview')
  return (
    <>
      <PageHeader
        title="Vista general"
        subtitle={`Hola, ${user?.name.replace(/^Dr\.?\s+/i, '').split(' ')[0] ?? ''}. Este es el estado de las sedes hoy.`}
        actions={
          <ButtonLink href="/admin/pacientes/nuevo" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo paciente
          </ButtonLink>
        }
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : data ? (
        <OverviewView data={data} base="/admin" />
      ) : (
        <LoadingBlock />
      )}
    </>
  )
}
