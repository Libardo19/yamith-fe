import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Encabezado de sección: rótulo dorado, título serif y línea corta. */
export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  tone = 'dark',
  className
}: {
  eyebrow?: string
  title: ReactNode
  text?: string
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div
      className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl', className)}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={cn('mt-3 text-3xl leading-tight sm:text-4xl', tone === 'light' && 'text-white')}
      >
        {title}
      </h2>
      <span className={cn('mt-5 block h-px w-12 bg-gold-500', align === 'center' && 'mx-auto')} />
      {text ? (
        <p
          className={cn('mt-5 leading-relaxed', tone === 'light' ? 'text-white/70' : 'text-muted')}
        >
          {text}
        </p>
      ) : null}
    </div>
  )
}
