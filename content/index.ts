export type ProjectSlug =
  | 'skillbridge'
  | 'lovequest'
  | 'jarvis-infrastructure'
  | 'youtube-engine'
  | 'second-brain'
  | 'waveline'

export interface CaseStudySection {
  title: string
  subtitle?: string
  content: string[]
  metrics?: { label: string; value: string }[]
}

export interface Project {
  slug: ProjectSlug
  title: string
  year: string
  kicker: string
  summary: string
  description?: string
  role: string
  stack: string[]
  accent: string
  live?: string
  source?: string
  storyHeadline?: string
  storyBody?: string[]
  problem?: string[]
  architecture?: string[]
  outcome?: string[]
  metrics?: { label: string; value: string }[]
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
    storyHeadline: 'Moving beyond passive video courses into conversational mastery.',
    storyBody: [
      'Conventional online learning suffers from massive drop-off rates because pre-recorded courses cannot answer contextual debugging questions or evaluate bespoke architecture tradeoffs.',
      'SkillBridge was architected as a peer-to-peer platform where learners schedule structured pairing sprints with active practitioners. We focused heavily on actionable milestone roadmaps with verifiable GitHub artifact submissions rather than arbitrary completion certificates.',
      'By decoupling mentorship from predatory subscription models and keeping the core stack lean, SkillBridge delivers an authentic space for engineers to build real-world software depth.'
    ],
    problem: [
      'Video-based tutorials create an illusion of competence while leaving developers stranded when facing real-world syntax bugs and system design decisions.',
      'Traditional mentorship platforms charge exorbitant recurring fees and lock communication inside clunky proprietary silos.'
    ],
    architecture: [
      'Next.js App Router with TypeScript for robust end-to-end type safety across client and server.',
      'Relational PostgreSQL schema managed with Prisma/Drizzle for isolated user milestones and session records.',
      'Lightweight WebSocket and REST endpoints for calendar availability pairing and milestone state synchronization.'
    ],
    outcome: [
      'Over 200 early builders engaged in structured peer reviews and technical pairings.',
      'Zero-subscription, open-source model allowing anyone to self-host or contribute directly.'
    ],
    metrics: [
      { label: 'Active Early Builders', value: '200+' },
      { label: 'Platform Model', value: '100% Open Source' },
      { label: 'Average User Rating', value: '4.9 / 5.0' },
      { label: 'Learning Format', value: 'Peer-to-Peer' }
    ],
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
    summary: 'A bespoke relationship companion with daily connection quests, encrypted voice memos, and a shared virtual garden — built for my long-distance relationship.',
    storyHeadline: 'Building a private software world for my long-distance relationship.',
    storyBody: [
      'LoveQuest began as a deeply personal project: a bespoke digital home built for my girlfriend and me during a long-distance season. Rather than relying on generic messaging apps, I wanted to create a shared space that felt intentional and responsive.',
      'Small daily check-in prompts evolved into a full interactive system: connection quests with real-time feedback loops, encrypted audio voice memos, collaborative streak counters, and a shared virtual garden that blooms as daily rituals are completed.',
      'Seeing how much joy and daily consistency it brought catalyzed my transition into full-stack architecture, Firebase real-time state synchronization, and complex interactive systems.',
    ],
    problem: [
      'Standard messaging platforms feel transient and transactional, lacking long-term emotional permanence or shared ritual for long-distance partners.',
      'Consumer habit trackers are built for individual productivity, not collaborative mutual connection across conflicting timezones (India / Indonesia).'
    ],
    architecture: [
      'React + Vite + TypeScript single-page application optimized for instant load and fluid 60fps micro-animations via Framer Motion.',
      'Firebase Realtime Database with optimistic client state hydration (Zustand) for lag-free cross-continent event synchronization.',
      'Web Crypto API AES-GCM 256-bit client-side encryption for intimate voice notes and sealed anniversary memory vaults.',
      'KatEngine custom personalization layer dynamically adapting UI greetings, time-difference badges, and milestone celebrations.'
    ],
    outcome: [
      'Over 600+ consecutive days of active daily connection rituals and shared digital memory curation.',
      'A rock-solid bespoke companion app with zero downtime and private end-to-end encrypted voice memory storage.'
    ],
    metrics: [
      { label: 'Consecutive Daily Streaks', value: '600+ Days' },
      { label: 'Encryption Standard', value: 'AES-GCM 256' },
      { label: 'State Sync Latency', value: '<120ms' },
      { label: 'Virtual Sanctuary Nodes', value: '30+ Blooms' }
    ],
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
    storyHeadline: 'Engineering an always-on cognitive supervisor and proxy spine.',
    storyBody: [
      'Modern AI agent workflows often break down when tied to a single local machine or when token quotas unexpectedly throttle long execution loops.',
      'Jarvis Infrastructure is the operational spine powering my daily development and research. A Node.js gateway running 24/7 on an Oracle Cloud VM proxies LLM requests through multi-account token rotation, maintains persistent cross-session memory via Honcho, and provides resilient automatic failover between local desktop and cloud execution.'
    ],
    problem: [
      'Desktop-only AI assistants die when the workstation powers off, severing continuous context and real-time remote commands.',
      'Fragile single-provider API connections result in costly mid-task aborts during complex multi-hour agent workflows.'
    ],
    architecture: [
      'Custom Reverse Proxy (Node.js/Express) running on an Oracle Cloud Always-Free ARM VM with systemd daemon management.',
      'Multi-account OAuth token pooling and dynamic load balancing across upstream LLM inference providers.',
      'Honcho cognitive dual-peer memory integration providing persistent episodic recall and long-term preference synthesis.',
      'Dual-mode client routing: local desktop agent loops prioritize zero-latency commands, seamlessly failing over to cloud daemons.'
    ],
    outcome: [
      '24/7 continuous agent uptime accessible via Telegram and desktop chat surfaces from anywhere.',
      'Zero catastrophic context drops during large-scale code audits, research extractions, and multi-agent delegations.'
    ],
    metrics: [
      { label: 'Daemon Availability', value: '99.9% Uptime' },
      { label: 'Token Ingestion Volume', value: '10M+ Tokens' },
      { label: 'Memory Retention', value: 'Dual-Peer Cognitive' },
      { label: 'Failover Switch', value: '<500ms' }
    ],
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
    storyHeadline: 'Uncapped technical video intelligence and semantic corpus extraction.',
    storyBody: [
      'Official YouTube Data API quotas make large-scale competitive intelligence and deep multi-video transcript analysis economically impossible.',
      'This research engine couples a lightweight Chrome extension that securely captures session tokens with an asynchronous backend processing pipeline. It downloads, cleans, timestamps, and indexes thousands of hours of video transcripts directly into structured markdown dossiers without hitting rate walls.'
    ],
    problem: [
      'Strict Google Cloud API quota budgets (10,000 units/day) prevent deep transcript indexing across full channel libraries.',
      'Standard web scrapers trigger aggressive IP challenges and CAPTCHA walls when harvesting bulk video subtitles.'
    ],
    architecture: [
      'Manifest V3 Chrome Extension capturing internal authenticated session headers non-destructively.',
      'Python/FastAPI ingestion worker parsing protobuf/innertube caption responses into clean timestamped segments.',
      'Local-first SQLite / JSON storage maintaining full speaker timing, video chapters, and viewer comments.',
      'Automated semantic summarizer generating cross-video topic overlap matrices and structured research notes.'
    ],
    outcome: [
      'Extracted over 20+ full channel libraries with complete local timestamped transcript dossiers.',
      'Zero API quota consumption or credential blocks across high-volume research sessions.'
    ],
    metrics: [
      { label: 'Quota Reduction', value: '100% Free' },
      { label: 'Transcripts Extracted', value: '500+ Hours' },
      { label: 'Extraction Speed', value: '<4s / Video' },
      { label: 'Data Fidelity', value: 'Full Timestamps' }
    ],
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
    storyHeadline: 'Institutional knowledge architecture for autonomous research.',
    storyBody: [
      'Raw information capture without synthesis leads to digital hoarding rather than compounding leverage.',
      'The Second Brain framework transforms multi-source inputs (video transcripts, financial statements, architectural audits, meeting notes) into an interlinked knowledge graph. With automated ingest pipelines and rigorous metadata schemas, ideas compound directly into shipped software projects.'
    ],
    problem: [
      'Unstructured bookmarking and disparate note apps scatter critical engineering insights across disconnected silos.',
      'AI agents lack persistent, grounded local references to previous project architectures and verified technical lessons.'
    ],
    architecture: [
      'Standardized Markdown + YAML frontmatter knowledge schema optimized for Obsidian and vector search.',
      'Automated CLI pipeline ingesting YouTube transcripts, PDF whitepapers, and Git commits with exact timestamps.',
      'Bi-directional backlinking topology mapping high-level system pillars to low-level implementation details.'
    ],
    outcome: [
      'Over 20+ curated reference domains powering daily agent orchestration and architectural planning.',
      'Seamless multi-session context retention ensuring zero lost lessons across project lifecycles.'
    ],
    metrics: [
      { label: 'Knowledge Domains', value: '20+ Pillars' },
      { label: 'Structured Records', value: '1,500+ Notes' },
      { label: 'Citation Grounding', value: '100% Verifiable' },
      { label: 'Graph Density', value: 'Multi-Directional' }
    ],
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
    storyHeadline: 'Translating harmonic frequencies into living mathematical motion.',
    storyBody: [
      'Audio interfaces often feel disconnected from the visual sensory experience.',
      'Waveline is an exploration of generative canvas physics driven by the Web Audio API. It features multi-oscillator synthesis, real-time Fast Fourier Transform (FFT) analysis, and custom GL-style canvas shaders that react organically to sound frequency modulation.'
    ],
    problem: [
      'Standard web audio players offer flat, non-interactive visual feedback.',
      'Achieving smooth 60fps canvas particle transformations in browser runtimes without frame jitter requires disciplined memory management.'
    ],
    architecture: [
      'Web Audio API AnalyserNode streaming frequency and time-domain byte arrays directly to a custom render loop.',
      'RequestAnimationFrame-driven HTML5 Canvas engine with offscreen buffer optimization for silky 60fps rendering.',
      'Interactive controls for polyphonic oscillators, harmonic wave shaping, and dynamic color gradient palettes.'
    ],
    outcome: [
      'Fluid, responsive audio synthesis playground running natively in modern browsers with zero external plugins.',
      'High-performance visualizer showcasing creative frontend engineering and mathematical animation.'
    ],
    metrics: [
      { label: 'Frame Rate', value: 'Solid 60 FPS' },
      { label: 'Audio Engine', value: 'Web Audio API' },
      { label: 'Rendering Pipeline', value: 'HTML5 Canvas' },
      { label: 'Latency', value: '<15ms' }
    ],
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
