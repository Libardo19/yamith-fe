import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const screens = [
  {
    href: '/',
    title: 'Landing page',
    text: 'El sitio público: hero, procedimientos, tecnología, el doctor, la clínica y el formulario de agendamiento.',
    image: '/images/doctor-hero.webp',
    tag: 'Funcional'
  },
  {
    href: '/demo/portal',
    title: 'Portal del paciente',
    text: 'Próxima cita, avance del procedimiento, línea de tiempo, fotos, documentos y agenda en línea.',
    image: '/images/valoracion-tablet.webp',
    tag: 'Borrador con datos de ejemplo'
  },
  {
    href: '/demo/admin',
    title: 'Panel del consultorio',
    text: 'Vista general, pacientes, ficha completa, calendario por sede, solicitudes y catálogo.',
    image: '/images/tec-doctor-equipos.webp',
    tag: 'Borrador con datos de ejemplo'
  },
  {
    href: '/login',
    title: 'Acceso y cuentas',
    text: 'Inicio de sesión (paciente / equipo), registro, recuperación de contraseña y Google.',
    image: '/images/doctor-traje.webp',
    tag: 'Funcional'
  }
]

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-18 items-center justify-between">
          <Logo />
          <span className="text-[11px] font-semibold tracking-[0.18em] text-gold-700 uppercase">
            Borradores de diseño
          </span>
        </div>
      </header>
      <main className="container-page py-14">
        <p className="eyebrow">Propuesta 2 · Landing + portal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">¿Cómo se verá el sitio?</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Recorrido por las pantallas principales. La landing y las cuentas ya funcionan con el
          backend; el portal y el panel se muestran con datos de ejemplo mientras se construyen la
          agenda (F3) y el seguimiento (F4).
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {screens.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group overflow-hidden border border-line bg-white"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-navy-900">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-85 transition duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-navy-900 uppercase">
                  {s.tag}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div>
                  <h2 className="text-2xl">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-gold-600" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
