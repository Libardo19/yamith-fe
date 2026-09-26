'use client'

import { AccountSecurity } from '@/components/app/AccountSecurity'
import { PageHeader } from '@/components/app/ui'

export default function AdminAccountPage() {
  return (
    <>
      <PageHeader title="Mi cuenta" subtitle="Contraseña y correo de acceso al panel." />
      <AccountSecurity />
    </>
  )
}
