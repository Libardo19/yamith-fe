/**
 * DATOS FICTICIOS para el borrador visual (/demo). No son pacientes reales.
 * Las fechas se calculan a partir de hoy para que el borrador siempre se vea "vivo".
 */
import type { CaseStatus, Lead, Overview, PatientRow } from '@/types/api'

const DAY = 86_400_000
const at = (days: number, hour: number, minute = 0) => {
  const d = new Date(Date.now() + days * DAY)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const demoDoctor = {
  name: 'Dr. Yamith Cuello',
  email: 'dryamit.evolutionplastic@gmail.com',
  role: 'ADMIN' as const
}
export const demoPatientUser = {
  name: 'Valentina Ruiz',
  email: 'valentina@correo.com',
  role: 'PATIENT' as const
}

export const demoOverview: Overview = {
  activePatients: 128,
  weekAppointments: 23,
  monthCases: 14,
  newLeads: 6,
  casesBySede: [
    { id: 'pereira', name: 'Sede Pereira', city: 'Pereira', total: 42 },
    { id: 'barranquilla', name: 'Sede Barranquilla', city: 'Barranquilla', total: 57 },
    { id: 'valledupar', name: 'Sede Valledupar', city: 'Valledupar', total: 29 }
  ],
  today: [
    {
      id: 'a1',
      startsAt: at(0, 9),
      type: 'VALORACION',
      patient: { id: 'p2', firstName: 'Isabella', lastName: 'Moreno' },
      sede: { name: 'Sede Barranquilla' }
    },
    {
      id: 'a2',
      startsAt: at(0, 10, 30),
      type: 'CONTROL',
      patient: { id: 'p1', firstName: 'Valentina', lastName: 'Ruiz' },
      sede: { name: 'Sede Pereira' }
    },
    {
      id: 'a3',
      startsAt: at(0, 11, 45),
      type: 'VIRTUAL',
      patient: { id: 'p6', firstName: 'Sara', lastName: 'Jiménez' },
      sede: { name: 'Sede Pereira' }
    },
    {
      id: 'a4',
      startsAt: at(0, 14, 15),
      type: 'CONTROL',
      patient: { id: 'p5', firstName: 'Laura', lastName: 'Gómez' },
      sede: { name: 'Sede Barranquilla' }
    },
    {
      id: 'a5',
      startsAt: at(0, 16),
      type: 'VALORACION',
      patient: { id: 'p3', firstName: 'Camila', lastName: 'Herrera' },
      sede: { name: 'Sede Valledupar' }
    }
  ]
}

const row = (
  id: string,
  firstName: string,
  lastName: string,
  city: 'Pereira' | 'Barranquilla' | 'Valledupar',
  procedure: string | null,
  status: CaseStatus | null,
  next: number | null,
  account: PatientRow['accountStatus'] = 'active'
): PatientRow => ({
  id,
  firstName,
  lastName,
  email: `${firstName.toLowerCase()}.${lastName.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')}@correo.com`,
  phone: '300 123 4567',
  documentNumber: null,
  sede: { id: city.toLowerCase(), name: `Sede ${city}`, city },
  accountStatus: account,
  lastCase: procedure && status ? { procedure, status } : null,
  nextAppointment:
    next === null
      ? null
      : { startsAt: at(next, 10), type: status === 'VALORACION' ? 'VALORACION' : 'CONTROL' },
  createdAt: at(-40, 9)
})

export const demoPatients: PatientRow[] = [
  row('p1', 'Valentina', 'Ruiz', 'Pereira', 'Lipoescultura VASER', 'POSTOP', 0),
  row('p2', 'Isabella', 'Moreno', 'Barranquilla', 'Aumento mamario', 'PROGRAMADO', 0),
  row('p3', 'Camila', 'Herrera', 'Valledupar', 'Abdominoplastia', 'VALORACION', 0),
  row('p4', 'Daniela', 'Castro', 'Pereira', 'Mastopexia', 'FINALIZADO', null),
  row('p5', 'Laura', 'Gómez', 'Barranquilla', 'Rinoplastia', 'POSTOP', 0),
  row('p6', 'Sara', 'Jiménez', 'Pereira', 'Transferencia de grasa glútea', 'PROGRAMADO', 6),
  row('p7', 'Mariana', 'López', 'Valledupar', null, null, 3, 'invited'),
  row('p8', 'Paula', 'Rendón', 'Barranquilla', 'Reducción mamaria', 'VALORACION', 9, 'unverified')
]

export const demoLeads: Lead[] = [
  {
    id: 'l1',
    name: 'Sofía Pérez',
    email: 'sofia@correo.com',
    phone: '3005551234',
    interest: 'Lipoescultura VASER',
    modality: 'PRESENCIAL',
    message: 'Quisiera saber disponibilidad en octubre.',
    status: 'NUEVO',
    source: 'FORM',
    createdAt: at(0, 8, 12),
    sede: { name: 'Sede Pereira', city: 'Pereira' }
  },
  {
    id: 'l2',
    name: 'Mariana López',
    email: null,
    phone: '3015559876',
    interest: 'Aumento mamario',
    modality: 'VIRTUAL',
    message: '¿Cuánto dura la recuperación?',
    status: 'NUEVO',
    source: 'FORM',
    createdAt: at(-1, 19, 40),
    sede: { name: 'Sede Valledupar', city: 'Valledupar' }
  },
  {
    id: 'l3',
    name: 'Andrea Quintero',
    email: 'andrea@correo.com',
    phone: '3024441122',
    interest: 'Rinoplastia',
    modality: 'PRESENCIAL',
    message: null,
    status: 'CONTACTADO',
    source: 'FORM',
    createdAt: at(-2, 11),
    sede: { name: 'Sede Barranquilla', city: 'Barranquilla' }
  },
  {
    id: 'l4',
    name: 'Juliana Ríos',
    email: 'juliana@correo.com',
    phone: '3207778899',
    interest: 'Abdominoplastia',
    modality: 'PRESENCIAL',
    message: 'Tengo dos hijos, ¿aplica para mí?',
    status: 'CONVERTIDO',
    source: 'FORM',
    createdAt: at(-5, 15),
    sede: { name: 'Sede Pereira', city: 'Pereira' }
  }
]

/** Ficha completa de la paciente de ejemplo (lo que el admin verá en F4). */
export const demoFicha = {
  id: 'p1',
  firstName: 'Valentina',
  lastName: 'Ruiz',
  email: 'valentina.ruiz@correo.com',
  phone: '300 123 4567',
  document: 'CC 1.088.xxx.xxx',
  birthDate: '14 de marzo de 1992 (34 años)',
  bloodType: 'O+',
  allergies: 'Penicilina',
  sede: 'Sede Pereira',
  procedure: 'Lipoescultura VASER + Retraction',
  status: 'POSTOP' as CaseStatus,
  surgeryDate: at(-10, 7),
  nextAppointment: at(2, 9),
  timeline: [
    {
      date: at(-40, 10),
      type: 'VALORACION',
      title: 'Valoración inicial',
      text: 'Plan: lipoescultura VASER de abdomen, flancos y espalda con retracción de piel. Se solicitan exámenes prequirúrgicos.',
      author: 'Dr. Yamith Cuello'
    },
    {
      date: at(-18, 9),
      type: 'CONTROL',
      title: 'Valoración por anestesiología',
      text: 'Paciente apta para el procedimiento. Exámenes dentro de límites normales.',
      author: 'Equipo de anestesiología'
    },
    {
      date: at(-10, 7),
      type: 'CIRUGIA',
      title: 'Cirugía',
      text: 'Lipoescultura VASER + Retraction. Procedimiento sin complicaciones. Salida el mismo día con prenda de compresión.',
      author: 'Dr. Yamith Cuello'
    },
    {
      date: at(-7, 10),
      type: 'CONTROL',
      title: 'Control día 3',
      text: 'Evolución adecuada. Inicia sesiones de cámara hiperbárica y drenaje linfático.',
      author: 'Dr. Yamith Cuello'
    },
    {
      date: at(-3, 11),
      type: 'NOTA',
      title: 'Sesión Tensamax 1/6',
      text: 'Buena tolerancia. Próxima sesión en 3 días.',
      author: 'Equipo de recuperación'
    }
  ],
  documents: [
    {
      name: 'Consentimiento informado — Lipoescultura VASER',
      kind: 'Consentimiento',
      date: at(-18, 9)
    },
    { name: 'Indicaciones posoperatorias', kind: 'Indicaciones', date: at(-10, 7) },
    { name: 'Orden de exámenes prequirúrgicos', kind: 'Orden', date: at(-40, 10) },
    { name: 'Fórmula médica', kind: 'Fórmula', date: at(-10, 7) }
  ],
  photos: [
    { stage: 'Antes', date: at(-40, 10), count: 4 },
    { stage: 'Control día 3', date: at(-7, 10), count: 4 },
    { stage: 'Control día 10', date: at(0, 10), count: 0 }
  ]
}

/** Citas del mes para el calendario (día relativo a hoy). */
export const demoCalendar = [
  { day: -6, hour: 9, type: 'VALORACION', who: 'Paula Rendón', sede: 'Barranquilla' },
  { day: -3, hour: 11, type: 'CONTROL', who: 'Valentina Ruiz', sede: 'Pereira' },
  { day: -2, hour: 7, type: 'CIRUGIA', who: 'Isabella Moreno', sede: 'Barranquilla' },
  { day: 0, hour: 9, type: 'VALORACION', who: 'Isabella Moreno', sede: 'Barranquilla' },
  { day: 0, hour: 10, type: 'CONTROL', who: 'Valentina Ruiz', sede: 'Pereira' },
  { day: 0, hour: 16, type: 'VALORACION', who: 'Camila Herrera', sede: 'Valledupar' },
  { day: 1, hour: 8, type: 'CIRUGIA', who: 'Sara Jiménez', sede: 'Pereira' },
  { day: 2, hour: 9, type: 'CONTROL', who: 'Valentina Ruiz', sede: 'Pereira' },
  { day: 3, hour: 15, type: 'VIRTUAL', who: 'Mariana López', sede: 'Valledupar' },
  { day: 6, hour: 10, type: 'CONTROL', who: 'Sara Jiménez', sede: 'Pereira' },
  { day: 8, hour: 7, type: 'CIRUGIA', who: 'Laura Gómez', sede: 'Barranquilla' },
  { day: 9, hour: 10, type: 'VALORACION', who: 'Paula Rendón', sede: 'Barranquilla' },
  { day: 12, hour: 14, type: 'CONTROL', who: 'Daniela Castro', sede: 'Pereira' }
].map((e) => ({ ...e, startsAt: at(e.day, e.hour) }))

export const demoSlots = ['8:00', '8:30', '9:00', '10:30', '11:00', '14:00', '15:30', '16:00']
