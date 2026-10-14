import { Hero } from '@/components/landing/Hero'
import { LandingMotion } from '@/components/landing/LandingMotion'
import {
  ReferenceIntro,
  ReferenceMethods,
  ReferenceDoctor,
  ReferenceOutcomes,
  ReferenceSignature,
  pickFeatured,
  ReferenceAuthority,
  ReferenceFaq,
  ReferenceTechnology
} from '@/components/landing/ReferenceLanding'
import { JsonLd } from '@/components/seo/JsonLd'
import { getGallery, getProcedures, getSedes } from '@/lib/public-data'
import { valuationFaq } from '@/content/site'
import './landing.css'
export default async function HomePage() {
  const [procedures, sedes, results] = await Promise.all([
    getProcedures(),
    getSedes(),
    getGallery()
  ])
  const featured = pickFeatured(results)
  return (
    <>
      <JsonLd sedes={sedes} />
      <LandingMotion>
        <Hero />
        <ReferenceIntro />
        <ReferenceMethods />
        <ReferenceDoctor />
        <ReferenceSignature featured={featured} />
        <ReferenceOutcomes
          procedures={procedures}
          results={results.filter((r) => r.id !== featured?.id)}
        />
        <ReferenceAuthority />
        <ReferenceFaq items={valuationFaq} />
        <ReferenceTechnology />
      </LandingMotion>
    </>
  )
}
