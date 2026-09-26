import Image from 'next/image'
import { SectionHeading } from '@/components/ui/Section'
import { gallery } from '@/content/site'

/**
 * "Un vistazo a la clínica". La galería de resultados antes/después (GalleryItem)
 * se activa cuando haya fotos con consentimiento firmado de los pacientes.
 */
export function Gallery() {
  return (
    <section id="clinica" className="bg-white py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Nuestra clínica"
          title="Un vistazo a nuestro día a día"
          text="Consultorio, quirófano y equipo: el entorno donde cuidamos cada detalle de tu proceso."
        />
        <div className="mt-14 columns-2 gap-4 lg:columns-4 [&>*]:mb-4">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="group relative break-inside-avoid overflow-hidden bg-cream-200"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={900}
                height={g.tall ? 1200 : 640}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="h-auto w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4 pt-10 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {g.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
