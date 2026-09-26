import type { Metadata } from 'next'
import { TokenConfirm } from '@/components/auth/TokenConfirm'

export const metadata: Metadata = { title: 'Confirmar nuevo correo' }

export default async function ConfirmEmailChangePage(
  props: PageProps<'/confirmar-cambio-correo/[token]'>
) {
  const { token } = await props.params
  return (
    <TokenConfirm
      token={token}
      endpoint="/auth/email-change/confirm"
      successTitle="¡Tu correo se actualizó!"
    />
  )
}
