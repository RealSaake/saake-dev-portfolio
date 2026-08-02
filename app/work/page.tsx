import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Label, Prose, Reveal, Rule, Section } from '@/components/primitives'
import { caseStudies } from '@/content'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Three case studies, each with a stated problem, what I did about it, and an outcome that includes what did not work.',
  alternates: { canonical: '/work' },
}

export default function WorkIndex() {
  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <Reveal>
          <Label className="mb-10">Work</Label>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="text-h1 max-w-measure">Three projects, written up properly</h1>
        </Reveal>

        <Reveal delay={2}>
          <Prose className="mt-8">
            <p>
              Each of these states the problem before it states the solution, and each ends with an
              outcome that includes the part that did not work. A portfolio that only contains
              successes is either very short or not true.
            </p>
          </Prose>
        </Reveal>

        <div className="mt-24">
          <ul>
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={Math.min(i + 1, 5) as 1 | 2 | 3}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="lift group block border-t border-rule py-12 transition-colors duration-act hover:border-accent-edge"
                  >
                    <div className="grid gap-6 md:grid-cols-12">
                      <div className="md:col-span-2">
                        <Label>{study.year}</Label>
                        <Label className="mt-2 text-muted-2">{study.kind}</Label>
                      </div>

                      <div className="md:col-span-7">
                        <h2 className="text-h2 transition-colors duration-act group-hover:text-accent-text">
                          {study.title}
                        </h2>
                        <p className="mt-4 max-w-measure text-body text-muted">{study.tagline}</p>
                        {study.note && (
                          <p className="mt-4 text-xs text-muted-2">{study.note}</p>
                        )}
                      </div>

                      <div className="md:col-span-2 md:col-start-11 md:text-right">
                        <span className="label text-muted-2">Read →</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <Rule />
        </div>
      </Container>
    </Section>
  )
}
