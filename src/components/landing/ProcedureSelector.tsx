'use client'
import { ProcedurePhoto } from './ProcedurePhoto'
import Link from 'next/link'
import { useState } from 'react'
import { categoryLabels } from '@/content/site'
import type { ProcedureCard } from '@/types/api'
export function ProcedureSelector({ procedures }: { procedures: ProcedureCard[] }) {
  const featured = procedures.filter((p) => p.isFeatured)
  const items = (featured.length ? featured : procedures).slice(0, 5)
  const [selected, setSelected] = useState(0)
  const active = items[selected] ?? items[0]
  if (!active) return null
  return (
    <section id="procedimientos" className="editorial-section procedures-editorial">
      <div className="editorial-heading" data-reveal="text">
        <p className="eyebrow">Procedimientos</p>
        <h2>
          Tu esencia.
          <br />
          <em>En armonía.</em>
        </h2>
        <Link href="/procedimientos" className="editorial-link">
          Explorar todos los procedimientos ↗
        </Link>
      </div>
      <div className="procedure-composition">
        <div className="procedure-image" data-reveal="image">
          <ProcedurePhoto
            key={active.slug}
            src={active.imageUrl || '/images/valoracion-implantes.webp'}
            name={active.name}
          />
          <span className="photo-label">{categoryLabels[active.category]}</span>
        </div>
        <div className="procedure-list">
          {items.map((item, i) => (
            <div key={item.slug} className={`procedure-row ${i === selected ? 'selected' : ''}`}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                aria-pressed={i === selected}
                aria-controls="procedure-description"
                aria-label={`Ver presentación de ${item.name}`}
              >
                <span className="editorial-number">0{i + 1}</span>
                <span>{item.name}</span>
                <span aria-hidden>↗</span>
              </button>
            </div>
          ))}
          <div id="procedure-description" className="procedure-description">
            <p>{active.summary}</p>
            <Link href={`/procedimientos/${active.slug}`} className="editorial-link">
              Conocer {active.name} ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
