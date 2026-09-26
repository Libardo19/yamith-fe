import { Plus } from 'lucide-react'
import { OverviewView } from '@/components/admin/OverviewView'
import { PageHeader } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { demoOverview } from '@/lib/demo-data'

export default function DemoAdminHome() {
  return (
    <>
      <PageHeader
        title="Vista general"
        subtitle="Bienvenido, Dr. Cuello. Este es el estado de sus tres sedes hoy."
        actions={
          <ButtonLink href="/demo/admin/pacientes" className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo paciente
          </ButtonLink>
        }
      />
      <OverviewView data={demoOverview} base="/demo/admin" />
    </>
  )
}
