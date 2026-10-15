/** Datos globales del sitio. El dominio definitivo se define al comprarlo (plan §7.1). */
export const siteConfig = {
  name: 'Dr. Yamith Cuello',
  description:
    'Dr. Yamith Cuello, cirujano plástico en Pereira, Barranquilla y Valledupar: lipoabdominoplastia, lipoescultura VASER, cirugía mamaria y facial. Más de 2.000 cirugías y valoración presencial o virtual.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
} as const
