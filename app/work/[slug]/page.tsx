import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'
import { WavelineVisualizer } from '@/components/waveline-visualizer'
import { LoveQuestShowcase } from '@/components/lovequest-showcase'
import { SkillBridgeShowcase } from '@/components/skillbridge-showcase'
import { JarvisShowcase } from '@/components/jarvis-showcase'
import { YouTubeShowcase } from '@/components/youtube-showcase'
import { SecondBrainShowcase } from '@/components/secondbrain-showcase'
import { getProject, projects } from '@/content'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project
    ? {
        title: project.title,
        description: project.summary,
        alternates: { canonical: `/work/${project.slug}` },
      }
    : {}
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <article className="project-detail">
      <section className="project-hero">
        <Container>
          <div className="project-hero-head">
            <Link className="project-back" href="/work">
              ← All work
            </Link>
            <p className="project-index">
              Case study {(currentIndex + 1).toString().padStart(2, '0')} of{' '}
              {projects.length.toString().padStart(2, '0')}
            </p>
          </div>
          <h1>{project.title}</h1>
          <p className="project-summary">{project.summary}</p>
        </Container>
      </section>

      <section className="project-showcase">
        <Container>
          {project.slug === 'waveline' ? (
            <Reveal>
              <WavelineVisualizer />
            </Reveal>
          ) : project.slug === 'lovequest' ? (
            <Reveal>
              <LoveQuestShowcase />
            </Reveal>
          ) : project.slug === 'jarvis-infrastructure' ? (
            <Reveal>
              <JarvisShowcase />
            </Reveal>
          ) : project.slug === 'youtube-engine' ? (
            <Reveal>
              <YouTubeShowcase />
            </Reveal>
          ) : project.slug === 'second-brain' ? (
            <Reveal>
              <SecondBrainShowcase />
            </Reveal>
          ) : (
            <Reveal>
              <SkillBridgeShowcase />
            </Reveal>
          )}
        </Container>
      </section>

      {/* Metrics Banner */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="project-metrics-banner border-y border-border bg-subtle py-8">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="metric-card p-4 border border-border bg-surface">
                  <p className="text-2xl md:text-3xl font-bold text-accent mb-1 tracking-tight font-mono">
                    {m.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-muted font-medium">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Deep Blocker-Style Case Study Narrative */}
      <section className="project-story py-16">
        <Container>
          <div>
            <p className="project-index">The origin &amp; vision</p>
            <h2>{project.storyHeadline || project.kicker}</h2>
          </div>
          <div>
            {project.storyBody ? (
              project.storyBody.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed mb-6 text-ink/90">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed mb-6 text-ink/90">
                {project.description}
              </p>
            )}

            {/* Problem Breakdown */}
            {project.problem && project.problem.length > 0 && (
              <div className="case-study-pillar my-10 p-6 border-l-2 border-accent bg-subtle">
                <h3 className="text-xs uppercase tracking-widest font-mono text-muted mb-4">
                  01 // The Core Problem
                </h3>
                <ul className="space-y-3">
                  {project.problem.map((item, i) => (
                    <li key={i} className="text-sm md:text-base leading-relaxed text-ink/80 flex items-start">
                      <span className="text-accent mr-3 font-mono">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Breakdown */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="case-study-pillar my-10 p-6 border-l-2 border-accent bg-subtle">
                <h3 className="text-xs uppercase tracking-widest font-mono text-muted mb-4">
                  02 // Systems &amp; Architecture
                </h3>
                <ul className="space-y-3">
                  {project.architecture.map((item, i) => (
                    <li key={i} className="text-sm md:text-base leading-relaxed text-ink/80 flex items-start">
                      <span className="text-accent mr-3 font-mono">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome Breakdown */}
            {project.outcome && project.outcome.length > 0 && (
              <div className="case-study-pillar my-10 p-6 border-l-2 border-accent bg-subtle">
                <h3 className="text-xs uppercase tracking-widest font-mono text-muted mb-4">
                  03 // Shipped Outcome &amp; Value
                </h3>
                <ul className="space-y-3">
                  {project.outcome.map((item, i) => (
                    <li key={i} className="text-sm md:text-base leading-relaxed text-ink/80 flex items-start">
                      <span className="text-accent mr-3 font-mono">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="project-role">{project.role}</p>
            <ul className="stack-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-actions">
              {project.live && (
                <a className="signal-button" href={project.live} target="_blank" rel="noopener noreferrer">
                  Visit live ↗
                </a>
              )}
              {project.source && (
                <a className="text-link" href={project.source} target="_blank" rel="noopener noreferrer">
                  View source ↗
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="next-project">
        <Container>
          <p className="project-index">Next project</p>
          <Link href={`/work/${next.slug}`}>{next.title} →</Link>
        </Container>
      </section>
    </article>
  )
}
