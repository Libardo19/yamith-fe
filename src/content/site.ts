/**
 * Textos de la landing. ⚠️ PROVISIONALES: redactados a partir de la propuesta y de
 * las fotos de la sesión (equipos que aparecen en ellas). El doctor debe validarlos.
 * Lo marcado como `pending` no se muestra como hecho hasta que se confirme.
 */
import type { Sede } from '@/types/api'

export const brand = {
  name: 'Dr. Yamith Cuello',
  tagline: 'Plastic Surgery',
  specialty: 'Cirujano Plástico, Estético y Reconstructivo',
  cities: ['Pereira', 'Barranquilla', 'Valledupar']
}

export const hero = {
  eyebrow: 'Arte & precisión médica',
  title: ['Confía tu', 'transformación', 'a un experto.'],
  subtitle:
    'Cirugía plástica estética y reconstructiva con ética, tecnología de vanguardia y un acompañamiento cercano antes, durante y después de tu procedimiento.',
  image: '/images/doctor-hero.webp'
}

export const differentiators = [
  {
    icon: 'shield',
    title: 'Ética médica',
    text: 'Tu salud y tu seguridad van primero. Te decimos con honestidad qué es posible y qué no.'
  },
  {
    icon: 'cpu',
    title: 'Tecnología avanzada',
    text: 'VASER, Retraction, Tensamax y cámara hiperbárica para trabajar con precisión y cuidar tu recuperación.'
  },
  {
    icon: 'sparkles',
    title: 'Resultados naturales',
    text: 'Armonía y proporción: resaltamos tu belleza sin apariencias artificiales.'
  },
  {
    icon: 'heart',
    title: 'Acompañamiento',
    text: 'Seguimiento posoperatorio cercano y un portal para que sigas tu proceso paso a paso.'
  }
] as const

export const technologies = [
  {
    name: 'VASER',
    kind: 'Lipoescultura asistida por ultrasonido',
    text: 'Emulsifica la grasa antes de extraerla para esculpir con mayor precisión y menor trauma de los tejidos.',
    image: '/images/tec-vaser-retraction.webp'
  },
  {
    name: 'Retraction',
    kind: 'Retracción de piel con energía subdérmica',
    text: 'Estimula la contracción de la piel y la producción de colágeno en zonas con flacidez.',
    image: '/images/tec-retraction.webp'
  },
  {
    name: 'Tensamax',
    kind: 'Radiofrecuencia posoperatoria',
    text: 'Terapia no invasiva que acompaña la recuperación y mejora la calidad de la piel y el contorno.',
    image: '/images/tec-tensamax-sesion.webp'
  },
  {
    name: 'Cámara hiperbárica',
    kind: 'Oxigenación para la recuperación',
    text: 'Sesiones de oxígeno hiperbárico en la clínica que favorecen la recuperación de los tejidos.',
    image: '/images/tec-hiperbarica.webp'
  }
]

export const doctor = {
  eyebrow: 'Conoce al especialista',
  title: 'Arte y ciencia en perfecta armonía.',
  paragraphs: [
    'La cirugía plástica es el resultado de un entendimiento profundo de lo que cada paciente busca y necesita. Cada procedimiento se diseña a la medida, combinando precisión quirúrgica con una visión estética natural.',
    'El Dr. Yamith Cuello acompaña a sus pacientes en Pereira, Barranquilla y Valledupar, con un equipo y una tecnología pensados para que el proceso sea seguro y la recuperación, tranquila.'
  ],
  highlights: [
    'Cirugía plástica estética y reconstructiva',
    'Atención en Pereira, Barranquilla y Valledupar',
    'Tecnología VASER, Retraction y Tensamax'
  ],
  /** Credenciales por confirmar con el doctor: universidad, especialización, sociedades. */
  credentials: [
    {
      title: 'Especialización en Cirugía Plástica',
      text: 'Institución y año por confirmar.',
      pending: true
    },
    { title: 'Sociedades científicas', text: 'Membresías por confirmar.', pending: true },
    {
      title: 'Actualización continua',
      text: 'Congresos y formación en nuevas tecnologías.',
      pending: true
    }
  ],
  image: '/images/doctor-scrubs-logo.webp',
  secondaryImage: '/images/doctor-traje.webp'
}

export const processSteps = [
  {
    title: 'Valoración',
    text: 'Presencial o virtual. Escuchamos tus expectativas, revisamos tu historia y definimos un plan a tu medida.'
  },
  {
    title: 'Procedimiento',
    text: 'En quirófano certificado, con anestesiología y tecnología de vanguardia para tu seguridad.'
  },
  {
    title: 'Recuperación',
    text: 'Controles programados, terapias posoperatorias y seguimiento desde tu portal de paciente.'
  }
]

export const gallery = [
  { src: '/images/quirofano-lampara.webp', alt: 'El Dr. Cuello en el quirófano', tall: true },
  { src: '/images/valoracion-implantes.webp', alt: 'Valoración con probadores de implantes' },
  { src: '/images/equipo.webp', alt: 'Equipo quirúrgico' },
  { src: '/images/recepcion-logo.webp', alt: 'Recepción de la clínica', tall: true },
  { src: '/images/marcacion.webp', alt: 'Marcación prequirúrgica' },
  {
    src: '/images/tec-doctor-equipos.webp',
    alt: 'El Dr. Cuello con los equipos de VASER y Retraction',
    tall: true
  },
  { src: '/images/lavado.webp', alt: 'Protocolo de asepsia antes de la cirugía' },
  { src: '/images/quirofano-cirugia.webp', alt: 'Procedimiento en quirófano' }
]

/**
 * Respaldo de sedes si el API no responde. Direcciones y WhatsApp PENDIENTES:
 * el WhatsApp es el mismo del sitio anterior (lo único que se conserva) y se
 * carga desde el panel admin → Sedes.
 */
export const fallbackSedes: Sede[] = [
  {
    id: 'pereira',
    slug: 'pereira',
    name: 'Sede Pereira',
    city: 'Pereira',
    address: 'Dirección pendiente',
    whatsapp: '570000000000',
    phone: null,
    mapUrl: null,
    imageUrl: null
  },
  {
    id: 'barranquilla',
    slug: 'barranquilla',
    name: 'Sede Barranquilla',
    city: 'Barranquilla',
    address: 'Dirección pendiente',
    whatsapp: '570000000000',
    phone: null,
    mapUrl: null,
    imageUrl: null
  },
  {
    id: 'valledupar',
    slug: 'valledupar',
    name: 'Sede Valledupar',
    city: 'Valledupar',
    address: 'Dirección pendiente',
    whatsapp: '570000000000',
    phone: null,
    mapUrl: null,
    imageUrl: null
  }
]

export const categoryLabels = {
  FACIAL: 'Facial',
  CORPORAL: 'Corporal',
  MAMARIO: 'Mamario'
} as const

export const whatsappLink = (
  number: string,
  text = 'Hola, quiero agendar una valoración con el Dr. Yamith Cuello.'
) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`

/** true mientras el número sea el provisional del seed. */
export const isPendingWhatsapp = (number: string) => /^570+$/.test(number)
