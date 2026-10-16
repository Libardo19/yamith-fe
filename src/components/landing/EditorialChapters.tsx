import Image from 'next/image'
import Link from 'next/link'
import { brand, doctor, differentiators, processSteps, technologies } from '@/content/site'
import { ValuationLink } from './ValuationLink'
export function DoctorEditorial() {
  const credentials = doctor.credentials.filter((c) => !c.pending)
  return (
    <>
      <section id="doctor" className="editorial-section doctor-editorial">
        <div className="doctor-portrait" data-reveal="image">
          <Image
            src={doctor.image}
            alt="Dr. Yamith Cuello con uniforme médico en su clínica"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="doctor-copy" data-reveal="text">
          <p className="eyebrow">Conoce al especialista</p>
          <h2>
            Arte y ciencia.
            <br />
            <em>Una mirada humana.</em>
          </h2>
          {doctor.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link className="editorial-link" href="/sobre-el-doctor">
            La filosofía del Dr. Yamith ↗
          </Link>
          <div className="doctor-signature">
            Dr. Yamith Cuello <small>{brand.tagline}</small>
          </div>
        </div>
      </section>
      {credentials.length > 0 && (
        <section className="editorial-section authority-editorial">
          <p className="eyebrow">Formación y respaldo profesional</p>
          {credentials.map((c) => (
            <div key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </section>
      )}
    </>
  )
}
export function ApproachEditorial() {
  return (
    <section className="editorial-section approach-editorial">
      <div data-reveal="text">
        <p className="eyebrow">Nuestro enfoque</p>
        <h2>
          No hay dos historias iguales.
          <br />
          <em>Tu plan tampoco.</em>
        </h2>
      </div>
      <div className="approach-principles">
        {differentiators
          .filter((d) => d.icon !== 'cpu')
          .map((d, i) => (
            <article key={d.title} data-reveal="text">
              <span className="editorial-number">0{i + 1}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </article>
          ))}
      </div>
    </section>
  )
}
const journeyImages = [
  '/images/valoracion-tablet.webp',
  '/images/quirofano-oscuro.webp',
  '/images/tec-hiperbarica.webp'
]
const journeyAlts = [
  'Consulta del Dr. Yamith con una paciente',
  'Dr. Yamith Cuello durante la atención en quirófano',
  'Acompañamiento durante la recuperación en la clínica'
]
export function CareJourney() {
  return (
    <section className="care-journey" data-journey data-active="0">
      <div className="journey-sticky">
        <div className="journey-heading">
          <p className="eyebrow">Contigo, en cada etapa</p>
          <h2>
            Una decisión.
            <br />
            <em>Todo un acompañamiento.</em>
          </h2>
        </div>
        <div className="journey-photos">
          {journeyImages.map((src, i) => (
            <figure key={src} className={'journey-photo journey-photo-' + i}>
              <Image
                src={src}
                alt={journeyAlts[i]}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
      <div className="journey-steps">
        {processSteps.map((step, i) => (
          <article key={step.title} data-step={i}>
            <span className="editorial-number">0{i + 1} / 03</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <div className="journey-mobile-photo">
              <Image
                src={journeyImages[i]}
                alt={journeyAlts[i]}
                width={900}
                height={600}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
export function ClinicalEditorial() {
  return (
    <section id="tecnologia" className="clinical-editorial">
      <div className="clinical-visual" data-parallax>
        <Image
          src="/images/quirofano-oscuro.webp"
          alt="Dr. Yamith Cuello en el entorno quirúrgico"
          fill
          sizes="100vw"
          className="editorial-photo"
        />
        <div className="clinical-title" data-reveal="text">
          <p className="eyebrow">Precisión y cuidado</p>
          <h2>
            Tecnología al servicio
            <br />
            <em>de cada detalle.</em>
          </h2>
        </div>
      </div>
      <div className="clinical-content">
        <p className="clinical-intro">
          Un enfoque que integra la valoración, el procedimiento y el cuidado posoperatorio.
        </p>
        <div className="technology-lines">
          {technologies.map((t) => (
            <details key={t.name}>
              <summary>
                <span>{t.name}</span>
                <span aria-hidden>+</span>
              </summary>
              <div className="technology-detail">
                {t.image && (
                  <Image
                    src={t.image}
                    alt={'Equipo o sesión de ' + t.name + ' en la clínica'}
                    width={420}
                    height={300}
                    sizes="(min-width: 768px) 24vw, 85vw"
                  />
                )}
                <div>
                  <h3>{t.kind}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className="technology-note">
          La indicación de cada tecnología se define en tu valoración médica.
        </p>
      </div>
    </section>
  )
}
export function ClinicEditorial() {
  return (
    <section className="editorial-section clinic-editorial">
      <div className="editorial-heading" data-reveal="text">
        <p className="eyebrow">Un entorno cercano</p>
        <h2>
          El cuidado también
          <br />
          <em>está en los detalles.</em>
        </h2>
      </div>
      <div className="clinic-images">
        {[
          {
            src: '/images/recepcion-logo.webp',
            alt: 'Recepción de la clínica del Dr. Yamith Cuello',
            caption: 'Un espacio para recibirte.'
          },
          {
            src: '/images/equipo.webp',
            alt: 'Equipo quirúrgico del Dr. Yamith Cuello',
            caption: 'Un equipo que te acompaña.'
          }
        ].map((p) => (
          <figure key={p.src} data-reveal="image">
            <div>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
export function EditorialFaq({
  items,
  procedureName
}: {
  items: Array<{ question: string; answer: string }>
  procedureName?: string
}) {
  if (!items.length) return null
  return (
    <section className="editorial-section faq-editorial">
      <div data-reveal="text">
        <p className="eyebrow">Antes de dar el primer paso</p>
        <h2>
          Hablemos de
          <br />
          <em>tus preguntas.</em>
        </h2>
        {procedureName && <p className="faq-context">Sobre {procedureName} y tu valoración.</p>}
      </div>
      <div>
        {items.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden>+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
export function FinalPortrait() {
  return (
    <section className="final-portrait">
      <div className="final-photo" data-parallax>
        <Image
          src="/images/doctor-cta.webp"
          alt="Dr. Yamith Cuello sonriendo en su consultorio"
          fill
          sizes="100vw"
          className="editorial-photo"
        />
      </div>
      <div className="final-copy" data-reveal="text">
        <p className="eyebrow">Comencemos por escucharte</p>
        <h2>
          Tu historia.
          <br />
          <em>Nuestro próximo encuentro.</em>
        </h2>
        <ValuationLink location="cta_final" />
      </div>
    </section>
  )
}
