import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, BookOpen, GraduationCap } from 'lucide-react'
import { AboutDoctor } from '@/components/landing/AboutDoctor'
import { Gallery } from '@/components/landing/Gallery'
import { Technology } from '@/components/landing/Technology'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/Section'
import { brand, doctor } from '@/content/site'

export const metadata: Metadata = {
  title: 'Dr. Yamith Cuello',
  description: `${brand.specialty} en Pereira, Barranquilla y Valledupar. Conoce su filosofía de atención y su equipo.`
}

const credentialIcons = [GraduationCap, Award, BookOpen]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950">
        <Image
          src="/images/doctor-quirofano.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
        <div className="container-page relative py-24 sm:py-32">
          <p className="eyebrow text-gold-300">Conoce a tu especialista</p>
          <h1 className="mt-4 max-w-2xl text-5xl leading-tight text-white sm:text-6xl">
            Ciencia, arte y <em className="text-gold-300">empatía.</em>
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/70">
            {brand.specialty}. Un enfoque que va más allá de la técnica: entender a cada paciente y
            potenciar su confianza.
          </p>
          <ButtonLink href="/contacto#agendar" className="mt-9">
            Agendar valoración
          </ButtonLink>
        </div>
      </section>

      <AboutDoctor full />

      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Excelencia médica" title="Formación y certificaciones" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {doctor.credentials.map((c, i) => {
              const Icon = credentialIcons[i] ?? Award
              return (
                <article key={c.title} className="border border-line bg-white p-8">
                  <Icon className="size-6 text-gold-500" aria-hidden />
                  <h3 className="mt-5 text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted">{c.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <Technology />
      <Gallery />
    </>
  )
}
