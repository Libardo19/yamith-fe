/**
 * Fechas en hora de Colombia (UTC-5 todo el año, sin horario de verano),
 * igual que el backend (yamith-be/src/utils/dates.ts).
 */
const OFFSET_MS = -5 * 60 * 60 * 1000

/** 'YYYY-MM-DD' + 'HH:mm' en Bogotá → ISO. */
export const bogotaISO = (date: string, time: string) =>
  new Date(`${date}T${time}:00-05:00`).toISOString()

/** Día calendario en Bogotá de un instante. */
export const bogotaDateKey = (d: Date | string) =>
  new Date(new Date(d).getTime() + OFFSET_MS).toISOString().slice(0, 10)

/** 'HH:mm' en Bogotá de un instante. */
export const bogotaTime = (d: Date | string) =>
  new Date(new Date(d).getTime() + OFFSET_MS).toISOString().slice(11, 16)

export const addDaysKey = (date: string, days: number) =>
  new Date(new Date(`${date}T12:00:00Z`).getTime() + days * 86_400_000).toISOString().slice(0, 10)

export const todayKey = () => bogotaDateKey(new Date())

export const WEEKDAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
]
