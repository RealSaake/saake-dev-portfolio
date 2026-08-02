import { Container, Eyebrow, InternalLink, Prose, Section } from '@/components/primitives'

export default function NotFound() {
  return (
    <Section pad="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="hud-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <Eyebrow>error // 404</Eyebrow>

        <p
          aria-hidden="true"
          className="mt-10 font-display text-display font-black leading-none text-accent-text"
        >
          404
        </p>

        <h1 className="mt-8 max-w-measure text-h1">This page does not exist.</h1>

        <Prose className="mt-8">
          <p>
            It may have existed on the previous version of this site. That version has been
            replaced, and most of what was on it was not accurate, so a redirect would not have done
            you a favour.
          </p>
        </Prose>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
          <InternalLink href="/">Home</InternalLink>
          <InternalLink href="/work">Work</InternalLink>
          <InternalLink href="/contact">Contact</InternalLink>
        </div>
      </Container>
    </Section>
  )
}
