'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle2, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Alert, Field, Textarea } from '@/components/ui/Form'
import { api, ApiError } from '@/lib/api'
import { cn } from '@/lib/cn'
import { useApi } from '@/lib/use-api'

/** Encuesta de 3 preguntas: satisfacción (1–5), recomendación (0–10) y comentario. */
export function SurveyForm({ token }: { token: string }) {
  const { data, error } = useApi<{ firstName: string; procedure: string; answered: boolean }>(
    `/surveys/${token}`
  )
  const [rating, setRating] = useState(0)
  const [nps, setNps] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  if (error) {
    return (
      <div className="bg-white p-10 text-center shadow-xl shadow-navy-900/5">
        <h1 className="text-3xl">Encuesta no disponible</h1>
        <p className="mt-3 text-sm text-muted">
          El enlace no es válido. Si crees que es un error, escríbenos.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-gold-700 hover:underline"
        >
          Ir al inicio
        </Link>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-8 animate-spin text-gold-500" aria-label="Cargando" />
      </div>
    )
  }
  if (sent || data.answered) {
    return (
      <div className="flex flex-col items-center bg-white p-10 text-center shadow-xl shadow-navy-900/5">
        <CheckCircle2 className="size-12 text-gold-500" aria-hidden />
        <h1 className="mt-5 text-3xl">¡Gracias, {data.firstName}!</h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Tu opinión nos ayuda a seguir cuidando cada detalle. Fue un gusto acompañarte en tu
          proceso.
        </p>
      </div>
    )
  }

  async function submit() {
    if (!rating || nps === null) {
      setFormError('Responde las dos primeras preguntas.')
      return
    }
    setPending(true)
    setFormError(null)
    try {
      await api(`/surveys/${token}`, {
        method: 'POST',
        body: { rating, nps, comment: comment || undefined }
      })
      setSent(true)
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : 'No pudimos enviar tu respuesta.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="bg-white p-6 shadow-xl shadow-navy-900/5 sm:p-10">
      <p className="eyebrow">Tu opinión</p>
      <h1 className="mt-3 text-3xl leading-tight sm:text-4xl">
        Hola {data.firstName}, ¿cómo fue tu experiencia?
      </h1>
      <p className="mt-3 text-sm text-muted">
        Sobre tu procedimiento ({data.procedure}) con el Dr. Yamith Cuello. Toma menos de un minuto.
      </p>

      <fieldset className="mt-10">
        <legend className="font-serif text-xl text-navy-900">
          1. ¿Qué tan satisfecho(a) estás con la atención?
        </legend>
        <div className="mt-4 flex gap-2" role="radiogroup" aria-label="Satisfacción de 1 a 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} de 5`}
              onClick={() => setRating(n)}
              className="p-1"
            >
              <Star
                className={cn(
                  'size-9 transition-colors',
                  n <= rating ? 'fill-gold-500 text-gold-500' : 'text-line'
                )}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="font-serif text-xl text-navy-900">
          2. ¿Qué tan probable es que nos recomiendes?
        </legend>
        <div
          className="mt-4 grid grid-cols-6 gap-1.5 sm:grid-cols-11"
          role="radiogroup"
          aria-label="Recomendación de 0 a 10"
        >
          {Array.from({ length: 11 }, (_, n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={nps === n}
              onClick={() => setNps(n)}
              className={cn(
                'border py-2.5 text-sm tabular-nums transition-colors',
                nps === n
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-line text-navy-800 hover:border-gold-500'
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted">
          <span>Nada probable</span>
          <span>Muy probable</span>
        </div>
      </fieldset>

      <Field
        label="3. ¿Algo que quieras contarnos?"
        htmlFor="comment"
        hint="Opcional"
        className="mt-10"
      >
        <Textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1500}
        />
      </Field>

      {formError ? (
        <Alert tone="error" className="mt-6">
          {formError}
        </Alert>
      ) : null}
      <Button className="mt-8 w-full" disabled={pending} onClick={submit}>
        {pending ? 'Enviando…' : 'Enviar mi opinión'}
      </Button>
      <p className="mt-3 text-center text-xs text-muted">Tus respuestas son confidenciales.</p>
    </div>
  )
}
