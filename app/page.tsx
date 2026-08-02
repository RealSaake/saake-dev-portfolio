import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Card,
  Container,
  DotGrid,
  Eyebrow,
  ExternalLink,
  InternalLink,
  Label,
  Marquee,
  NumberedList,
  Prose,
  Reveal,
  revealDelay,
  Rule,
  Section,
  SectionHead,
  StatTile,
} from '@/components/primitives'
import {
  capabilities,
  caseStudies,
  elsewhere,
  facts,
  flagship,
  marqueeItems,
  process,
  site,
  stack,
} from '@/content'

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

      {/* ── 01 · Position ─────────────────────────────────────
          The claim, in the first screen, without a job title or a
          pill announcing availability. The HUD grid is composed as
          its own full-bleed layer rather than a compound
          background, so it stays independently tunable. */}
      <Section pad="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <Container className="relative">
          <Reveal>
            <Eyebrow>portfolio // interface design + front-end</Eyebrow>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-10 max-w-measure-long text-display font-black">
              I design and build interfaces,
              <br className="hidden md:block" /> and I write down{' '}
              <span className="text-accent-text">why</span>.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <Prose className="mt-10">
              <p>
                Most of what makes an interface good is decided before anything is drawn — what the
                thing is for, what it refuses to do, and which of the two hard cases it is built
                around. Those decisions are the work. This site is five of them, written out.
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

      {/* ── 02 · Breadth band ─────────────────────────────────── */}
      <Section pad="band">
        <Marquee items={marqueeItems} />
      </Section>

      {/* ── 03 · Prove, numerically ───────────────────────────
          Four figures, each linking to where it can be checked.
          The fourth one is the argument the whole site makes. */}
      <Section pad="tight">
        <Container>
          <Reveal>
            <div className="mortar grid-cols-2 lg:grid-cols-4">
              {facts.map((f) => (
                <StatTile
                  key={f.label}
                  value={f.value}
                  label={f.label}
                  note={f.note}
                  href={f.href}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── 04 · Demonstrate ──────────────────────────────────
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
                <h2 className="max-w-measure text-h1">
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

              <Reveal delay={3}>
                <DotGrid className="mt-12 aspect-card" label="saake.dev / rebuild" />
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Reveal delay={2}>
                <Label className="mb-4">What came out of it</Label>
                <ul className="flex flex-col gap-4">
                  {flagship.deliverables.slice(0, 5).map((d) => (
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

      {/* ── 05 · Prove ────────────────────────────────────────
          The work index. Every row states a problem, not a stack. */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead index="02" label="Selected work" />
          </Reveal>

          <ul>
            {caseStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={revealDelay(i)}>
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
                        <Label>{study.kind}</Label>
                        {study.note && (
                          <p className="mt-2 text-s text-muted-2">{study.note}</p>
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

      {/* ── 06 · Capabilities ─────────────────────────────────── */}
      <Section className="bg-surface-2">
        <Container>
          <Reveal>
            <SectionHead index="03" label="What I do">
              Six things, described as capability rather than as experience.
            </SectionHead>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={revealDelay(i)}>
                <Card className="h-full">
                  <h3 className="text-h3">{c.title}</h3>
                  <p className="mt-4 text-s text-muted">{c.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.tools.map((t) => (
                      <li key={t} className="label border border-rule px-3 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 07 · Process ──────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="04" label="How it goes" />
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={1}>
                <NumberedList
                  items={process.map((p) => (
                    <span key={p.title}>
                      <span className="block text-body text-ink">{p.title}</span>
                      <span className="mt-2 block text-s text-muted">{p.body}</span>
                    </span>
                  ))}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 08 · Humanize + Qualify ───────────────────────────
          The second half is the part that makes the first half
          worth reading. It stays exactly as written. */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <SectionHead index="05" label="How I work" />
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
                  <p>
                    Then I look for the case that breaks the obvious design — the empty state, the
                    slow network, the user who arrives from a link rather than the front door.
                    Building for that case first tends to produce something simpler than building
                    for the happy path and patching it afterwards.
                  </p>
                  <p>
                    I am more useful early than late. Give me an unclear brief and I will come back
                    with a smaller, sharper one. Hand me a finished spec to execute pixel-for-pixel
                    and you are paying for the wrong thing.
                  </p>
                  <p className="text-muted-2">
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

      {/* ── 09 · Stack ────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <SectionHead index="06" label="Materials" />
          </Reveal>

          <div className="mortar grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((g) => (
              <div key={g.group} className="p-6">
                <Label className="mb-4">{g.group}</Label>
                <ul className="flex flex-col gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="text-s text-ink-2">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── 10 · Corroborate + Ask ────────────────────────────
          No testimonial — there are no clients to quote, and
          inventing one is exactly what this rebuild deleted. The
          source is the corroboration. */}
      <Section className="border-t border-rule">
        <Container>
          <Reveal>
            <SectionHead index="07" label="Next" />
          </Reveal>

          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal delay={1}>
                <p className="max-w-measure text-h2">
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
                <Label className="mb-4">Check for yourself</Label>
                <ul className="flex flex-col gap-4">
                  {elsewhere.map((l) => (
                    <li key={l.href} className="border-t border-rule pt-4">
                      <ExternalLink href={l.href} className="text-s">
                        {l.label}
                      </ExternalLink>
                      <p className="mt-1 text-s text-muted-2">{l.note}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
