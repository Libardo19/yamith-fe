'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, ApiError } from './api'

/** GET al API desde el cliente, con estado de carga/error y recarga manual. `path` null = no pedir. */
export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(Boolean(path))
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!path) return
    let active = true
    api<T>(path)
      .then((d) => {
        if (!active) return
        setData(d)
        setError(null)
      })
      .catch((err) => {
        if (active)
          setError(err instanceof ApiError ? err.message : 'No pudimos cargar la información.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [path, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { data, error, loading, reload, setData }
}
