import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'
import { projects } from '@/content'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects, autonomous systems, and interactive web architectures by Saake.',
  alternates: { canonical: '/work' },
}

export default function Work() {
  return (
    <section className="index-page">
      <Container>
        <Reveal load>
          <p className="hero-kicker-link">
            Selected work &amp; engineering blueprints
          </p>
          <h1 className="index-title">
            Autonomous systems &amp;<br />interactive <em>architectures.</em>
          </h1>
          <p className="contact-lead max-w-2xl mt-4">
            A portfolio of verified systems: peer-to-peer learning networks, private relationship companions, distributed AI proxy infrastructure, automated content research pipelines, and structured second-brain matrices.
          </p>
        </Reveal>

        <div className="work-index mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index + 1, 3) as 1 | 2 | 3}>
              <Link
                href={`/work/${project.slug}`}
                className={`work-index-card work-index-card--${project.slug} block border border-rule bg-surface p-6 sm:p-8 transition-all hover:border-rule-strong h-full flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-muted mb-4 border-b border-rule pb-3">
                    <span className="text-accent-text font-bold">0{index + 1} / {project.year}</span>
                    <span>{project.kicker}</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-ink tracking-tight mb-3">
                    {project.title}
                  </h2>
                  <p className="text-sm font-sans text-muted leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2 py-1 bg-paper border border-rule text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-rule flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">{project.role.split('·')[0].trim()}</span>
                    <span className="text-link font-mono text-xs uppercase tracking-wider font-semibold">
                      Explore Case Study →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
