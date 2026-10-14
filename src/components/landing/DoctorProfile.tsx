import Image from 'next/image'
import Link from 'next/link'
import { brand, doctor } from '@/content/site'
import { techniques } from '@/content/techniques'
import { ValuationLink } from './ValuationLink'

/** Only explicitly confirmed memberships may be presented as medical credentials. */
export function DoctorMemberships() {
  const memberships = doctor.memberships.filter((membership) => membership.confirmed)
  if (!memberships.length) return null
  return (
    <section className="doctor-memberships">
      <div className="reference-inner">
        <h2>Miembro en sociedades de cirugía plástica</h2>
        <div className="doctor-membership-strip">
          {memberships.map((membership) => (
            <a
              key={membership.name}
              href={membership.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {membership.logo ? (
                <Image src={membership.logo} alt={membership.name} width={260} height={110} />
              ) : (
                membership.name
              )}
              <span className="society-name">{membership.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DoctorExperience() {
  return (
    <section className="doctor-experience">
      <div className="reference-inner doctor-profile-grid">
        <div data-reveal="text">
          <p className="reference-eyebrow">Trayectoria y criterio médico</p>
          <h2>
            Experiencia que orienta
            <br />
            cada decisión.
          </h2>
          <p>
            El Dr. Yamith Cuello cuenta con 7 años de experiencia en cirugía plástica, estética y
            reconstructiva. Su práctica parte de escuchar tus objetivos y evaluar las
            características que hacen único cada caso.
          </p>
          <p>
            La indicación de una cirugía requiere revisar antecedentes, calidad de los tejidos,
            proporciones y expectativas. Comprender las alternativas, las cicatrices y la
            recuperación forma parte de una decisión informada.
          </p>
          <ul className="doctor-profile-list">
            <li>Cirugía corporal, mamaria y facial</li>
            <li>Lipoabdominoplastia con planificación individual</li>
            <li>Valoración presencial y virtual</li>
            <li>Seguimiento antes y después del procedimiento</li>
          </ul>
        </div>
        <figure data-reveal="image">
          <Image
            src="/images/valoracion-implantes.webp"
            alt="Dr. Yamith Cuello durante una valoración en consultorio"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          <figcaption className="doctor-experience-number">
            <strong>{doctor.stats.years}</strong>
            <span>años de experiencia</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export function DoctorTechniques() {
  return (
    <section className="doctor-techniques" id="tecnicas">
      <div className="reference-inner doctor-profile-grid">
        <figure data-reveal="image">
          <Image
            src="/images/marcacion.webp"
            alt="Planificación y marcación prequirúrgica con el Dr. Yamith"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </figure>
        <div data-reveal="text">
          <p className="reference-eyebrow">Contorno corporal</p>
          <h2>
            Una técnica para
            <br />
            cada anatomía.
          </h2>
          <p>
            El Dr. Yamith maneja diferentes abordajes de lipoabdominoplastia. La distribución de
            grasa, el exceso de piel y las condiciones de salud orientan la elección.
          </p>
          <div className="doctor-technique-list">
            {techniques.map((technique, index) => (
              <details key={technique.title} open={index === 0}>
                <summary>
                  <span>0{index + 1}</span>
                  {technique.title}
                </summary>
                {technique.subtitle && (
                  <p className="doctor-technique-subtitle">{technique.subtitle}</p>
                )}
                <p>{technique.text}</p>
              </details>
            ))}
          </div>
          <Link href="/procedimientos/abdominoplastia" className="reference-outline">
            Conocer la cirugía abdominal ↗
          </Link>
        </div>
      </div>
    </section>
  )
}

export function DoctorCare() {
  return (
    <section className="doctor-care">
      <div className="reference-inner">
        <p className="reference-eyebrow">Una atención cercana</p>
        <h2>
          Del primer encuentro
          <br />
          al seguimiento.
        </h2>
        <div className="doctor-care-steps">
          <div>
            <span>01</span>
            <h3>Escuchar y valorar</h3>
            <p>
              Tu historia clínica, tus prioridades y un examen individual ayudan a definir las
              opciones de atención.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Planificar y explicar</h3>
            <p>
              El plan incluye la técnica, sus límites, las cicatrices previstas y los cuidados que
              requiere la recuperación.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Acompañar y revisar</h3>
            <p>
              Los controles permiten evaluar la evolución. El portal del paciente facilita consultar
              la información de tu proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DoctorScience() {
  return (
    <section className="doctor-science">
      <div className="reference-inner doctor-profile-grid">
        <div>
          <p className="reference-eyebrow">Información para decidir</p>
          <h2>
            Conocer el procedimiento
            <br />
            también es cuidarte.
          </h2>
          <p>
            Las fichas de procedimientos explican preparación, recuperación, riesgos y límites, y
            enlazan fuentes médicas para ampliar la información de tu valoración.
          </p>
          <p>
            En cirugía abdominal, comprender las diferencias entre liposucción, abdominoplastia,
            Body Lift y Flor de Lis permite conversar sobre el abordaje que responde a tus
            necesidades.
          </p>
          <Link href="/procedimientos" className="reference-outline">
            Explorar los procedimientos ↗
          </Link>
        </div>
        <div className="doctor-science-links">
          <a
            href="https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Información educativa</span>
            <strong>Abdominoplastia</strong>
            <small>American Society of Plastic Surgeons ↗</small>
          </a>
          <a
            href="https://www.plasticsurgery.org/cosmetic-procedures/body-lift"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Contorno corporal</span>
            <strong>Body Lift</strong>
            <small>American Society of Plastic Surgeons ↗</small>
          </a>
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/3158172/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Literatura médica</span>
            <strong>Flor de Lis</strong>
            <small>Publicación consultable en PubMed ↗</small>
          </a>
        </div>
      </div>
    </section>
  )
}

export function DoctorLocations() {
  return (
    <section className="doctor-locations">
      <div className="reference-inner doctor-profile-grid">
        <div data-reveal="text">
          <p className="reference-eyebrow">Atención en Colombia</p>
          <h2>
            Una consulta que
            <br />
            empieza contigo.
          </h2>
          <p>
            El Dr. Yamith atiende en Pereira, Barranquilla y Valledupar. Puedes solicitar una
            valoración presencial o comenzar con orientación virtual; el equipo te indicará los
            pasos para completar el examen de tu caso.
          </p>
          <div className="doctor-city-list">
            {brand.cities.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
          <ValuationLink location="doctor_sedes" />
        </div>
        <figure data-reveal="image">
          <Image
            src="/images/recepcion-logo.webp"
            alt="Identidad del Dr. Yamith Cuello en la recepción del consultorio"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  )
}

export function DoctorClosing() {
  return (
    <section className="doctor-closing">
      <div className="reference-inner doctor-profile-grid">
        <figure data-reveal="image">
          <Image
            src="/images/doctor-scrubs-cutout.webp"
            alt="Dr. Yamith Cuello"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-contain object-bottom"
          />
        </figure>
        <div data-reveal="text">
          <p className="reference-eyebrow">Dr. Yamith Cuello</p>
          <h2>
            7 años de experiencia.
            <br />
            Una visión humana.
          </h2>
          <p>
            Una cirugía empieza mucho antes del quirófano: con una conversación honesta sobre lo que
            buscas, lo que puede lograrse y lo que necesita tu cuerpo.
          </p>
          <p>
            Conocer al cirujano, resolver tus dudas y comprender el proceso son parte de tu
            valoración. El Dr. Yamith te acompaña a construir un plan basado en tus características
            y expectativas.
          </p>
          <ValuationLink location="doctor_final" />
        </div>
      </div>
    </section>
  )
}
