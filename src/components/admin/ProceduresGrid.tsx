import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { categoryLabels } from '@/content/site'

interface Item {
  id?: string
  slug: string
  name: string
  category: 'FACIAL' | 'CORPORAL' | 'MAMARIO'
  summary: string
  imageUrl: string | null
  isFeatured: boolean
  isPublished?: boolean
}

/** Catálogo en tarjetas. `editHref` null = sólo lectura (borrador). */
export function ProceduresGrid({
  items,
  editHref
}: {
  items: Item[]
  editHref: ((i: Item) => string) | null
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((p) => {
        const body = (
          <>
            <div className="relative aspect-[16/9] bg-cream-200">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 30vw, 50vw"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{categoryLabels[p.category]}</Badge>
                {p.isPublished === false ? (
                  <Badge tone="muted">
                    <EyeOff className="size-3" /> Oculto
                  </Badge>
                ) : (
                  <Badge tone="success">
                    <Eye className="size-3" /> Publicado
                  </Badge>
                )}
                {p.isFeatured ? (
                  <Badge tone="gold">
                    <Star className="size-3" /> Destacado
                  </Badge>
                ) : null}
              </div>
              <h3 className="mt-3 text-xl">{p.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{p.summary}</p>
            </div>
          </>
        )
        return editHref ? (
          <Link
            key={p.slug}
            href={editHref(p)}
            className="border border-line bg-white transition-colors hover:border-gold-500"
          >
            {body}
          </Link>
        ) : (
          <div key={p.slug} className="border border-line bg-white">
            {body}
          </div>
        )
      })}
    </div>
  )
}
