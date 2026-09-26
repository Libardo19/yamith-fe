import type { Metadata } from 'next'
import { SessionShell } from '@/components/app/SessionShell'
import { SessionProvider } from '@/lib/session'

export const metadata: Metadata = {
  title: { default: 'Panel', template: '%s · Panel' },
  robots: { index: false, follow: false }
}

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <SessionProvider require="STAFF">
      <SessionShell area="admin">{children}</SessionShell>
    </SessionProvider>
  )
}
