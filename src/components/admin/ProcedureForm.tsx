'use client'

import Image from 'next/image'
import { useState, type FormEvent, type ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form'
import { formValue, useApiForm } from '@/lib/use-api-form'
import type { AdminProcedure } from '@/types/api'

/** Fotos disponibles en /public/images (hasta que exista subida de imágenes en F4). */
const IMAGES = [
  'tec-vaser-retraction',
  'tec-retraction',
  'tec-tensamax',
  'tec-tensamax-sesion',
  'tec-hiperbarica',
  'tec-doctor-equipos',
  'marcacion',
  'implantes',
  'valoracion-implantes',
  'valoracion-tablet',
  'valoracion-escritorio',
  'quirofano-cirugia',
  'quirofano-canula',
  'quirofano-lampara',
  'quirofano-oscuro',
  'doctor-consultorio',
  'doctor-traje',
  'doctor-hero',
  'doctor-scrubs-logo',
  'doctor-quirofano',
  'recepcion-logo',
  'equipo',
  'lavado'
].map((n) => `/images/${n}.webp`)

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function ProcedureForm({
  initial,
  onSubmit,
  footer
}: {
  initial?: AdminProcedure
  onSubmit: (payload: Record<string, unknown>) => Promise<unknown>
  footer?: ReactNode
}) {
  const { errors, formError, pending, submit } = useApiForm()
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initial))
  const [image, setImage] = useState(initial?.imageUrl ?? '')
  const [faq, setFaq] = useState(initial?.faq ?? [])

  async function handle(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const f = new FormData(ev.currentTarget)
    const payload = {
      name: formValue(f, 'name'),
      slug,
      category: formValue(f, 'category'),
      summary: formValue(f, 'summary'),
      content: formValue(f, 'content'),
      benefits: formValue(f, 'benefits')
        .split('\n')
        .map((b) => b.trim())
        .filter(Boolean),
      faq: faq.filter((q) => q.question.trim() && q.answer.trim()),
      imageUrl: image || null,
      isFeatured: f.get('isFeatured') === 'on',
      isPublished: f.get('isPublished') === 'on',
      sortOrder: Number(formValue(f, 'sortOrder') || 0),
      seoTitle: formValue(f, 'seoTitle') || null,
      seoDescription: formValue(f, 'seoDescription') || null
    }
    await submit(() => onSubmit(payload))
  }

  const e = (k: string) => errors[k]
  return (
    <form onSubmit={handle} noValidate className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        <Field label="Nombre" htmlFor="name" error={e('name')}>
          <Input
            id="name"
            name="name"
            defaultValue={initial?.name}
            onChange={(ev) => !slugTouched && setSlug(slugify(ev.target.value))}
          />
        </Field>
        <Field
          label="Dirección web (slug)"
          htmlFor="slug"
          error={e('slug')}
          hint={`/procedimientos/${slug || '…'}`}
        >
          <Input
            id="slug"
            value={slug}
            onChange={(ev) => {
              setSlugTouched(true)
              setSlug(slugify(ev.target.value))
            }}
          />
        </Field>
        <Field
          label="Resumen"
          htmlFor="summary"
          error={e('summary')}
          hint="Aparece en las tarjetas y en Google (máx. 300 caracteres)."
        >
          <Textarea
            id="summary"
            name="summary"
            rows={2}
            maxLength={300}
            defaultValue={initial?.summary}
          />
        </Field>
        <Field
          label="Descripción"
          htmlFor="content"
          error={e('content')}
          hint="Separa los párrafos con una línea en blanco."
        >
          <Textarea id="content" name="content" rows={7} defaultValue={initial?.content} />
        </Field>
        <Field label="Beneficios" htmlFor="benefits" error={e('benefits')} hint="Uno por línea.">
          <Textarea
            id="benefits"
            name="benefits"
            rows={4}
            defaultValue={initial?.benefits.join('\n')}
          />
        </Field>

        <fieldset className="space-y-4">
          <legend className="text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase">
            Preguntas frecuentes
          </legend>
          {faq.map((q, i) => (
            <div key={i} className="space-y-2 border border-line bg-cream-50 p-4">
              <div className="flex gap-2">
                <Input
                  aria-label={`Pregunta ${i + 1}`}
                  placeholder="Pregunta"
                  value={q.question}
                  onChange={(ev) =>
                    setFaq(faq.map((x, j) => (j === i ? { ...x, question: ev.target.value } : x)))
                  }
                />
                <button
                  type="button"
                  aria-label="Quitar pregunta"
                  onClick={() => setFaq(faq.filter((_, j) => j !== i))}
                  className="p-2 text-muted hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <Textarea
                aria-label={`Respuesta ${i + 1}`}
                placeholder="Respuesta"
                rows={2}
                value={q.answer}
                onChange={(ev) =>
                  setFaq(faq.map((x, j) => (j === i ? { ...x, answer: ev.target.value } : x)))
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2"
            onClick={() => setFaq([...faq, { question: '', answer: '' }])}
          >
            <Plus className="size-4" /> Agregar pregunta
          </Button>
        </fieldset>
      </div>

      <div className="space-y-6">
        <Field label="Categoría" htmlFor="category" error={e('category')}>
          <Select id="category" name="category" defaultValue={initial?.category ?? 'CORPORAL'}>
            <option value="CORPORAL">Corporal</option>
            <option value="MAMARIO">Mamario</option>
            <option value="FACIAL">Facial</option>
          </Select>
        </Field>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-navy-800 uppercase">
            Imagen
          </p>
          <div className="relative mt-2 aspect-[16/9] bg-cream-200">
            {image ? (
              <Image src={image} alt="" fill sizes="400px" className="object-cover" />
            ) : null}
          </div>
          <div className="mt-2 grid max-h-44 grid-cols-6 gap-1 overflow-y-auto">
            {IMAGES.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setImage(src)}
                aria-label={`Usar ${src.split('/').pop()}`}
                className={`relative aspect-square ${image === src ? 'ring-2 ring-gold-600' : 'opacity-80 hover:opacity-100'}`}
              >
                <Image src={src} alt="" fill sizes="60px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <Field
          label="Orden"
          htmlFor="sortOrder"
          error={e('sortOrder')}
          hint="Menor número = aparece primero."
        >
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={initial?.sortOrder ?? 0}
          />
        </Field>
        <Checkbox
          name="isPublished"
          defaultChecked={initial?.isPublished ?? false}
          label="Publicado en la web"
        />
        <Checkbox
          name="isFeatured"
          defaultChecked={initial?.isFeatured ?? false}
          label="Destacado en la página de inicio"
        />
        <Field
          label="Título SEO"
          htmlFor="seoTitle"
          error={e('seoTitle')}
          hint="Opcional (máx. 70)."
        >
          <Input
            id="seoTitle"
            name="seoTitle"
            maxLength={70}
            defaultValue={initial?.seoTitle ?? ''}
          />
        </Field>
        <Field
          label="Descripción SEO"
          htmlFor="seoDescription"
          error={e('seoDescription')}
          hint="Opcional (máx. 170)."
        >
          <Textarea
            id="seoDescription"
            name="seoDescription"
            rows={2}
            maxLength={170}
            defaultValue={initial?.seoDescription ?? ''}
          />
        </Field>
      </div>

      {formError ? (
        <Alert tone="error" className="lg:col-span-2">
          {formError}
        </Alert>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? 'Guardando…' : 'Guardar'}
        </Button>
        {footer}
      </div>
    </form>
  )
}
