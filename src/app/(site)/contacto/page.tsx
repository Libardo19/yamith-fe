import type { Metadata } from 'next'
import { ContactSection } from '@/components/landing/ContactSection'
import { EditorialPageHero } from '@/components/landing/EditorialPageHero'
import { LandingMotion } from '@/components/landing/LandingMotion'
import { getProcedures, getSedes } from '@/lib/public-data'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Agenda tu valoración presencial o virtual en Pereira, Barranquilla o Valledupar.'
}

export default async function ContactPage() {
  const [sedes, procedures] = await Promise.all([getSedes(), getProcedures()])
  return (
    <LandingMotion>
      <EditorialPageHero
        eyebrow="Contacto y valoración"
        title="Tu valoración comienza aquí"
        description="Agenda una consulta presencial o virtual. Nuestro equipo te ayudará a coordinar la sede, la modalidad y la fecha de atención."
        image="/images/doctor-scrubs-cutout.webp"
        location="contacto_hero"
      />
      <ContactSection sedes={sedes} procedures={procedures} />
    </LandingMotion>
  )
}
