import { Container, InternalLink, Label, Prose, Section } from '@/components/primitives'

export default function NotFound() {
  return (
    <Section pad="top">
      <Container>
        <Label className="mb-10">404</Label>
        <h1 className="text-h1 max-w-measure">This page does not exist.</h1>
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
        </div>
      </Container>
    </Section>
  )
}
