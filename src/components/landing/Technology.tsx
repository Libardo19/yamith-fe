import Image from 'next/image'
import { SectionHeading } from '@/components/ui/Section'
import { technologies } from '@/content/site'

/** Equipos reales de la clínica (identificados en la sesión de fotos). */
export function Technology() {
  return (
    <section id="tecnologia" className="scroll-mt-20 bg-navy-900 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tecnología"
          title="Tecnología de vanguardia a tu servicio"
          text="Equipos de última generación en quirófano y en la recuperación, para trabajar con precisión y cuidar cada etapa de tu proceso."
          tone="light"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((t) => (
            <article key={t.name} className="group flex flex-col bg-navy-800">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={t.image}
                  alt={`Equipo ${t.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-300 uppercase">
                  {t.kind}
                </p>
                <h3 className="mt-2 text-2xl text-white">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{t.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
