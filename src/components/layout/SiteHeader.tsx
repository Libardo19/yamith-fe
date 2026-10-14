'use client'
import { usePathname } from 'next/navigation'
import { HomeMasthead } from './HomeMasthead'

export function SiteHeader() {
  const pathname = usePathname()
  return <HomeMasthead key={pathname} />
}
