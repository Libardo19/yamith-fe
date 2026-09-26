'use client'

import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { useSession } from '@/lib/session'
import { AppShell } from './AppShell'

/** AppShell con el usuario de la sesión real. Mientras carga, un indicador centrado. */
export function SessionShell({
  area,
  children
}: {
  area: 'admin' | 'portal'
  children: ReactNode
}) {
  const { user, logout } = useSession()
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100">
        <Loader2 className="size-8 animate-spin text-gold-500" aria-label="Cargando" />
      </div>
    )
  }
  return (
    <AppShell
      area={area}
      base={area === 'admin' ? '/admin' : '/portal'}
      user={{ name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl }}
      onLogout={logout}
    >
      {children}
    </AppShell>
  )
}

export function LoadingBlock() {
  return (
    <div className="flex justify-center py-16">
      <Loader2 className="size-7 animate-spin text-gold-500" aria-label="Cargando" />
    </div>
  )
}
