import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Borrador',
  robots: { index: false, follow: false }
}

export default function DemoLayout({ children }: LayoutProps<'/demo'>) {
  return children
}
