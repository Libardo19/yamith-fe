import {
  CalendarDays,
  Clock,
  ClipboardList,
  FileText,
  Home,
  Images,
  Inbox,
  LayoutDashboard,
  MapPin,
  Star,
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
  { href: `${base}/citas`, label: 'Citas', icon: CalendarDays },
  { href: `${base}/disponibilidad`, label: 'Disponibilidad', icon: Clock },
  { href: `${base}/solicitudes`, label: 'Solicitudes', icon: Inbox },
  { href: `${base}/procedimientos`, label: 'Procedimientos', icon: Stethoscope },
  { href: `${base}/galeria`, label: 'Galería', icon: Images },
  { href: `${base}/encuestas`, label: 'Encuestas', icon: Star },
  { href: `${base}/sedes`, label: 'Sedes', icon: MapPin, adminOnly: true },
  { href: `${base}/equipo`, label: 'Equipo', icon: UserCog, adminOnly: true },
  { href: `${base}/cuenta`, label: 'Mi cuenta', icon: UserRound }
]

export const portalNav = (base: string): NavItem[] => [
  { href: base, label: 'Inicio', icon: Home },
  { href: `${base}/procedimiento`, label: 'Mi procedimiento', icon: ClipboardList },
  { href: `${base}/citas`, label: 'Mis citas', icon: CalendarDays },
  { href: `${base}/fotos`, label: 'Mis fotos', icon: Images },
  { href: `${base}/documentos`, label: 'Mis documentos', icon: FileText },
  { href: `${base}/perfil`, label: 'Mi perfil', icon: UserRound }
]
