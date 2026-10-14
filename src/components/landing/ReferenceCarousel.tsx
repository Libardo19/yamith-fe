'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { GalleryItem, ProcedureCard } from '@/types/api'
import { findTechnique } from '@/content/techniques'
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider'
import { ProcedurePhoto } from './ProcedurePhoto'

export function ReferenceCarousel({
  procedures,
  results,
  showSummary = false,
  autoSlide = false
}: {
  procedures: ProcedureCard[]
  results: GalleryItem[]
  showSummary?: boolean
  autoSlide?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const interacting = useRef(false)
  const manualUntil = useRef(0)
  const [paused, setPaused] = useState(false)
  const loop = autoSlide && !results.length && procedures.length > 1
  useEffect(() => {
    const element = ref.current
    if (!element || !loop) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let frame = 0
    let previous = 0
    let position = element.scrollLeft
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(element)
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 50)
      previous = now
      if (
        visible &&
        !document.hidden &&
        !motion.matches &&
        !paused &&
        !interacting.current &&
        now >= manualUntil.current
      ) {
        const first = element.children[0] as HTMLElement
        const duplicate = element.children[procedures.length] as HTMLElement
        const distance = duplicate.offsetLeft - first.offsetLeft
        if (distance > 0) {
          position = (position + elapsed * 0.025) % distance
          element.scrollLeft = position
        }
      } else position = element.scrollLeft
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [loop, paused, procedures.length])
  const move = (direction: number) => {
    manualUntil.current = performance.now() + 1000
    const element = ref.current
    if (element)
      element.scrollBy({
        left:
          direction *
          (element.firstElementChild?.getBoundingClientRect().width ?? element.clientWidth),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      })
  }
  return (
    <>
      <div
        className={'reference-carousel' + (loop ? ' auto-sliding-carousel' : '')}
        ref={ref}
        onPointerEnter={() => {
          interacting.current = true
        }}
        onPointerLeave={() => {
          interacting.current = false
        }}
        onFocusCapture={() => {
          interacting.current = true
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) interacting.current = false
        }}
        onTouchStart={() => setPaused(true)}
        aria-label={results.length ? 'Resultados publicados' : 'Procedimientos principales'}
      >
        {results.length
          ? results.map((g) => (
              <article key={g.id}>
                <BeforeAfterSlider
                  before={g.beforeImageUrl}
                  after={g.afterImageUrl}
                  label={
                    findTechnique(g.technique)?.title ?? g.procedure?.name ?? 'el procedimiento'
                  }
                  hint={false}
                />
                <h3>{findTechnique(g.technique)?.title ?? g.procedure?.name}</h3>
                <p>{g.description}</p>
              </article>
            ))
          : (loop ? [...procedures, ...procedures] : procedures).map((p, index) => (
              <Link
                href={'/procedimientos/' + p.slug}
                key={p.slug + index}
                className="reference-procedure"
                aria-hidden={index >= procedures.length || undefined}
                tabIndex={index >= procedures.length ? -1 : undefined}
              >
                <figure>
                  <ProcedurePhoto
                    src={p.imageUrl ?? '/images/valoracion-implantes.webp'}
                    name={p.name}
                  />
                </figure>
                <h3>{p.name}</h3>
                {showSummary && <p className="procedure-preview-summary">{p.summary}</p>}
              </Link>
            ))}
      </div>
      <div className="carousel-navigation">
        {loop && (
          <button
            className="carousel-playback"
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused ? 'Reanudar desplazamiento automático' : 'Pausar desplazamiento automático'
            }
            aria-pressed={paused}
          >
            {paused ? 'Reanudar' : 'Pausar'}
          </button>
        )}
        <button type="button" onClick={() => move(-1)} aria-label="Procedimiento anterior">
          ←
        </button>
        <span aria-hidden>—</span>
        <button type="button" onClick={() => move(1)} aria-label="Siguiente procedimiento">
          →
        </button>
      </div>
    </>
  )
}
