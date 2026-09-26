'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, UserRound, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-el-doctor', label: 'El doctor' },
  { href: '/procedimientos', label: 'Procedimientos' },
  { href: '/#tecnologia', label: 'Tecnología' },
  { href: '/contacto', label: 'Contacto' }
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cerrar el menú móvil al navegar (ajuste de estado durante el render, sin efecto).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace('/#', '/'))

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors',
        scrolled || open
          ? 'border-line bg-cream-50/95 backdrop-blur'
          : 'border-transparent bg-cream-50'
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'relative py-1 text-[11px] font-semibold whitespace-nowrap tracking-[0.16em] uppercase transition-colors hover:text-gold-600',
                isActive(l.href)
                  ? 'text-gold-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold-500'
                  : 'text-navy-800'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-[0.16em] text-navy-800 uppercase hover:text-gold-600 sm:inline-flex"
          >
            <UserRound className="size-4" aria-hidden />
            Portal
          </Link>
          <ButtonLink
            href="/contacto#agendar"
            className="hidden px-5 py-2.5 whitespace-nowrap sm:inline-flex"
            onClick={() => track('agendar_click', { ubicacion: 'header' })}
          >
            Agendar valoración
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!open} className="border-t border-line bg-cream-50 lg:hidden">
        <nav aria-label="Móvil" className="container-page flex flex-col py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-line py-3.5 font-serif text-lg text-navy-900"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="border-b border-line py-3.5 font-serif text-lg text-navy-900"
          >
            Portal de pacientes
          </Link>
          <ButtonLink
            href="/contacto#agendar"
            className="mt-5"
            onClick={() => track('agendar_click', { ubicacion: 'menu_movil' })}
          >
            Agendar valoración
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
