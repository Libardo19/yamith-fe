'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ProcedureForm } from '@/components/admin/ProcedureForm'
import { PageHeader, Panel } from '@/components/app/ui'
import { api } from '@/lib/api'

export default function NewProcedurePage() {
  const router = useRouter()
  return (
    <>
      <Link
        href="/admin/procedimientos"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver al catálogo
      </Link>
      <PageHeader title="Nuevo procedimiento" />
      <Panel>
        <ProcedureForm
          onSubmit={async (payload) => {
            await api('/admin/procedures', { method: 'POST', body: payload })
            router.push('/admin/procedimientos')
          }}
        />
      </Panel>
    </>
  )
}
