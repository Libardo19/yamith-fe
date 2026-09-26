/**
 * Copia del catálogo inicial del backend (yamith-be/prisma/data/procedures.ts).
 * Sólo es RESPALDO: la web lee el catálogo del API y usa esto si el API no responde
 * (build sin backend, caída). Si cambias el catálogo del seed, actualiza esta copia.
 */
export interface FallbackProcedure {
  slug: string
  name: string
  category: 'FACIAL' | 'CORPORAL' | 'MAMARIO'
  summary: string
  content: string
  benefits: string[]
  faq: Array<{ question: string; answer: string }>
  imageUrl: string
  isFeatured: boolean
  appointmentDuration: number
}

const commonFaq = [
  {
    question: '¿Cómo es la valoración?',
    answer:
      'Es una consulta con el Dr. Cuello, presencial o virtual, en la que revisa tus expectativas, tu historia clínica y tu anatomía para definir si el procedimiento es adecuado para ti y qué plan quirúrgico conviene.'
  },
  {
    question: '¿Qué exámenes necesito antes de la cirugía?',
    answer:
      'Después de la valoración recibirás la orden de exámenes prequirúrgicos según tu edad y antecedentes. Todo procedimiento requiere valoración por anestesiología.'
  }
]

export const fallbackProcedures: FallbackProcedure[] = [
  {
    slug: 'lipoescultura-vaser',
    name: 'Lipoescultura VASER',
    category: 'CORPORAL',
    summary:
      'Remodelación del contorno corporal con tecnología de ultrasonido VASER, que permite trabajar la grasa con mayor precisión y definición.',
    content:
      'La lipoescultura VASER utiliza energía de ultrasonido para emulsificar la grasa antes de extraerla. Esto facilita trabajar por planos y marcar zonas de definición, respetando vasos, nervios y tejido conectivo.\n\nSe complementa con tecnología de retracción de la piel cuando el caso lo requiere, y con un plan de recuperación personalizado que puede incluir terapias posoperatorias.',
    benefits: [
      'Mayor precisión en el contorno y la definición',
      'Menor trauma de los tejidos frente a técnicas convencionales',
      'Se puede combinar con transferencia de grasa',
      'Recuperación acompañada paso a paso'
    ],
    faq: [
      {
        question: '¿Cuánto dura la recuperación?',
        answer:
          'La mayoría de pacientes retoma actividades livianas en la primera o segunda semana. El resultado se aprecia de forma progresiva durante los meses siguientes, con el uso de prenda de compresión y terapias indicadas.'
      },
      ...commonFaq
    ],
    imageUrl: '/images/tec-vaser-retraction.webp',
    isFeatured: true,
    appointmentDuration: 30
  },
  {
    slug: 'abdominoplastia',
    name: 'Abdominoplastia',
    category: 'CORPORAL',
    summary:
      'Retira el exceso de piel y grasa del abdomen y repara la pared abdominal cuando está separada, por ejemplo después de embarazos o pérdidas de peso.',
    content:
      'La abdominoplastia retira el exceso de piel del abdomen inferior, reposiciona el ombligo y, cuando es necesario, repara la diástasis de los músculos rectos. Suele combinarse con lipoescultura para armonizar la cintura.\n\nLa cicatriz se planea para quedar baja y cubierta por la ropa interior.',
    benefits: [
      'Abdomen más plano y firme',
      'Corrección de la diástasis abdominal',
      'Cicatriz baja, planeada para ocultarse',
      'Combinable con lipoescultura'
    ],
    faq: commonFaq,
    imageUrl: '/images/marcacion.webp',
    isFeatured: true,
    appointmentDuration: 30
  },
  {
    slug: 'aumento-mamario',
    name: 'Aumento mamario',
    category: 'MAMARIO',
    summary:
      'Aumenta el volumen y mejora la forma del busto con implantes elegidos a la medida de tu cuerpo y de tus expectativas.',
    content:
      'En la valoración se eligen el tamaño, el perfil y la ubicación del implante con medidas de tu tórax y con probadores, para lograr un resultado proporcionado.\n\nEl Dr. Cuello te explica las opciones de incisión y de plano, y los cuidados y controles que requiere un implante a lo largo del tiempo.',
    benefits: [
      'Elección del implante con medidas y probadores',
      'Resultado proporcionado a tu figura',
      'Controles posoperatorios programados'
    ],
    faq: [
      {
        question: '¿Los implantes se deben cambiar?',
        answer:
          'No tienen una fecha fija de cambio, pero sí requieren controles periódicos. En la valoración se explican los escenarios en los que se recomienda un recambio.'
      },
      ...commonFaq
    ],
    imageUrl: '/images/implantes.webp',
    isFeatured: true,
    appointmentDuration: 30
  },
  {
    slug: 'mastopexia',
    name: 'Mastopexia',
    category: 'MAMARIO',
    summary:
      'Levanta y reposiciona el busto caído, con o sin implantes, devolviéndole una forma más firme y juvenil.',
    content:
      'La mastopexia reposiciona la glándula mamaria y el complejo areola-pezón a una altura más armónica y retira el exceso de piel. Puede hacerse sola o combinada con implantes cuando además se busca volumen.',
    benefits: [
      'Busto más elevado y firme',
      'Areola de tamaño proporcionado',
      'Opción de combinar con implantes'
    ],
    faq: commonFaq,
    imageUrl: '/images/valoracion-implantes.webp',
    isFeatured: true,
    appointmentDuration: 30
  },
  {
    slug: 'reduccion-mamaria',
    name: 'Reducción mamaria',
    category: 'MAMARIO',
    summary:
      'Disminuye el volumen del busto para aliviar molestias de espalda y cuello y lograr una figura más proporcionada.',
    content:
      'La reducción mamaria retira tejido glandular, grasa y piel para disminuir el tamaño del busto y elevarlo. Además del cambio estético, muchas pacientes buscan aliviar dolor de espalda, cuello u hombros.',
    benefits: [
      'Alivio de molestias posturales',
      'Busto más proporcionado',
      'Mayor comodidad en la actividad física'
    ],
    faq: commonFaq,
    imageUrl: '/images/valoracion-tablet.webp',
    isFeatured: false,
    appointmentDuration: 30
  },
  {
    slug: 'transferencia-grasa-glutea',
    name: 'Transferencia de grasa glútea',
    category: 'CORPORAL',
    summary:
      'Da volumen y proyección a los glúteos con tu propia grasa, obtenida durante la lipoescultura.',
    content:
      'La grasa obtenida en la lipoescultura se procesa y se injerta en los glúteos para mejorar su volumen y forma. Se realiza con protocolos de seguridad específicos para este procedimiento.',
    benefits: [
      'Resultado con tu propio tejido',
      'Armonía entre cintura y cadera',
      'Se realiza junto con la lipoescultura'
    ],
    faq: commonFaq,
    imageUrl: '/images/quirofano-cirugia.webp',
    isFeatured: false,
    appointmentDuration: 30
  },
  {
    slug: 'retraccion-de-piel',
    name: 'Retracción de piel (Retraction)',
    category: 'CORPORAL',
    summary:
      'Tecnología de energía subdérmica que ayuda a tensar la piel en zonas con flacidez, sola o complementando la lipoescultura.',
    content:
      'La tecnología Retraction aplica energía controlada bajo la piel para estimular su contracción y la producción de colágeno. Se usa en abdomen, brazos, muslos, cuello y otras zonas con flacidez leve a moderada.',
    benefits: [
      'Mejora la firmeza de la piel',
      'Mínimamente invasiva',
      'Complementa la lipoescultura'
    ],
    faq: commonFaq,
    imageUrl: '/images/tec-retraction.webp',
    isFeatured: false,
    appointmentDuration: 30
  },
  {
    slug: 'rinoplastia',
    name: 'Rinoplastia',
    category: 'FACIAL',
    summary:
      'Armoniza la forma de la nariz con el resto del rostro y, cuando se requiere, mejora la función respiratoria.',
    content:
      'La rinoplastia modifica el dorso, la punta y la base nasal para lograr una nariz en armonía con tus facciones. En la valoración se analizan tus proporciones faciales y se revisa la función respiratoria.',
    benefits: [
      'Nariz en armonía con el rostro',
      'Posibilidad de mejorar la respiración',
      'Plan quirúrgico personalizado'
    ],
    faq: commonFaq,
    imageUrl: '/images/doctor-consultorio.webp',
    isFeatured: true,
    appointmentDuration: 30
  },
  {
    slug: 'blefaroplastia',
    name: 'Blefaroplastia',
    category: 'FACIAL',
    summary:
      'Corrige el exceso de piel y las bolsas de los párpados para una mirada más descansada.',
    content:
      'La blefaroplastia retira el exceso de piel y reposiciona o retira bolsas de grasa en los párpados superiores, inferiores o ambos. Las incisiones se ocultan en los pliegues naturales.',
    benefits: [
      'Mirada más descansada',
      'Cicatrices ocultas en pliegues naturales',
      'Recuperación corta'
    ],
    faq: commonFaq,
    imageUrl: '/images/doctor-traje.webp',
    isFeatured: false,
    appointmentDuration: 30
  },
  {
    slug: 'recuperacion-posoperatoria',
    name: 'Recuperación posoperatoria',
    category: 'CORPORAL',
    summary:
      'Acompañamiento después de la cirugía con cámara hiperbárica y radiofrecuencia Tensamax para una recuperación más cómoda.',
    content:
      'El plan de recuperación puede incluir sesiones en cámara hiperbárica, que favorece la oxigenación de los tejidos, y radiofrecuencia Tensamax para mejorar la calidad de la piel y el contorno durante el posoperatorio. El Dr. Cuello define qué terapias y cuántas sesiones necesitas.',
    benefits: [
      'Cámara hiperbárica en la clínica',
      'Radiofrecuencia Tensamax',
      'Controles programados con el equipo médico'
    ],
    faq: commonFaq,
    imageUrl: '/images/tec-hiperbarica.webp',
    isFeatured: false,
    appointmentDuration: 30
  }
]
