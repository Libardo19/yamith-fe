/** Tipos de las respuestas del API (yamith-be). */

export type Role = 'ADMIN' | 'STAFF' | 'PATIENT'
export type ProcedureCategory = 'FACIAL' | 'CORPORAL' | 'MAMARIO'
export type CaseStatus = 'VALORACION' | 'PROGRAMADO' | 'POSTOP' | 'FINALIZADO' | 'CANCELADO'
export type LeadStatus = 'NUEVO' | 'CONTACTADO' | 'CONVERTIDO' | 'DESCARTADO'
export type AppointmentType = 'VALORACION' | 'CONTROL' | 'CIRUGIA' | 'VIRTUAL'
export type AccountStatus = 'active' | 'invited' | 'unverified' | 'inactive'

export interface ProcedureCard {
  id?: string
  slug: string
  name: string
  category: ProcedureCategory
  summary: string
  imageUrl: string | null
  isFeatured: boolean
}

export interface ProcedureDetail extends ProcedureCard {
  content: string
  benefits: string[]
  faq: Array<{ question: string; answer: string }>
  seoTitle?: string | null
  seoDescription?: string | null
}

export interface AdminProcedure extends ProcedureDetail {
  id: string
  isPublished: boolean
  sortOrder: number
  appointmentDuration: number
  _count?: { cases: number; leads: number }
}

export interface Sede {
  id: string
  slug: string
  name: string
  city: string
  address: string
  whatsapp: string
  phone: string | null
  mapUrl: string | null
  imageUrl: string | null
  isActive?: boolean
  sortOrder?: number
}

export interface SessionUser {
  id: string
  email: string
  name: string
  role: Role
  avatarUrl: string | null
  emailVerified: boolean
  hasPassword: boolean
  hasGoogle: boolean
  pendingEmail: string | null
  needsProfile: boolean
  patient: {
    id: string
    firstName: string
    lastName: string
    phone: string | null
    sedeId: string | null
  } | null
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PatientRow {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  documentNumber: string | null
  sede: { id: string; name: string; city: string } | null
  accountStatus: AccountStatus
  lastCase: { procedure: string; status: CaseStatus } | null
  nextAppointment: { startsAt: string; type: AppointmentType } | null
  createdAt: string
}

export interface PatientDetail {
  id: string
  firstName: string
  lastName: string
  phone: string | null
  documentType: string | null
  documentNumber: string | null
  birthDate: string | null
  bloodType: string | null
  allergies: string | null
  notes: string | null
  sedeId: string | null
  dataConsentAt: string | null
  createdAt: string
  sede: { id: string; name: string; city: string } | null
  user: {
    id: string
    email: string
    isActive: boolean
    lastLoginAt: string | null
    avatarUrl: string | null
    hasGoogle: boolean
  }
  accountStatus: AccountStatus
  cases: Array<{
    id: string
    status: CaseStatus
    surgeryDate: string | null
    createdAt: string
    procedure: { id: string; name: string; slug: string }
    sede: { name: string } | null
    _count: { events: number; files: number }
  }>
  appointments: Array<{
    id: string
    startsAt: string
    type: AppointmentType
    status: AppointmentStatus
    sede: { name: string }
  }>
}

export interface Lead {
  id: string
  name: string
  email: string | null
  phone: string
  interest: string | null
  modality: 'PRESENCIAL' | 'VIRTUAL' | null
  message: string | null
  status: LeadStatus
  source: 'FORM' | 'CHAT'
  createdAt: string
  sede: { name: string; city: string } | null
}

export interface StaffUser {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'STAFF'
  isActive: boolean
  activated: boolean
  lastLoginAt: string | null
  createdAt: string
}

export interface Overview {
  activePatients: number
  weekAppointments: number
  monthCases: number
  newLeads: number
  casesBySede: Array<{ id: string; name: string; city: string; total: number }>
  today: Array<{
    id: string
    startsAt: string
    type: AppointmentType
    patient: { id: string; firstName: string; lastName: string }
    sede: { name: string }
  }>
}

// ── Agenda (F3) ──────────────────────────────────────────────

export type AppointmentStatus =
  'PENDIENTE' | 'CONFIRMADA' | 'REPROGRAMADA' | 'CANCELADA' | 'ATENDIDA' | 'NO_ASISTIO'

export interface Appointment {
  id: string
  startsAt: string
  endsAt: string
  type: AppointmentType
  modality: 'PRESENCIAL' | 'VIRTUAL'
  status: AppointmentStatus
  notes: string | null
  cancelReason: string | null
  rescheduledFromId: string | null
  sede: { id?: string; name: string; city: string; address?: string }
  patient?: {
    id: string
    firstName: string
    lastName: string
    phone: string | null
    user: { email: string }
  }
  case?: { id: string; procedure: { name: string } } | null
}

export interface SlotDay {
  date: string
  slots: Array<{ startsAt: string; endsAt: string }>
}

export interface AvailabilityRule {
  id: string
  sedeId: string
  weekday: number
  startTime: string
  endTime: string
  slotMinutes: number
  isActive: boolean
  sede: { name: string; city: string }
}

export interface AvailabilityBlock {
  id: string
  sedeId: string | null
  startsAt: string
  endsAt: string
  reason: string | null
  sede: { name: string; city: string } | null
}

// ── Seguimiento (F4) ─────────────────────────────────────────

export type MediaType = 'FOTO' | 'CONSENTIMIENTO' | 'INDICACIONES' | 'OTRO'
export type MediaStage = 'ANTES' | 'DESPUES' | 'CONTROL'

export interface MediaFile {
  id: string
  caseId: string | null
  originalName: string
  mimeType: string
  sizeBytes: number
  type: MediaType
  stage: MediaStage | null
  title: string | null
  visibleToPatient: boolean
  takenAt: string | null
  createdAt: string
  case?: { procedure: { name: string } } | null
}

export interface TimelineEntry {
  id: string
  type: 'VALORACION' | 'CIRUGIA' | 'CONTROL' | 'NOTA'
  date: string
  title: string
  description: string | null
  visibleToPatient: boolean
  author: { name: string } | null
}

export interface TrackingCase {
  id: string
  status: CaseStatus
  surgeryDate: string | null
  finishedAt: string | null
  notes: string | null
  createdAt: string
  procedure: { id?: string; name: string; slug?: string }
  sede: { id?: string; name: string } | null
  events: TimelineEntry[]
  files?: MediaFile[]
  survey?: {
    sentAt?: string | null
    answeredAt: string | null
    rating?: number | null
    nps?: number | null
    comment?: string | null
  } | null
}

export interface PatientDashboard {
  nextAppointment: (Omit<Appointment, 'sede'> & { sede: { name: string; address: string } }) | null
  activeCase: TrackingCase | null
  casesCount: number
  photosCount: number
  latestDocuments: MediaFile[]
}

// ── Encuestas y galería (F5) ─────────────────────────────────

export interface SurveyResults {
  sent: number
  answered: number
  averageRating: number | null
  nps: number | null
  distribution: Array<{ rating: number; count: number }>
  items: Array<{
    id: string
    sentAt: string | null
    answeredAt: string | null
    rating: number | null
    nps: number | null
    comment: string | null
    procedure: string
    city: string | null
    patient: { id: string; firstName: string; lastName: string }
  }>
}

export interface GalleryItem {
  id: string
  beforeImageUrl: string
  afterImageUrl: string
  description: string | null
  consentRef?: string
  isPublished?: boolean
  sortOrder?: number
  procedure: { id?: string; slug?: string; name: string } | null
}
