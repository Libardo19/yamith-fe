'use client'
import { ButtonLink } from '@/components/ui/Button'
import { track } from '@/lib/analytics'
export function ValuationLink({ location }: { location: string }) {
  return (
    <ButtonLink
      href="/contacto#agendar"
      onClick={() => track('agendar_click', { ubicacion: location })}
    >
      Agendar valoración <span aria-hidden>↗</span>
    </ButtonLink>
  )
}
