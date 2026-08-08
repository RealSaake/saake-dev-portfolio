import type { Metadata } from 'next'
import {
  Card,
  Container,
  Eyebrow,
  ExternalLink,
  FieldNote,
  InternalLink,
  Label,
  NumberedList,
  Prose,
  Reveal,
  revealDelay,
  Rule,
  Section,
  SectionHead,
} from '@/components/primitives'
import { capabilities, elsewhere, process, site, stack } from '@/content'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am, how I work, and what I am still short on.',
  alternates: { canonical: '/about' },
}

/* The profile readout is a <dl> of facts that can each be checked
 * against a public source. There is no photograph because there is
 * no photograph — a stock portrait would be the same class of lie
 * this site was rebuilt to remove. */
const READOUT: [string, string][] = [
  ['name', 'Aryan'],
  ['handle', 'saake'],
  ['email', 'hi@saake.dev'],
  ['github', 'RealSaake'],
  ['public_repos', '16'],
  ['on_github_since', '2019'],
]

export default function About() {
  return (
    <>
      <Section pad="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <Container className="relative">
          <Reveal load>
            <Eyebrow>about // {site.handle}</Eyebrow>
          </Reveal>

          <Reveal load delay={1}>
            <h1 className="mt-10 max-w-measure text-h1">
              I am {site.name}. I build things on the web and I am fairly direct about which parts of
              them work.
            </h1>
          </Reveal>

          <Reveal load delay={2}>
            <Prose long className="mt-10">
              <p>
                I came to design through building rather than the other way round. That shows: I am
                more interested in what an interface does under load, on a bad connection, or in its
                empty state than in how it photographs. The things I find satisfying are the ones
                nobody notices — a page that does not move while it loads, a form that remembers
                what you typed, an error that says what to do next.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      {/* ── Profile readout ─────────────────────────────────── */}
      <Section pad="tight">
        <Container>
          <Reveal>
            <Label className="mb-4">profile_readout.dat</Label>
            <dl className="mortar grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {READOUT.map(([k, v]) => (
                <div key={k} className="p-5">
                  <dt className="label">{k}</dt>
                  <dd className="mt-2 font-mono text-s text-accent-text">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* ── The longer read ─────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="01" label="How I got here" />
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={1}>
                <Prose long>
                  <p>
                    Most of my work has been solo, which has an obvious cost and one real benefit.
                    The cost is that I have never had a senior engineer tell me my architecture was
                    wrong before I found out the expensive way. The benefit is that I have had to
                    hold the whole thing — the research, the type, the data model, the deploy — and
                    I have learned where those decisions actually touch each other.
                  </p>
                  <p>
                    The clearest example is this site. The version before it made a series of
                    impressive claims that were not true, and rather than quietly fix the numbers I
                    wrote down what had happened and rebuilt around a rule that makes it hard to
                    repeat. That is on the work page, and it is the piece I would want read first.
                  </p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <div className="mt-12">
                  <InternalLink href="/work/rebuilding-this-site">
                    Read the rebuild case study
                  </InternalLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Capabilities ────────────────────────────────────── */}
      <Section className="bg-surface-2">
        <Container>
          <Reveal>
            <SectionHead index="02" label="What I do" />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={revealDelay(i)}>
                <Card className="h-full">
                  <h3 className="text-h3">{c.title}</h3>
                  <p className="mt-4 text-s text-muted">{c.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Process ─────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="03" label="How it goes" />
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

      {/* ── Materials ───────────────────────────────────────── */}
      <Section className="border-t border-rule">
        <Container>
          <Reveal>
            <SectionHead index="04" label="Materials" />
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

      {/* ── What I am not ───────────────────────────────────
          The strongest section on the page. It stays. */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="05" label="What I am not" />
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={1}>
                <Prose long>
                  <p className="text-lead text-ink-2">
                    I have not worked inside a large engineering organisation, I have not shipped
                    anything at serious scale, and I do not have production experience with native
                    mobile or with backend systems beyond what these projects needed. If a role
                    turns on any of those, I am the wrong person and would rather say so now.
                  </p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <FieldNote className="mt-12">
                  This section exists because the previous version of this site had the opposite of
                  it — a list of credentials I did not hold. A portfolio that cannot name a limit is
                  not describing a person.
                </FieldNote>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Elsewhere ───────────────────────────────────────── */}
      <Section className="border-t border-rule">
        <Container>
          <Reveal>
            <SectionHead index="06" label="Check for yourself" />
          </Reveal>

          <div className="mortar grid-cols-1 sm:grid-cols-2">
            {elsewhere.map((l) => (
              <div key={l.href} className="p-6">
                <ExternalLink href={l.href}>{l.label}</ExternalLink>
                <p className="mt-2 text-s text-muted-2">{l.note}</p>
              </div>
            ))}
          </div>

          <Reveal delay={1}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                className="text-lead text-accent-text underline decoration-rule-strong underline-offset-8 transition-colors duration-act hover:decoration-accent-edge"
              >
                {site.email}
              </a>
              <InternalLink href="/contact">Contact</InternalLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
