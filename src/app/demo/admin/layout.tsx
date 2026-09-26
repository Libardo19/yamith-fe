import { AppShell } from '@/components/app/AppShell'
import { demoDoctor } from '@/lib/demo-data'

export default function DemoAdminLayout({ children }: LayoutProps<'/demo/admin'>) {
  return (
    <AppShell area="admin" base="/demo/admin" user={demoDoctor} demo>
      {children}
    </AppShell>
  )
}
