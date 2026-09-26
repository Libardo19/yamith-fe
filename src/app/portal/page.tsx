'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, ClipboardList, FileText, MessageCircle } from 'lucide-react'
import { Panel } from '@/components/app/ui'
import { ButtonLink } from '@/components/ui/Button'
import { useSession } from '@/lib/session'

const coming = [
  {
    icon: CalendarDays,
    title: 'Agenda en línea',
    text: 'Elige sede, día y hora para tus valoraciones y controles.'
  },
  {
    icon: ClipboardList,
    title: 'Seguimiento de tu procedimiento',
    text: 'Línea de tiempo de tu recuperación e indicaciones.'
  },
  {
    icon: FileText,
    title: 'Fotos y documentos',
    text: 'Consentimientos, indicaciones y fotos privadas de tu proceso.'
  }
]

export default function PortalHome() {
  const { user } = useSession()
  const firstName = user?.patient?.firstName ?? user?.name.split(' ')[0] ?? ''

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden bg-navy-900 p-8 text-white sm:p-10">
        <Image
          src="/images/recepcion-logo.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="relative">
          <p className="eyebrow text-gold-300">Hola, {firstName}</p>
          <h1 className="mt-3 max-w-xl text-3xl leading-tight text-white sm:text-4xl">
            Bienvenido(a) a tu portal.
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/70">
            Aquí vas a poder agendar tus citas y seguir cada etapa de tu proceso con el Dr. Yamith
            Cuello.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {coming.map((c) => (
          <Panel key={c.title}>
            <c.icon className="size-6 text-gold-600" aria-hidden />
            <h2 className="mt-4 text-xl">{c.title}</h2>
            <p className="mt-2 text-sm text-muted">{c.text}</p>
            <p className="mt-4 text-[10px] font-semibold tracking-[0.18em] text-gold-700 uppercase">
              Muy pronto
            </p>
          </Panel>
        ))}
      </div>

      <Panel title="Mientras tanto">
        <p className="text-sm text-muted">
          Para agendar tu valoración escríbenos por WhatsApp o déjanos tus datos en el formulario de
          contacto.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/contacto#agendar">Solicitar valoración</ButtonLink>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-4 text-sm font-semibold text-navy-900"
          >
            <MessageCircle className="size-4 text-[#1f9d55]" aria-hidden /> WhatsApp por sede
          </Link>
        </div>
      </Panel>
    </div>
  )
}
