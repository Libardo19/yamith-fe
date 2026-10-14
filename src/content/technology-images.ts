/** AI-edited derivatives of the original clinic photos; originals remain intact. */
const derivatives: Record<string, string> = {
  '/images/tec-vaser-retraction.webp': '/images/tec-vaser-studio.webp',
  '/images/tec-retraction.webp': '/images/tec-retraction-studio.webp',
  '/images/tec-tensamax.webp': '/images/tec-tensamax-studio.webp',
  '/images/tec-hiperbarica.webp': '/images/tec-hiperbarica-editorial.webp'
}

export function technologyImage(src: string) {
  return derivatives[src] ?? src
}
