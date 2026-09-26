import type { Metadata } from 'next'
import { LegalPage } from '@/components/layout/LegalPage'

export const metadata: Metadata = { title: 'Política de tratamiento de datos' }

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de tratamiento de datos personales" updated="septiembre de 2026">
      <p>
        En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, esta política explica cómo
        recolectamos, usamos y protegemos los datos personales de pacientes y personas interesadas
        en nuestros servicios.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        Dr. Yamith Cuello — Cirugía Plástica, Estética y Reconstructiva. Documento, dirección y
        teléfono del responsable: <em>pendientes de completar</em>. Correo de contacto para asuntos
        de datos personales: <em>pendiente de completar</em>.
      </p>

      <h2>2. Datos que tratamos</h2>
      <ul>
        <li>Datos de identificación y contacto: nombre, documento, correo, celular.</li>
        <li>
          Datos sensibles relacionados con tu salud: procedimientos, evolución, fotografías clínicas
          y documentos médicos. Su suministro es facultativo y sólo se tratan con tu autorización
          expresa.
        </li>
        <li>Datos de navegación del sitio (analítica anónima) para mejorar el servicio.</li>
      </ul>

      <h2>3. Finalidades</h2>
      <ul>
        <li>Agendar y gestionar valoraciones, citas y procedimientos.</li>
        <li>Hacer el seguimiento de tu proceso a través del portal de pacientes.</li>
        <li>Enviarte por correo confirmaciones, recordatorios y avisos de tu cuenta.</li>
        <li>Enviarte encuestas de satisfacción sobre la atención recibida.</li>
      </ul>

      <h2>4. Fotografías clínicas</h2>
      <p>
        Las fotografías de tu proceso se guardan en un almacenamiento privado y sólo son visibles
        para ti y para el equipo médico. Nunca se publican sin una autorización escrita adicional y
        específica.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, revocar la
        autorización y presentar quejas ante la Superintendencia de Industria y Comercio. Para
        ejercerlos, escríbenos al correo del responsable indicando tu solicitud.
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y administrativas para proteger tu información: conexiones
        cifradas, contraseñas protegidas, acceso restringido por roles y registro de accesos a la
        información de pacientes.
      </p>
    </LegalPage>
  )
}
