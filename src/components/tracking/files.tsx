'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Download, Eye, FileText, ImageOff, Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import { cn } from '@/lib/cn'
import { fmtDate } from '@/components/app/ui'
import type { MediaFile } from '@/types/api'

/**
 * Los archivos son privados: primero se pide un enlace firmado al API (vence en 5 min)
 * y con ese enlace se muestra o descarga. `scope` elige el endpoint del portal o del panel.
 */
export type FileScope = 'patient' | 'admin'

const urlEndpoint = (scope: FileScope, id: string, download = false) =>
  `/${scope}/files/${id}/url${download ? '?download=1' : ''}`

export async function openFile(scope: FileScope, id: string, download = false) {
  // Abrimos la pestaña antes del await para que el navegador no la bloquee.
  const win = download ? null : window.open('', '_blank')
  const { url } = await api<{ url: string }>(urlEndpoint(scope, id, download))
  if (win) win.location.href = url
  else window.location.href = url
}

export function SecureImage({
  scope,
  file,
  className
}: {
  scope: FileScope
  file: MediaFile
  className?: string
}) {
  const [src, setSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    api<{ url: string }>(urlEndpoint(scope, file.id))
      .then(({ url }) => active && setSrc(url))
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [scope, file.id])

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-cream-100',
        className
      )}
    >
      {failed ? (
        <ImageOff className="size-6 text-muted" aria-label="No se pudo cargar" />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element -- enlace firmado temporal, no optimizable
        <img
          src={src}
          alt={file.title ?? file.originalName}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Loader2 className="size-5 animate-spin text-gold-500" aria-label="Cargando" />
      )}
    </div>
  )
}

export const fileTypeLabel: Record<MediaFile['type'], string> = {
  FOTO: 'Foto',
  CONSENTIMIENTO: 'Consentimiento',
  INDICACIONES: 'Indicaciones',
  OTRO: 'Documento'
}

export const stageLabel = { ANTES: 'Antes', DESPUES: 'Después', CONTROL: 'Control' } as const

const kb = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

/** Fila de documento con ver y descargar. `actions` permite agregar botones del panel. */
export function DocumentRow({
  scope,
  file,
  actions
}: {
  scope: FileScope
  file: MediaFile
  actions?: ReactNode
}) {
  return (
    <li className="flex items-center gap-4 px-6 py-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center bg-gold-100 text-gold-700">
        <FileText className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-navy-900">
          {file.title ?? file.originalName}
        </span>
        <span className="text-xs text-muted">
          {fileTypeLabel[file.type]} · {fmtDate(file.createdAt)} · {kb(file.sizeBytes)}
          {file.case ? ` · ${file.case.procedure.name}` : ''}
        </span>
      </span>
      <button
        type="button"
        onClick={() => openFile(scope, file.id)}
        className="p-2 text-muted hover:text-navy-900"
        aria-label={`Ver ${file.originalName}`}
      >
        <Eye className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => openFile(scope, file.id, true)}
        className="p-2 text-muted hover:text-navy-900"
        aria-label={`Descargar ${file.originalName}`}
      >
        <Download className="size-4" />
      </button>
      {actions}
    </li>
  )
}
