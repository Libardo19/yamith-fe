'use client'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { brand } from '@/content/site'
import type { Sede } from '@/types/api'
export function PublicFooter({ sedes }: { sedes: Sede[] }) {
  return (
    <footer className="reference-footer">
      <div className="reference-inner">
        <div className="reference-footer-top">
          <Logo tone="light" />
          <nav aria-label="Navegación del pie">
            <Link href="/">Inicio</Link>
            <Link href="/sobre-el-doctor">El doctor</Link>
            <Link href="/procedimientos">Procedimientos</Link>
            <Link href="/#enfoque">Nuestro enfoque</Link>
            <Link href="/#tecnologia">Tecnología</Link>
            <Link href="/login">Portal</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
        <div className="reference-footer-details">
          <p>
            {brand.specialty}.<br />
            {brand.cities.join(' · ')}.
          </p>
          {sedes.map((s) => (
            <address key={s.id}>
              <strong>{s.city}</strong>
              {s.address && !/pendiente/i.test(s.address) && <span>{s.address}</span>}
              <Link href="/contacto#agendar">Agendar valoración</Link>
            </address>
          ))}
        </div>
        <div className="reference-footer-bottom">
          <p>
            © {new Date().getFullYear()} {brand.name} · Plastic Surgery
          </p>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/terminos">Términos</Link>
        </div>
      </div>
    </footer>
  )
}
