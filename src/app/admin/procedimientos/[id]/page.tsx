'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { ProcedureForm } from '@/components/admin/ProcedureForm'
import { LoadingBlock } from '@/components/app/SessionShell'
import { PageHeader, Panel } from '@/components/app/ui'
import { Alert } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import { useSession } from '@/lib/session'
import type { AdminProcedure } from '@/types/api'

export default function EditProcedurePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user } = useSession()
  const { data, error } = useApi<AdminProcedure>(`/admin/procedures/${id}`)
  const [notice, setNotice] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)

  if (error) return <Alert tone="error">{error}</Alert>
  if (!data) return <LoadingBlock />

  return (
    <>
      <Link
        href="/admin/procedimientos"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver al catálogo
      </Link>
      <PageHeader
        title={data.name}
        actions={
          data.isPublished ? (
            <a
              href={`/procedimientos/${data.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:underline"
            >
              Ver en la web <ExternalLink className="size-4" aria-hidden />
            </a>
          ) : null
        }
      />
      {notice ? (
        <Alert tone={notice.tone} className="mb-6">
          {notice.text}
        </Alert>
      ) : null}
      <Panel>
        <ProcedureForm
          initial={data}
          onSubmit={async (payload) => {
            await api(`/admin/procedures/${data.id}`, { method: 'PATCH', body: payload })
            setNotice({ tone: 'success', text: 'Cambios guardados.' })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          footer={
            user?.role === 'ADMIN' ? (
              <button
                type="button"
                className="ml-auto text-xs font-semibold text-danger hover:underline"
                onClick={async () => {
                  if (
                    !window.confirm(
                      `¿Eliminar "${data.name}" del catálogo? Esta acción no se puede deshacer.`
                    )
                  )
                    return
                  try {
                    await api(`/admin/procedures/${data.id}`, { method: 'DELETE' })
                    router.push('/admin/procedimientos')
                  } catch (err) {
                    setNotice({
                      tone: 'error',
                      text: err instanceof ApiError ? err.message : 'No se pudo eliminar.'
                    })
                  }
                }}
              >
                Eliminar procedimiento
              </button>
            ) : null
          }
        />
      </Panel>
    </>
  )
}
