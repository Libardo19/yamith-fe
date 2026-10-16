import type { Metadata } from 'next'
import { Bodoni_Moda, Manrope } from 'next/font/google'
import { Analytics } from '@/components/seo/Analytics'
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
    default: `Cirujano Plástico en Colombia · ${siteConfig.name} | Pereira, Barranquilla, Valledupar`,
    template: `%s · ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: siteConfig.name,
    images: [{ url: '/images/doctor-hero-editorial.webp', alt: siteConfig.name }]
  },
  twitter: { card: 'summary_large_image' },
  // Códigos de Search Console y de verificación de dominio de Meta (Business Manager).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION
      ? { 'facebook-domain-verification': process.env.NEXT_PUBLIC_META_DOMAIN_VERIFICATION }
      : undefined
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-CO" className={`${bodoni.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
