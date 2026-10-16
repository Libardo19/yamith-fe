'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/app/ui'
import { BookingFlow } from '@/components/portal/BookingFlow'

export default function NewAppointmentPage() {
  return (
    <>
      <Link
        href="/portal/citas"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-navy-900"
      >
        <ArrowLeft className="size-4" aria-hidden /> Mis citas
      </Link>
      <PageHeader
        title="Agendar una cita"
        subtitle="Elige la sede, el tipo de cita y un horario disponible."
      />
      <BookingFlow />
    </>
  )
}
