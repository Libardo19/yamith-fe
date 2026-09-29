'use client'

import { PageHeader } from '@/components/app/ui'
import { ChatPanel } from '@/components/chat/ChatPanel'

export default function PatientAssistantPage() {
  return (
    <>
      <PageHeader
        title="Asistente"
        subtitle="Resuelve tus dudas sobre tu procedimiento y tu recuperación, a cualquier hora."
      />
      <ChatPanel
        endpoint="/patient/chat"
        className="h-[calc(100vh-15rem)] min-h-[28rem]"
        intro="Conozco tu procedimiento y en qué etapa vas. Pregúntame sobre tu recuperación, tus cuidados o tus citas."
        suggestions={[
          '¿Cuánto dura mi recuperación?',
          '¿Cuándo puedo volver a hacer ejercicio?',
          '¿Cuánto tiempo debo usar la faja?',
          '¿Qué síntomas son de alarma?'
        ]}
        disclaimer="Asistente automático: orienta, pero no reemplaza al Dr. Cuello. Las indicaciones de tu médico siempre prevalecen. Ante una urgencia, comunícate con el consultorio o acude a urgencias."
      />
    </>
  )
}
