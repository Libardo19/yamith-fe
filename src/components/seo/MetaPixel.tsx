'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void }

/**
 * Meta Pixel (Meta Ads). Sólo en el sitio público: nunca en /portal ni /admin,
 * para no enviar a Meta datos de salud de pacientes. Sin NEXT_PUBLIC_META_PIXEL_ID no carga.
 * El PageView se envía en cada cambio de ruta (la navegación de Next no recarga la página).
 */
export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const pathname = usePathname()
  // La primera vista la registra el propio script al iniciar; aquí sólo las siguientes.
  const firstView = useRef(true)

  useEffect(() => {
    if (firstView.current) {
      firstView.current = false
      return
    }
    if (pixelId) (window as FbqWindow).fbq?.('track', 'PageView')
  }, [pixelId, pathname])

  if (!pixelId) return null
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
    </Script>
  )
}
