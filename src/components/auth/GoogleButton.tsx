'use client'

import Script from 'next/script'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { track } from '@/lib/analytics'
import { homeFor } from '@/lib/session'
import type { SessionUser } from '@/types/api'

type GoogleId = {
  accounts: {
    id: {
      initialize: (opts: {
        client_id: string
        callback: (r: { credential: string }) => void
        ux_mode?: string
      }) => void
      renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void
    }
  }
}

/**
 * "Continuar con Google" (Google Identity Services). Google entrega un ID token
 * que el backend verifica. Sin NEXT_PUBLIC_GOOGLE_CLIENT_ID no se muestra.
 */
export function GoogleButton({
  text = 'continue_with'
}: {
  text?: 'continue_with' | 'signup_with'
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const next = useSearchParams().get('next')
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  const onCredential = useCallback(
    async ({ credential }: { credential: string }) => {
      setError(null)
      try {
        const user = await api<SessionUser>('/auth/google', {
          method: 'POST',
          body: { credential }
        })
        track('login', { method: 'google' })
        router.replace(homeFor(user, next))
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'No pudimos iniciar sesión con Google.')
      }
    },
    [router, next]
  )

  useEffect(() => {
    const google = (window as unknown as { google?: GoogleId }).google
    if (!ready || !clientId || !google || !ref.current) return
    google.accounts.id.initialize({ client_id: clientId, callback: onCredential })
    google.accounts.id.renderButton(ref.current, {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      text,
      width: ref.current.offsetWidth || 360,
      locale: 'es'
    })
  }, [ready, clientId, onCredential, text])

  if (!clientId) return null
  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={ref} className="flex min-h-11 w-full justify-center" />
      {error ? (
        <Alert tone="error" className="mt-3">
          {error}
        </Alert>
      ) : null}
      <div className="my-6 flex items-center gap-4 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />o con tu correo
        <span className="h-px flex-1 bg-line" />
      </div>
    </div>
  )
}
