import Image from 'next/image'
import { technologyImage } from '@/content/technology-images'

/** Preserve CMS-hosted images without broadening Next's remote image allowlist. */
export function ProcedurePhoto({ src, name }: { src: string; name: string }) {
  src = technologyImage(src)
  const alt = `Atención relacionada con ${name}`
  if (src.startsWith('/images/'))
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className={src.includes('-studio.') ? 'object-contain p-6' : 'object-cover'}
      />
    )
  return (
    // eslint-disable-next-line @next/next/no-img-element -- external URLs are managed by the existing CMS
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={1200}
      height={1200}
      className="absolute inset-0 size-full object-cover"
    />
  )
}
