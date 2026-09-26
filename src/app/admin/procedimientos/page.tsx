'use client'

import { Plus } from 'lucide-react'
import { ProceduresGrid } from '@/components/admin/ProceduresGrid'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { AdminProcedure } from '@/types/api'

export default function AdminProceduresPage() {
  const { data, error } = useApi<AdminProcedure[]>('/admin/procedures')
  return (
    <>
      <PageHeader
        title="Procedimientos"
        subtitle="Catálogo de la web. Los cambios se ven en el sitio en unos minutos."
        actions={
          <ButtonLink href="/admin/procedimientos/nuevo" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo procedimiento
          </ButtonLink>
        }
      />
      {error ? (
        <Alert tone="error">{error}</Alert>
      ) : data ? (
        <ProceduresGrid items={data} editHref={(p) => `/admin/procedimientos/${p.id}`} />
      ) : (
        <LoadingBlock />
      )}
    </>
  )
}
