'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertTriangle, ArrowUp, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import { api, API_URL } from '@/lib/api'
import { cn } from '@/lib/cn'
import { MiniMarkdown } from './MiniMarkdown'

interface Message {
  id: string
  role: 'USER' | 'ASSISTANT'
  content: string
}

/**
 * Chat en tiempo real con el asistente (F7). Sólo vive en los dashboards:
 * - endpoint '/patient/chat': el paciente pregunta sobre SU procedimiento.
 * - endpoint '/admin/chat': el equipo pregunta; con `patientId` usa la ficha abierta.
 * La respuesta llega por SSE y se va pintando a medida que el modelo escribe.
 */
export function ChatPanel({
  endpoint,
  patientId,
  intro,
  suggestions,
  disclaimer,
  className
}: {
  endpoint: '/patient/chat' | '/admin/chat'
  patientId?: string
  intro: string
  suggestions: string[]
  disclaimer: string
  className?: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alarm, setAlarm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const query = patientId ? `?patientId=${patientId}` : ''

  useEffect(() => {
    let active = true
    api<{ messages: Message[] }>(`${endpoint}${query}`)
      .then((d) => active && setMessages(d.messages))
      .catch(() => undefined)
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [endpoint, query])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function send(text: string) {
    const message = text.trim()
    if (!message || streaming) return
    setInput('')
    setError(null)
    setStreaming(true)
    const replyId = `r-${Date.now()}`
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: 'USER', content: message },
      { id: replyId, role: 'ASSISTANT', content: '' }
    ])
    const append = (delta: string) =>
      setMessages((m) =>
        m.map((x) => (x.id === replyId ? { ...x, content: x.content + delta } : x))
      )

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, ...(patientId ? { patientId } : {}) })
      })
      if (!res.ok || !res.body) {
        const json = await res.json().catch(() => null)
        throw new Error(json?.message ?? 'No pudimos conectar con el asistente.')
      }
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
      let buffer = ''
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        let sep: number
        while ((sep = buffer.indexOf('\n\n')) >= 0) {
          const block = buffer.slice(0, sep)
          buffer = buffer.slice(sep + 2)
          const event = block.match(/^event: (.+)$/m)?.[1]
          const data = block.match(/^data: (.+)$/m)?.[1]
          if (!event || !data) continue
          const payload = JSON.parse(data)
          if (event === 'start' && payload.alarm) setAlarm(true)
          if (event === 'delta') append(payload.text)
          if (event === 'error') throw new Error(payload.message)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos conectar con el asistente.')
      setMessages((m) => m.filter((x) => !(x.id === replyId && !x.content)))
    } finally {
      setStreaming(false)
    }
  }

  async function reset() {
    await api(`${endpoint}/new`, { method: 'POST', body: patientId ? { patientId } : {} }).catch(
      () => undefined
    )
    setMessages([])
    setAlarm(false)
    setError(null)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(input)
  }

  return (
    <div className={cn('flex min-h-0 flex-col border border-line bg-white', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <Sparkles className="size-4" aria-hidden />
          </span>
          Asistente del consultorio
        </p>
        {messages.length ? (
          <button
            type="button"
            onClick={reset}
            disabled={streaming}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-navy-900"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Nueva conversación
          </button>
        ) : null}
      </div>

      {alarm ? (
        <div
          role="alert"
          className="flex gap-3 border-b border-danger/20 bg-danger/5 px-5 py-3 text-sm text-danger"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong>Si tienes un síntoma de alarma, no esperes:</strong> comunícate de inmediato con
            el consultorio o acude al servicio de urgencias más cercano.
          </p>
        </div>
      ) : null}

      <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {loading ? (
          <Loader2 className="mx-auto size-6 animate-spin text-gold-500" aria-label="Cargando" />
        ) : messages.length === 0 ? (
          <div className="mx-auto max-w-md py-6 text-center">
            <p className="font-serif text-2xl text-navy-900">¿En qué te ayudo?</p>
            <p className="mt-2 text-sm text-muted">{intro}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="border border-line px-3 py-2 text-left text-xs text-navy-800 transition-colors hover:border-gold-500 hover:bg-cream-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn('flex', m.role === 'USER' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] px-4 py-3 text-sm leading-relaxed',
                  m.role === 'USER'
                    ? 'bg-navy-900 text-white'
                    : 'border border-line bg-cream-50 text-ink'
                )}
              >
                {m.role === 'ASSISTANT' ? (
                  m.content ? (
                    <MiniMarkdown text={m.content} />
                  ) : (
                    <span className="inline-flex items-center gap-2 text-muted">
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Escribiendo…
                    </span>
                  )
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))
        )}
        {error ? <p className="text-center text-xs text-danger">{error}</p> : null}
      </div>

      <form onSubmit={onSubmit} className="border-t border-line p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send(input)
              }
            }}
            rows={1}
            maxLength={1000}
            placeholder="Escribe tu pregunta…"
            aria-label="Pregunta para el asistente"
            className="max-h-32 min-h-11 flex-1 resize-none border border-line px-3 py-2.5 text-sm outline-none focus:border-gold-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            aria-label="Enviar"
            className="inline-flex size-11 shrink-0 items-center justify-center bg-gold-500 text-white transition-colors hover:bg-gold-600 disabled:opacity-40"
          >
            {streaming ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </button>
        </div>
        <p className="mt-2 text-[11px] text-muted">{disclaimer}</p>
      </form>
    </div>
  )
}
