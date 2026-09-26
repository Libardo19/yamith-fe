'use client'

import { AccountSecurity } from '@/components/app/AccountSecurity'
import { PageHeader, Panel } from '@/components/app/ui'
import { useSession } from '@/lib/session'

export default function PortalProfilePage() {
  const { user } = useSession()
  if (!user) return null
  const rows: Array<[string, string]> = [
    ['Nombre', user.name],
    ['Correo', user.email],
    ['Celular', user.patient?.phone ?? '—'],
    ['Acceso con Google', user.hasGoogle ? 'Vinculado' : 'No vinculado']
  ]
  return (
    <>
      <PageHeader title="Mi perfil" subtitle="Tus datos y la seguridad de tu cuenta." />
      <div className="space-y-6">
        <Panel title="Datos personales">
          <dl className="divide-y divide-line text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted">
            Para corregir tus datos personales, comunícate con el consultorio.
          </p>
        </Panel>
        <AccountSecurity />
      </div>
    </>
  )
}
