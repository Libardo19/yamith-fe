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
    'Cirugía plástica, estética y reconstructiva con valoración individual, planificación personalizada y acompañamiento antes, durante y después de cada procedimiento.',
  image: '/images/doctor-hero.webp'
}

export const differentiators = [
  {
    icon: 'shield',
    title: 'Ética médica',
    text: 'La salud y la seguridad orientan cada decisión. Una valoración individual permite explicar las opciones, los alcances y las limitaciones de cada procedimiento.'
  },
  {
    icon: 'cpu',
    title: 'Tecnología avanzada',
    text: 'VASER, MicroAire, Retraction, Tensamax y cámara hiperbárica: tecnologías con funciones distintas, seleccionadas según la valoración y las necesidades de cada caso.'
  },
  {
    icon: 'sparkles',
    title: 'Resultados naturales',
    text: 'Una visión estética centrada en la armonía, la proporción y las características individuales de cada paciente.'
  },
  {
    icon: 'heart',
    title: 'Acompañamiento',
    text: 'Seguimiento posoperatorio y acceso al portal del paciente para consultar la información de tu proceso.'
  }
] as const

export const technologies = [
  {
    name: 'VASER',
    kind: 'Lipoescultura asistida por ultrasonido',
    text: 'Utiliza energía de ultrasonido para fragmentar y emulsificar tejido graso antes de su aspiración. Es una herramienta de contorno corporal; no es un tratamiento para bajar de peso.',
    image: '/images/tec-vaser-studio.webp'
  },
  {
    name: 'MicroAire',
    kind: 'Liposucción asistida mecánicamente · PAL',
    text: 'El sistema PAL de MicroAire incorpora un movimiento mecánico de la cánula para facilitar la aspiración de grasa. A diferencia de VASER, su asistencia no se basa en ultrasonido. La elección de la técnica depende del plan quirúrgico individual.',
    image: null
  },
  {
    name: 'Retraction',
    kind: 'Radiofrecuencia para retracción cutánea',
    text: 'Aplica energía de radiofrecuencia para tratar tejidos y abordar la flacidez en casos seleccionados. Puede complementar la lipoescultura; no sustituye la retirada quirúrgica de piel cuando existe un exceso importante.',
    image: '/images/tec-retraction-studio.webp'
  },
  {
    name: 'Tensamax',
    kind: 'Radiofrecuencia posoperatoria',
    text: 'Tecnología de radiofrecuencia externa que puede formar parte de un plan de atención indicado por el médico. Su uso, el momento de inicio y las sesiones se definen según la evolución del paciente.',
    image: '/images/tec-tensamax-studio.webp'
  },
  {
    name: 'Cámara hiperbárica',
    kind: 'Oxigenación para la recuperación',
    text: 'La oxigenoterapia hiperbárica administra oxígeno en un entorno presurizado. Tiene indicaciones médicas específicas y requiere valoración y supervisión; no es necesaria de forma rutinaria después de toda cirugía estética.',
    image: '/images/tec-hiperbarica-editorial.webp'
  }
]

