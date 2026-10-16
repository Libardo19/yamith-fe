import { Sparkles, X } from 'lucide-react'
import { MiniMarkdown } from './MiniMarkdown'

/** Conversación de ejemplo para los borradores (/demo). No llama al API. */
const SAMPLE = {
  portal: [
    { role: 'USER' as const, content: '¿Cuánto tiempo debo usar la faja?' },
    {
      role: 'ASSISTANT' as const,
      content:
        'Hola, Valentina. Vas en el **día 10** después de tu lipoescultura VASER. Lo habitual es:\n- **Primeras 4 a 6 semanas:** faja de día y de noche, retirándola sólo para bañarte.\n- **Semanas 6 a 8:** muchas pacientes pasan a usarla sólo de día.\n\nEl Dr. Cuello define el tiempo exacto para tu caso; confírmalo en tu control del lunes.'
    }
  ],
  admin: [
    { role: 'USER' as const, content: 'Resúmeme el caso de Valentina Ruiz' },
    {
      role: 'ASSISTANT' as const,
      content:
        '**Valentina Ruiz** · Lipoescultura VASER + Retraction · Sede Pereira\n- Día 10 de posoperatorio, evolución adecuada.\n- Sesión Tensamax 1/6 con buena tolerancia.\n- Alergia registrada: **penicilina**.\n- Próximo control: lunes 9:00 a. m.'
    }
  ]
}

export function DemoChat({ area, onClose }: { area: 'admin' | 'portal'; onClose: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 bg-navy-900 px-4 py-3 text-white">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-gold-500">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">Asistente del consultorio</p>
          <p className="text-[11px] text-white/60">Borrador: conversación de ejemplo</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="inline-flex size-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto bg-cream-50 px-4 py-4">
        {SAMPLE[area].map((m, i) => (
          <div key={i} className={m.role === 'USER' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={
                m.role === 'USER'
                  ? 'max-w-[88%] rounded-2xl rounded-br-sm bg-navy-900 px-3.5 py-2.5 text-sm text-white'
                  : 'max-w-[88%] rounded-2xl rounded-bl-sm border border-line bg-white px-3.5 py-2.5 text-sm leading-relaxed'
              }
            >
              {m.role === 'ASSISTANT' ? <MiniMarkdown text={m.content} /> : m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-xs text-muted">
        Escribe tu pregunta… (borrador sin conexión)
      </div>
    </div>
  )
}
