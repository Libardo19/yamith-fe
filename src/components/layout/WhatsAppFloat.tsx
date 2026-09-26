'use client'

import { MessageCircle } from 'lucide-react'
import { isPendingWhatsapp, whatsappLink } from '@/content/site'
import { track } from '@/lib/analytics'

/** Botón flotante. En F7 se convierte en el lanzador del chatbot. */
export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  const href = isPendingWhatsapp(whatsapp) ? '/contacto#agendar' : whatsappLink(whatsapp)
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => track('whatsapp_click', { ubicacion: 'flotante' })}
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  )
}
