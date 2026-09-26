import { Plus, Search } from 'lucide-react'
import { PatientsTable } from '@/components/admin/PatientsTable'
import { PageHeader, Panel } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { demoPatients } from '@/lib/demo-data'

export default function DemoPatientsPage() {
  return (
    <>
      <PageHeader
        title="Pacientes"
        subtitle="Gestiona las fichas, procedimientos y citas de tus pacientes."
        actions={
          <ButtonLink href="/demo/admin/pacientes/p1" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo paciente
          </ButtonLink>
        }
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row">
          <label className="flex flex-1 items-center gap-2 border border-line px-3">
            <Search className="size-4 text-muted" aria-hidden />
            <input
              className="w-full py-2.5 text-sm outline-none"
              placeholder="Buscar por nombre, correo, documento o celular"
            />
          </label>
          <select className="border border-line bg-white px-3 py-2.5 text-sm" defaultValue="">
            <option value="">Todas las sedes</option>
            <option>Pereira</option>
            <option>Barranquilla</option>
            <option>Valledupar</option>
          </select>
        </div>
        <PatientsTable rows={demoPatients} base="/demo/admin" />
        <div className="flex items-center justify-between px-4 py-3 text-xs text-muted">
          <span>Mostrando 1–8 de 128 pacientes</span>
          <span className="flex gap-1">
            <span className="bg-navy-900 px-2.5 py-1 font-semibold text-white">1</span>
            <span className="px-2.5 py-1">2</span>
            <span className="px-2.5 py-1">3</span>
            <span className="px-2.5 py-1">…</span>
          </span>
        </div>
      </Panel>
    </>
  )
}
