import { SectionHeading } from '@/components/ui/Section'
import { processSteps } from '@/content/site'

export function Process({ recovery = false }: { recovery?: boolean }) {
  const steps = recovery
    ? [
        {
          title: 'Control médico',
          text: 'Revisión de las heridas, los síntomas y la evolución después del procedimiento.'
        },
        {
          title: 'Cuidados personalizados',
          text: 'Indicaciones sobre actividad, medicación y terapias complementarias cuando corresponden.'
        },
        {
          title: 'Seguimiento',
          text: 'Controles para adaptar los cuidados y evaluar el regreso a tus actividades.'
        }
      ]
    : processSteps
  return (
    <section className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow={recovery ? 'Tu seguimiento' : 'Tu proceso'}
          title="Un camino claro, de principio a fin"
          text="Valoración, planificación y seguimiento: una atención organizada según tus antecedentes, el procedimiento y tu evolución."
        />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span
            className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-gold-300 md:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative mx-auto flex size-12 items-center justify-center border border-gold-500 bg-cream-100 font-serif text-lg text-navy-900">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
