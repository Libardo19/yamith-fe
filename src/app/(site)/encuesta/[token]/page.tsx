import type { Metadata } from 'next'
import { SurveyForm } from '@/components/landing/SurveyForm'

export const metadata: Metadata = {
  title: 'Encuesta de satisfacción',
  robots: { index: false, follow: false }
}

export default async function SurveyPage(props: PageProps<'/encuesta/[token]'>) {
  const { token } = await props.params
  return (
    <section className="bg-cream-50 py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <SurveyForm token={token} />
      </div>
    </section>
  )
}
