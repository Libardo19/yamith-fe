import type { Metadata } from 'next'
import { SessionShell } from '@/components/app/SessionShell'
import { SessionProvider } from '@/lib/session'

export const metadata: Metadata = {
  title: { default: 'Mi portal', template: '%s · Mi portal' },
  robots: { index: false, follow: false }
}

export default function PortalLayout({ children }: LayoutProps<'/portal'>) {
  return (
    <SessionProvider require="PATIENT">
      <SessionShell area="portal">{children}</SessionShell>
    </SessionProvider>
  )
}
