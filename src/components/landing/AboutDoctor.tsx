import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { doctor } from '@/content/site'

export function AboutDoctor({ full = false }: { full?: boolean }) {
  return (
    <section className="relative bg-white py-20 sm:py-24">
      <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-cream-100 lg:block" aria-hidden />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-200 shadow-2xl shadow-navy-900/15">
            <Image
              src={doctor.image}
              alt="El Dr. Yamith Cuello en la clínica"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -right-4 -bottom-6 bg-navy-900 px-6 py-5 text-white sm:-right-10">
            <p className="font-serif text-lg">Plastic Surgery</p>
            <p className="mt-1 text-xs text-white/60">Pereira · Barranquilla · Valledupar</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">{doctor.eyebrow}</p>
          <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{doctor.title}</h2>
          <span className="mt-5 block h-px w-12 bg-gold-500" />
          {doctor.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="mt-5 leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <ul className="mt-8 space-y-3">
            {doctor.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-navy-800">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-500" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          {full ? null : (
            <ButtonLink href="/sobre-el-doctor" variant="outline" className="mt-10">
              Conocer más
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  )
}
