import { ButtonLink } from '@/components/ui/Button'

/**
 * Placeholder de F0: comprueba tipografías, paleta y botones.
 * En F1 se reemplaza por la landing completa (hero, diferenciales, procedimientos…).
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center bg-cream-100">
      <section className="container-page py-24">
        <p className="eyebrow">Arte &amp; precisión médica</p>
        <h1 className="mt-4 max-w-2xl text-5xl leading-tight sm:text-6xl">
          Confía tu <em>transformación</em> a un experto.
        </h1>
        <p className="mt-6 max-w-xl text-muted">
          Sitio en construcción. Cirugía plástica estética y reconstructiva en Pereira, Barranquilla
          y Valledupar.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#">Agendar valoración</ButtonLink>
          <ButtonLink href="#" variant="outline">
            Ver procedimientos
          </ButtonLink>
        </div>
      </section>
    </main>
  )
}
