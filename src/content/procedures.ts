/** Respaldo del catálogo CMS. Mantener sincronizado con yamith-be/prisma/data/procedures.ts. */
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

export const fallbackProcedures: FallbackProcedure[] = [
  {
    slug: 'lipoescultura-vaser',
    name: 'Lipoescultura VASER',
    category: 'CORPORAL',
    imageUrl: '/images/tec-vaser-retraction.webp',
    isFeatured: true,
    appointmentDuration: 30,
    summary:
      'Cirugía de contorno corporal que utiliza ultrasonido para facilitar la extracción de grasa localizada y trabajar las proporciones de las zonas tratadas.',
    content:
      'La lipoescultura VASER es una técnica de liposucción asistida por ultrasonido. La energía se aplica al tejido graso para facilitar su emulsificación antes de aspirarlo mediante cánulas. El objetivo es remodelar áreas con depósitos de grasa localizada, como abdomen, cintura, espalda o muslos, de acuerdo con la anatomía de cada paciente.\n\nLa definición que puede alcanzarse depende de la distribución de la grasa, la musculatura y la calidad de la piel. La tecnología es una herramienta dentro del plan quirúrgico: no reemplaza la valoración ni elimina los riesgos de la cirugía.\n\n## Valoración individual\n\nPuede considerarse en personas con depósitos de grasa localizada, buen estado general y expectativas realistas. En la consulta se revisan antecedentes, medicamentos, tabaquismo, elasticidad de la piel y objetivos de contorno. Si existe exceso importante de piel, pueden requerirse alternativas o procedimientos adicionales.\n\n## Preparación para el procedimiento\n\nLa preparación incluye la evaluación clínica y los estudios que indique el equipo médico. Informa todos los medicamentos y suplementos que utilizas; cualquier ajuste debe ser autorizado por quien los prescribe. También recibirás indicaciones sobre tabaco, ayuno, traslado y apoyo en casa.\n\n## Recuperación y seguimiento\n\nDurante las primeras semanas puede haber inflamación, moretones y cambios de sensibilidad. Según el plan, se indican prendas de compresión, cuidados de las incisiones y controles. El regreso al trabajo y al ejercicio se autoriza de forma progresiva, considerando la extensión de la cirugía y el tipo de actividad.\n\n## Riesgos y consideraciones\n\nEntre las complicaciones posibles están infección, sangrado, acumulación de líquido, irregularidades del contorno, alteraciones de sensibilidad y problemas de cicatrización. Existen además riesgos anestésicos y de trombosis. La asistencia por ultrasonido añade la posibilidad de lesión térmica. Todos deben revisarse antes de decidir.\n\n## Resultados y límites\n\nEl contorno cambia a medida que disminuye la inflamación durante los meses siguientes. Mantener un peso estable ayuda a conservarlo. La lipoescultura no trata la obesidad ni garantiza eliminar la celulitis, las estrías o toda la flacidez.',
    benefits: [
      'Remodelación de depósitos de grasa localizada',
      'Planificación de zonas según la anatomía',
      'Trabajo de las proporciones del contorno corporal',
      'Evaluación de técnicas complementarias cuando están indicadas'
    ],
    faq: [
      {
        question: '¿VASER y MicroAire son lo mismo?',
        answer:
          'No. VASER utiliza ultrasonido para actuar sobre el tejido graso; MicroAire PAL incorpora movimiento mecánico de la cánula durante la liposucción. La elección de la asistencia depende de las características del caso y del plan quirúrgico.'
      },
      {
        question: '¿La lipoescultura sirve para bajar de peso?',
        answer:
          'Su finalidad es el contorno corporal, no el tratamiento de la obesidad. En la valoración se analiza si tu estado de salud, tu peso y la calidad de la piel permiten considerar la cirugía.'
      },
      {
        question: '¿Cuándo se observa el resultado?',
        answer:
          'La inflamación inicial puede ocultar parte del contorno. Los cambios se aprecian progresivamente durante los meses siguientes; la evolución varía y requiere controles.'
      },
      {
        question: '¿Siempre se necesita retracción de piel?',
        answer:
          'No. La indicación depende de la elasticidad y del exceso de piel. En algunos casos basta la liposucción y en otros se evalúan tecnologías complementarias o cirugía para retirar piel.'
      }
    ]
  },
  {
    slug: 'abdominoplastia',
    name: 'Abdominoplastia',
    category: 'CORPORAL',
    imageUrl: '/images/marcacion.webp',
    isFeatured: true,
    appointmentDuration: 30,
    summary:
      'Cirugía que retira el exceso de piel y grasa del abdomen y puede corregir la separación de la pared muscular cuando la valoración lo indica.',
    content:
      'La abdominoplastia aborda el exceso de piel y grasa del abdomen, que puede aparecer después de embarazos, variaciones importantes de peso o cambios en la elasticidad de los tejidos. Cuando existe separación de los músculos rectos, el plan puede incluir la reparación de la pared abdominal.\n\nLa extensión de la cirugía depende de los hallazgos de la valoración. La ubicación y longitud de las incisiones, el tratamiento del ombligo y la posible combinación con liposucción se explican antes del procedimiento. La cicatriz es permanente, aunque su apariencia evoluciona.\n\n## Técnicas de lipoabdominoplastia\n\nEl Dr. Yamith maneja lipoabdominoplastia con efecto corset, lipoabdominoplastia 360° y lipoabdominoplastia en Flor de Lis. No son alternativas intercambiables: la elección depende del exceso de piel, la distribución de grasa, las condiciones de la pared abdominal y la salud general.\n\nLipoabdominoplastia con efecto corset: combina el tratamiento de grasa localizada con la corrección de piel y pared abdominal según la valoración. El objetivo es trabajar la relación entre abdomen y cintura. La denominación no implica una cintura predeterminada ni identifica por sí sola una técnica de plicatura concreta; el doctor explicará el abordaje propuesto.\n\nLipoabdominoplastia 360° (circunferencial o Body Lift): puede considerarse cuando el exceso de piel se extiende alrededor del tronco, hacia flancos y espalda. La planificación define las zonas a tratar, la extensión de la cicatriz y si conviene realizar el tratamiento por etapas. No equivale únicamente a liposucción 360°.\n\nLipoabdominoplastia en Flor de Lis: combina resecciones verticales y horizontales para abordar determinados patrones de exceso de piel, incluidos algunos casos después de una pérdida importante de peso. Añade una cicatriz vertical a la horizontal; sus implicaciones y cuidados se revisan antes de decidir.\n\n## Valoración individual\n\nSe evalúan la calidad de la piel, el tejido graso, la pared abdominal, las cirugías previas y el estado general. Un peso estable y expectativas realistas favorecen la planificación. Si se prevén embarazos o una pérdida importante de peso, puede ser conveniente aplazar la cirugía.\n\n## Preparación para el procedimiento\n\nEl equipo define los estudios preoperatorios y la evaluación anestésica según tus antecedentes. Debes informar medicamentos, suplementos y consumo de tabaco. Recibirás instrucciones individualizadas sobre preparación, traslado y acompañamiento, especialmente para el periodo inicial en casa.\n\n## Recuperación y seguimiento\n\nLa recuperación puede incluir apósitos, una prenda de soporte y drenajes temporales cuando sean necesarios. La inflamación y las molestias se controlan con las indicaciones prescritas. Los esfuerzos, el levantamiento de peso y el ejercicio abdominal se retoman únicamente con autorización; los controles permiten valorar heridas y evolución.\n\n## Riesgos y consideraciones\n\nLa cirugía puede producir sangrado, infección, acumulación de líquido, cambios de sensibilidad, asimetría y cicatrices desfavorables. También puede haber dificultades de cicatrización o pérdida de tejido. Deben considerarse los riesgos de anestesia, trombosis y posibles cirugías de revisión.\n\n## Resultados y límites\n\nBusca mejorar el perfil abdominal, pero no sustituye la pérdida de peso ni el ejercicio. Solo se retiran las estrías presentes en la piel eliminada. El embarazo, el envejecimiento y los cambios de peso pueden modificar el resultado.',
    benefits: [
      'Retirada del exceso de piel abdominal',
      'Remodelación del perfil del abdomen',
      'Evaluación de la diástasis muscular',
      'Planificación individual de incisiones y contorno'
    ],
    faq: [
      {
        question: '¿En qué se diferencia de una liposucción?',
        answer:
          'La liposucción extrae grasa localizada; la abdominoplastia retira piel y puede tratar la separación muscular. La valoración permite decidir cuál responde al problema principal o si conviene combinarlas.'
      },
      {
        question: '¿La cicatriz desaparece?',
        answer:
          'No. Es una cicatriz permanente cuya maduración y visibilidad varían. Antes de la cirugía se explican su ubicación, extensión y cuidados.'
      },
      {
        question: '¿Puedo operarme si planeo otro embarazo?',
        answer:
          'Los embarazos pueden volver a distender la piel y la pared abdominal. Si estás considerando un embarazo, coméntalo para valorar el momento más adecuado.'
      },
      {
        question: '¿Cuándo puedo volver a hacer ejercicio?',
        answer:
          'El retorno depende de la evolución y del tipo de actividad. Los ejercicios intensos y los esfuerzos abdominales requieren autorización en los controles, no un plazo idéntico para todos.'
      }
    ]
  },
  {
    slug: 'aumento-mamario',
    name: 'Aumento mamario',
    category: 'MAMARIO',
    imageUrl: '/images/implantes.webp',
    isFeatured: true,
    appointmentDuration: 30,
    summary:
      'Cirugía para aumentar el volumen mamario con implantes, seleccionados según las medidas del tórax, los tejidos y los objetivos de cada paciente.',
    content:
      'El aumento mamario modifica el volumen y la proyección de las mamas mediante implantes. Puede considerarse cuando se desea mayor volumen, recuperar plenitud después de cambios corporales o abordar diferencias de tamaño. La planificación busca una relación proporcionada con el tórax y los tejidos disponibles.\n\nEn la valoración se revisan las opciones de tamaño, perfil, incisión y ubicación. El aumento por sí solo no corrige toda caída del busto: cuando existe exceso de piel o descenso importante, puede ser necesario evaluar una mastopexia.\n\n## Valoración individual\n\nSe revisan el desarrollo mamario, el estado general, antecedentes personales y familiares, embarazos, lactancia y expectativas. Las medidas y la calidad de los tejidos orientan la selección del implante. La cirugía debe responder a una decisión personal informada, con objetivos realistas.\n\n## Preparación para el procedimiento\n\nLos estudios y las imágenes mamarias se indican según edad, antecedentes y evaluación clínica. Comunica todos los medicamentos y suplementos y sigue las instrucciones de preparación que reciba tu caso. Conviene organizar traslado y acompañamiento para el periodo inicial.\n\n## Recuperación y seguimiento\n\nAl inicio pueden presentarse inflamación, tensión, molestias y cambios de sensibilidad. Puede indicarse un sostén de soporte y cuidados de las incisiones. Las actividades físicas se retoman progresivamente con autorización. Además de los controles posoperatorios, los implantes requieren seguimiento a largo plazo.\n\n## Riesgos y consideraciones\n\nLos riesgos incluyen infección, sangrado, cambios de sensibilidad, asimetría, desplazamiento, rotura y contractura capsular, que es el endurecimiento de la cápsula alrededor del implante. También se revisan los riesgos anestésicos y la posibilidad de nuevas cirugías. Deben explicarse el BIA-ALCL y otros cánceres poco frecuentes de la cápsula descritos por las autoridades sanitarias.\n\n## Resultados y límites\n\nLa forma inicial cambia al disminuir la inflamación y adaptarse los tejidos. Los implantes no son dispositivos de por vida: pueden requerir extracción o recambio por complicaciones o cambios en las preferencias. Los controles y estudios se individualizan.',
    benefits: [
      'Aumento del volumen y la proyección mamaria',
      'Selección del implante según medidas y tejidos',
      'Evaluación de diferencias de tamaño',
      'Plan de seguimiento y vigilancia del implante'
    ],
    faq: [
      {
        question: '¿Cómo se elige el tamaño del implante?',
        answer:
          'La elección considera las medidas del tórax, el tejido disponible, la elasticidad y tus objetivos. Un volumen mayor no siempre es apropiado; en consulta se revisan las opciones y sus límites.'
      },
      {
        question: '¿Los implantes se cambian cada diez años?',
        answer:
          'No existe un plazo único de recambio para todos, pero tampoco se consideran implantes de por vida. La necesidad de revisión o recambio depende de síntomas, estudios, complicaciones y evolución.'
      },
      {
        question: '¿Necesitaré controles aunque me sienta bien?',
        answer:
          'Sí. Los controles permiten valorar el implante y los tejidos. El tipo de estudio y su frecuencia dependen del implante, sus indicaciones y tu situación clínica.'
      },
      {
        question: '¿El aumento levanta un busto caído?',
        answer:
          'No necesariamente. Una caída importante puede requerir mastopexia, sola o asociada a implantes. La valoración distingue la falta de volumen del exceso de piel.'
      }
    ]
  },
  {
    slug: 'mastopexia',
    name: 'Mastopexia',
    category: 'MAMARIO',
    imageUrl: '/images/valoracion-implantes.webp',
    isFeatured: true,
    appointmentDuration: 30,
    summary:
      'Cirugía que eleva y remodela las mamas mediante el tratamiento del exceso de piel y la reposición de los tejidos, con o sin implantes.',
    content:
      'La mastopexia, o elevación mamaria, busca reorganizar la forma y la posición de las mamas cuando existe caída o pérdida de soporte. Retira piel excedente y reposiciona el complejo areola-pezón de acuerdo con la anatomía. Los cambios pueden relacionarse con embarazo, lactancia, variaciones de peso o envejecimiento.\n\nPuede realizarse sin implantes cuando el volumen disponible permite responder al objetivo de forma. Si también se desea mayor plenitud, se evalúa la combinación con aumento mamario. Las incisiones varían y dejan cicatrices permanentes.\n\n## Valoración individual\n\nSe valoran el grado de caída, la posición del pezón, el volumen, la calidad de la piel y posibles diferencias entre ambas mamas. También se revisan antecedentes, estado general y planes de embarazo. Un peso estable y objetivos claros ayudan a definir las opciones.\n\n## Preparación para el procedimiento\n\nLa evaluación determina los estudios de laboratorio y las imágenes mamarias pertinentes. Informa medicamentos, suplementos, tabaco y antecedentes de cicatrización. El equipo explica la preparación, las opciones de incisión y la organización del apoyo durante la recuperación.\n\n## Recuperación y seguimiento\n\nSe indican cuidados de las heridas y, según el caso, un sostén de soporte. Puede haber inflamación, molestias y cambios temporales de sensibilidad. Los controles permiten revisar la cicatrización y autorizar gradualmente las actividades. La recuperación también depende de si se combinó con implantes u otra cirugía.\n\n## Riesgos y consideraciones\n\nPuede haber sangrado, infección, asimetría, alteraciones de sensibilidad, cicatrización desfavorable y problemas de irrigación del pezón o la areola. También existen riesgos anestésicos, trombosis y necesidad de revisión. Si se añaden implantes, deben explicarse sus riesgos y controles particulares.\n\n## Resultados y límites\n\nLa mastopexia cambia la posición y el contorno, pero por sí sola no añade un aumento significativo de volumen. Los tejidos continúan cambiando con el tiempo; embarazos, variaciones de peso y envejecimiento pueden modificar la forma obtenida.',
    benefits: [
      'Elevación y remodelación del contorno mamario',
      'Tratamiento del exceso de piel',
      'Reposición del complejo areola-pezón',
      'Evaluación de opciones con o sin implantes'
    ],
    faq: [
      {
        question: '¿Siempre se necesitan implantes?',
        answer:
          'No. La decisión depende del volumen existente y del objetivo de plenitud. Una mastopexia sin implantes puede ser una opción; la combinación se evalúa cuando también se desea aumento.'
      },
      {
        question: '¿Qué tipo de cicatriz queda?',
        answer:
          'La extensión depende del exceso de piel y de la técnica. Las cicatrices son permanentes y su ubicación se explica durante la planificación.'
      },
      {
        question: '¿Puedo dar lactancia después?',
        answer:
          'La cirugía puede afectar la sensibilidad y la capacidad de lactancia. Si deseas embarazarte o lactar en el futuro, conviene discutirlo antes de decidir.'
      },
      {
        question: '¿El resultado permanece igual para siempre?',
        answer:
          'No. La cirugía no detiene el envejecimiento ni los cambios de peso o embarazo. Los controles permiten valorar la evolución de los tejidos.'
      }
    ]
  },
  {
    slug: 'reduccion-mamaria',
    name: 'Reducción mamaria',
    category: 'MAMARIO',
    imageUrl: '/images/valoracion-tablet.webp',
    isFeatured: false,
    appointmentDuration: 30,
    summary:
      'Cirugía que reduce el volumen y el peso de las mamas y remodela su forma, valorando tanto las proporciones como las molestias asociadas.',
    content:
      'La reducción mamaria retira parte del tejido mamario, grasa y piel para disminuir el volumen y reorganizar el contorno. Puede responder a objetivos de proporción y a molestias relacionadas con el peso del busto, como dolor de cuello, espalda u hombros, marcas del sostén o irritación del pliegue mamario.\n\nLa cantidad de tejido que puede retirarse, la posición del pezón y las incisiones se planifican individualmente. Aunque muchas pacientes buscan alivio funcional, el efecto sobre cada síntoma depende de su causa y requiere valoración.\n\n## Valoración individual\n\nSe revisan el volumen, la calidad de la piel, los síntomas y sus repercusiones cotidianas. También se consideran antecedentes mamarios, tabaquismo, estado general y expectativas. Las molestias que tengan otras causas pueden necesitar evaluación adicional; el tamaño final no se define por una talla universal.\n\n## Preparación para el procedimiento\n\nLa preparación puede incluir examen clínico, laboratorio y estudios mamarios según edad e historia personal o familiar. Debes comunicar medicación, suplementos y consumo de tabaco o vapeo. Los ajustes de tratamiento y las instrucciones preoperatorias corresponden al equipo médico.\n\n## Recuperación y seguimiento\n\nTras la cirugía pueden indicarse apósitos, sostén de soporte y, en algunos casos, drenajes temporales. Es habitual que la inflamación o los moretones oculten inicialmente la forma final. Los cuidados de heridas, el control de molestias y el retorno gradual a las actividades se revisan en consulta.\n\n## Riesgos y consideraciones\n\nLos riesgos incluyen sangrado, infección, cicatrices desfavorables, asimetría, cambios de sensibilidad y problemas de cicatrización o irrigación del pezón y la areola. La capacidad de lactancia puede verse limitada. También deben valorarse los riesgos anestésicos, trombosis y posibles cirugías adicionales.\n\n## Resultados y límites\n\nEl objetivo es un volumen más proporcionado y menor carga sobre los tejidos. La evolución de la forma y de las cicatrices es progresiva. Cambios de peso, embarazos y envejecimiento pueden alterar el contorno; el alivio de síntomas no puede garantizarse en todos los casos.',
    benefits: [
      'Disminución del volumen y del peso mamario',
      'Remodelación y elevación del contorno',
      'Posible alivio de molestias asociadas al peso',
      'Planificación de proporciones y cuidados individuales'
    ],
    faq: [
      {
        question: '¿Es únicamente una cirugía estética?',
        answer:
          'Puede tener objetivos estéticos y funcionales. En consulta se analizan las molestias, su relación con el peso mamario y las opciones de atención.'
      },
      {
        question: '¿Puedo elegir una talla exacta?',
        answer:
          'Las tallas varían entre marcas y no describen por sí solas la anatomía. Se acuerdan objetivos de volumen y proporción dentro de los límites de los tejidos.'
      },
      {
        question: '¿Puede afectar la lactancia?',
        answer:
          'Sí, puede limitarla y modificar la sensibilidad. Este aspecto debe discutirse antes de la cirugía si existe un proyecto de embarazo o lactancia.'
      },
      {
        question: '¿Cuándo se aprecia la forma final?',
        answer:
          'La inflamación inicial y la adaptación de los tejidos toman tiempo. Los controles permiten revisar la evolución durante los meses siguientes.'
      }
    ]
  },
  {
    slug: 'transferencia-grasa-glutea',
    name: 'Transferencia de grasa glútea',
    category: 'CORPORAL',
    imageUrl: '/images/quirofano-cirugia.webp',
    isFeatured: false,
    appointmentDuration: 30,
    summary:
      'Cirugía que utiliza grasa propia obtenida por liposucción para modificar el volumen y el contorno glúteo, con una evaluación de seguridad específica.',
    content:
      'La transferencia de grasa glútea utiliza tejido graso del propio paciente, obtenido de zonas donantes mediante liposucción y preparado para su injerto. Su finalidad es modificar el volumen, la proyección y la relación entre cintura y cadera. No es una inyección de silicona ni de biopolímeros.\n\nNo toda la grasa transferida permanece: una parte puede reabsorberse y la evolución varía. La cantidad que puede obtenerse e injertarse depende de la anatomía y de los límites de seguridad; no existe un volumen universal adecuado.\n\n## Valoración individual\n\nSe revisan la disponibilidad de grasa, la calidad de los tejidos, el estado de salud y las expectativas. Es importante conversar sobre alternativas y sobre los riesgos específicos de este procedimiento, que requiere una valoración particularmente cuidadosa.\n\n## Preparación para el procedimiento\n\nLa preparación incluye evaluación clínica y anestésica, estudios pertinentes y revisión de medicamentos y tabaco. Deben organizarse el traslado, el apoyo en casa y los controles posteriores. Si viajas para operarte, acuerda con el equipo la continuidad del seguimiento y el momento apropiado para regresar.\n\n## Recuperación y seguimiento\n\nAdemás de los cuidados de las zonas de liposucción, el equipo explica cómo evitar presión excesiva sobre el área injertada al sentarse o descansar. Las prendas y el regreso a las actividades se individualizan. Dificultad respiratoria o dolor torácico después de la cirugía requieren atención de urgencias.\n\n## Riesgos y consideraciones\n\nLa embolia grasa es una complicación grave que puede ser mortal. Las sociedades de cirugía plástica recomiendan mantener el injerto en el plano subcutáneo, por encima de la fascia muscular, y emplear ecografía en tiempo real para verificar la posición de la cánula. Estas recomendaciones deben discutirse en la valoración; no eliminan todos los riesgos.\n\nTambién pueden aparecer infección, sangrado, asimetría, necrosis grasa, acumulación de líquido y complicaciones de anestesia o trombosis. El protocolo concreto y la decisión de operar deben revisarse directamente con el cirujano.\n\n## Resultados y límites\n\nLa forma cambia con la inflamación y la supervivencia del injerto. Pueden persistir asimetrías o requerirse revisión. Un peso estable contribuye a conservar el contorno, pero no se puede garantizar un volumen final exacto.',
    benefits: [
      'Uso de tejido graso propio',
      'Evaluación conjunta de zonas donantes y contorno glúteo',
      'Planificación de la relación cintura-cadera',
      'Definición de objetivos dentro de límites de seguridad'
    ],
    faq: [
      {
        question: '¿La grasa se inyecta en el músculo?',
        answer:
          'Las recomendaciones de seguridad de las sociedades citadas indican mantener la inyección en el tejido subcutáneo, por encima de la fascia glútea, y verificar el plano con ecografía en tiempo real. Pregunta cómo se aplica este criterio en tu caso.'
      },
      {
        question: '¿Toda la grasa transferida permanece?',
        answer:
          'No. Parte del tejido puede reabsorberse. La evolución del volumen depende de cada paciente y no permite prometer una cantidad final exacta.'
      },
      {
        question: '¿Es igual a un tratamiento con biopolímeros?',
        answer:
          'No. Esta cirugía utiliza grasa propia. Los riesgos del injerto deben analizarse de forma específica; utilizar tejido propio no vuelve el procedimiento libre de riesgos.'
      },
      {
        question: '¿Cuándo puedo sentarme normalmente?',
        answer:
          'Las indicaciones sobre apoyo y presión se adaptan al procedimiento y a la evolución. Debes seguir el plan del cirujano y confirmarlo durante los controles.'
      }
    ]
  },
  {
    slug: 'retraccion-de-piel',
    name: 'Retracción de piel (Retraction)',
    category: 'CORPORAL',
    imageUrl: '/images/tec-retraction.webp',
    isFeatured: false,
    appointmentDuration: 30,
    summary:
      'Tratamiento con radiofrecuencia orientado a la retracción cutánea en casos seleccionados, que puede complementar la cirugía de contorno corporal.',
    content:
      'Retraction es una plataforma de radiofrecuencia utilizada para el tratamiento de tejidos y la retracción cutánea. La energía genera un efecto térmico controlado; la pieza de mano y el abordaje dependen de la zona y del plan médico. Puede integrarse a procedimientos de contorno corporal cuando la calidad de la piel lo permite.\n\nLa retracción cutánea y la extracción de grasa cumplen funciones distintas. Esta tecnología no sustituye automáticamente una abdominoplastia u otra cirugía que retire piel sobrante, ni garantiza corregir cualquier grado de flacidez.\n\n## Valoración individual\n\nLa consulta permite distinguir entre grasa localizada, flacidez y exceso de piel. Se revisan cirugías previas, cicatrices, calidad del tejido y condiciones de salud. Es importante informar si tienes dispositivos implantados y conocer qué abordaje se propone, sus alternativas y limitaciones.\n\n## Preparación para el procedimiento\n\nCuando se integra a una cirugía, la preparación sigue el plan clínico y anestésico de ese procedimiento. Comunica medicamentos y antecedentes. Antes de decidir, solicita información sobre el equipo, el abordaje, el control de la energía y los cuidados que requerirá la zona.\n\n## Recuperación y seguimiento\n\nLa recuperación depende de la zona tratada, la modalidad y la combinación con otras cirugías. Puede haber inflamación, sensibilidad o molestias. Los cuidados locales, las prendas de soporte y el retorno a actividades se definen individualmente. No deben iniciarse terapias complementarias sin indicación del equipo tratante.\n\n## Riesgos y consideraciones\n\nEl uso de energía térmica requiere control y tiene riesgos de lesión de los tejidos. Si se combina con liposucción, también deben revisarse sus posibles complicaciones: infección, sangrado, alteraciones de sensibilidad, irregularidades y cicatrización desfavorable. La valoración debe explicar los riesgos específicos del abordaje propuesto.\n\n## Resultados y límites\n\nLos cambios se valoran progresivamente y dependen de la respuesta de la piel. Una flacidez importante puede requerir cirugía de resección. Las fotografías de otros pacientes no permiten predecir tu respuesta individual.',
    benefits: [
      'Evaluación dirigida de la flacidez cutánea',
      'Posible complemento del contorno corporal',
      'Selección del abordaje según la zona',
      'Comparación con alternativas de retirada de piel'
    ],
    faq: [
      {
        question: '¿Retraction es lo mismo que Renuvion o un láser?',
        answer:
          'No deben confundirse marcas o tecnologías. Retraction es una plataforma de radiofrecuencia; en la valoración se debe precisar el equipo y el abordaje que se utilizarán.'
      },
      {
        question: '¿Puede sustituir una abdominoplastia?',
        answer:
          'No en todos los casos. Cuando existe un exceso importante de piel, puede ser necesaria su retirada quirúrgica. La valoración distingue qué problema predomina.'
      },
      {
        question: '¿Se usa siempre junto a la lipoescultura?',
        answer:
          'No. La elección depende de la elasticidad, la zona y el objetivo del tratamiento. Una tecnología adicional solo se considera cuando tiene indicación para el caso.'
      },
      {
        question: '¿La recuperación es igual para todos?',
        answer:
          'No. Cambia según el abordaje y si se combina con otros procedimientos. El equipo define cuidados, controles y retorno a las actividades.'
      }
    ]
  },
  {
    slug: 'rinoplastia',
    name: 'Rinoplastia',
    category: 'FACIAL',
    imageUrl: '/images/doctor-consultorio.webp',
    isFeatured: true,
    appointmentDuration: 30,
    summary:
      'Cirugía que modifica la forma y las proporciones de la nariz y puede abordar alteraciones estructurales de la respiración cuando están indicadas.',
    content:
      'La rinoplastia modifica estructuras de la nariz para trabajar su relación con el rostro. Puede abordar el dorso, la punta, el ancho o ciertas asimetrías. Cuando existe una alteración estructural que afecta la respiración, se evalúa si corresponde incluir un tratamiento funcional.\n\nLa planificación considera la piel, los cartílagos, la estructura ósea y el equilibrio facial. No busca reproducir una nariz idéntica a una fotografía: las posibilidades dependen de la anatomía y de la función. La simetría perfecta no puede garantizarse.\n\n## Valoración individual\n\nSe revisan objetivos, antecedentes de golpes o cirugías, crecimiento facial y estado general. La evaluación de la respiración ayuda a distinguir problemas estructurales de otras causas de obstrucción. Tener expectativas realistas es esencial para definir qué cambios son posibles y convenientes.\n\n## Preparación para el procedimiento\n\nLa preparación incluye estudios y evaluación anestésica según la historia clínica. Comunica medicamentos, suplementos y consumo de tabaco. El equipo explica el plan, las incisiones previstas y las instrucciones de ayuno, traslado y acompañamiento; no ajustes tratamientos por cuenta propia.\n\n## Recuperación y seguimiento\n\nPuede utilizarse una férula, apósitos o soporte interno según la técnica. La inflamación, los moretones o la sensación de obstrucción inicial varían. Debes seguir los cuidados y evitar esfuerzos o golpes de acuerdo con las indicaciones. La definición del contorno puede continuar hasta alrededor de un año, y en algunos casos más.\n\n## Riesgos y consideraciones\n\nLos riesgos incluyen infección, alteraciones de sensibilidad, cicatrización desfavorable, asimetría y dificultades respiratorias. Puede producirse una perforación del tabique o requerirse una cirugía de revisión. También existen riesgos anestésicos; se explican según el procedimiento propuesto.\n\n## Resultados y límites\n\nLa nariz cambia progresivamente al disminuir la inflamación. El resultado depende de la estructura inicial y de la respuesta de los tejidos. Los controles permiten evaluar la forma y la función; las imágenes de referencia sirven para conversar sobre objetivos, no como garantía.',
    benefits: [
      'Trabajo de las proporciones nasales y faciales',
      'Evaluación estética y funcional de la nariz',
      'Planificación de cambios en dorso, punta o ancho',
      'Definición de objetivos según la anatomía'
    ],
    faq: [
      {
        question: '¿La rinoplastia siempre mejora la respiración?',
        answer:
          'No. La mejoría funcional depende de la causa de la obstrucción y del tratamiento indicado. Es necesario evaluar la función nasal antes de planificar la cirugía.'
      },
      {
        question: '¿Puedo pedir la nariz de una fotografía?',
        answer:
          'La fotografía puede ayudar a expresar tus preferencias, pero la piel, los cartílagos y el rostro condicionan lo que puede lograrse. Se plantean objetivos propios y realistas.'
      },
      {
        question: '¿Cuándo se aprecia la forma definitiva?',
        answer:
          'La inflamación inicial baja gradualmente y la definición continúa durante meses. Puede tomar alrededor de un año o más en algunos casos.'
      },
      {
        question: '¿Se puede necesitar una segunda cirugía?',
        answer:
          'Sí. Pueden persistir cambios de forma o función que hagan necesaria una revisión. La posibilidad se explica junto con los demás riesgos.'
      }
    ]
  },
  {
    slug: 'blefaroplastia',
    name: 'Blefaroplastia',
    category: 'FACIAL',
    imageUrl: '/images/doctor-traje.webp',
    isFeatured: false,
    appointmentDuration: 30,
    summary:
      'Cirugía de los párpados superiores, inferiores o ambos para tratar exceso de piel o bolsas, según la anatomía y la evaluación ocular.',
    content:
      'La blefaroplastia aborda el exceso de piel y ciertas bolsas de grasa de los párpados. Puede realizarse en los superiores, inferiores o ambos, según los hallazgos. La técnica busca trabajar el contorno de la región ocular y conservar su función.\n\nUna apariencia de párpado caído no siempre se debe solo a piel sobrante: también puede relacionarse con la posición de las cejas o con una alteración del músculo elevador. Por eso es necesario identificar la causa antes de elegir el tratamiento.\n\n## Valoración individual\n\nSe evalúan piel, bolsas, posición de los párpados y antecedentes de salud ocular. Informa sequedad, problemas visuales, enfermedades oculares y cirugías previas. En determinados casos puede requerirse evaluación oftalmológica. Las expectativas deben incluir los límites de la cirugía sobre ojeras y arrugas.\n\n## Preparación para el procedimiento\n\nLos estudios y la preparación se ajustan al estado de salud y al plan anestésico. Comunica medicamentos y suplementos, así como tratamientos oculares. Se explica el cuidado posterior y se organiza el acompañamiento; cualquier ajuste de medicación requiere indicación profesional.\n\n## Recuperación y seguimiento\n\nPueden aparecer moretones, inflamación, irritación o sequedad. El equipo puede indicar cuidados locales, lubricación o medidas de protección de acuerdo con el caso. La retirada de puntos, el uso de lentes de contacto y el regreso al trabajo o ejercicio se revisan en los controles.\n\n## Riesgos y consideraciones\n\nEntre los riesgos están infección, sangrado, cicatrices desfavorables, sequedad persistente y dificultad para cerrar los ojos. Puede alterarse la posición del párpado inferior o requerirse revisión. Existen riesgos anestésicos y, de forma poco frecuente, alteraciones graves de la visión. Estos aspectos se analizan antes de decidir.\n\n## Resultados y límites\n\nLa inflamación inicial puede ocultar el cambio. La apariencia y las cicatrices evolucionan de forma progresiva. La cirugía no elimina necesariamente las ojeras pigmentadas ni todas las arrugas, y el envejecimiento continúa después del procedimiento.',
    benefits: [
      'Tratamiento del exceso de piel palpebral',
      'Evaluación y manejo de bolsas de grasa',
      'Planificación de párpados superiores o inferiores',
      'Valoración de la función y del contorno ocular'
    ],
    faq: [
      {
        question: '¿La cirugía elimina todas las ojeras?',
        answer:
          'No. Las ojeras pueden relacionarse con pigmentación, piel fina o surcos, además de bolsas. La valoración identifica qué componente puede tratarse y cuáles requieren otras opciones.'
      },
      {
        question: '¿Se operan siempre los cuatro párpados?',
        answer:
          'No. Se evalúan por separado los párpados superiores e inferiores. El procedimiento puede limitarse a una región si es lo indicado.'
      },
      {
        question: '¿Es importante mencionar que tengo ojo seco?',
        answer:
          'Sí. La sequedad y otros antecedentes oculares pueden modificar la indicación y los cuidados. Debes informarlos antes de la cirugía.'
      },
      {
        question: '¿Cuándo puedo volver a usar lentes de contacto?',
        answer:
          'Depende de la evolución de la superficie ocular y de los párpados. Debes confirmarlo durante los controles antes de retomarlos.'
      }
    ]
  },
  {
    slug: 'recuperacion-posoperatoria',
    name: 'Recuperación posoperatoria',
    category: 'CORPORAL',
    imageUrl: '/images/tec-hiperbarica.webp',
    isFeatured: false,
    appointmentDuration: 30,
    summary:
      'Seguimiento médico después de la cirugía, con cuidados de heridas, controles y evaluación de terapias complementarias cuando existe indicación.',
    content:
      'La recuperación posoperatoria es una etapa de seguimiento, no un paquete idéntico para todos. Incluye la revisión de heridas, el control de la inflamación y las molestias, la detección de complicaciones y la adaptación de las actividades. Las indicaciones dependen de la cirugía realizada y del estado de salud.\n\nEl plan puede considerar tecnologías disponibles, como Tensamax o cámara hiperbárica, únicamente cuando existe una indicación y un momento apropiado. Estas terapias no sustituyen la atención del cirujano ni garantizan una recuperación más rápida.\n\n## Valoración individual\n\nEn los controles se revisan las zonas intervenidas y la evolución. Debes informar síntomas nuevos, medicamentos, alergias y cambios en tu estado de salud. Las fotografías del portal pueden facilitar el seguimiento, pero no reemplazan un examen presencial cuando el médico lo requiere.\n\n## Preparación para el procedimiento\n\nAntes de regresar a casa, confirma cómo cuidar las heridas, qué medicación fue prescrita, cuándo acudir al siguiente control y cómo contactar al equipo. Organiza apoyo para las actividades que tendrás limitadas. No suspendas, añadas ni cambies medicamentos sin consultar.\n\n## Recuperación y seguimiento\n\nEl regreso al trabajo, los viajes, el ejercicio y el uso de prendas o soportes se autorizan según la evolución. No todos los pacientes necesitan drenajes, masajes o aparatología. La radiofrecuencia y otras terapias requieren una indicación específica, especialmente mientras los tejidos cicatrizan.\n\n## Riesgos y consideraciones\n\nDolor torácico o dificultad respiratoria requieren atención de urgencias. Fiebre, sangrado persistente, secreción o dolor que empeora deben comunicarse al equipo médico para evaluación. Un formulario web o un mensaje en el portal no es un canal de urgencias.\n\nLas terapias complementarias también tienen riesgos. La cámara hiperbárica puede causar molestias por presión en oídos o senos paranasales y exige supervisión; la aplicación de radiofrecuencia puede producir lesiones térmicas. La conveniencia de cada intervención se revisa individualmente.\n\n## Resultados y límites\n\nEl tiempo de recuperación no es igual al tiempo necesario para apreciar el resultado estético. La inflamación y las cicatrices pueden evolucionar durante meses. Cumplir los controles permite acompañar ese proceso y detectar problemas; no elimina por completo la posibilidad de complicaciones.',
    benefits: [
      'Controles adaptados a la cirugía y a la evolución',
      'Orientación sobre heridas y actividad física',
      'Evaluación de terapias complementarias',
      'Acceso al portal para consultar información del proceso'
    ],
    faq: [
      {
        question: '¿Toda cirugía necesita cámara hiperbárica?',
        answer:
          'No. La oxigenoterapia hiperbárica tiene indicaciones médicas específicas y no es un requisito rutinario después de toda cirugía estética. Su uso requiere valoración y supervisión.'
      },
      {
        question: '¿Puedo iniciar masajes o radiofrecuencia por mi cuenta?',
        answer:
          'No es recomendable iniciarlos sin indicación. El momento apropiado depende del procedimiento, las heridas y la evolución; una terapia mal indicada puede producir lesiones.'
      },
      {
        question: '¿Qué síntomas requieren urgencias?',
        answer:
          'La dificultad para respirar o el dolor torácico después de una cirugía necesitan evaluación urgente. No esperes una respuesta del formulario, WhatsApp o portal para buscar atención.'
      },
      {
        question: '¿Cuándo puedo volver al ejercicio o viajar?',
        answer:
          'Debes acordarlo con el equipo según la cirugía y los controles. La autorización depende de tu recuperación y de las exigencias de la actividad o del viaje.'
      }
    ]
  }
]
