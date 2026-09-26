import { AppShell } from '@/components/app/AppShell'
import { demoPatientUser } from '@/lib/demo-data'

export default function DemoPortalLayout({ children }: LayoutProps<'/demo/portal'>) {
  return (
    <AppShell area="portal" base="/demo/portal" user={demoPatientUser} demo>
      {children}
    </AppShell>
  )
}
