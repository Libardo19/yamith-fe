import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { brand } from '@/content/site'
import type { Sede } from '@/types/api'

export function SiteFooter({ sedes }: { sedes: Sede[] }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {brand.specialty}. Resultados naturales con la máxima seguridad y profesionalismo.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
            Navegación
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link className="hover:text-white" href="/sobre-el-doctor">
                Sobre el doctor
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/procedimientos">
                Procedimientos
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/#tecnologia">
                Tecnología
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contacto">
                Contacto
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/login">
                Portal de pacientes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
            Sedes
          </p>
          <ul className="mt-5 space-y-4 text-sm">
            {sedes.map((s) => (
              <li key={s.id} className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
                <span>
                  <span className="block text-white">{s.city}</span>
                  <span className="text-white/50">{s.address}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-gold-300 uppercase">
            Legal
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link className="hover:text-white" href="/privacidad">
                Política de tratamiento de datos
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/terminos">
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {year} {brand.name} · {brand.specialty}. Todos los derechos reservados.
          </p>
          <p>La información de este sitio es educativa y no reemplaza una valoración médica.</p>
        </div>
      </div>
    </footer>
  )
}
