import { LeadsTable } from '@/components/admin/LeadsTable'
import { PageHeader, Panel } from '@/components/app/ui'
import { demoLeads } from '@/lib/demo-data'

export default function DemoLeadsPage() {
  return (
    <>
      <PageHeader
        title="Solicitudes"
        subtitle="Personas que pidieron valoración desde la web. Cada una también llega al correo del doctor."
      />
      <Panel bodyClassName="p-0">
        <LeadsTable rows={demoLeads} />
      </Panel>
    </>
  )
}
