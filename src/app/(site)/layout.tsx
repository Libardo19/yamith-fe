import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { getSedes } from '@/lib/public-data'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const sedes = await getSedes()
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="flex-1">
        {children}
      </main>
      <SiteFooter sedes={sedes} />
      <WhatsAppFloat whatsapp={sedes[0]?.whatsapp ?? ''} />
    </>
  )
}
