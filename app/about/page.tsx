import type { Metadata } from 'next'
import { Container, ExternalLink, Label, Prose, Reveal, Rule, Section } from '@/components/primitives'
import { site } from '@/content'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am, how I got here, and what I am still short on.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <Section className="pt-20 md:pt-32">
      <Container>
        <Reveal>
          <Label className="mb-10">About</Label>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal delay={1}>
              <h1 className="text-h1 max-w-measure">
                I am {site.name}. I build things on the web and I am fairly direct about which parts
                of them work.
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <Prose long className="mt-12">
                <p>
                  I came to design through building rather than the other way round. That shows: I
                  am more interested in what an interface does under load, on a bad connection, or
                  in its empty state than in how it photographs. The things I find satisfying are
                  the ones nobody notices — a page that does not move while it loads, a form that
                  remembers what you typed, an error that says what to do next.
                </p>
                <p className="mortar">
                  Most of my work has been solo, which has an obvious cost and one real benefit. The
                  cost is that I have never had a senior engineer tell me my architecture was wrong
                  before I found out the expensive way. The benefit is that I have had to hold the
                  whole thing — the research, the type, the data model, the deploy — and I have
                  learned where those decisions actually touch each other.
                </p>
                <p className="mortar">
                  The clearest example is this site. The version before it made a series of
                  impressive claims that were not true, and rather than quietly fix the numbers I
                  wrote down what had happened and rebuilt around a rule that makes it hard to
                  repeat. That is on the work page, and it is the piece I would want read first.
                </p>
              </Prose>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={3}>
              <Label className="mb-6">What I am good at</Label>
              <ul className="flex flex-col">
                {[
                  'Turning an unclear brief into a smaller, answerable one',
                  'Interface and interaction design, end to end',
                  'Front-end engineering — React, TypeScript, the platform underneath',
                  'Design systems that survive contact with a deadline',
                  'Writing — the documents around the work, not just the work',
                ].map((s) => (
                  <li key={s} className="border-t border-rule py-4 text-s text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <Rule />
            </Reveal>

            <Reveal delay={4}>
              <div className="mt-16">
                <Label className="mb-6">What I am not</Label>
                <Prose>
                  <p className="text-s">
                    I have not worked inside a large engineering organisation, I have not shipped
                    anything at serious scale, and I do not have production experience with native
                    mobile or with backend systems beyond what these projects needed. If a role
                    turns on any of those, I am the wrong person and would rather say so now.
                  </p>
                </Prose>
              </div>
            </Reveal>

            <Reveal delay={5}>
              <div className="mt-16">
                <Label className="mb-6">Elsewhere</Label>
                <ExternalLink href={site.github}>github.com/RealSaake</ExternalLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
