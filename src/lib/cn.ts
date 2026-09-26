import clsx, { type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** Une clases y resuelve conflictos de Tailwind (la última gana: `hidden` sobre `inline-flex`). */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        'navy-950',
        'navy-900',
        'navy-800',
        'navy-700',
        'gold-700',
        'gold-600',
        'gold-500',
        'gold-300',
        'gold-100',
        'cream-50',
        'cream-100',
        'cream-200',
        'ink',
        'muted',
        'line',
        'success',
        'danger'
      ]
    }
  }
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
