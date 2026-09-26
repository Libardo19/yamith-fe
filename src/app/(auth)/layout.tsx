import type { Metadata } from 'next'
import Image from 'next/image'
import { Logo } from '@/components/ui/Logo'

export const metadata: Metadata = { robots: { index: false, follow: false } }

/** Pantalla dividida: foto de la clínica a la izquierda, formulario a la derecha. */
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-navy-950 lg:block">
        <Image
          src="/images/doctor-traje.webp"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="eyebrow text-gold-300">Portal privado</p>
          <p className="mt-4 max-w-md font-serif text-4xl leading-tight text-white">
            Tu proceso, acompañado en cada etapa.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Agenda tus citas, consulta tus indicaciones y sigue tu recuperación desde un solo lugar.
          </p>
        </div>
      </aside>
      <div className="flex flex-col bg-cream-50">
        <div className="px-6 pt-8 sm:px-12">
          <Logo />
        </div>
        <main className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
          {children}
        </main>
        <p className="px-6 pb-6 text-center text-xs text-muted sm:px-12">
          Conexión segura · Tus datos están protegidos (Ley 1581 de 2012)
        </p>
      </div>
    </div>
  )
}
