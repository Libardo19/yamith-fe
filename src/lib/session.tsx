'use client'

import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { SessionUser } from '@/types/api'
import { api, ApiError } from './api'

/** A dónde va cada usuario después de entrar. */
export function homeFor(user: SessionUser, next?: string | null): string {
  if (user.needsProfile) return '/completar-perfil'
  const area = user.role === 'PATIENT' ? '/portal' : '/admin'
  return next && next.startsWith(area) ? next : area
}

interface SessionState {
  user: SessionUser | null
  loading: boolean
  refresh: () => Promise<SessionUser | null>
  setUser: (user: SessionUser | null) => void
  logout: () => Promise<void>
}

const SessionContext = createContext<SessionState | null>(null)

/**
 * Sesión en el cliente: /auth/me al montar. Si el API dice 401 (cookie vencida o
 * revocada) se manda al login. `require` restringe por rol.
 */
export function SessionProvider({
  children,
  require
}: {
  children: ReactNode
  require?: 'PATIENT' | 'STAFF'
}) {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(
    () =>
      api<SessionUser>('/auth/me').catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 401 && require) {
          router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}`)
        }
        return null
      }),
    [require, router]
  )

  const refresh = useCallback(async () => {
    const me = await load()
    setUser(me)
    return me
  }, [load])

  useEffect(() => {
    let active = true
    void load().then((me) => {
      if (!active) return
      setUser(me)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [load])

  // Rol equivocado para el área: se redirige a la suya.
  useEffect(() => {
    if (!user || !require) return
    const isStaff = user.role === 'ADMIN' || user.role === 'STAFF'
    if (require === 'PATIENT' && isStaff) router.replace('/admin')
    else if (require === 'STAFF' && !isStaff) router.replace('/portal')
    else if (user.needsProfile) router.replace('/completar-perfil')
  }, [user, require, router])

  const logout = useCallback(async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => undefined)
    setUser(null)
    router.replace('/login')
  }, [router])

  return (
    <SessionContext.Provider value={{ user, loading, refresh, setUser, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession debe usarse dentro de <SessionProvider>')
  return ctx
}
