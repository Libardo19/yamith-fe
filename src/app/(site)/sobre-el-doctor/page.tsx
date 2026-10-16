import type { Metadata } from 'next'
import { EditorialPageHero } from '@/components/landing/EditorialPageHero'
import { LandingMotion } from '@/components/landing/LandingMotion'
import { ReferenceTechnology } from '@/components/landing/ReferenceLanding'
import {
  DoctorExperience,
  DoctorTechniques,
  DoctorMemberships,
  DoctorCare,
  DoctorLocations,
  DoctorScience,
  DoctorClosing
} from '@/components/landing/DoctorProfile'
import { brand } from '@/content/site'

export const metadata: Metadata = {
  title: { absolute: 'Dr. Yamith Cuello · Cirujano plástico en Colombia' },
  alternates: { canonical: '/sobre-el-doctor' },
  description: `${brand.specialty} con 7 años de experiencia y más de 2.000 cirugías. Conoce su enfoque de lipoabdominoplastia, valoración individual y atención en Pereira, Barranquilla y Valledupar.`
}

export default function AboutPage() {
  return (
    <LandingMotion>
      <EditorialPageHero
        eyebrow={brand.specialty}
        title={brand.name}
        description="7 años de experiencia y más de 2.000 cirugías en cirugía plástica, estética y reconstructiva. Una práctica centrada en la valoración individual, el contorno corporal y el acompañamiento de cada paciente."
        location="doctor_hero"
        image="/images/doctor-suit-cutout.webp"
      />
      <DoctorExperience />
      <DoctorTechniques />
      <DoctorMemberships />
      <DoctorCare />
      <DoctorLocations />
      <DoctorScience />
      <ReferenceTechnology />
      <DoctorClosing />
    </LandingMotion>
  )
}
