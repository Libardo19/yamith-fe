import Image from 'next/image'
import { MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { brand, hero } from '@/content/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      <div className="container-page grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-16 lg:pb-24">
        <div className="relative z-10">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-5 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
            {hero.title[0]} <em className="text-gold-600">{hero.title[1]}</em>
            <br className="hidden sm:block" /> {hero.title[2]}
          </h1>
          <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-muted">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contacto#agendar">Agendar valoración</ButtonLink>
            <ButtonLink href="/procedimientos" variant="outline">
              Ver procedimientos
            </ButtonLink>
          </div>

          <ul className="mt-12 grid gap-4 border-t border-line pt-8 text-sm text-navy-800 sm:grid-cols-3">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 shrink-0 text-gold-500" aria-hidden />
              Ética y seguridad
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="size-5 shrink-0 text-gold-500" aria-hidden />
              Resultados naturales
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-5 shrink-0 text-gold-500" aria-hidden />
              {brand.cities.length} ciudades
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute -top-6 -right-6 hidden h-full w-full border border-gold-300 lg:block"
            aria-hidden
          />
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
            <Image
              src={hero.image}
              alt="El Dr. Yamith Cuello en su consultorio"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-4 max-w-[15rem] bg-white p-5 shadow-xl shadow-navy-900/10 sm:-left-8">
            <p className="font-serif text-lg leading-snug text-navy-900">Dr. Yamith Cuello</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{brand.specialty}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
