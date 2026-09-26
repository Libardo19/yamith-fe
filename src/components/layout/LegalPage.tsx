import type { ReactNode } from 'react'

export function LegalPage({
  title,
  updated,
  children
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <article className="bg-white py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Última actualización: {updated}</p>
        <div className="mt-6 border-l-2 border-gold-500 bg-gold-100 px-4 py-3 text-sm text-gold-700">
          Borrador pendiente de revisión legal y de completar los datos del responsable.
        </div>
        <div className="mt-10 space-y-5 leading-relaxed text-ink/85 [&_h2]:mt-10 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </article>
  )
}
