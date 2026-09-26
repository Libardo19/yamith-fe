'use client'

import { MessageCircle } from 'lucide-react'
import { LeadStatusBadge, fmtDateTime, leadStatusLabel, table } from '@/components/app/ui'
import type { Lead, LeadStatus } from '@/types/api'

const STATUSES: LeadStatus[] = ['NUEVO', 'CONTACTADO', 'CONVERTIDO', 'DESCARTADO']

const waLink = (phone: string) =>
  `https://wa.me/${phone.replace(/\D/g, '').replace(/^(?!57)/, '57')}`

/** Solicitudes del formulario (y del chatbot en F7). Si hay onStatusChange, el estado es editable. */
export function LeadsTable({
  rows,
  onStatusChange
}: {
  rows: Lead[]
  onStatusChange?: (id: string, status: LeadStatus) => void
}) {
  return (
    <div className={table.wrap}>
      <table className={table.table}>
        <thead>
          <tr>
            <th className={table.th}>Persona</th>
            <th className={table.th}>Interés</th>
            <th className={table.th}>Sede</th>
            <th className={table.th}>Recibida</th>
            <th className={table.th}>Estado</th>
            <th className={table.th}>
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id} className={table.row}>
              <td className={table.td}>
                <span className="block font-semibold text-navy-900">{l.name}</span>
                <span className="text-xs text-muted">
                  {[l.phone, l.email].filter(Boolean).join(' · ')}
                </span>
                {l.message ? (
                  <span className="mt-1 block max-w-xs text-xs text-ink/70 italic">
                    “{l.message}”
                  </span>
                ) : null}
              </td>
              <td className={table.td}>
                <span className="text-navy-800">{l.interest ?? '—'}</span>
                {l.modality ? (
                  <span className="block text-xs text-muted">
                    {l.modality === 'VIRTUAL' ? 'Virtual' : 'Presencial'}
                  </span>
                ) : null}
              </td>
              <td className={`${table.td} text-navy-800`}>{l.sede?.city ?? '—'}</td>
              <td className={`${table.td} text-xs text-muted tabular-nums`}>
                {fmtDateTime(l.createdAt)}
              </td>
              <td className={table.td}>
                {onStatusChange ? (
                  <select
                    aria-label={`Estado de ${l.name}`}
                    value={l.status}
                    onChange={(e) => onStatusChange(l.id, e.target.value as LeadStatus)}
                    className="border border-line bg-white px-2 py-1.5 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {leadStatusLabel(s)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <LeadStatusBadge status={l.status} />
                )}
              </td>
              <td className={table.td}>
                <a
                  href={waLink(l.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold text-navy-900 hover:border-gold-500"
                >
                  <MessageCircle className="size-3.5 text-[#1f9d55]" aria-hidden /> WhatsApp
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
