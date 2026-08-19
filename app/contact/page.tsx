import type { Metadata } from 'next'
import { Container, Reveal } from '@/components/primitives'
import { EmailButton } from '@/components/email-button'
import { site } from '@/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Connect with Saake for high-performance websites, automated workflows, and AI systems.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <section className="contact-page">
      <Container>
        <Reveal load>
          <p className="hero-kicker">
            <span /> Available for architecture &amp; development
          </p>
          <h1>
            Build your digital <em>infrastructure.</em>
          </h1>
          <p className="contact-lead border-l-2 border-accent-fill pl-6 mt-8 py-2">
            Taking on select clients for high-performance websites, automated company workflows, and internal AI systems designed to scale.
          </p>
          
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a href={`mailto:${site.email}`} className="signal-button" style={{ minWidth: '240px', fontSize: '1rem' }}>
              Initiate Project ↗
            </a>
            <EmailButton email={site.email} label="Copy email instead" />
          </div>
        </Reveal>

        <Reveal load delay={1}>
          <div className="contact-details">
            <div>
              <p className="label text-accent-text">CURRENT BASE</p>
              <p className="mt-2 text-ink text-lg font-medium">{site.location}</p>
              <p className="text-sm mt-1">Available for remote systems architecture globally.</p>
            </div>
            <div>
              <p className="label text-accent-text">PROJECT INQUIRIES</p>
              <p className="mt-2 text-ink text-lg font-medium">{site.email}</p>
              <p className="text-sm mt-1">Usually respond within 24 hours.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
