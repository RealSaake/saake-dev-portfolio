import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Container,
  Eyebrow,
  ExternalLink,
  InternalLink,
  Label,
  Prose,
  Reveal,
  revealDelay,
  Rule,
  Section,
} from '@/components/primitives'
import { CASE_ARTEFACTS, IndexPlate } from '@/components/artefacts'
import { caseStudies, caseStudyCount, elsewhere, site } from '@/content'

export const metadata: Metadata = {
  title: 'Work',
  description:
    `${caseStudyCount} case studies, each with a stated problem, what I did about it, and an outcome that includes what did not work.`,
  alternates: { canonical: '/work' },
}

export default function WorkIndex() {
  return (
    <>
      <Section pad="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <Container className="relative">
          <Reveal load>
            <Eyebrow>archive // {caseStudies.length} entries</Eyebrow>
          </Reveal>

          <Reveal load delay={1}>
            <h1 className="mt-10 max-w-measure text-h1">Five projects, written up properly</h1>
          </Reveal>

          <Reveal load delay={2}>
            <Prose className="mt-8">
              <p>
                Each of these states the problem before it states the solution, and each ends with an
                outcome that includes the part that did not work. A portfolio that only contains
                successes is either very short or not true. One of the five is unfinished and is
                listed as unfinished.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section pad="tight">
        <Container>
          <ul className="border-t border-rule">
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={revealDelay(i)}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="lift group block border-b border-rule py-12 transition-colors duration-act hover:border-accent-edge"
                  >
                    <div className="grid gap-8 md:grid-cols-12 md:items-center">
                      <div className="md:col-span-2">
                        <Label>{study.year}</Label>
                        <Label className="mt-2">{study.kind}</Label>
                      </div>

                      <div className="md:col-span-6">
                        <h2 className="text-h2 transition-colors duration-act group-hover:text-accent-text">
                          {study.title}
                        </h2>
                        <p className="mt-4 max-w-measure text-body text-muted">{study.tagline}</p>
                        {study.note && (
                          <p className="mt-4 text-s text-muted-2">{study.note}</p>
                        )}
                      </div>

                      <div className="md:col-span-3 md:col-start-10">
                        <IndexPlate
                          year={study.year}
                          kind={study.kind}
                          deployed={Boolean(study.links?.some((l) => l.label === 'Live'))}
                          source={Boolean(study.links?.some((l) => l.label === 'Source'))}
                          hasArtefact={study.slug in CASE_ARTEFACTS}
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-rule bg-surface">
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <p className="max-w-measure text-h2">
                  The source for all of it is public, including the parts that are wrong.
                </p>
              </Reveal>
              <Reveal delay={1}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lead text-accent-text underline decoration-rule-strong underline-offset-8 transition-colors duration-act hover:decoration-accent-edge"
                  >
                    {site.email}
                  </a>
                  <InternalLink href="/about">About</InternalLink>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Reveal delay={2}>
                <Label className="mb-4">Check for yourself</Label>
                <ul className="flex flex-col gap-4">
                  {elsewhere.map((l) => (
                    <li key={l.href} className="border-t border-rule pt-4">
                      <ExternalLink href={l.href} className="text-s">
                        {l.label}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>
    </>
  )
}
