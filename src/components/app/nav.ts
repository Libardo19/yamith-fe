import {
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  Images,
  Inbox,
  LayoutDashboard,
  MapPin,
  Stethoscope,
  UserCog,
  UserRound,
  Users,
  type LucideIcon
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  /** Sólo visible para ADMIN. */
  adminOnly?: boolean
  /** Fase en la que se construye (se muestra como "pronto" en el panel real). */
  soon?: string
}

/** `base` = '/admin' (real) o '/demo/admin' (borrador con datos de ejemplo). */
export const adminNav = (base: string): NavItem[] => [
  { href: base, label: 'Vista general', icon: LayoutDashboard },
  { href: `${base}/pacientes`, label: 'Pacientes', icon: Users },
  { href: `${base}/citas`, label: 'Citas', icon: CalendarDays, soon: 'F3' },
  { href: `${base}/solicitudes`, label: 'Solicitudes', icon: Inbox },
  { href: `${base}/procedimientos`, label: 'Procedimientos', icon: Stethoscope },
  { href: `${base}/sedes`, label: 'Sedes', icon: MapPin, adminOnly: true },
  { href: `${base}/equipo`, label: 'Equipo', icon: UserCog, adminOnly: true },
  { href: `${base}/cuenta`, label: 'Mi cuenta', icon: UserRound }
]

export const portalNav = (base: string): NavItem[] => [
  { href: base, label: 'Inicio', icon: Home },
  { href: `${base}/procedimiento`, label: 'Mi procedimiento', icon: ClipboardList, soon: 'F4' },
  { href: `${base}/citas`, label: 'Mis citas', icon: CalendarDays, soon: 'F3' },
  { href: `${base}/fotos`, label: 'Mis fotos', icon: Images, soon: 'F4' },
  { href: `${base}/documentos`, label: 'Mis documentos', icon: FileText, soon: 'F4' },
  { href: `${base}/perfil`, label: 'Mi perfil', icon: UserRound }
]
