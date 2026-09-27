'use client'

import { useState } from 'react'

/**
 * Barras horizontales de una sola serie (magnitud por categoría).
 * Guía dataviz: barra ≤ 24px con extremo redondeado de 4px y base recta, un solo tono,
 * valor en la punta con tinta de texto, hover con tooltip y tabla para lectores de pantalla.
 * Sin leyenda: el título del panel nombra la serie.
 */
export function BarList({
  data,
  unit,
  caption
}: {
  data: Array<{ label: string; value: number; hint?: string }>
  unit: string
  caption: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <figure>
      <div className="space-y-5" aria-hidden>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          return (
            <div
              key={d.label}
              className="relative grid grid-cols-[7rem_1fr] items-center gap-4"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="truncate text-sm text-navy-800">{d.label}</span>
              {/* Zona de hover más alta que la barra */}
              <div className="relative flex h-8 items-center">
                <div className="absolute inset-y-[15px] left-0 w-full bg-cream-100" />
                <div
                  className="relative h-5 rounded-r-[4px] bg-navy-700 transition-[width] duration-500"
                  style={{
                    width: d.value > 0 ? `max(${pct}%, 4px)` : 0,
                    opacity: hover === null || hover === i ? 1 : 0.55
                  }}
                />
                <span className="relative ml-2 text-sm font-semibold text-navy-900 tabular-nums">
                  {d.value.toLocaleString('es-CO')}
                </span>
                {hover === i ? (
                  <div className="pointer-events-none absolute -top-11 left-0 z-10 bg-navy-950 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg">
                    <strong>{d.label}</strong> · {d.value.toLocaleString('es-CO')} {unit}
                    {d.hint ? <span className="text-white/60"> · {d.hint}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>{unit}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <td>{d.label}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
