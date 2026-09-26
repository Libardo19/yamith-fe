import type { Metadata } from 'next'
import { ProcedureCard } from '@/components/landing/ProcedureCard'
import { SectionHeading } from '@/components/ui/Section'
import { categoryLabels } from '@/content/site'
import { getProcedures } from '@/lib/public-data'
import type { ProcedureCategory } from '@/types/api'

export const metadata: Metadata = {
  title: 'Procedimientos',
  description:
    'Cirugía corporal, mamaria y facial: lipoescultura VASER, abdominoplastia, aumento mamario, mastopexia, rinoplastia y más.'
}

const order: ProcedureCategory[] = ['CORPORAL', 'MAMARIO', 'FACIAL']

export default async function ProceduresPage() {
  const procedures = await getProcedures()
  return (
    <>
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Especialidades"
            title="Procedimientos"
            text="Cada procedimiento se diseña a tu medida después de una valoración. Explora las opciones por tipo de cirugía."
          />
        </div>
      </section>
      <div className="bg-white py-16 sm:py-20">
        <div className="container-page space-y-16">
          {order.map((cat) => {
            const items = procedures.filter((p) => p.category === cat)
            if (!items.length) return null
            return (
              <section key={cat} aria-labelledby={`cat-${cat}`}>
                <div className="flex items-baseline justify-between border-b border-line pb-4">
                  <h2 id={`cat-${cat}`} className="text-3xl">
                    Cirugía {categoryLabels[cat].toLowerCase()}
                  </h2>
                  <span className="text-sm text-muted">{items.length} procedimientos</span>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProcedureCard key={p.slug} procedure={p} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
