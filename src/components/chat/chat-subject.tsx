'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Paciente "abierto" en el panel. La ficha del paciente lo registra con
 * <ChatSubject/> y el ChatWidget lo usa como contexto de la conversación.
 */
export interface Subject {
  patientId: string
  name: string
}

const Ctx = createContext<{ subject: Subject | null; setSubject: (s: Subject | null) => void }>({
  subject: null,
  setSubject: () => undefined
})

export function ChatSubjectProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Subject | null>(null)
  return <Ctx.Provider value={{ subject, setSubject }}>{children}</Ctx.Provider>
}

export const useChatSubject = () => useContext(Ctx).subject

/** Mientras esté montado, el asistente del panel habla de este paciente. */
export function ChatSubject({ patientId, name }: Subject) {
  const { setSubject } = useContext(Ctx)
  useEffect(() => {
    setSubject({ patientId, name })
    return () => setSubject(null)
  }, [patientId, name, setSubject])
  return null
}
