import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Container,
  ExternalLink,
  InternalLink,
  Label,
  Prose,
  Reveal,
  Rule,
  Section,
} from '@/components/primitives'
import { caseStudies, getCaseStudy, site } from '@/content'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return caseStudies.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return {
    title: study.title,
    description: study.tagline,
    // self-referential — the layout declares none, so this is the only one
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.tagline,
      url: `${site.url}/work/${study.slug}`,
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const index = caseStudies.findIndex((s) => s.slug === study.slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <article>
      <Section pad="top">
        <Container>
          <Reveal>
            <div className="flex items-baseline gap-6">
              <Label>{study.year}</Label>
              <Label className="text-muted-2">{study.kind}</Label>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-10 text-display max-w-measure-long">{study.title}</h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-measure text-lead text-muted">{study.tagline}</p>
          </Reveal>

          {study.links && study.links.length > 0 && (
            <Reveal delay={3}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {study.links.map((l) => (
                  <ExternalLink key={l.href} href={l.href}>
                    {l.label}
                  </ExternalLink>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* The situation. Subject is the situation — "I" does not appear. */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <Label>The situation</Label>
              </Reveal>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <Reveal delay={1}>
                <Prose long>
                  <p className="text-lead text-ink-2">{study.problem}</p>
                </Prose>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* What I did. Subject is "I" throughout. */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <Label>What I did</Label>
              </Reveal>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <Reveal delay={1}>
                <Prose long>
                  <p>{study.response}</p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <div className="mt-16">
                  <Label className="mb-6">Specifically</Label>
                  <ul className="grid gap-px bg-rule">
                    {study.deliverables.map((d) => (
                      <li key={d} className="bg-paper py-5 pl-6 text-s text-muted">
                        <span className="mr-4 text-muted-2" aria-hidden="true">
                          —
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* Outcome — including what did not work. */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <Label>Where it landed</Label>
              </Reveal>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <Reveal delay={1}>
                <Prose long>
                  <p className="text-lead text-ink-2">{study.outcome}</p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <p className="mortar mt-16 max-w-measure text-s text-muted-2">{study.stack}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next */}
      <Section>
        <Container>
          <Reveal>
            <Label className="mb-8">Next</Label>
            <Link
              href={`/work/${next.slug}`}
              className="lift group block border-t border-rule py-10 transition-colors duration-act hover:border-accent-edge"
            >
              <h2 className="text-h2 max-w-measure transition-colors duration-act group-hover:text-accent-text">
                {next.title}
              </h2>
              <p className="mt-3 max-w-measure text-s text-muted">{next.tagline}</p>
            </Link>
            <Rule />
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-12">
              <InternalLink href="/work">All work</InternalLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </article>
  )
}
