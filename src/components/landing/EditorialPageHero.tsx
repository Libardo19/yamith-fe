import Image from 'next/image'
import { brand } from '@/content/site'
import { ValuationLink } from './ValuationLink'

export function EditorialPageHero({
  eyebrow,
  title,
  description,
  image = '/images/doctor-suit-cutout.webp',
  alt = 'Dr. Yamith Cuello',
  location
}: {
  eyebrow: string
  title: string
  description: string
  image?: string
  alt?: string
  location: string
}) {
  return (
    <section className="reference-page-hero">
      <div className="reference-inner page-hero-grid">
        <div className="page-hero-copy">
          <p className="reference-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <ValuationLink location={location} />
          <p className="page-hero-locations">{brand.cities.join(' · ')}</p>
        </div>
        <figure
          className={image.includes('-cutout.') ? 'page-hero-cutout' : 'page-hero-photograph'}
        >
          <Image
            src={image}
            alt={alt}
            fill
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  )
}
