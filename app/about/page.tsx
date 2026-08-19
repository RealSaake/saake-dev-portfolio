import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'

export const metadata: Metadata = { 
  title: 'About', 
  description: 'About Saake, a creative developer based in India.', 
  alternates: { canonical: '/about' } 
}

export default function About() {
  return (
    <>
      <section className="about-hero">
        <Container>
          <div className="about-grid">
            <Reveal load>
              <div className="portrait-frame">
                <Image 
                  src="/media/saake-portrait.jpg" 
                  alt="Portrait of Saake" 
                  fill 
                  priority 
                  sizes="(max-width: 800px) 100vw, 44vw" 
                  className="portrait-image" 
                />
                <span className="portrait-tag label">Saake / Creative developer</span>
              </div>
            </Reveal>
            <Reveal load delay={1}>
              <div>
                <p className="hero-kicker"><span /> About</p>
                <h1>I like the point where logic becomes <em>feeling.</em></h1>
                <p className="about-lead">
                  I&apos;m Saake, a creative developer in India. I design and build expressive web experiences—especially the ones that need motion, atmosphere and a little technical stubbornness.
                </p>
                <p>
                  I work across product thinking, interface design and front-end engineering. That means fewer handoffs, faster experiments and ideas that survive contact with the browser.
                </p>
                <Link href="/contact" className="signal-button mt-6">Work with me ↗</Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="principles">
        <Container>
          <p className="project-index">What I bring</p>
          <div className="principle-grid">
            {[
              ['Taste + systems', 'A visual point of view backed by reusable, accessible foundations.'],
              ['Ideas + execution', 'I can shape the concept, prototype it and carry it into production.'],
              ['Honest curiosity', 'I learn quickly, ask direct questions and care about the details people feel.']
            ].map(([title, body], i) => (
              <Reveal key={title} delay={(i + 1) as 1 | 2 | 3}>
                <div>
                  <span>0{i + 1}</span>
                  <h2>{title}</h2>
                  <p>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
