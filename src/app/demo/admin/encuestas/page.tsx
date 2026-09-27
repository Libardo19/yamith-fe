import { BarList } from '@/components/app/BarList'
import { PageHeader, Panel, StatTile } from '@/components/app/ui'

const comments = [
  {
    who: 'Daniela Castro',
    proc: 'Mastopexia',
    rating: 5,
    nps: 10,
    text: 'Me sentí acompañada en todo momento.'
  },
  {
    who: 'Paola Ríos',
    proc: 'Lipoescultura VASER',
    rating: 5,
    nps: 9,
    text: 'Resultados muy naturales.'
  },
  {
    who: 'Carolina Díaz',
    proc: 'Rinoplastia',
    rating: 4,
    nps: 8,
    text: 'La recuperación fue más rápida de lo que esperaba.'
  }
]

export default function DemoSurveysPage() {
  return (
    <>
      <PageHeader
        title="Encuestas"
        subtitle="Se envían solas una hora después de dar de alta un procedimiento."
      />
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile label="Enviadas" value={42} />
          <StatTile label="Respondidas" value={31} delta="74 % de respuesta" />
          <StatTile label="Satisfacción promedio" value="4.8 / 5" />
          <StatTile label="NPS" value={81} delta="% que recomienda menos % que no" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
          <Panel title="Calificaciones">
            <BarList
              data={[
                { label: '5 estrellas', value: 26 },
                { label: '4 estrellas', value: 4 },
                { label: '3 estrellas', value: 1 },
                { label: '2 estrellas', value: 0 },
                { label: '1 estrella', value: 0 }
              ]}
              unit="respuestas"
              caption="Distribución de calificaciones"
            />
          </Panel>
          <Panel title="Comentarios recientes" bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {comments.map((c) => (
                <li key={c.who} className="px-6 py-4">
                  <p className="text-sm font-semibold text-navy-900">
                    {c.who} · <span className="font-normal text-muted">{c.proc}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink/80 italic">“{c.text}”</p>
                  <p className="mt-1 text-xs text-muted">
                    {c.rating} / 5 · NPS {c.nps}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}
