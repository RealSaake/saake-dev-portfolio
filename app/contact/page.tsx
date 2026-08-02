import type { Metadata } from 'next'
import { Container, ExternalLink, Label, Prose, Reveal, Rule, Section } from '@/components/primitives'
import { site } from '@/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email ${site.email}.`,
  alternates: { canonical: '/contact' },
}

/*
 * The previous version of this page published a phone number beginning
 * +1 (555), a San Francisco address, and a promise to reply within 24
 * hours. None of the three were real. This page has one channel, and it
 * makes no promise about timing that cannot be kept.
 */

export default function Contact() {
  return (
    <Section pad="top">
      <Container>
        <Reveal>
          <Label className="mb-10">Contact</Label>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal delay={1}>
              <h1 className="text-h1 max-w-measure">One address, and I read it.</h1>
            </Reveal>

            <Reveal delay={2}>
              <div className="mt-12">
                <a
                  href={`mailto:${site.email}`}
                  className="text-display text-accent-text underline decoration-rule-strong underline-offset-8 transition-colors duration-act hover:decoration-accent-edge"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <Prose className="mt-12">
                <p>
                  I am not going to quote you a response time. I will say that a message describing
                  an actual problem gets a considered reply, and one that opens with
                  &ldquo;exciting opportunity&rdquo; probably does not.
                </p>
              </Prose>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={3}>
              <Label className="mb-6">Useful to include</Label>
              <ul className="flex flex-col">
                {[
                  'What the problem is, in your own words',
                  'Who it is for',
                  'What you have already tried',
                  'Roughly when it needs to exist',
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
