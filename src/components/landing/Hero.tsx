import Image from 'next/image'
import { brand, hero } from '@/content/site'
import { ValuationLink } from './ValuationLink'
export function Hero() {
  return (
    <section className="reference-hero diagonal-dark">
      <div className="reference-inner">
        <div className="hero-copy" data-reveal="text">
          <p className="reference-eyebrow">CIRUJANO PLÁSTICO · COLOMBIA</p>
          <h1>{brand.name}</h1>
          <p>{hero.subtitle}</p>
          <ValuationLink location="hero" />
        </div>
        <figure className="hero-portrait">
          <Image
            src="/images/doctor-scrubs-cutout.webp"
            alt="Dr. Yamith Cuello en su consultorio"
            fill
            preload
            sizes="(min-width: 768px) 52vw, 100vw"
            className="object-cover object-top"
          />
        </figure>
      </div>
    </section>
  )
}
