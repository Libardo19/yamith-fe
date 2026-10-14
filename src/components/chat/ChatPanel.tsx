'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AlertTriangle, ArrowUp, Loader2, RotateCcw, Sparkles, X } from 'lucide-react'
import { api, API_URL } from '@/lib/api'
import { cn } from '@/lib/cn'
import { MiniMarkdown } from './MiniMarkdown'

interface Message {
  id: string
  role: 'USER' | 'ASSISTANT'
  content: string
}

/**
 * Conversación en tiempo real con el asistente (F7). Vive dentro del ChatWidget:
 * - endpoint '/patient/chat': el paciente pregunta sobre SU procedimiento.
 * - endpoint '/admin/chat': el equipo pregunta; con `patientId` usa la ficha abierta.
 * La respuesta llega por SSE y se pinta a medida que el modelo escribe.
 */
export function ChatPanel({
  endpoint,
  patientId,
  subtitle,
  intro,
  suggestions,
  disclaimer,
  onClose
}: {
  endpoint: '/patient/chat' | '/admin/chat'
  patientId?: string | undefined
  subtitle?: string | undefined
  intro: string
  suggestions: string[]
  disclaimer: string
  onClose?: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alarm, setAlarm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
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

  // El textarea crece con el texto hasta 4 líneas.
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

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
    <div className="flex h-full min-h-0 flex-col bg-white">
      {/* Cabecera */}
      <div className="flex shrink-0 items-center gap-3 bg-navy-900 px-4 py-3 text-white">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Asistente del consultorio</p>
          <p className="truncate text-[11px] text-white/60">{subtitle ?? 'En línea'}</p>
        </div>
        {messages.length ? (
          <button
            type="button"
            onClick={reset}
            disabled={streaming}
            className="inline-flex size-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Nueva conversación"
            title="Nueva conversación"
          >
            <RotateCcw className="size-4" />
          </button>
        ) : null}
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Cerrar el asistente"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>

      {alarm ? (
        <div
          role="alert"
          className="flex shrink-0 gap-3 border-b border-danger/20 bg-danger/5 px-4 py-3 text-[13px] text-danger"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong>Si tienes un síntoma de alarma, no esperes:</strong> comunícate de inmediato con
            el consultorio o acude a urgencias.
          </p>
        </div>
      ) : null}

      {/* Mensajes */}
      <div
        ref={scroller}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-cream-50 px-4 py-4"
        aria-live="polite"
      >
        {loading ? (
          <Loader2
            className="mx-auto mt-6 size-6 animate-spin text-gold-500"
            aria-label="Cargando"
          />
        ) : messages.length === 0 ? (
          <div className="py-4 text-center">
            <p className="font-serif text-2xl text-navy-900">¿En qué te ayudo?</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{intro}</p>
            <div className="mt-5 flex flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-line bg-white px-4 py-2.5 text-left text-sm text-navy-800 transition-colors hover:border-gold-500"
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
                  'max-w-[88%] px-3.5 py-2.5 text-sm leading-relaxed break-words',
                  m.role === 'USER'
                    ? 'rounded-2xl rounded-br-sm bg-navy-900 text-white'
                    : 'rounded-2xl rounded-bl-sm border border-line bg-white text-ink'
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

      {/* Entrada: 16px en celular para que iOS no haga zoom; margen para la barra del sistema */}
      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-line bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
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
            enterKeyHint="send"
            className="max-h-[120px] min-h-11 flex-1 resize-none rounded-2xl border border-line px-4 py-2.5 text-base outline-none focus:border-gold-500 sm:text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            aria-label="Enviar"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white transition-colors hover:bg-gold-600 disabled:opacity-40"
          >
            {streaming ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </button>
        </div>
        <p className="mt-2 text-[10px] leading-snug text-muted">{disclaimer}</p>
      </form>
    </div>
  )
}
