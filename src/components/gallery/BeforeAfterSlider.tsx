'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const clamp = (v: number) => Math.min(100, Math.max(0, v))

/**
 * Antes y después en una sola card: la foto de "después" de fondo y la de "antes"
 * encima, recortada hasta la línea. Se arrastra con mouse o dedo (en el celular el
 * gesto vertical sigue desplazando la página) y con el teclado desde la manija.
 * Al entrar en pantalla hace un barrido corto para que se note que se mueve.
 */
export function BeforeAfterSlider({
  before,
  after,
  label,
  className,
  hint = true
}: {
  before: string
  after: string
  /** Procedimiento, para los textos alternativos. */
  label: string
  className?: string
  hint?: boolean
}) {
  const [pos, setPos] = useState(50)
  const [gliding, setGliding] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; startX: number; moved: boolean } | null>(null)
  const touched = useRef(false)

  // Barrido de pista una sola vez, al ser visible (nunca con "reducir movimiento").
  useEffect(() => {
    const el = root.current
    if (!el || !hint || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timers: number[] = []
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const steps: Array<[number, number]> = [
          [250, 32],
          [1050, 66],
          [1850, 50]
        ]
        setGliding(true)
        steps.forEach(([at, value]) =>
          timers.push(window.setTimeout(() => !touched.current && setPos(value), at))
        )
        timers.push(window.setTimeout(() => setGliding(false), 2650))
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [hint])

  const takeOver = () => {
    touched.current = true
    setGliding(false)
  }
  const fromX = (clientX: number) => {
    const r = root.current?.getBoundingClientRect()
    if (r?.width) setPos(clamp(((clientX - r.left) / r.width) * 100))
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return
    takeOver()
    drag.current = { id: e.pointerId, startX: e.clientX, moved: false }
    // Mouse: responde al instante. Dedo: espera a ver si el gesto es horizontal.
    if (e.pointerType === 'mouse') {
      e.currentTarget.setPointerCapture(e.pointerId)
      fromX(e.clientX)
    }
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.moved && Math.abs(e.clientX - d.startX) > 4) {
      d.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (d.moved || e.pointerType === 'mouse') fromX(e.clientX)
  }
  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (d && d.id === e.pointerId && !d.moved) fromX(e.clientX) // toque simple: salta ahí
    drag.current = null
  }
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 20 : 5
    const next =
      e.key === 'ArrowLeft' || e.key === 'ArrowDown'
        ? pos - step
        : e.key === 'ArrowRight' || e.key === 'ArrowUp'
          ? pos + step
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? 100
              : null
    if (next === null) return
    e.preventDefault()
    takeOver()
    setPos(clamp(next))
  }

  const ease = gliding ? 'duration-700 ease-in-out' : 'duration-0'

  return (
    <div
      ref={root}
      className={cn(
        'relative aspect-[4/5] touch-pan-y overflow-hidden bg-navy-950 select-none',
        'cursor-ew-resize',
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- fotos servidas por el API */}
      <img
        src={after}
        alt={`Después de ${label}`}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div
        className={cn('pointer-events-none absolute inset-0 transition-[clip-path]', ease)}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- fotos servidas por el API */}
        <img
          src={before}
          alt={`Antes de ${label}`}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Etiquetas: se apagan cuando su foto queda casi oculta */}
      <span
        className="pointer-events-none absolute top-4 left-4 bg-navy-950/70 font-sans px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-cream-50 uppercase backdrop-blur-sm transition-opacity"
        style={{ opacity: pos < 18 ? 0 : 1 }}
        aria-hidden
      >
        Antes
      </span>
      <span
        className="pointer-events-none absolute top-4 right-4 bg-navy-950/70 font-sans px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-cream-50 uppercase backdrop-blur-sm transition-opacity"
        style={{ opacity: pos > 82 ? 0 : 1 }}
        aria-hidden
      >
        Después
      </span>

      {/* Línea + manija */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)] transition-[left]',
          ease
        )}
        style={{ left: `${pos}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparar antes y después de ${label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} % de la foto de antes`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
        >
          <ChevronLeft className="-mr-1 size-4" aria-hidden />
          <ChevronRight className="-ml-1 size-4" aria-hidden />
        </div>
      </div>
    </div>
  )
}
