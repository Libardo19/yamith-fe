import type { Metadata } from 'next'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata: Metadata = { title: 'Términos y condiciones' }

export default function TermsPage() {
  return (
    <LegalPage title="Términos y condiciones" updated="septiembre de 2026">
      <h2>1. Información del sitio</h2>
      <p>
        El contenido de este sitio es informativo y educativo. No constituye diagnóstico,
        prescripción ni recomendación médica: cada caso requiere una valoración presencial o virtual
        con el especialista. Los resultados de los procedimientos varían entre pacientes.
      </p>

      <h2>2. Portal de pacientes</h2>
      <p>
        El portal es una herramienta de seguimiento y comunicación. No reemplaza la historia clínica
        oficial, que se gestiona según la normativa vigente. Eres responsable de mantener la
        confidencialidad de tu contraseña.
      </p>

      <h2>3. Citas</h2>
      <p>
        Las citas agendadas en línea quedan sujetas a confirmación del consultorio, que puede
        reprogramarlas por razones médicas u operativas. Te avisaremos siempre por correo.
      </p>

      <h2>4. Urgencias</h2>
      <p>
        El portal y el sitio no están diseñados para atender urgencias. Si presentas una
        complicación posoperatoria, comunícate de inmediato con el consultorio o acude al servicio
        de urgencias más cercano.
      </p>
    </LegalPage>
  )
}
