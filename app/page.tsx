import type { Metadata } from 'next'
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
  SectionHead,
} from '@/components/primitives'
import { caseStudies, flagship, site } from '@/content'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const PERSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: 'Designer and engineer',
  sameAs: [site.github],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
      />

      {/* ── Position ──────────────────────────────────────────
          The claim, made in the first screen, without a job title
          or a pill that says "available for work". */}
      <Section pad="top">
        <Container>
          <Reveal>
            <Label className="mb-10">saake.dev — {site.name}</Label>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="text-display max-w-measure-long">
              I design and build interfaces,
              <br className="hidden md:block" /> and I write down{' '}
              <em className="italic text-accent-text">why</em>.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <Prose className="mt-10">
              <p>
                Most of what makes an interface good is decided before anything is drawn — what the
                thing is for, what it refuses to do, and which of the two hard cases it is built
                around. Those decisions are the work. This site is three of them, written out.
              </p>
            </Prose>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <InternalLink href="/work">Read the work</InternalLink>
              <a
                href={`mailto:${site.email}`}
                className="text-s text-muted transition-colors duration-act hover:text-accent-text"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* ── Demonstrate ───────────────────────────────────────
          The flagship, at length, before anything else competes
          for attention. */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead index="01" label="Currently" />
          </Reveal>

          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <h2 className="text-h1 max-w-measure">
                  <Link
                    href={`/work/${flagship.slug}`}
                    className="transition-colors duration-act hover:text-accent-text"
                  >
                    {flagship.title}
                  </Link>
                </h2>
              </Reveal>

              <Reveal delay={1}>
                <Prose className="mt-8">
                  <p>{flagship.problem}</p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <div className="mt-8">
                  <InternalLink href={`/work/${flagship.slug}`}>
                    Read what I did about it
                  </InternalLink>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Reveal delay={2}>
                <Label className="mb-4">What came out of it</Label>
                <ul className="flex flex-col gap-4">
                  {flagship.deliverables.slice(0, 4).map((d) => (
                    <li key={d} className="border-t border-rule pt-4 text-s text-muted">
                      {d}
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

      {/* ── Prove ─────────────────────────────────────────────
          The remaining work, as an index. Every row states a
          problem, not a stack. */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead index="02" label="Selected work" />
          </Reveal>

          <ul>
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={Math.min(i + 1, 5) as 1 | 2 | 3}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="lift group block border-t border-rule py-10 transition-colors duration-act hover:border-accent-edge"
                  >
                    <div className="grid gap-6 md:grid-cols-12 md:items-baseline">
                      <div className="md:col-span-1">
                        <Label>{study.year}</Label>
                      </div>

                      <div className="md:col-span-6">
                        <h3 className="text-h3 transition-colors duration-act group-hover:text-accent-text">
                          {study.title}
                        </h3>
                        <p className="mt-3 max-w-measure text-s text-muted">{study.tagline}</p>
                      </div>

                      <div className="md:col-span-4 md:col-start-9">
                        <Label className="text-muted-2">{study.kind}</Label>
                        {study.note && (
                          <p className="mt-2 text-xs text-muted-2">{study.note}</p>
                        )}
                      </div>

                      <div className="md:col-span-1 md:text-right">
                        <span aria-hidden="true" className="text-muted-2">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Rule />
        </Container>
      </Section>

      {/* ── Humanize + Qualify ────────────────────────────────
          What I am actually like to work with, and what I am not.
          The second half is the part that makes the first half
          worth reading. */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <SectionHead index="03" label="How I work" />
              </Reveal>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={1}>
                <Prose>
                  <p>
                    I start by writing the problem down in language a person outside the project
                    would understand. If I cannot do that, I do not understand it yet, and any
                    interface I draw will be a guess with good spacing.
                  </p>
                  <p className="mortar">
                    Then I look for the case that breaks the obvious design — the empty state, the
                    slow network, the user who arrives from a link rather than the front door.
                    Building for that case first tends to produce something simpler than building
                    for the happy path and patching it afterwards.
                  </p>
                  <p className="mortar">
                    I am more useful early than late. Give me an unclear brief and I will come back
                    with a smaller, sharper one. Hand me a finished spec to execute pixel-for-pixel
                    and you are paying for the wrong thing.
                  </p>
                  <p className="mortar text-muted-2">
                    Where I am still short: I have not shipped inside a large engineering
                    organisation, so I have opinions about process that have not been tested against
                    one. My work so far has been solo or near-solo. If that matters for what you
                    need, it should count against me.
                  </p>
                </Prose>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Corroborate + Ask ─────────────────────────────────
          No testimonial. The source is the corroboration. */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead index="04" label="Next" />
          </Reveal>

          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal delay={1}>
                <p className="text-h2 max-w-measure">
                  If you have a problem that is still fuzzy, that is the interesting stage and the
                  one I would rather be brought into.
                </p>
              </Reveal>

              <Reveal delay={2}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lead text-accent-text underline decoration-rule-strong underline-offset-8 transition-colors duration-act hover:decoration-accent-edge"
                  >
                    {site.email}
                  </a>
                  <ExternalLink href={site.github}>GitHub</ExternalLink>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Reveal delay={3}>
                <Label className="mb-4">Verification</Label>
                <Prose>
                  <p className="text-s">
                    Every claim on this site is checkable. The source of this page is public, the
                    projects link to their repositories, and where something is broken I have said
                    so on the page rather than in a footnote.
                  </p>
                </Prose>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
