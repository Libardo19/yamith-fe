import { PageHeader } from '@/components/app/ui'
import { DemoChat } from '@/components/chat/DemoChat'

export default function DemoStaffAssistant() {
  return (
    <>
      <PageHeader
        title="Asistente"
        subtitle="Agenda del día, solicitudes pendientes y apoyo con cada caso desde la ficha del paciente."
      />
      <DemoChat
        messages={[
          { role: 'USER', content: 'Resúmeme el caso de Valentina Ruiz' },
          {
            role: 'ASSISTANT',
            content:
              '**Valentina Ruiz** · Lipoescultura VASER + Retraction · Sede Pereira\n- Día 10 de posoperatorio, evolución adecuada.\n- Sesión Tensamax 1/6 con buena tolerancia.\n- Alergia registrada: **penicilina**.\n- Próximo control: lunes 9:00 a. m.\n\nEn el control conviene revisar edema, uso de la prenda y continuar las sesiones de Tensamax.'
          }
        ]}
      />
    </>
  )
}
