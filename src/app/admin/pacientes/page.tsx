'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { PatientsTable } from '@/components/admin/PatientsTable'
import { LoadingBlock } from '@/components/app/SessionShell'
import { EmptyState, PageHeader, Panel } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Form'
import { useApi } from '@/lib/use-api'
import type { Paginated, PatientRow, Sede } from '@/types/api'

export default function PatientsPage() {
  const [q, setQ] = useState('')
  const [search, setSearch] = useState('')
  const [sedeId, setSedeId] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const qs = new URLSearchParams({ page: String(page), limit: '20' })
  if (search) qs.set('q', search)
  if (sedeId) qs.set('sedeId', sedeId)
  if (status) qs.set('status', status)

  const { data, error, loading } = useApi<Paginated<PatientRow>>(`/admin/patients?${qs}`)
  const { data: sedes } = useApi<Sede[]>('/admin/sedes')

  return (
    <>
      <PageHeader
        title="Pacientes"
        subtitle="Busca, filtra por sede y abre la ficha de cada paciente."
        actions={
          <ButtonLink href="/admin/pacientes/nuevo" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo paciente
          </ButtonLink>
        }
      />
      <Panel bodyClassName="p-0">
        <form
          className="flex flex-col gap-3 border-b border-line p-4 lg:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            setPage(1)
            setSearch(q.trim())
          }}
        >
          <label className="flex flex-1 items-center gap-2 border border-line px-3">
            <Search className="size-4 text-muted" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full py-2.5 text-sm outline-none"
              placeholder="Buscar por nombre, correo, documento o celular"
              aria-label="Buscar pacientes"
            />
          </label>
          <select
            aria-label="Sede"
            className="border border-line bg-white px-3 py-2.5 text-sm"
            value={sedeId}
            onChange={(e) => {
              setPage(1)
              setSedeId(e.target.value)
            }}
          >
            <option value="">Todas las sedes</option>
            {sedes?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.city}
              </option>
            ))}
          </select>
          <select
            aria-label="Estado de la cuenta"
            className="border border-line bg-white px-3 py-2.5 text-sm"
            value={status}
            onChange={(e) => {
              setPage(1)
              setStatus(e.target.value)
            }}
          >
            <option value="">Todas las cuentas</option>
            <option value="active">Activas</option>
            <option value="pending">Pendientes</option>
            <option value="inactive">Inactivas</option>
          </select>
        </form>

        {error ? (
          <Alert tone="error" className="m-4">
            {error}
          </Alert>
        ) : !data && loading ? (
          <LoadingBlock />
        ) : data && data.items.length ? (
          <>
            <PatientsTable rows={data.items} base="/admin" />
            <div className="flex items-center justify-between px-4 py-3 text-xs text-muted">
              <span>
                {data.total} paciente{data.total === 1 ? '' : 's'} · página {data.page} de{' '}
                {Math.max(data.totalPages, 1)}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="border border-line px-3 py-1.5 disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border border-line px-3 py-1.5 disabled:opacity-40"
                >
                  Siguiente
                </button>
              </span>
            </div>
          </>
        ) : (
          <EmptyState
            title={search || sedeId || status ? 'Sin resultados' : 'Aún no hay pacientes'}
            text={
              search || sedeId || status
                ? 'Prueba con otra búsqueda o quita los filtros.'
                : 'Los pacientes que se registren en la web o que crees aquí aparecerán en esta lista.'
            }
          />
        )}
      </Panel>
    </>
  )
}
