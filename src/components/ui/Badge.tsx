import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'neutral' | 'gold' | 'success' | 'danger' | 'navy' | 'muted'

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-cream-100 text-navy-800 ring-line',
  gold: 'bg-gold-100 text-gold-700 ring-gold-300/60',
  success: 'bg-success/10 text-success ring-success/20',
  danger: 'bg-danger/10 text-danger ring-danger/20',
  navy: 'bg-navy-900 text-white ring-navy-900',
  muted: 'bg-white text-muted ring-line'
}

export function Badge({
  tone = 'neutral',
  children,
  className
}: {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold tracking-wide whitespace-nowrap ring-1 ring-inset',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
