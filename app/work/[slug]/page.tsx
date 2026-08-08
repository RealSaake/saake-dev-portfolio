import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Container,
  Eyebrow,
  ExternalLink,
  InternalLink,
  Label,
  NumberedList,
  Prose,
  Reveal,
  Rule,
  Section,
  SpecTable,
} from '@/components/primitives'
import { CASE_ARTEFACTS } from '@/components/artefacts'
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
  const source = study.links?.find((l) => l.label === 'Source')
  const artefact = CASE_ARTEFACTS[study.slug]

  return (
    <article>
      <Section pad="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <Container className="relative">
          <Reveal load>
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/work"
                className="label transition-colors duration-act hover:text-accent-text"
              >
                ← Work
              </Link>
            </nav>
          </Reveal>

          <Reveal load>
            <Eyebrow>
              {study.kind} // {study.year}
            </Eyebrow>
          </Reveal>

          <Reveal load delay={1}>
            <h1 className="mt-10 max-w-measure-long text-display">{study.title}</h1>
          </Reveal>

          <Reveal load delay={2}>
            <p className="mt-8 max-w-measure text-lead text-muted">{study.tagline}</p>
          </Reveal>

          {study.links && study.links.length > 0 && (
            <Reveal load delay={3}>
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

      {/* ── The artefact ─────────────────────────────────────
          This slot used to hold an <iframe> of the running app.
          Three reasons it is gone.

          Two of these case studies are critical of the interface
          they are about; embedding that interface at hero size
          presents the criticised thing as the portfolio piece and
          inverts the argument the page is making.

          `sandbox="allow-scripts allow-same-origin"` together is
          not a sandbox — for a same-origin document the pair lets
          the frame reach back out and remove its own sandbox
          attribute.

          And it loaded two third-party applications on a page
          that otherwise ships as static HTML.

          What replaces it is a drawn figure built from this site's
          own tokens: analysis rather than a window. The live link
          is directly above, where someone who wants the running
          thing can have it. */}
      {artefact && (
        <Section pad="tight">
          <Container>
            <Reveal>
              {artefact.render()}
              <p className="mt-4 max-w-measure text-s text-muted-2">{artefact.caption}</p>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section pad="tight">
        <Container>
          <Reveal>
            <SpecTable
              rows={[
                ['Year', study.year],
                ['Kind', study.kind],
                ['Stack', study.stack],
                [
                  'Source',
                  source ? (
                    <ExternalLink href={source.href} className="text-s">
                      {source.href.replace('https://github.com/', '')}
                    </ExternalLink>
                  ) : (
                    'Not public'
                  ),
                ],
              ]}
            />
          </Reveal>
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
                  <NumberedList items={study.deliverables} />
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
                <p className="mt-16 max-w-measure border-l border-accent-edge pl-4 text-s text-muted-2">
                  {study.stack}
                </p>
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
              <h2 className="max-w-measure text-h2 transition-colors duration-act group-hover:text-accent-text">
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
