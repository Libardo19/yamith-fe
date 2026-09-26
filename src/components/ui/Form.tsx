import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Campo con etiqueta en mayúsculas y línea inferior, como en los mockups. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className
}: {
  label: string
  htmlFor: string
  error?: string | undefined
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

const control =
  'w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-gold-500 focus:ring-0 focus:outline-none aria-[invalid=true]:border-danger'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(control, className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(control, 'min-h-24 resize-y', className)} {...props} />
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select className={cn(control, 'cursor-pointer', className)} {...props}>
      {children}
    </select>
  )
}

export function Checkbox({
  label,
  error,
  className,
  ...props
}: Omit<ComponentProps<'input'>, 'type'> & { label: ReactNode; error?: string | undefined }) {
  return (
    <div className={className}>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-gold-600"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function Alert({
  tone = 'info',
  children,
  className
}: {
  tone?: 'info' | 'success' | 'error' | 'warning'
  children: ReactNode
  className?: string
}) {
  const tones = {
    info: 'border-navy-700/20 bg-navy-900/[0.03] text-navy-800',
    success: 'border-success/30 bg-success/5 text-success',
    error: 'border-danger/30 bg-danger/5 text-danger',
    warning: 'border-gold-500/40 bg-gold-100 text-gold-700'
  }
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('border-l-2 px-4 py-3 text-sm', tones[tone], className)}
    >
      {children}
    </div>
  )
}
