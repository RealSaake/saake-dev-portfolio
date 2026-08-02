import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from '@/components/og-card'
import { caseStudies, getCaseStudy } from '@/content'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return caseStudies.map((s) => ({ slug: s.slug }))
}

/* The card carries the case study's own title and tagline, so a
   shared link previews the specific piece rather than the site. */
export default async function CaseStudyOgImage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return new ImageResponse(
    <OgCard eyebrow={`${study.year} — ${study.kind}`} title={study.title} note={study.tagline} />,
    { ...size, fonts: ogFonts() }
  )
}
