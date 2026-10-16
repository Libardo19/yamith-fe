'use client'

import { useState } from 'react'
import Image from 'next/image'

export function TechnologyDisclosure({
  name,
  kind,
  text,
  image
}: {
  name: string
  kind: string
  text: string
  image?: string | null
}) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <details
      open={hovered || focused || expanded}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <summary
        onFocus={(event) => setFocused(event.currentTarget.matches(':focus-visible'))}
        onClick={(event) => {
          event.preventDefault()
          setExpanded((value) => !value)
        }}
      >
        {name}
      </summary>
      <div className="technology-description">
        {image && (
          <figure className="technology-product">
            <Image
              src={image}
              alt={'Tecnología ' + name}
              fill
              sizes="(min-width: 768px) 18vw, 45vw"
              className={image.includes('-studio.') ? 'object-contain' : 'object-cover'}
            />
          </figure>
        )}
        <h3 className="technology-kind">{kind}</h3>
        <p>{text}</p>
      </div>
    </details>
  )
}
