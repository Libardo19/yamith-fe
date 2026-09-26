'use client'

import { useState } from 'react'
import { LeadsTable } from '@/components/admin/LeadsTable'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel } from '@/components/app/ui'
import { Alert } from '@/components/ui/Form'
import { api } from '@/lib/api'
import { useApi } from '@/lib/use-api'
import type { Lead, LeadStatus, Paginated } from '@/types/api'

export default function LeadsPage() {
  const [status, setStatus] = useState('')
  const { data, error, setData } = useApi<Paginated<Lead>>(
    `/admin/leads?limit=50${status ? `&status=${status}` : ''}`
  )

  async function changeStatus(id: string, next: LeadStatus) {
    await api(`/admin/leads/${id}`, { method: 'PATCH', body: { status: next } })
    setData((d) =>
      d ? { ...d, items: d.items.map((l) => (l.id === id ? { ...l, status: next } : l)) } : d
    )
  }

  return (
    <>
      <PageHeader
        title="Solicitudes"
        subtitle="Personas que pidieron valoración desde la web. Cada una también llega al correo del doctor."
        actions={
          <select
            aria-label="Filtrar por estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-line bg-white px-3 py-2.5 text-sm"
          >
            <option value="">Todas</option>
            <option value="NUEVO">Nuevas</option>
            <option value="CONTACTADO">Contactadas</option>
            <option value="CONVERTIDO">Convertidas</option>
            <option value="DESCARTADO">Descartadas</option>
          </select>
        }
      />
      <Panel bodyClassName="p-0">
        {error ? (
          <Alert tone="error" className="m-4">
            {error}
          </Alert>
        ) : !data ? (
          <LoadingBlock />
        ) : data.items.length ? (
          <LeadsTable rows={data.items} onStatusChange={changeStatus} />
        ) : (
          <EmptyState
            title="Sin solicitudes"
            text="Cuando alguien llene el formulario de la web aparecerá aquí (y en tu correo)."
          />
        )}
      </Panel>
    </>
  )
}
