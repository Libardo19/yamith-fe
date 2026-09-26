import type { ReactNode } from 'react'

export function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer
}: {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="w-full max-w-md">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h1>
      {subtitle ? <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p> : null}
      <div className="mt-8">{children}</div>
      {footer ? (
        <div className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
          {footer}
        </div>
      ) : null}
    </div>
  )
}
