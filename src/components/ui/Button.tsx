import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'dark'

const variants: Record<Variant, string> = {
  primary: 'bg-gold-500 text-white hover:bg-gold-600',
  outline: 'border border-navy-900/30 text-navy-900 hover:border-navy-900',
  dark: 'bg-navy-900 text-white hover:bg-navy-800'
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-(--tracking-label) uppercase transition-colors disabled:pointer-events-none disabled:opacity-50'

type ButtonProps = ComponentProps<'button'> & { variant?: Variant }

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant }

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />
}
