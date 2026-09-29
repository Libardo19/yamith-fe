'use client'

import { PageHeader } from '@/components/app/ui'
import { ChatPanel } from '@/components/chat/ChatPanel'

export default function StaffAssistantPage() {
  return (
    <>
      <PageHeader
        title="Asistente"
        subtitle="Consulta la agenda del día, las solicitudes pendientes o tiempos de recuperación. Para hablar de un paciente, ábrelo desde su ficha."
      />
      <ChatPanel
        endpoint="/admin/chat"
        className="h-[calc(100vh-15rem)] min-h-[28rem]"
        intro="Conozco la agenda de hoy, las solicitudes pendientes y el catálogo del consultorio."
        suggestions={[
          '¿Qué citas tenemos hoy?',
          '¿Qué solicitudes siguen sin responder?',
          'Tiempos habituales de recuperación de una abdominoplastia',
          'Redacta un mensaje de bienvenida para un paciente nuevo'
        ]}
        disclaimer="Apoyo para el equipo: verifica siempre la información clínica. La conversación queda registrada."
      />
    </>
  )
}
