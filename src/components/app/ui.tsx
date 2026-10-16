import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import type { AccountStatus, CaseStatus, LeadStatus } from '@/types/api'

export function PageHeader({
  title,
  subtitle,
  actions
}: {
  title: string
  subtitle?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName
}: {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section className={cn('border border-line bg-white', className)}>
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <h2 className="font-serif text-xl">{title}</h2>
          {action}
        </div>
      ) : null}
      <div className={cn('p-6', bodyClassName)}>{children}</div>
    </section>
  )
}

/** Stat tile: etiqueta, cifra (sans semibold) y variación opcional. */
export function StatTile({
  label,
  value,
  delta,
  icon
}: {
  label: string
  value: string | number
  delta?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{label}</p>
        {icon ? <span className="text-gold-600">{icon}</span> : null}
      </div>
      <p className="mt-4 font-sans text-4xl font-semibold tracking-tight text-navy-900 tabular-nums">
        {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
      </p>
      {delta ? <p className="mt-2 text-xs text-muted">{delta}</p> : null}
    </div>
  )
}

export function EmptyState({
  title,
  text,
  action
}: {
  title: string
  text?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <p className="font-serif text-xl text-navy-900">{title}</p>
      {text ? <p className="mt-2 max-w-sm text-sm text-muted">{text}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}

// ── Etiquetas de estado (color + texto, nunca sólo color) ────

const caseStatus: Record<CaseStatus, [string, BadgeTone]> = {
  VALORACION: ['Valoración', 'neutral'],
  PROGRAMADO: ['Programado', 'gold'],
  POSTOP: ['Posoperatorio', 'navy'],
  FINALIZADO: ['Finalizado', 'success'],
  CANCELADO: ['Cancelado', 'muted']
}
export const CaseStatusBadge = ({ status }: { status: CaseStatus }) => (
  <Badge tone={caseStatus[status][1]}>{caseStatus[status][0]}</Badge>
)

const accountStatus: Record<AccountStatus, [string, BadgeTone]> = {
  active: ['Activa', 'success'],
  invited: ['Invitación enviada', 'gold'],
  unverified: ['Sin confirmar', 'neutral'],
  inactive: ['Inactiva', 'muted']
}
export const AccountStatusBadge = ({ status }: { status: AccountStatus }) => (
  <Badge tone={accountStatus[status][1]}>{accountStatus[status][0]}</Badge>
)

const leadStatus: Record<LeadStatus, [string, BadgeTone]> = {
  NUEVO: ['Nueva', 'gold'],
  CONTACTADO: ['Contactada', 'neutral'],
  CONVERTIDO: ['Convertida', 'success'],
  DESCARTADO: ['Descartada', 'muted']
}
export const LeadStatusBadge = ({ status }: { status: LeadStatus }) => (
  <Badge tone={leadStatus[status][1]}>{leadStatus[status][0]}</Badge>
)
export const leadStatusLabel = (s: LeadStatus) => leadStatus[s][0]

export const appointmentTypeLabel = {
  VALORACION: 'Valoración',
  CONTROL: 'Control',
  CIRUGIA: 'Cirugía',
  VIRTUAL: 'Virtual'
} as const

// ── Formato de fechas (zona Colombia) ────────────────────────

const tz = 'America/Bogota'
export const fmtDate = (d: string | Date) =>
  new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: tz
  }).format(new Date(d))
export const fmtTime = (d: string | Date) =>
  new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(
    new Date(d)
  )
export const fmtDateTime = (d: string | Date) => `${fmtDate(d)} · ${fmtTime(d)}`
/** Sólo la primera letra en mayúscula ("Lunes, 28 de septiembre"), no cada palabra. */
export const capitalizeFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
export const fmtLongDate = (d: string | Date) =>
  capitalizeFirst(
    new Intl.DateTimeFormat('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: tz
    }).format(new Date(d))
  )

/** Clases comunes para tablas del panel. */
export const table = {
  wrap: 'overflow-x-auto',
  table: 'w-full min-w-[640px] text-left text-sm',
  th: 'border-b border-line px-4 py-3 text-[10px] font-semibold tracking-[0.16em] text-muted uppercase',
  td: 'border-b border-line px-4 py-4 align-middle',
  row: 'transition-colors hover:bg-cream-50'
}

const appointmentStatus: Record<import('@/types/api').AppointmentStatus, [string, BadgeTone]> = {
  PENDIENTE: ['Pendiente', 'gold'],
  CONFIRMADA: ['Confirmada', 'success'],
  REPROGRAMADA: ['Reprogramada', 'muted'],
  CANCELADA: ['Cancelada', 'danger'],
  ATENDIDA: ['Atendida', 'navy'],
  NO_ASISTIO: ['No asistió', 'muted']
}
export const AppointmentStatusBadge = ({
  status
}: {
  status: import('@/types/api').AppointmentStatus
}) => <Badge tone={appointmentStatus[status][1]}>{appointmentStatus[status][0]}</Badge>
