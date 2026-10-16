import Link from 'next/link'
import { ProcedurePhoto } from './ProcedurePhoto'
import type { ProcedureCard } from '@/types/api'

export function FacialProcedures({ procedures }: { procedures: ProcedureCard[] }) {
  return (
    <div className="facial-procedures">
      {procedures.map((procedure) => (
        <Link href={'/procedimientos/' + procedure.slug} key={procedure.slug}>
          <figure>
            <ProcedurePhoto
              src={procedure.imageUrl ?? '/images/valoracion-implantes.webp'}
              name={procedure.name}
            />
          </figure>
          <div>
            <h3>{procedure.name}</h3>
            <p>{procedure.summary}</p>
            <span className="facial-procedure-link">
              Conocer el procedimiento <span aria-hidden>↗</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
