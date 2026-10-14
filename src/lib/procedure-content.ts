export interface ProcedureContentSection {
  id: string
  title: string
  paragraphs: string[]
}

/** Admite títulos ## en el CMS y conserva los párrafos del catálogo anterior. */
export function parseProcedureContent(content: string): ProcedureContentSection[] {
  const sections: ProcedureContentSection[] = []
  let current: ProcedureContentSection = {
    id: 'informacion-0',
    title: 'En qué consiste',
    paragraphs: []
  }
  let paragraph: string[] = []
  const flushParagraph = () => {
    const text = paragraph.join('\n').trim()
    if (text) current.paragraphs.push(text)
    paragraph = []
  }
  for (const line of content.replace(/\r\n?/g, '\n').split('\n')) {
    const heading = /^##\s+(.+?)\s*$/.exec(line)
    if (heading) {
      flushParagraph()
      if (current.paragraphs.length) sections.push(current)
      current = { id: `informacion-${sections.length}`, title: heading[1]!, paragraphs: [] }
    } else if (!line.trim()) flushParagraph()
    else paragraph.push(line)
  }
  flushParagraph()
  if (current.paragraphs.length) sections.push(current)
  return sections
}
