import type { Metadata } from 'next'
import { SetPasswordForm } from '@/components/auth/SetPasswordForm'

export const metadata: Metadata = { title: 'Activar cuenta' }

export default async function AcceptInvitePage(props: PageProps<'/activar-cuenta/[token]'>) {
  const { token } = await props.params
  return <SetPasswordForm token={token} mode="invite" />
}
