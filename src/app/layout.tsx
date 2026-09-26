import type { Metadata } from 'next'
import { Bodoni_Moda, Manrope } from 'next/font/google'
import { siteConfig } from '@/lib/site'
import './globals.css'

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  display: 'swap'
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Cirujano Plástico Estético y Reconstructivo`,
    template: `%s · ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: siteConfig.name
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-CO" className={`${bodoni.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
