import { Sparkles } from 'lucide-react'
import { MiniMarkdown } from './MiniMarkdown'

/** Conversación de ejemplo para los borradores (/demo). No llama al API. */
export function DemoChat({
  messages
}: {
  messages: Array<{ role: 'USER' | 'ASSISTANT'; content: string }>
}) {
  return (
    <div className="flex flex-col border border-line bg-white">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3 text-sm font-semibold text-navy-900">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <Sparkles className="size-4" aria-hidden />
        </span>
        Asistente del consultorio
      </div>
      <div className="space-y-4 px-5 py-5">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'USER' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={
                m.role === 'USER'
                  ? 'max-w-[85%] bg-navy-900 px-4 py-3 text-sm text-white'
                  : 'max-w-[85%] border border-line bg-cream-50 px-4 py-3 text-sm leading-relaxed'
              }
            >
              {m.role === 'ASSISTANT' ? <MiniMarkdown text={m.content} /> : m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line p-3 text-xs text-muted">
        Escribe tu pregunta… (borrador: sin conexión al asistente)
      </div>
    </div>
  )
}
