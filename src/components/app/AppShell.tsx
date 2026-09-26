'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { Bell, LogOut, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { adminNav, portalNav } from './nav'

interface ShellUser {
  name: string
  email: string
  role: 'ADMIN' | 'STAFF' | 'PATIENT'
  avatarUrl?: string | null
}

const roleLabel = { ADMIN: 'Administrador', STAFF: 'Equipo', PATIENT: 'Paciente' }

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export function Avatar({
  name,
  url,
  size = 'md'
}: {
  name: string
  url?: string | null
  size?: 'sm' | 'md' | 'lg'
}) {
  const s = { sm: 'size-8 text-[11px]', md: 'size-10 text-xs', lg: 'size-20 text-xl' }[size]
  return url ? (
    // eslint-disable-next-line @next/next/no-img-element -- avatar externo (Google), tamaño fijo
    <img src={url} alt="" className={cn(s, 'shrink-0 rounded-full object-cover')} />
  ) : (
    <span
      className={cn(
        s,
        'inline-flex shrink-0 items-center justify-center rounded-full bg-gold-100 font-semibold text-gold-700'
      )}
    >
      {initials(name)}
    </span>
  )
}

/**
 * Estructura del portal y del panel: barra lateral + barra superior.
 * data-clarity-mask: Clarity nunca graba el contenido (datos de pacientes).
 */
export function AppShell({
  area,
  base,
  user,
  onLogout,
  demo = false,
  children
}: {
  area: 'admin' | 'portal'
  base: string
  user: ShellUser
  onLogout?: () => void
  demo?: boolean
  children: ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  const items = (area === 'admin' ? adminNav(base) : portalNav(base)).filter(
    (i) => !i.adminOnly || user.role === 'ADMIN'
  )
  const isActive = (href: string) => (href === base ? pathname === base : pathname.startsWith(href))

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-6 py-6">
        <Logo />
        <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
          {area === 'admin' ? 'Panel del consultorio' : 'Portal del paciente'}
        </p>
      </div>
      <nav
        className="flex-1 space-y-1 px-3 py-6"
        aria-label={area === 'admin' ? 'Panel' : 'Portal'}
      >
        {items.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          const disabled = !demo && item.soon
          return disabled ? (
            <span
              key={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-muted/60"
              title={`Disponible en la fase ${item.soon}`}
            >
              <Icon className="size-[18px]" aria-hidden />
              {item.label}
              <span className="ml-auto text-[9px] font-semibold tracking-wider uppercase">
                pronto
              </span>
            </span>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium transition-colors',
                active
                  ? 'bg-gold-100 text-navy-900 after:absolute after:inset-y-0 after:right-0 after:w-0.5 after:bg-gold-600'
                  : 'text-navy-800/80 hover:bg-cream-100 hover:text-navy-900'
              )}
            >
              <Icon
                className={cn('size-[18px]', active ? 'text-gold-700' : 'text-muted')}
                aria-hidden
              />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-line p-3">
        {onLogout ? (
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-[13px] text-navy-800/80 hover:bg-cream-100"
          >
            <LogOut className="size-[18px] text-muted" aria-hidden />
            Cerrar sesión
          </button>
        ) : (
          <Link
            href="/demo"
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-navy-800/80 hover:bg-cream-100"
          >
            <LogOut className="size-[18px] text-muted" aria-hidden />
            Salir del borrador
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-cream-100" data-clarity-mask="true">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">
        {sidebar}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-navy-950/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">{sidebar}</aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {demo ? (
          <div className="bg-navy-900 px-4 py-2 text-center text-xs text-gold-300">
            Borrador visual con datos de ejemplo · Así se verá el{' '}
            {area === 'admin' ? 'panel del consultorio' : 'portal del paciente'}
          </div>
        ) : null}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-8">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-navy-900 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div className="flex-1" />
          <button
            type="button"
            className="relative inline-flex size-10 items-center justify-center text-muted hover:text-navy-900"
            aria-label="Notificaciones"
          >
            <Bell className="size-5" />
            {demo ? (
              <span className="absolute top-2 right-2.5 size-2 rounded-full bg-gold-500" />
            ) : null}
          </button>
          <div className="flex items-center gap-3 border-l border-line pl-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-navy-900">{user.name}</p>
              <p className="text-[11px] text-muted">{roleLabel[user.role]}</p>
            </div>
            <Avatar name={user.name} url={user.avatarUrl ?? null} />
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  )
}