export const doctor = {
  experienceYears: 7,
  /** Memberships confirmed by the user on 2026-10-06. Logos from official society sites. */
  memberships: [
    {
      name: 'American Society of Plastic Surgeons (ASPS)',
      url: 'https://www.plasticsurgery.org/',
      logo: '/images/societies/asps.webp',
      confirmed: true
    },
    {
      name: 'International Society of Aesthetic Plastic Surgery (ISAPS)',
      url: 'https://www.isaps.org/',
      logo: '/images/societies/isaps.svg',
      confirmed: true
    },
    {
      name: 'Sociedad Colombiana de Cirugía Plástica Estética y Reconstructiva (SCCP)',
      url: 'https://cirugiaplastica.org.co/',
      logo: '/images/societies/sccp.webp',
      confirmed: true
    },
    {
      name: 'Federación Ibero-Latinoamericana de Cirugía Plástica (FILACP)',
      url: 'https://www.filacp.org/',
      logo: '/images/societies/filacp.webp',
      confirmed: true
    }
  ],
  eyebrow: 'Conoce al especialista',
  title: 'Precisión y criterio en cirugía plástica.',
  philosophy:
    'Cada paciente tiene una historia, unas expectativas y unas características propias. La valoración individual es el punto de partida para definir un plan que integre criterio médico, proporción y una visión estética natural.',
  paragraphs: [
    'El Dr. Yamith Cuello es cirujano plástico, estético y reconstructivo con 7 años de experiencia y más de 2.000 cirugías realizadas. Su enfoque combina la valoración individual, la precisión quirúrgica y una visión estética orientada a la armonía y la proporción.',
    'La historia clínica, las características de cada paciente y sus expectativas orientan la planificación. Una comunicación clara sobre las opciones y los alcances de cada procedimiento permite tomar decisiones informadas.',
    'Atiende en Pereira, Barranquilla y Valledupar, con valoraciones presenciales o virtuales y acompañamiento antes, durante y después del procedimiento.'
  ],
  highlights: [
    'Cirugía plástica estética y reconstructiva',
    'Atención en Pereira, Barranquilla y Valledupar',
    'Valoración presencial o virtual y seguimiento posoperatorio'
  ],
  /** Cifras confirmadas por el doctor (octubre 2026). */
  stats: { years: 7, surgeries: '2.000' },
  /** Credenciales: `pending` = falta confirmar con el doctor (no se publican). */
  credentials: [
    {
      title: '7 años de experiencia',
      text: 'Cirugía plástica, estética y reconstructiva.',
      pending: false
    },
    {
      title: 'Más de 2.000 cirugías',
      text: 'Realizadas por el Dr. Yamith Cuello.',
      pending: false
    },
    {
      title: 'Sociedades científicas',
      text: 'Miembro de ASPS, ISAPS, SCCP y FILACP.',
      pending: false
    },
    {
      title: 'Especialización en Cirugía Plástica',
      text: 'Institución y año por confirmar.',
      pending: true
    },
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
    text: 'La indicación, la técnica, el entorno de atención y el plan anestésico se revisan antes de confirmar el procedimiento.'
  },
  {
    title: 'Recuperación',
    text: 'Controles programados, terapias posoperatorias y seguimiento desde tu portal de paciente.'
  }
]

export const valuationFaq = [
  {
    question: '¿Qué se revisa durante la valoración?',
    answer:
      'Se conversa sobre tus objetivos y se revisan la historia clínica, los antecedentes y las características de la zona a tratar. La consulta permite comparar opciones, explicar sus límites y definir si es necesario realizar estudios antes de tomar una decisión.'
  },
  {
    question: '¿Puedo comenzar con una valoración virtual?',
    answer:
      'Puedes solicitar atención presencial o virtual. Una consulta a distancia permite una orientación inicial; el equipo te indicará si se necesita un examen presencial o información adicional para completar la evaluación.'
  },
  {
    question: '¿Cómo se define el costo del procedimiento?',
    answer:
      'La propuesta se prepara después de revisar el caso y el alcance de la atención. Solicita el detalle de lo incluido, los controles previstos y los posibles gastos adicionales antes de confirmar el plan.'
  },
  {
    question: '¿La misma tecnología se utiliza en todos los pacientes?',
    answer:
      'No. VASER, MicroAire, Retraction, Tensamax y cámara hiperbárica tienen funciones diferentes. Su uso debe responder a una indicación, a las características del procedimiento y a la evolución de cada paciente.'
  },
  {
    question: '¿Cómo se organiza el seguimiento después de la cirugía?',
    answer:
      'El plan incluye indicaciones de cuidado y controles según el procedimiento. El portal permite consultar información del proceso; si se necesita un examen presencial, el equipo lo indicará. Las situaciones urgentes requieren atención médica directa.'
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
    alt: 'Equipos de VASER y Retraction en la clínica',
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
export const isPendingWhatsapp = (number: string) =>
  !/^\+?[1-9]\d{9,14}$/.test(number) || /^570+$/.test(number)
