import { brand, doctor } from '@/content/site'
import { siteConfig } from '@/lib/site'
import type { ProcedureDetail, Sede } from '@/types/api'

/** JSON serializado y con "<" escapado: no admite HTML de usuarios. */
function LdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

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
        image: `${siteConfig.url}/images/doctor-hero-editorial.webp`,
        medicalSpecialty: 'PlasticSurgery',
        description: siteConfig.description,
        areaServed: brand.cities.map((city) => ({ '@type': 'City', name: city })),
        memberOf: doctor.memberships
          .filter((m) => m.confirmed)
          .map((m) => ({ '@type': 'MedicalOrganization', name: m.name, url: m.url }))
      },
      ...sedes
        .filter((s) => s.address && !/pendiente/i.test(s.address))
        .map((s) => ({
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
  return <LdScript data={data} />
}

/** Página de procedimiento: el procedimiento, sus preguntas frecuentes y la ruta de migas. */
export function ProcedureJsonLd({ procedure }: { procedure: ProcedureDetail }) {
  const url = `${siteConfig.url}/procedimientos/${procedure.slug}`
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure',
        '@id': `${url}#procedimiento`,
        name: procedure.name,
        description: procedure.seoDescription ?? procedure.summary,
        url,
        performer: { '@id': `${siteConfig.url}/#medico` }
      },
      ...(procedure.faq.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: procedure.faq.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer }
              }))
            }
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Procedimientos',
            item: `${siteConfig.url}/procedimientos`
          },
          { '@type': 'ListItem', position: 3, name: procedure.name, item: url }
        ]
      }
    ]
  }
  return <LdScript data={data} />
}
