import type { ProcedureCard, Sede } from '@/types/api'
import { ContactForm } from './ContactForm'
import { SedeCard } from './SedeCard'

/** Bloque principal de agendamiento: texto + sedes en azul noche, formulario en blanco. */
export function ContactSection({
  sedes,
  procedures,
  defaultProcedure
}: {
  sedes: Sede[]
  procedures: ProcedureCard[]
  defaultProcedure?: string
}) {
  return (
    <section id="agendar" className="scroll-mt-20 bg-navy-900">
      <div className="container-page grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-gold-300">Comienza tu viaje</p>
          <h2 className="mt-3 text-4xl leading-tight text-white sm:text-5xl">
            Agenda tu <br className="hidden sm:block" />
            valoración hoy.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-white/65">
            Da el primer paso hacia tu mejor versión. Déjanos tus datos y nuestro equipo te
            contactará para coordinar fecha, sede y modalidad, o escríbenos directo por WhatsApp.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {sedes.map((s) => (
              <SedeCard key={s.id} sede={s} tone="dark" />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 shadow-2xl shadow-black/30 sm:p-10">
          <h3 className="text-3xl">Agenda tu cita</h3>
          <p className="mt-2 mb-8 text-sm text-muted">Te responderemos lo antes posible.</p>
          <ContactForm
            sedes={sedes}
            procedures={procedures}
            {...(defaultProcedure ? { defaultProcedure } : {})}
          />
        </div>
      </div>
    </section>
  )
}
