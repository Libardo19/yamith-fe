/**
 * Cliente del API (yamith-be). Siempre con `credentials: 'include'` para que viaje
 * la cookie de sesión httpOnly. Las respuestas siguen el formato de utils/response.ts del backend.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api'

export interface ApiSuccess<T> {
  success: true
  message: string
  data: T
}

export interface ApiFailure {
  success: false
  message: string
  code?: string
  details?: Record<string, string[]>
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

export async function api<T>(path: string, { body, headers, ...init }: RequestOptions = {}) {
  const isForm = body instanceof FormData
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(body !== undefined && !isForm ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body)
  })

  const json = (await res.json().catch(() => null)) as ApiSuccess<T> | ApiFailure | null

  if (!res.ok || !json || !json.success) {
    const failure = json && !json.success ? json : null
    throw new ApiError(
      failure?.message ?? `Error ${res.status}`,
      res.status,
      failure?.code,
      failure?.details
    )
  }

  return json.data
}
