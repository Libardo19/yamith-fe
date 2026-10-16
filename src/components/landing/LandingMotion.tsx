'use client'
import { useEffect, useRef, type ReactNode } from 'react'
export function LandingMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let cleanup = () => {}
    const setup = () => {
      cleanup()
      if (media.matches) return
      root.classList.add('motion-ready')
      // Observe unclipped sections: observing a fully masked target can prevent its reveal.
      const reveals = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target
                .querySelectorAll('[data-reveal]')
                .forEach((el) => el.classList.add('is-visible'))
              reveals.unobserve(e.target)
            }
          }),
        { threshold: 0, rootMargin: '0px 0px -8% 0px' }
      )
      root.querySelectorAll('section').forEach((el) => reveals.observe(el))
      const steps = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting)
              root
                .querySelector('[data-journey]')
                ?.setAttribute('data-active', e.target.getAttribute('data-step') ?? '0')
          }),
        { rootMargin: '-25% 0px -35% 0px' }
      )
      root.querySelectorAll('[data-step]').forEach((el) => steps.observe(el))
      const photos = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'))
      let frame = 0
      const update = () => {
        frame = 0
        if (innerWidth < 768) return
        photos.forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.bottom < 0 || r.top > innerHeight) return
          const p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight + r.height)))
          el.style.setProperty('--photo-scale', String(1.08 - p * 0.08))
        })
      }
      const scroll = () => {
        if (!frame) frame = requestAnimationFrame(update)
      }
      const focus = (event: FocusEvent) => {
        if (event.target instanceof Element)
          event.target.closest('[data-reveal]')?.classList.add('is-visible')
      }
      root.addEventListener('focusin', focus)
      window.addEventListener('scroll', scroll, { passive: true })
      window.addEventListener('resize', scroll, { passive: true })
      update()
      cleanup = () => {
        reveals.disconnect()
        steps.disconnect()
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', scroll)
        window.removeEventListener('resize', scroll)
        root.removeEventListener('focusin', focus)
        root.classList.remove('motion-ready')
        photos.forEach((el) => el.style.removeProperty('--photo-scale'))
      }
    }
    setup()
    media.addEventListener('change', setup)
    return () => {
      cleanup()
      media.removeEventListener('change', setup)
    }
  }, [])
  return (
    <div className="yamith-editorial" ref={ref}>
      {children}
    </div>
  )
}
