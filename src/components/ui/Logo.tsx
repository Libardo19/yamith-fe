import Link from 'next/link'
import { cn } from '@/lib/cn'

/** Wordmark provisional ("Yamith Cuello · Plastic Surgery", como el letrero de la clínica). */
export function Logo({
  tone = 'dark',
  className
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <Link
      href="/"
      className={cn('group inline-flex flex-col leading-none', className)}
      aria-label="Dr. Yamith Cuello, inicio"
    >
      <span
        className={cn(
          'font-serif text-xl whitespace-nowrap sm:text-[22px]',
          tone === 'dark' ? 'text-navy-900' : 'text-gold-300'
        )}
      >
        Dr. Yamith Cuello
      </span>
      <span
        className={cn(
          'mt-1 text-[9px] font-semibold tracking-[0.34em] uppercase',
          tone === 'dark' ? 'text-gold-600' : 'text-white/60'
        )}
      >
        Plastic Surgery
      </span>
    </Link>
  )
}
