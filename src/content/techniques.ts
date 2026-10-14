/**
 * Técnicas de lipoabdominoplastia del Dr. Yamith. Las claves (`key`) son las mismas
 * que acepta el API en la galería (ABDOMINOPLASTY_TECHNIQUES en yamith-be).
 */
export type TechniqueKey = 'efecto-corset' | '360' | 'flor-de-lis'

export interface Technique {
  key: TechniqueKey
  title: string
  subtitle?: string
  text: string
}

export const techniques: Technique[] = [
  {
    key: 'efecto-corset',
    title: 'Lipoabdominoplastia con efecto corset',
    text: 'Un enfoque de contorno abdominal que combina el tratamiento de grasa localizada con la corrección de piel y pared abdominal según la valoración. El objetivo es trabajar la relación entre abdomen y cintura; el alcance del efecto corset se define con el doctor para cada anatomía.'
  },
  {
    key: '360',
    title: 'Lipoabdominoplastia 360°',
    subtitle: 'Circunferencial · Body Lift',
    text: 'Una planificación que contempla el contorno alrededor del tronco, cuando el exceso de piel se extiende hacia flancos y espalda. La extensión de las incisiones, las zonas a tratar y la conveniencia de realizar la cirugía por etapas se revisan individualmente.'
  },
  {
    key: 'flor-de-lis',
    title: 'Lipoabdominoplastia en Flor de Lis',
    text: 'Una alternativa para determinados casos de exceso de piel en los ejes vertical y horizontal, como puede ocurrir después de una pérdida importante de peso. Combina incisiones verticales y horizontales; sus cicatrices y cuidados se explican antes de decidir.'
  }
]

export const findTechnique = (key: string | null | undefined) =>
  techniques.find((t) => t.key === key) ?? null

/** La técnica sólo aplica a resultados de Abdominoplastia. */
export const isAbdominoplasty = (slug: string | null | undefined) =>
  Boolean(slug?.includes('abdominoplastia'))
