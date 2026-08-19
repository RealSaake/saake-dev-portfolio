import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'
import { site } from '@/content'

export const metadata: Metadata = { 
  title: 'About', 
  description: 'About Saake, Systems Architect & Automation Builder.', 
  alternates: { canonical: '/about' } 
}

export default function About() {
  return (
    <>
      <section className="about-hero">
        <Container>
          <div className="about-grid">
            <Reveal load>
              <div className="portrait-frame bg-[#0a0a0a] flex items-center justify-center p-8">
                <div className="font-mono text-xs text-accent-text opacity-80 leading-relaxed text-left">
                  {`// SYS.INIT
> WHOAMI
Aryan (Saake)
> ROLE
Systems Architect
Automation Builder
> STACK
Next.js / Python / Node
Oracle Cloud / AI Native
> STATUS
Deploying infrastructure.`}
                </div>
                <span className="portrait-tag label">Saake / Systems Director</span>
              </div>
            </Reveal>
            <Reveal load delay={1}>
              <div>
                <p className="hero-kicker"><span /> About</p>
                <h1>I build systems that give businesses an <em>unfair advantage.</em></h1>
                <p className="about-lead">
                  I&apos;m Saake, an automation architect and systems director. I build high-ticket websites and backend AI infrastructure that runs exactly the way it should: silently and reliably.
                </p>
                <p>
                  I don&apos;t just write code—I architect workflows, design conversion funnels, logic-gate critical business systems, and orchestrate localized AI agents to solve complex problems faster and better than traditional teams. 
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
              ['High-Performance Websites', 'Custom, blazingly fast sites built on Next.js designed for conversion, not just looks.'],
              ['AI-Native Infrastructure', 'From automated lead generation to internal agent swarms, I build the engines that scale your output.'],
              ['Systems Architecture', 'I shape the concept, structure the logic, and deploy the automated workforce that brings it to production.']
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
