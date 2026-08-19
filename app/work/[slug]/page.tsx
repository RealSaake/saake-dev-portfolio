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
  const project = getProject((await params).slug)
  if (!project) notFound()
  const next = projects[(projects.indexOf(project) + 1) % projects.length]

  return (
    <article className={`project-page project-page--${project.slug}`}>
      <section className="project-hero">
        <Container>
          <Reveal load>
            <Link href="/work" className="hero-kicker-link">
              ← All work
            </Link>
            <p className="project-index">
              {project.kicker} / {project.year}
            </p>
            <h1>{project.title}</h1>
            <p className="project-hero-summary">{project.summary}</p>
          </Reveal>
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

      <section className="project-story">
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
