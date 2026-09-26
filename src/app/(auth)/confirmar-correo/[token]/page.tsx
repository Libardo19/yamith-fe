import type { Metadata } from 'next'
import { TokenConfirm } from '@/components/auth/TokenConfirm'

export const metadata: Metadata = { title: 'Confirmar correo' }

export default async function VerifyEmailPage(props: PageProps<'/confirmar-correo/[token]'>) {
  const { token } = await props.params
  return (
    <TokenConfirm token={token} endpoint="/auth/verify-email" successTitle="¡Correo confirmado!" />
  )
}
