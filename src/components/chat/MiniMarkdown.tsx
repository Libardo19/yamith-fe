import type { ReactNode } from 'react'

/**
 * Markdown mínimo para las respuestas del asistente: párrafos, **negritas**,
 * listas con viñetas (-, *, •) y numeradas. React escapa todo el texto: nunca
 * se inyecta HTML del modelo.
 */
const inline = (text: string): ReactNode[] =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    )

export function MiniMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let list: { ordered: boolean; items: string[] } | null = null

  const flush = () => {
    if (!list) return
    const items = list.items.map((t, i) => (
      <li key={i} className="pl-1">
        {inline(t)}
      </li>
    ))
    blocks.push(
      list.ordered ? (
        <ol key={blocks.length} className="ml-5 list-decimal space-y-1">
          {items}
        </ol>
      ) : (
        <ul key={blocks.length} className="ml-5 list-disc space-y-1">
          {items}
        </ul>
      )
    )
    list = null
  }

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (bullet || numbered) {
      const ordered = Boolean(numbered)
      if (list && list.ordered !== ordered) flush()
      list ??= { ordered, items: [] }
      list.items.push((bullet ?? numbered)![1]!)
      continue
    }
    flush()
    if (line.trim()) blocks.push(<p key={blocks.length}>{inline(line)}</p>)
  }
  flush()
  return <div className="space-y-2">{blocks}</div>
}
