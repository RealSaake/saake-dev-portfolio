import type { Metadata } from 'next'
import {
  Container,
  Eyebrow,
  ExternalLink,
  FieldNote,
  InternalLink,
  Label,
  NumberedList,
  Prose,
  Reveal,
  Rule,
  Section,
  SectionHead,
} from '@/components/primitives'
import { elsewhere, site } from '@/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Email ${site.email}.`,
  alternates: { canonical: '/contact' },
}

/*
 * The previous version of this page published a phone number beginning
 * +1 (555), a San Francisco address, and a promise to reply within 24
 * hours — to an address that did not exist and rejected mail. All four
 * were invented. This page has one channel, it is verified live, and it
 * makes no promise about timing that cannot be kept.
 *
 * There is deliberately no form. A form implies a queue and a process
 * behind it; an address is honest about what this actually is.
 */

export default function Contact() {
  return (
    <>
      <Section pad="top" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60"
        />
        <Container className="relative">
          <Reveal load>
            <Eyebrow>contact // one channel</Eyebrow>
          </Reveal>

          <Reveal load delay={1}>
            <h1 className="mt-10 max-w-measure text-h1">One address, and I read it.</h1>
          </Reveal>

          <Reveal load delay={2}>
            <div className="mt-12">
              <a
                href={`mailto:${site.email}`}
                className="font-display text-display font-black text-accent-text underline decoration-rule-strong underline-offset-8 transition-colors duration-act hover:decoration-accent-edge"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal load delay={3}>
            <Prose className="mt-12">
              <p>
                I am not going to quote you a response time. I will say that a message describing an
                actual problem gets a considered reply, and one that opens with &ldquo;exciting
                opportunity&rdquo; probably does not.
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="01" label="Useful to include" />
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={1}>
                <NumberedList
                  items={[
                    'What the problem is, in your own words',
                    'Who it is for',
                    'What you have already tried',
                    'Roughly when it needs to exist',
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <SectionHead index="02" label="What I am useful for" />
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={1}>
                <Prose long>
                  <p>
                    I am more useful early than late. Give me an unclear brief and I will come back
                    with a smaller, sharper one. Hand me a finished spec to execute pixel-for-pixel
                    and you are paying for the wrong thing.
                  </p>
                  <p className="text-muted-2">
                    I have not shipped inside a large engineering organisation and my work so far
                    has been solo or near-solo. If a role turns on either of those, I am the wrong
                    person and would rather say so before you spend a call finding out.
                  </p>
                </Prose>
              </Reveal>

              <Reveal delay={2}>
                <FieldNote className="mt-12">
                  There is no phone number and no response-time promise on this page. The version
                  before it had both, and both were invented — a placeholder number from the range
                  television uses, and a same-day reply guarantee on an address that rejected mail.
                  Removing them is the point rather than an omission.
                </FieldNote>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-rule">
        <Container>
          <Reveal>
            <SectionHead index="03" label="Elsewhere" />
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
            <div className="mt-12">
              <Label className="mb-4">Or read first</Label>
              <InternalLink href="/work">The work</InternalLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
