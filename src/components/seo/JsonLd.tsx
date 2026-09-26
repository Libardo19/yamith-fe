import { brand } from '@/content/site'
import { siteConfig } from '@/lib/site'
import type { Sede } from '@/types/api'

/** Datos estructurados: el médico y cada sede como consultorio (SEO local). */
export function JsonLd({ sedes }: { sedes: Sede[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${siteConfig.url}/#medico`,
        name: brand.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/doctor-hero.webp`,
        medicalSpecialty: 'PlasticSurgery',
        description: siteConfig.description,
        areaServed: brand.cities
      },
      ...sedes.map((s) => ({
        '@type': 'MedicalClinic',
        '@id': `${siteConfig.url}/#sede-${s.slug}`,
        name: `${brand.name} · ${s.name}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: s.address,
          addressLocality: s.city,
          addressCountry: 'CO'
        },
        medicalSpecialty: 'PlasticSurgery',
        parentOrganization: { '@id': `${siteConfig.url}/#medico` }
      }))
    ]
  }
  return (
    <script
      type="application/ld+json"
      // JSON serializado y con "<" escapado: no admite HTML de usuarios.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
