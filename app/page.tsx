import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'
import { HeroSceneLoader } from '@/components/hero-scene-loader'
import { CapabilitiesTicker } from '@/components/capabilities-ticker'
import { projects } from '@/content'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Home() {
  // Primary flagship showcases on home
  const featured = projects.filter((p) => p.slug === 'skillbridge' || p.slug === 'lovequest')

  return (
    <>
      <section className="hero">
        <div className="hero-grid-overlay" aria-hidden="true" />
        <HeroSceneLoader />
        <Container className="hero-inner">
          <div className="hero-copy">
            <Reveal load>
              <Link href="/contact" className="hero-kicker-link">
                Work with me ↗
              </Link>
            </Reveal>
            <Reveal load delay={1}>
              <h1 className="hero-title">
                Building <em>autonomous</em> systems &amp; smart <em>workflows</em>
              </h1>
            </Reveal>
            <Reveal load delay={2}>
              <p className="hero-intro">
                I build custom websites, automate company workflows, and engineer AI systems for businesses that want to scale.
              </p>
            </Reveal>
            <Reveal load delay={3}>
              <div className="hero-actions">
                <Link href="#work" className="signal-button">
                  Explore selected work <span className="btn-arrow" aria-hidden="true">↓</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div
            className="hero-coordinates"
            aria-label="Coordinates: 29.9792° N, 31.1342° E"
          >
            29.9792° N<br />31.1342° E
          </div>
        </Container>
      </section>

      {/* Single-Line Seamless Foundations Ribbon */}
      <CapabilitiesTicker />

      {/* Selected Work Preview */}
      <section id="work" className="project-section">
        <Container>
          <Reveal>
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <span className="label font-mono text-xs text-muted-2 uppercase tracking-widest">
                Selected Work &amp; Blueprints
              </span>
              <span className="label font-mono text-xs text-accent-text">
                02 of 05 Featured
              </span>
            </div>
          </Reveal>

          <div className="project-grid">
            {featured.map((project, idx) => (
              <Reveal key={project.slug} delay={Math.min(idx + 1, 3) as 1 | 2 | 3}>
                <Link
                  href={`/work/${project.slug}`}
                  className={`project-card project-card--${project.slug}`}
                >
                  <div className="project-card__content">
                    <div className="project-card__meta">
                      <span className="font-mono text-xs font-bold text-accent-text">
                        0{idx + 1} / {project.year}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {project.kicker}
                      </span>
                    </div>
                    <h2>{project.title}</h2>
                    <p>{project.summary}</p>
                  </div>

                  <div className="project-card__footer">
                    <div className="project-card__tags">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-rule font-mono text-xs">
                      <span className="text-muted">{project.role.split('·')[0].trim()}</span>
                      <span className="text-link font-semibold uppercase tracking-wider text-accent-text">
                        Open Case Study →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 border border-rule bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors hover:border-rule-strong">
              <div>
                <span className="label font-mono text-xs text-muted-2 uppercase tracking-widest">
                  Extended Portfolio
                </span>
                <p className="mt-2 font-display text-lg font-bold text-ink">
                  Explore all 5 case studies and internal tools
                </p>
              </div>
              <Link href="/work" className="signal-button shrink-0">
                View All Systems (5) →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
