import { PageHeader, Panel } from '@/components/app/ui'
import { demoFicha as f } from '@/lib/demo-data'

export default function DemoProfilePage() {
  const rows: Array<[string, string]> = [
    ['Nombre', `${f.firstName} ${f.lastName}`],
    ['Correo', f.email],
    ['Celular', f.phone],
    ['Sede', f.sede]
  ]
  return (
    <>
      <PageHeader title="Mi perfil" subtitle="Tus datos de contacto y la seguridad de tu cuenta." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Datos personales">
          <dl className="divide-y divide-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="Seguridad">
          <p className="text-sm text-muted">
            Cambia tu contraseña o tu correo. Siempre te avisaremos por correo cuando haya un cambio
            en tu cuenta.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-gold-700">
            <span>Cambiar contraseña →</span>
            <span>Cambiar correo →</span>
          </div>
        </Panel>
      </div>
    </>
  )
}
