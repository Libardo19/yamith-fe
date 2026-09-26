'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { homeFor } from '@/lib/session'
import type { SessionUser } from '@/types/api'
import { AuthCard } from './AuthCard'

/**
 * Consume un enlace de correo que no pide datos (confirmar correo, confirmar
 * cambio de correo): llama al API al abrir la página y abre la sesión.
 */
export function TokenConfirm({
  token,
  endpoint,
  successTitle
}: {
  token: string
  endpoint: '/auth/verify-email' | '/auth/email-change/confirm'
  successTitle: string
}) {
  const router = useRouter()
  const [state, setState] = useState<{
    status: 'loading' | 'ok' | 'error'
    message?: string
    user?: SessionUser
  }>({
    status: 'loading'
  })
  const done = useRef(false)

  useEffect(() => {
    // En desarrollo React monta dos veces: el token es de un solo uso.
    if (done.current) return
    done.current = true
    api<SessionUser>(endpoint, { method: 'POST', body: { token } })
      .then((user) => {
        setState({ status: 'ok', user })
        setTimeout(() => router.replace(homeFor(user)), 2500)
      })
      .catch((err) =>
        setState({
          status: 'error',
          message: err instanceof ApiError ? err.message : 'No pudimos validar el enlace.'
        })
      )
  }, [endpoint, token, router])

  if (state.status === 'loading') {
    return (
      <AuthCard title="Validando tu enlace…">
        <Loader2 className="size-8 animate-spin text-gold-500" aria-label="Cargando" />
      </AuthCard>
    )
  }

  if (state.status === 'error') {
    return (
      <AuthCard
        title="El enlace no es válido"
        footer={
          <Link href="/login" className="font-semibold text-gold-700 hover:underline">
            Ir a iniciar sesión
          </Link>
        }
      >
        <div className="flex gap-4 border border-danger/20 bg-white p-6">
          <XCircle className="size-7 shrink-0 text-danger" aria-hidden />
          <p className="text-sm leading-relaxed text-muted">
            {state.message} Desde la pantalla de inicio de sesión puedes pedir un enlace nuevo.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard title={successTitle}>
      <div className="flex gap-4 border border-line bg-white p-6">
        <CheckCircle2 className="size-7 shrink-0 text-success" aria-hidden />
        <p className="text-sm leading-relaxed text-muted">Te llevamos a tu portal en un momento…</p>
      </div>
    </AuthCard>
  )
}
