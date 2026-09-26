import { SectionHeading } from '@/components/ui/Section'
import { processSteps } from '@/content/site'

export function Process() {
  return (
    <section className="bg-cream-100 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tu proceso"
          title="Un camino claro, de principio a fin"
          text="Un abordaje estructurado y personalizado para garantizar los mejores resultados y tu máxima seguridad."
        />
        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span
            className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-gold-300 md:block"
            aria-hidden
          />
          {processSteps.map((s, i) => (
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
