import { PublicFooter } from '@/components/layout/PublicFooter'
import { ReloadToTop } from '@/components/layout/ReloadToTop'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { getSedes } from '@/lib/public-data'
import './landing.css'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const sedes = await getSedes()
  return (
    <>
      <ReloadToTop />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="public-content flex-1">
        {children}
      </main>
      <PublicFooter sedes={sedes} />
      <WhatsAppFloat whatsapp={sedes[0]?.whatsapp ?? ''} />
    </>
  )
}
