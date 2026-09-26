import type { Metadata } from 'next'
import { ContactSection } from '@/components/landing/ContactSection'
import { SectionHeading } from '@/components/ui/Section'
import { getProcedures, getSedes } from '@/lib/public-data'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Agenda tu valoración presencial o virtual en Pereira, Barranquilla o Valledupar.'
}

export default async function ContactPage() {
  const [sedes, procedures] = await Promise.all([getSedes(), getProcedures()])
  return (
    <>
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contacto"
            title="Estamos aquí para escucharte"
            text="Agenda tu valoración presencial o virtual. Da el primer paso hacia tu transformación con la confianza y seguridad de un experto."
          />
        </div>
      </section>
      <ContactSection sedes={sedes} procedures={procedures} />
    </>
  )
}
