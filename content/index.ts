export type ProjectSlug =
  | 'skillbridge'
  | 'lovequest'
  | 'jarvis-infrastructure'
  | 'youtube-engine'
  | 'second-brain'
  | 'waveline'

export interface Project {
  slug: ProjectSlug
  title: string
  year: string
  kicker: string
  summary: string
  description: string
  role: string
  stack: string[]
  accent: string
  live?: string
  source?: string
  storyHeadline?: string
  storyBody?: string[]
}

export const projects: Project[] = [
  {
    slug: 'skillbridge',
    title: 'SkillBridge',
    year: '2024',
    kicker: 'Peer-to-peer knowledge exchange',
    summary: 'An open-source mentorship engine connecting learners through structured sessions, milestone tracking, and collaborative scheduling.',
    description:
      'SkillBridge pairs individuals looking to master technical disciplines with experienced mentors. Built around conversation-first learning, structured milestone checkpoints, and accessible schedule synchronization without bloated subscription models.',
    role: 'Full-stack development · API architecture · UI systems',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    accent: '#a98cea',
    live: 'https://skillbridgev1.vercel.app',
    source: 'https://github.com/RealSaake/SkillBridge',
  },
  {
    slug: 'lovequest',
    title: 'LoveQuest',
    year: '2025',
    kicker: 'A private world for two',
    summary: 'A bespoke relationship companion with daily connection quests, encrypted voice vaults, and a shared virtual garden — built for long-distance connection.',
    storyHeadline: 'Building a private software world for my long-distance relationship.',
    storyBody: [
      'LoveQuest began as a deeply personal project: a bespoke digital home built for my girlfriend and me during a long-distance season. Rather than relying on generic messaging apps, I wanted to create a shared space that felt intentional and responsive.',
      'Small daily check-in prompts evolved into a full interactive system: connection quests with real-time feedback loops, encrypted audio voice memos, collaborative streak counters, and a shared virtual garden that blooms as daily rituals are completed.',
      'Seeing how much joy and daily consistency it brought catalyzed my transition into full-stack architecture, Firebase real-time state synchronization, and complex interactive systems.',
    ],
    description:
      'A private companion application reimagining digital connection through daily quests, token economies, AES-GCM encrypted audio memories, and optimistic real-time state synchronization across timezones.',
    role: 'Concept · Product design · Full-stack development',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Firebase Realtime', 'Vite', 'Tailwind CSS'],
    accent: '#ff6f91',
    source: 'https://github.com/RealSaake/LoveQuest',
  },
  {
    slug: 'jarvis-infrastructure',
    title: 'Jarvis Infrastructure',
    year: '2026',
    kicker: 'Distributed AI orchestration',
    summary: 'A multi-platform AI orchestration gateway routing conversations across Telegram, desktop, and Slack through an Oracle Cloud proxy with failover and memory.',
    description:
      'The operational spine powering my daily AI workflows. A Node.js gateway running 24/7 on an Oracle Cloud VM proxies LLM requests through multi-account token rotation, maintains persistent cross-session memory via Honcho, and provides resilient automatic failover between local desktop and cloud execution.',
    role: 'Systems architecture · Infrastructure · Proxy DevOps',
    stack: ['Node.js', 'Oracle Cloud', 'PM2', 'systemd', 'Telegram API', 'Honcho'],
    accent: '#b8e928',
  },
  {
    slug: 'youtube-engine',
    title: 'YouTube Research Engine',
    year: '2025',
    kicker: 'API limit bypass & extraction',
    summary: 'A custom Chrome extension and backend pipeline that captures active session tokens to enable high-volume transcript and metadata extraction without quota limits.',
    description:
      'Public YouTube API quotas severely restrict large-scale content research. This engine pairs a custom browser extension that snapshots active session authorization tokens with a high-throughput backend pipeline, enabling automated transcript, commentary, and metadata harvesting at arbitrary scale.',
    role: 'Extension development · Reverse engineering · Pipeline design',
    stack: ['Chrome Extension API', 'Python', 'Node.js', 'YouTube Internal Protocol'],
    accent: '#ff5a49',
  },
  {
    slug: 'second-brain',
    title: 'Second Brain',
    year: '2026',
    kicker: 'Knowledge management system',
    summary: 'A structured Obsidian research system with automated transcript ingestion pipelines, timestamped citations, cross-source overlap maps, and asset synthesis.',
    description:
      'A methodology and repository framework transforming raw inputs into connected insights. Features automated video transcript ingestion, citation-grounded source notes, multi-source pattern detection matrices, and structured knowledge compilation across 20+ reference domains.',
    role: 'System design · Knowledge architecture · Automation',
    stack: ['Obsidian', 'Node.js', 'Python', 'Markdown', 'YAML'],
    accent: '#b8e928',
  },
  {
    slug: 'waveline',
    title: 'Waveline',
    year: '2025',
    kicker: 'Music, made visible',
    summary: 'A real-time audio synthesis and frequency visualization environment translating sound into reactive motion.',
    description:
      'An exploration of tactile audio interfaces. Built from authentication through a custom 60fps HTML5 Canvas rendering pipeline and Web Audio oscillator engine with harmonic preset controls.',
    role: 'Product design · Creative development · Audio engineering',
    stack: ['Next.js', 'TypeScript', 'Web Audio API', 'HTML5 Canvas', 'Tailwind CSS'],
    accent: '#b8e928',
    live: 'https://waveline.vercel.app',
    source: 'https://github.com/RealSaake/waveline',
  },
]

export const caseStudies = projects

export const marqueeItems = [
  'AI Systems & Bot Pipelines',
  'Custom Web Applications',
  'Business Workflow Automation',
  'Cloud Infrastructure (Oracle/GCP)',
  'Full-Stack TypeScript',
  'Real-Time WebSocket Sync',
  'Design Systems & Motion',
  'Knowledge Graph Architecture',
]

export const site = {
  name: 'Aryan',
  handle: 'RealSaake',
  role: 'Web Developer, AI Systems Architect & Automation Builder',
  location: 'Ludhiana, India',
  availability: 'Taking on websites, automation, and AI systems projects',
  url: 'https://saake.dev',
  github: 'https://github.com/RealSaake',
  email: 'contact@saake.dev',
}

export const caseStudyCount = projects.length

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
