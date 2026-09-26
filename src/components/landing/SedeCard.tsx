'use client'

import { MapPin, MessageCircle } from 'lucide-react'
import { isPendingWhatsapp, whatsappLink } from '@/content/site'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'
import type { Sede } from '@/types/api'

export function SedeCard({ sede, tone = 'light' }: { sede: Sede; tone?: 'light' | 'dark' }) {
  const pending = isPendingWhatsapp(sede.whatsapp)
  const dark = tone === 'dark'
  return (
    <article
      className={cn(
        'flex flex-col p-6',
        dark ? 'border border-white/10 bg-navy-800/60' : 'border border-line bg-white'
      )}
    >
      <MapPin className="size-5 text-gold-500" aria-hidden />
      <h3 className={cn('mt-4 text-xl', dark && 'text-white')}>{sede.name}</h3>
      <p
        className={cn('mt-2 flex-1 text-sm leading-relaxed', dark ? 'text-white/60' : 'text-muted')}
      >
        {sede.address}
      </p>
      <a
        href={
          pending
            ? '#agendar'
            : whatsappLink(sede.whatsapp, `Hola, quiero agendar una valoración en la ${sede.name}.`)
        }
        target={pending ? undefined : '_blank'}
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { ubicacion: 'sede', sede: sede.slug })}
        className={cn(
          'mt-6 inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors',
          dark
            ? 'border-white/20 text-white hover:border-gold-300 hover:text-gold-300'
            : 'border-navy-900/20 text-navy-900 hover:border-gold-500 hover:text-gold-700'
        )}
      >
        <MessageCircle className="size-4" aria-hidden />
        WhatsApp {sede.city}
      </a>
    </article>
  )
}
