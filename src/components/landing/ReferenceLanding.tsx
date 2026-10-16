import Image from 'next/image'
import Link from 'next/link'
import { brand, doctor, differentiators, hero, technologies } from '@/content/site'
import type { GalleryItem, ProcedureCard } from '@/types/api'
import { ValuationLink } from './ValuationLink'
import { ReferenceCarousel } from './ReferenceCarousel'
import { TechnologyDisclosure } from './TechnologyDisclosure'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { findTechnique, isAbdominoplasty } from '@/content/techniques'

export function ReferenceIntro() {
  return (
    <section className="reference-intro">
      <div className="reference-inner intro-grid">
        <div className="intro-images">
          <figure data-reveal="image">
            <Image
              src="/images/quirofano-lampara.webp"
              alt="Dr. Yamith Cuello en quirófano"
              fill
              sizes="(min-width: 768px) 22vw, 44vw"
              className="object-cover"
            />
          </figure>
          <figure data-reveal="image">
            <Image
              src="/images/valoracion-implantes.webp"
              alt="Valoración de una paciente con el Dr. Yamith"
              fill
              sizes="(min-width: 768px) 22vw, 44vw"
              className="object-cover"
            />
          </figure>
        </div>
        <div data-reveal="text">
          <h2>
            Tu seguridad en
            <br />
            manos expertas
          </h2>
          <p>{hero.subtitle}</p>
          <p>{differentiators[0].text}</p>
          <div className="intro-facts">
            <div>
              <strong>Presencial</strong>
              <span>Valoración en consultorio</span>
            </div>
            <div>
              <strong>Virtual</strong>
              <span>Valoración a distancia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReferenceMethods() {
  return (
    <section id="enfoque" className="reference-methods diagonal-light">
      <div className="reference-inner">
        <h2>Un enfoque a tu medida</h2>
        <p>{doctor.philosophy}</p>
        <div className="method-strip">
          {differentiators.map((d) => (
            <span key={d.title}>{d.title}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ReferenceDoctor({ full = false }: { full?: boolean }) {
  return (
    <section id="doctor" className="reference-doctor">
      <div className="reference-inner doctor-grid">
        <figure data-reveal="image">
          <Image
            src="/images/doctor-suit-cutout.webp"
            alt="Dr. Yamith Cuello en su consultorio"
            fill
            sizes="(min-width: 768px) 44vw, 100vw"
            className="object-cover object-top"
          />
        </figure>
        <div data-reveal="text">
          <p className="reference-eyebrow">{doctor.eyebrow}</p>
          <h2>{doctor.title}</h2>
          {doctor.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="reference-signature">
            {brand.name}
            <small>{brand.tagline}</small>
          </div>
          {full ? (
            <ValuationLink location="doctor" />
          ) : (
            <Link href="/sobre-el-doctor" className="reference-outline">
              Conocer al Dr. Yamith
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/** Resultado destacado: efecto corset (técnica insignia) > cualquier abdominoplastia > el primero. */
export const pickFeatured = (results: GalleryItem[]) =>
  results.find((r) => r.technique === 'efecto-corset') ??
  results.find((r) => isAbdominoplasty(r.procedure?.slug)) ??
  results[0] ??
  null

/**
 * Sección insignia con el antes y después en una sola card. Sólo existe si hay
 * resultados publicados con consentimiento: nunca se muestran fotos de relleno.
 */
export function ReferenceSignature({ featured }: { featured: GalleryItem | null }) {
  if (!featured) return null
  const procedure = featured.procedure?.name ?? 'Resultado destacado'
  const signature = findTechnique(featured.technique)
  return (
    <section className="reference-featured" aria-labelledby="signature-title">
      <div className="reference-inner signature-grid">
        <div className="signature-copy" data-reveal="text">
          <p className="reference-eyebrow">
            {signature?.key === 'efecto-corset'
              ? 'Técnica insignia'
              : signature
                ? 'Técnica del Dr. Yamith'
                : 'Resultado destacado'}
          </p>
          <h2 id="signature-title">{signature?.title ?? procedure}</h2>
          {signature ? <p>{signature.text}</p> : null}
          {featured.description ? <p>{featured.description}</p> : null}
          <p className="signature-name">Dr. Yamith Cuello</p>
          <p className="signature-role">Cirujano plástico, estético y reconstructivo</p>
          <ValuationLink location="resultado-destacado" />
        </div>
        <figure className="signature-figure" data-reveal="image">
          <BeforeAfterSlider
            before={featured.beforeImageUrl}
            after={featured.afterImageUrl}
            label={signature?.title ?? procedure}
          />
          <figcaption>
            Arrastra la línea para comparar. Publicado con autorización de la paciente; los
            resultados varían en cada persona.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export function ReferenceOutcomes({
  procedures,
  results
}: {
  procedures: ProcedureCard[]
  results: GalleryItem[]
}) {
  return (
    <section id="procedimientos" className="reference-outcomes">
      <div className="reference-inner">
        <h2>
          {results.length ? 'Resultados de nuestros procedimientos' : 'Procedimientos principales'}
        </h2>
        <p>
          {results.length
            ? 'Resultados publicados con autorización de cada paciente.'
            : 'Conoce las opciones de nuestro catálogo y consulta el plan adecuado para ti en tu valoración.'}
        </p>
        <ReferenceCarousel
          procedures={procedures
            .filter(
              (procedure) =>
                !['retraccion-de-piel', 'recuperacion-posoperatoria'].includes(procedure.slug)
            )
            .map((procedure) =>
              procedure.slug === 'lipoescultura-vaser'
                ? { ...procedure, imageUrl: '/images/quirofano-lampara.webp' }
                : procedure
            )}
          results={results}
          autoSlide
        />
        <ValuationLink location="resultados" />
      </div>
    </section>
  )
}

export function ReferenceAuthority() {
  const confirmed = doctor.credentials.filter((c) => !c.pending)
  return (
    <section className="reference-authority diagonal-light">
      <div className="reference-inner">
        <h2>{confirmed.length ? 'Formación y respaldo profesional' : 'Atención en Colombia'}</h2>
        <div className="authority-strip">
          {confirmed.length
            ? confirmed.map((c) => (
                <div key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </div>
              ))
            : brand.cities.map((city) => (
                <div key={city}>
                  <strong>{city}</strong>
                  <span>Dr. Yamith Cuello</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export function ReferenceFaq({
  items,
  procedureName
}: {
  items: Array<{ question: string; answer: string }>
  procedureName?: string
}) {
  return (
    <section className="reference-faq diagonal-dark">
      <div className="reference-inner faq-grid">
        <figure data-reveal="image">
          <Image
            src="/images/doctor-scrubs-cutout.webp"
            alt="Dr. Yamith Cuello en su clínica"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
          />
        </figure>
        <div className="faq-editorial" data-reveal="text">
          <h2>Preguntas frecuentes</h2>
          <p>
            Una decisión informada comienza por resolver tus dudas. Consulta información sobre tu
            valoración{procedureName ? ' y ' + procedureName : ''}; en consulta podrás revisar las
            recomendaciones para tu caso.
          </p>
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span aria-hidden>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
          <div className="final-copy">
            <ValuationLink location="faq" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReferenceTechnology() {
  return (
    <section id="tecnologia" className="reference-technology">
      <div className="reference-inner">
        <p>Con tecnología para cada etapa de tu proceso</p>
        <div className="technology-strip">
          {technologies.map((t) => (
            <TechnologyDisclosure
              key={t.name}
              name={t.name}
              kind={t.kind}
              text={t.text}
              image={t.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
