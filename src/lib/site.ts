/** Datos globales del sitio. El dominio definitivo se define al comprarlo (plan §7.1). */
export const siteConfig = {
  name: 'Dr. Yamith Cuello',
  description:
    'Cirugía plástica estética y reconstructiva en Pereira, Barranquilla y Valledupar. Resultados naturales, ética médica y acompañamiento en cada etapa.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
} as const
