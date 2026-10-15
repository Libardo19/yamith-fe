/**
 * Eventos de GA4 (plan F1): agendar_click, whatsapp_click, lead_submit, sign_up, login.
 * Los de conversión se reenvían al Meta Pixel como eventos estándar para Meta Ads.
 * Si GA o el Pixel no están cargados (local o sin IDs) no hace nada.
 */
type TrackWindow = Window & {
  gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void
  fbq?: (command: 'track', name: string, params?: Record<string, unknown>) => void
}

/** Sólo nombres de evento: a Meta no se le envían sede, procedimiento ni otros datos. */
const metaEvents: Record<string, string> = {
  lead_submit: 'Lead',
  whatsapp_click: 'Contact',
  agendar_click: 'Schedule'
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as TrackWindow
  w.gtag?.('event', event, params)
  const metaEvent = metaEvents[event]
  if (metaEvent) w.fbq?.('track', metaEvent)
}
