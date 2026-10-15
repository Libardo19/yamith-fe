import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ContactSection } from '@/components/landing/ContactSection'
import { Process } from '@/components/landing/Process'
import { ProcedureArticle } from '@/components/landing/ProcedureArticle'
import { LandingMotion } from '@/components/landing/LandingMotion'
import { ReferenceFaq, ReferenceTechnology } from '@/components/landing/ReferenceLanding'
import { ProcedureJsonLd } from '@/components/seo/JsonLd'
import { ButtonLink } from '@/components/ui/Button'
import { categoryLabels } from '@/content/site'
import { technologyImage } from '@/content/technology-images'
import { getProcedure, getProcedures, getSedes } from '@/lib/public-data'

export async function generateStaticParams() {
  return (await getProcedures()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  props: PageProps<'/procedimientos/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const p = await getProcedure(slug)
  if (!p) return {}
  return {
    title: p.seoTitle ?? p.name,
    description: p.seoDescription ?? p.summary,
    alternates: { canonical: `/procedimientos/${p.slug}` },
    openGraph: p.imageUrl ? { images: [p.imageUrl] } : null
  }
}

export default async function ProcedurePage(props: PageProps<'/procedimientos/[slug]'>) {
  const { slug } = await props.params
  const [procedure, procedures, sedes] = await Promise.all([
    getProcedure(slug),
    getProcedures(),
    getSedes()
  ])
  if (!procedure) notFound()

  return (
    <LandingMotion>
      <ProcedureJsonLd procedure={procedure} />
      <section className="procedure-detail-hero bg-navy-950 text-cream-50">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow text-gold-300">
              {procedure.slug === 'recuperacion-posoperatoria'
                ? 'Seguimiento posoperatorio'
                : procedure.slug === 'retraccion-de-piel'
                  ? 'Tecnología de contorno corporal'
                  : 'Cirugía ' + categoryLabels[procedure.category].toLowerCase()}
            </p>
            <h1 className="mt-4 text-5xl leading-tight sm:text-6xl">{procedure.name}</h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-cream-200">
              {procedure.summary}
            </p>
            <ButtonLink href="#agendar" className="mt-9">
              Agendar valoración
            </ButtonLink>
          </div>
          {procedure.imageUrl ? (
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-900">
              <Image
                src={technologyImage(procedure.imageUrl)}
                alt={procedure.name}
                fill
                preload
                sizes="(min-width: 1024px) 45vw, 90vw"
                className={
                  technologyImage(procedure.imageUrl).includes('-studio.')
                    ? 'object-contain p-8'
                    : 'object-cover'
                }
              />
            </div>
          ) : null}
        </div>
      </section>

      <ProcedureArticle procedure={procedure} />

      <Process recovery={procedure.slug === 'recuperacion-posoperatoria'} />

      {procedure.faq.length ? (
        <ReferenceFaq items={procedure.faq} procedureName={procedure.name} />
      ) : null}
      <ReferenceTechnology />

      <ContactSection sedes={sedes} procedures={procedures} defaultProcedure={procedure.slug} />
    </LandingMotion>
  )
}
