import { PageHeader, Panel } from '@/components/app/ui'

export default function DemoAccountPage() {
  return (
    <>
      <PageHeader title="Mi cuenta" subtitle="Contraseña y correo de acceso al panel." />
      <Panel>
        <p className="text-sm text-muted">
          Aquí el equipo cambia su contraseña y su correo. Cada cambio se confirma y se avisa por
          correo.
        </p>
      </Panel>
    </>
  )
}
