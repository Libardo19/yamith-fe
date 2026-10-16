'use client'

import { MessageCircle } from 'lucide-react'
import { isPendingWhatsapp, whatsappLink } from '@/content/site'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

/** Botón flotante. En F7 se convierte en el lanzador del chatbot. */
export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  const href = isPendingWhatsapp(whatsapp) ? '/contacto#agendar' : whatsappLink(whatsapp)
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={isPendingWhatsapp(whatsapp) ? 'Agendar valoración' : 'Escríbenos por WhatsApp'}
      onClick={() =>
        track(isPendingWhatsapp(whatsapp) ? 'agendar_click' : 'whatsapp_click', {
          ubicacion: 'flotante'
        })
      }
      className={cn(
        'fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6',
        isPendingWhatsapp(whatsapp) ? 'bg-gold-700 text-white' : 'bg-[#25d366] text-navy-950'
      )}
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  )
}
