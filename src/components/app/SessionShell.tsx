'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Loader2, WifiOff } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
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
  const { user, logout, loading, error, refresh } = useSession()
  if (!loading && !user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-10">
        <div className="w-full max-w-md border border-line bg-white px-6 py-10 text-center sm:px-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <span className="mx-auto mt-8 flex size-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <WifiOff className="size-5" aria-hidden />
          </span>
          <p role="alert" className="mt-4 font-serif text-2xl text-navy-900">
            {error ?? 'Tu sesión no está disponible.'}
          </p>
          <p className="mt-2 text-sm text-muted">
            Revisa tu conexión a internet. Si el problema continúa, inicia sesión de nuevo.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button type="button" onClick={() => void refresh()}>
              Volver a intentar
            </Button>
            <Link href="/login" className="text-sm font-semibold text-navy-900 hover:underline">
              Ir al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
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
      {error && (
        <p
          role="alert"
          className="mb-6 border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
        >
          {error}
        </p>
      )}
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
