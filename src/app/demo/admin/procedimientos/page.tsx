import { Plus } from 'lucide-react'
import { ProceduresGrid } from '@/components/admin/ProceduresGrid'
import { PageHeader } from '@/components/app/ui'
import { Button } from '@/components/ui/Button'
import { fallbackProcedures } from '@/content/procedures'

export default function DemoProceduresPage() {
  return (
    <>
      <PageHeader
        title="Procedimientos"
        subtitle="Catálogo editable: lo que se publique aquí aparece en la web."
        actions={
          <Button className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Nuevo procedimiento
          </Button>
        }
      />
      <ProceduresGrid items={fallbackProcedures} editHref={null} />
    </>
  )
}
