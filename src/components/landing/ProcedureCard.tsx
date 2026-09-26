import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categoryLabels } from '@/content/site'
import { cn } from '@/lib/cn'
import type { ProcedureCard as Procedure } from '@/types/api'

/** Tarjeta con imagen a sangre y texto sobre degradado (mockup "Procedimientos destacados"). */
export function ProcedureCard({
  procedure,
  size = 'md',
  className
}: {
  procedure: Procedure
  size?: 'md' | 'lg'
  className?: string
}) {
  return (
    <Link
      href={`/procedimientos/${procedure.slug}`}
      className={cn(
        'group relative block overflow-hidden bg-navy-900',
        size === 'lg' ? 'min-h-[26rem]' : 'min-h-[16rem]',
        className
      )}
    >
      {procedure.imageUrl ? (
        <Image
          src={procedure.imageUrl}
          alt=""
          fill
          sizes={
            size === 'lg' ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'
          }
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-gold-300 uppercase">
            Cirugía {categoryLabels[procedure.category].toLowerCase()}
          </p>
          <h3 className={cn('mt-2 text-white', size === 'lg' ? 'text-3xl' : 'text-2xl')}>
            {procedure.name}
          </h3>
          {size === 'lg' ? (
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
              {procedure.summary}
            </p>
          ) : null}
        </div>
        <span className="inline-flex size-10 shrink-0 items-center justify-center border border-white/30 text-white transition-colors group-hover:border-gold-300 group-hover:bg-gold-500">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
