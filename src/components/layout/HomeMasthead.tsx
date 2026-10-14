'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
const links = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-el-doctor', label: 'El doctor' },
  { href: '/procedimientos', label: 'Procedimientos' },
  { href: '/#enfoque', label: 'Nuestro enfoque' },
  { href: '/#tecnologia', label: 'Tecnología' },
  { href: '/login', label: 'Portal' },
  { href: '/contacto', label: 'Contacto' }
]
export function HomeMasthead() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [open])
  return (
    <header className="home-masthead">
      <Image
        src="/images/quirofano-oscuro.webp"
        alt=""
        fill
        sizes="100vw"
        className="masthead-background"
      />
      <div className="masthead-content">
        <Logo tone="light" />
        <button
          ref={toggle}
          type="button"
          className="masthead-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-controls="masthead-mobile"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav className="masthead-nav" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === pathname ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <nav id="masthead-mobile" aria-label="Móvil" hidden={!open}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === pathname ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
