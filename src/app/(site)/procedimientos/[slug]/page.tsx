import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { ContactSection } from '@/components/landing/ContactSection'
import { Process } from '@/components/landing/Process'
import { ButtonLink } from '@/components/ui/Button'
import { categoryLabels } from '@/content/site'
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
    <>
      <section className="bg-cream-50">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">Cirugía {categoryLabels[procedure.category].toLowerCase()}</p>
            <h1 className="mt-4 text-5xl leading-tight sm:text-6xl">{procedure.name}</h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
              {procedure.summary}
            </p>
            <ButtonLink href="#agendar" className="mt-9">
              Agendar valoración
            </ButtonLink>
          </div>
          {procedure.imageUrl ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-200 shadow-2xl shadow-navy-900/10">
              <Image
                src={procedure.imageUrl}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl">Sobre el procedimiento</h2>
            <span className="mt-5 block h-px w-12 bg-gold-500" />
            {procedure.content.split('\n\n').map((para) => (
              <p key={para.slice(0, 24)} className="mt-5 leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
          {procedure.benefits.length ? (
            <aside className="self-start border border-line bg-cream-50 p-8">
              <h2 className="text-xl">Beneficios principales</h2>
              <ul className="mt-6 space-y-4">
                {procedure.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-navy-800">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>

      <Process />

      {procedure.faq.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-page max-w-3xl">
            <h2 className="text-center text-3xl">Preguntas frecuentes</h2>
            <span className="mx-auto mt-5 block h-px w-12 bg-gold-500" />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {procedure.faq.map((f) => (
                <details key={f.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-navy-900">
                    {f.question}
                    <span
                      className="text-2xl text-gold-500 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactSection sedes={sedes} procedures={procedures} defaultProcedure={procedure.slug} />
    </>
  )
}
