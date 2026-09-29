import { PageHeader } from '@/components/app/ui'
import { DemoChat } from '@/components/chat/DemoChat'

export default function DemoPatientAssistant() {
  return (
    <>
      <PageHeader
        title="Asistente"
        subtitle="Resuelve tus dudas sobre tu procedimiento y tu recuperación, a cualquier hora."
      />
      <DemoChat
        messages={[
          { role: 'USER', content: '¿Cuánto tiempo debo usar la faja?' },
          {
            role: 'ASSISTANT',
            content:
              'Hola, Valentina. Vas en el **día 10** después de tu lipoescultura VASER. Lo habitual es:\n- **Primeras 4 a 6 semanas:** faja de día y de noche, retirándola sólo para bañarte.\n- **Semanas 6 a 8:** muchas pacientes pasan a usarla sólo de día.\n\nEl Dr. Cuello define el tiempo exacto para tu caso; confírmalo en tu control del lunes.'
          }
        ]}
      />
    </>
  )
}
