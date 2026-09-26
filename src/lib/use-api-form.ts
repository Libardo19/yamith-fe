'use client'

import { useState } from 'react'
import { ApiError } from './api'

/**
 * Estado común de los formularios que llaman al API: errores por campo (422 del
 * backend), error general, mensaje de éxito y "enviando".
 */
export function useApiForm() {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function submit<T>(fn: () => Promise<T>): Promise<T | undefined> {
    setErrors({})
    setFormError(null)
    setErrorCode(null)
    setPending(true)
    try {
      return await fn()
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorCode(err.code ?? null)
        if (err.details) {
          setErrors(Object.fromEntries(Object.entries(err.details).map(([k, v]) => [k, v[0]])))
        }
        // 422 = errores por campo (ya se muestran junto a cada campo).
        if (!err.details || err.status !== 422) setFormError(err.message)
      } else {
        setFormError('No pudimos conectarnos. Revisa tu conexión e inténtalo de nuevo.')
      }
      return undefined
    } finally {
      setPending(false)
    }
  }

  return { errors, formError, errorCode, pending, submit, setFormError }
}

export const formValue = (form: FormData, key: string) =>
  ((form.get(key) as string | null) ?? '').trim()
