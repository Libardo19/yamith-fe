import type { Metadata } from 'next'
import { SetPasswordForm } from '@/components/auth/SetPasswordForm'

export const metadata: Metadata = { title: 'Restablecer contraseña' }

export default async function ResetPasswordPage(props: PageProps<'/restablecer/[token]'>) {
  const { token } = await props.params
  return <SetPasswordForm token={token} mode="reset" />
}
