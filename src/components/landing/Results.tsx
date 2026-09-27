import { SectionHeading } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { GalleryItem } from '@/types/api'

/**
 * Resultados antes/después publicados desde el panel (con consentimiento del paciente).
 * Si no hay ninguno publicado, la sección no aparece.
 */
export function Results({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null
  return (
    <section id="resultados" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Resultados"
          title="Resultados reales, naturales"
          text="Publicados con autorización de cada paciente. Los resultados varían de una persona a otra."
        />
        <div
          className={cn(
            'mx-auto mt-14 grid gap-6',
            items.length === 1 && 'max-w-sm',
            items.length === 2 && 'max-w-3xl sm:grid-cols-2',
            items.length > 2 && 'sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {items.map((g) => (
            <article key={g.id} className="border border-line bg-cream-50">
              <div className="grid grid-cols-2 gap-px bg-line">
                {(
                  [
                    ['Antes', g.beforeImageUrl],
                    ['Después', g.afterImageUrl]
                  ] as const
                ).map(([label, src]) => (
                  <figure key={label} className="relative aspect-[3/4] bg-cream-200">
                    {/* eslint-disable-next-line @next/next/no-img-element -- imagen servida por el API */}
                    <img
                      src={src}
                      alt={`${label}${g.procedure ? ` · ${g.procedure.name}` : ''}`}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                    <figcaption className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                      {label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {g.procedure || g.description ? (
                <div className="p-4">
                  {g.procedure ? (
                    <p className="font-serif text-lg text-navy-900">{g.procedure.name}</p>
                  ) : null}
                  {g.description ? (
                    <p className="mt-1 text-sm text-muted">{g.description}</p>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
