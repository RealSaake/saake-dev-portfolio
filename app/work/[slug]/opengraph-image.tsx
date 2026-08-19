import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from '@/components/og-card'
import { getProject, projects } from '@/content'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Params = { slug: string }
export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  return new ImageResponse(
    (
      <OgCard
        eyebrow={`${project.kicker} · ${project.year}`}
        title={project.title}
        note={project.summary}
      />
    ),
    { ...size, fonts: ogFonts() }
  )
}
