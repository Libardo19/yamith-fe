import { Cpu, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/Section'
import { differentiators } from '@/content/site'

const icons = { shield: ShieldCheck, cpu: Cpu, sparkles: Sparkles, heart: HeartHandshake }

export function Differentiators() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Por qué elegirnos" title="Excelencia en cada detalle" />
        <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => {
            const Icon = icons[d.icon]
            return (
              <article key={d.title} className="bg-white p-8">
                <span className="inline-flex size-11 items-center justify-center bg-gold-100 text-gold-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{d.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
