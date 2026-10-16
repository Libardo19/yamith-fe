import { parseProcedureContent } from '@/lib/procedure-content'
import { procedureSources } from '@/content/procedure-sources'
import type { ProcedureDetail } from '@/types/api'

export function ProcedureArticle({ procedure }: { procedure: ProcedureDetail }) {
  const sections = parseProcedureContent(procedure.content)
  const sources = procedureSources[procedure.slug] ?? []
  return (
    <section className="procedure-article">
      <div className="reference-inner procedure-article-grid">
        <aside className="procedure-outline">
          {sections.length > 1 && (
            <nav aria-label="Contenido del procedimiento">
              <p className="reference-eyebrow">En esta ficha</p>
              {sections.map((section) => (
                <a key={section.id} href={'#' + section.id}>
                  {section.title}
                </a>
              ))}
            </nav>
          )}
          {procedure.benefits.length > 0 && (
            <div className="procedure-objectives">
              <h2>Objetivos del tratamiento</h2>
              <ul>
                {procedure.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <div className="procedure-reading">
          <p className="reference-eyebrow">Información para tu valoración</p>
          {sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p className="procedure-medical-note">
            Esta información es general. La indicación, la técnica y los cuidados se definen durante
            la valoración médica.
          </p>
          {sources.length > 0 && (
            <details className="procedure-sources">
              <summary>Fuentes de información médica</summary>
              <p>
                Referencias educativas de sociedades médicas, instituciones de salud y fabricantes
                para ampliar la información sobre el procedimiento.
              </p>
              <ul>
                {sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                      <span className="sr-only"> (abre en una nueva pestaña)</span>
                      <span aria-hidden> ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </section>
  )
}
