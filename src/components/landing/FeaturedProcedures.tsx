import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/Section'
import type { ProcedureCard as Procedure } from '@/types/api'
import { ProcedureCard } from './ProcedureCard'

export function FeaturedProcedures({ procedures }: { procedures: Procedure[] }) {
  const featured = procedures.filter((p) => p.isFeatured).slice(0, 5)
  const [main, ...rest] = featured.length ? featured : procedures.slice(0, 5)
  if (!main) return null

  return (
    <section id="procedimientos" className="bg-cream-50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Especialidades"
          title="Procedimientos destacados"
          text="Opciones diseñadas para realzar tu belleza natural con la máxima seguridad y precisión quirúrgica."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <ProcedureCard procedure={main} size="lg" className="lg:col-span-2 lg:row-span-2" />
          {rest.slice(0, 2).map((p) => (
            <ProcedureCard key={p.slug} procedure={p} />
          ))}
        </div>
        {rest.length > 2 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.slice(2).map((p) => (
              <ProcedureCard key={p.slug} procedure={p} />
            ))}
          </div>
        ) : null}
        <div className="mt-12 text-center">
          <ButtonLink href="/procedimientos" variant="outline">
            Ver todos los procedimientos
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
