'use client'

import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { ChatPanel } from './ChatPanel'
import { useChatSubject } from './chat-subject'
import { DemoChat } from './DemoChat'

const COPY = {
  portal: {
    intro:
      'Conozco tu procedimiento y en qué etapa vas. Pregúntame sobre tu recuperación, tus cuidados o tus citas.',
    suggestions: [
      '¿Cuánto dura mi recuperación?',
      '¿Cuándo puedo volver a hacer ejercicio?',
      '¿Cuánto tiempo debo usar la faja?',
      '¿Qué síntomas son de alarma?'
    ],
    disclaimer:
      'Asistente automático: orienta, pero no reemplaza al Dr. Cuello; sus indicaciones prevalecen. Ante una urgencia, llama al consultorio o ve a urgencias.'
  },
  staff: {
    intro:
      'Conozco la agenda de hoy y las solicitudes pendientes. Abre la ficha de un paciente para hablar de su caso.',
    suggestions: [
      '¿Qué citas tenemos hoy?',
      '¿Qué solicitudes siguen sin responder?',
      'Tiempos habituales de recuperación de una abdominoplastia'
    ],
    patientSuggestions: [
      'Resúmeme el caso',
      '¿Qué revisar en su próximo control?',
      'Redacta un mensaje con sus cuidados de esta semana'
    ],
    disclaimer:
      'Apoyo para el equipo: verifica siempre la información clínica. La conversación queda registrada.'
  }
}

/**
 * Chatbot flotante de los dashboards (F7): botón redondo en la esquina inferior
 * derecha que despliega el chat.
 * - Celular: ocupa toda la pantalla (100dvh, respeta teclado y barra del sistema)
 *   y bloquea el scroll de la página de atrás.
 * - Computador: ventana flotante de 400 px sobre la página.
 */
export function ChatWidget({ area, demo = false }: { area: 'admin' | 'portal'; demo?: boolean }) {
  const [open, setOpen] = useState(false)
  const subject = useChatSubject()

  // Esc cierra; en celular se bloquea el scroll de la página mientras el chat está abierto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const mobile = window.matchMedia('(max-width: 639px)').matches
    const previous = document.body.style.overflow
    if (mobile) document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const staff = area === 'admin'
  const copy = staff ? COPY.staff : COPY.portal
  const patientId = staff ? subject?.patientId : undefined

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Asistente del consultorio"
          className={cn(
            'fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl shadow-navy-950/30',
            // Celular: pantalla completa
            'inset-0 h-[100dvh]',
            // Computador: ventana flotante sobre el botón
            'sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-line'
          )}
        >
          {demo ? (
            <DemoChat area={area} onClose={() => setOpen(false)} />
          ) : (
            <ChatPanel
              key={patientId ?? 'general'}
              endpoint={staff ? '/admin/chat' : '/patient/chat'}
              patientId={patientId}
              subtitle={
                staff
                  ? subject
                    ? `Paciente: ${subject.name}`
                    : 'Agenda y solicitudes del día'
                  : 'Sobre tu procedimiento'
              }
              intro={
                staff && subject
                  ? `Estoy viendo la ficha de ${subject.name}. Pregúntame sobre su caso.`
                  : copy.intro
              }
              suggestions={staff && subject ? COPY.staff.patientSuggestions : copy.suggestions}
              disclaimer={copy.disclaimer}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Cerrar el asistente' : 'Abrir el asistente'}
        className={cn(
          'fixed right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-gold-500 text-white shadow-lg shadow-navy-950/25 transition hover:scale-105 hover:bg-gold-600 sm:right-6 sm:bottom-6',
          'bottom-[max(1rem,env(safe-area-inset-bottom))]',
          // En celular el chat abierto cubre la pantalla: el botón se oculta (se cierra con la X).
          open && 'max-sm:hidden'
        )}
      >
        {open ? <X className="size-6" /> : <Sparkles className="size-6" />}
        {!open && staff && subject ? (
          <span
            className="absolute -top-1 -right-1 size-4 rounded-full border-2 border-white bg-navy-900"
            aria-hidden
          />
        ) : null}
      </button>
    </>
  )
}
