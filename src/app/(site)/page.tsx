import { AboutDoctor } from '@/components/landing/AboutDoctor'
import { ContactSection } from '@/components/landing/ContactSection'
import { Differentiators } from '@/components/landing/Differentiators'
import { FeaturedProcedures } from '@/components/landing/FeaturedProcedures'
import { Gallery } from '@/components/landing/Gallery'
import { Hero } from '@/components/landing/Hero'
import { Process } from '@/components/landing/Process'
import { Results } from '@/components/landing/Results'
import { Technology } from '@/components/landing/Technology'
import { JsonLd } from '@/components/seo/JsonLd'
import { getGallery, getProcedures, getSedes } from '@/lib/public-data'

export default async function HomePage() {
  const [procedures, sedes, results] = await Promise.all([
    getProcedures(),
    getSedes(),
    getGallery()
  ])
  return (
    <>
      <JsonLd sedes={sedes} />
      <Hero />
      <Differentiators />
      <FeaturedProcedures procedures={procedures} />
      <Technology />
      <AboutDoctor />
      <Process />
      <Results items={results} />
      <Gallery />
      <ContactSection sedes={sedes} procedures={procedures} />
    </>
  )
}
