import { ImageResponse } from 'next/og'
import { OgCard, ogFonts, OG_SIZE, OG_CONTENT_TYPE } from '@/components/og-card'
import { caseStudyCount, site } from '@/content'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'saake.dev — I design and build interfaces, and I write down why.'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={`saake.dev — ${site.name}`}
        title="I design and build interfaces, and I write down why."
        note={`${caseStudyCount} case studies, each with a stated problem and an outcome that includes what did not work.`}
      />
    ),
    { ...size, fonts: ogFonts() }
  )
}
