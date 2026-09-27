import { PageHeader, Panel } from '@/components/app/ui'

const schedule = [
  {
    sede: 'Sede Pereira',
    rows: [
      ['Lunes', '08:00 – 12:00'],
      ['Lunes', '14:00 – 17:00'],
      ['Martes', '08:00 – 12:00'],
      ['Sábado', '08:00 – 12:00']
    ]
  },
  {
    sede: 'Sede Barranquilla',
    rows: [
      ['Miércoles', '08:00 – 12:00'],
      ['Miércoles', '14:00 – 17:00'],
      ['Jueves', '08:00 – 12:00']
    ]
  },
  {
    sede: 'Sede Valledupar',
    rows: [
      ['Viernes', '08:00 – 12:00'],
      ['Viernes', '14:00 – 16:00']
    ]
  }
]

export default function DemoAvailabilityPage() {
  return (
    <>
      <PageHeader
        title="Disponibilidad"
        subtitle="Horario semanal de atención en cada sede. Los pacientes sólo ven los horarios libres dentro de estos rangos."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {schedule.map((s) => (
          <Panel key={s.sede} title={s.sede} bodyClassName="p-0">
            <ul className="divide-y divide-line">
              {s.rows.map(([day, hours]) => (
                <li key={day + hours} className="flex justify-between px-6 py-3 text-sm">
                  <span className="font-semibold text-navy-900">{day}</span>
                  <span className="text-navy-800 tabular-nums">{hours}</span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </>
  )
}
