import type { Metadata } from 'next'
import { EditorialPageHero } from '@/components/landing/EditorialPageHero'
import { LandingMotion } from '@/components/landing/LandingMotion'
import { ReferenceCarousel } from '@/components/landing/ReferenceCarousel'
import { FacialProcedures } from '@/components/landing/FacialProcedures'
import { ReferenceTechnology } from '@/components/landing/ReferenceLanding'
import { ValuationLink } from '@/components/landing/ValuationLink'
import { categoryLabels } from '@/content/site'
import { getProcedures } from '@/lib/public-data'
import type { ProcedureCategory } from '@/types/api'

export const metadata: Metadata = {
  title: 'Procedimientos',
  description:
    'Cirugía corporal, mamaria y facial: conoce los procedimientos del Dr. Yamith Cuello y agenda una valoración individual.'
}
const order: ProcedureCategory[] = ['CORPORAL', 'MAMARIO', 'FACIAL']

export default async function ProceduresPage() {
  const procedures = await getProcedures()
  return (
    <LandingMotion>
      <EditorialPageHero
        eyebrow="Cirugía plástica, estética y reconstructiva"
        title="Procedimientos"
        description="Explora las opciones de cirugía corporal, mamaria y facial. La elección de un procedimiento comienza con una valoración de tus características y expectativas."
        image="/images/valoracion-implantes.webp"
        alt="Valoración con el Dr. Yamith Cuello"
        location="procedimientos_hero"
      />
      {order.map((cat) => {
        const items = procedures.filter((p) => p.category === cat)
        if (!items.length) return null
        return (
          <section
            key={cat}
            className="reference-outcomes catalog-section"
            aria-labelledby={`cat-${cat}`}
          >
            <div className="reference-inner">
              <p className="reference-eyebrow">Procedimientos · {categoryLabels[cat]}</p>
              <h2 id={`cat-${cat}`}>Cirugía {categoryLabels[cat].toLowerCase()}</h2>
              {cat === 'FACIAL' ? (
                <FacialProcedures procedures={items} />
              ) : (
                <ReferenceCarousel procedures={items} results={[]} showSummary autoSlide />
              )}
            </div>
          </section>
        )
      })}
      {!procedures.length && (
        <section className="reference-methods">
          <div className="reference-inner">
            <h2>Consulta las opciones en tu valoración</h2>
            <p>
              El catálogo no está disponible en este momento. Nuestro equipo puede orientarte al
              agendar tu cita.
            </p>
          </div>
        </section>
      )}
      <section className="reference-methods diagonal-light">
        <div className="reference-inner">
          <h2>El primer paso es conocerte</h2>
          <p>
            Una valoración permite revisar tu historia clínica, conversar sobre tus expectativas y
            definir las opciones de atención.
          </p>
          <ValuationLink location="procedimientos_final" />
        </div>
      </section>
      <ReferenceTechnology />
    </LandingMotion>
  )
}
