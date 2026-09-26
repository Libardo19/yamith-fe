import { Plus } from 'lucide-react'
import { Avatar } from '@/components/app/AppShell'
import { PageHeader, Panel, table } from '@/components/app/ui'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const team = [
  {
    name: 'Dr. Yamith Cuello',
    email: 'dryamit.evolutionplastic@gmail.com',
    role: 'Administrador',
    active: true
  },
  { name: 'Coordinadora Pereira', email: 'pereira@correo.com', role: 'Equipo', active: true },
  {
    name: 'Coordinadora Barranquilla',
    email: 'barranquilla@correo.com',
    role: 'Equipo',
    active: false
  }
]

export default function DemoTeamPage() {
  return (
    <>
      <PageHeader
        title="Equipo"
        subtitle="Personas con acceso al panel. Cada una recibe una invitación por correo para crear su contraseña."
        actions={
          <Button className="px-5 py-2.5">
            <Plus className="size-4" aria-hidden /> Invitar
          </Button>
        }
      />
      <Panel bodyClassName="p-0">
        <div className={table.wrap}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Persona</th>
                <th className={table.th}>Rol</th>
                <th className={table.th}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {team.map((t) => (
                <tr key={t.email} className={table.row}>
                  <td className={table.td}>
                    <span className="flex items-center gap-3">
                      <Avatar name={t.name} size="sm" />
                      <span>
                        <span className="block font-semibold text-navy-900">{t.name}</span>
                        <span className="text-xs text-muted">{t.email}</span>
                      </span>
                    </span>
                  </td>
                  <td className={`${table.td} text-navy-800`}>{t.role}</td>
                  <td className={table.td}>
                    {t.active ? (
                      <Badge tone="success">Activo</Badge>
                    ) : (
                      <Badge tone="gold">Invitación enviada</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
