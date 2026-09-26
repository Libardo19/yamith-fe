/**
 * Eventos de GA4 (plan F1): agendar_click, whatsapp_click, lead_submit, sign_up, login.
 * Si GA no está cargado (local o sin NEXT_PUBLIC_GA_ID) no hace nada.
 */
type GtagWindow = Window & {
  gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  ;(window as GtagWindow).gtag?.('event', event, params)
}
