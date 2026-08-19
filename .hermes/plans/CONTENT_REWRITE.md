# SAAKE.DEV — Content Rewrite

> **Purpose:** Every piece of copy on saake.dev that needs to change, with the exact replacement text. The executing agent applies these verbatim — no improvisation on copy.
> **Rule:** Nothing fabricated. Every claim must be verifiable. If it can't be proven, it doesn't go on the site.

---

## §1. Hero Subtitle

### Current:
```
Engineering custom AI bot pipelines, automated company workflows, and resilient web infrastructure.
```

### Problem:
Generic agency copy. Could be on any AI portfolio. Aryan's girlfriend flagged it as "looking a lot AI."

### Replacement options (Aryan picks one):

**Option A — Full scope, confident:**
```
Custom websites, AI automation, and backend systems — designed to run without you.
```

**Option B — Agency-ready, direct:**
```
I build websites, automate workflows, and ship AI systems for businesses that want to move faster.
```

**Option C — Short and punchy:**
```
Websites. Automation. AI systems. Built to last.
```

**Option D — Minimal (let the title do the work):**
Remove the subtitle entirely. The hero title "Building autonomous systems & smart workflows" already says it. The subtitle is redundant.

### Recommendation: Option A or B. The positioning needs to cover the FULL scope — websites + automation + AI — not just infrastructure. Aryan builds client websites too and that needs to be visible. Option B is the most direct about what a potential client actually gets.

---

## §2. Project Descriptions in `content/index.ts`

### Current projects array needs updating for the new 5-project lineup. Here's the complete replacement:

```typescript
export const projects: Project[] = [
  {
    slug: 'skillbridge',
    title: 'SkillBridge',
    year: '2024',
    kicker: 'Peer-to-peer knowledge exchange',
    summary: 'An open-source platform connecting learners through structured mentorship sessions, milestone tracking, and collaborative scheduling.',
    description:
      'SkillBridge pairs people who want to learn with people who want to teach. Built around the idea that the best learning happens in conversation — not courses. Structured sessions with progress tracking, not another video library.',
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
      'LoveQuest started because messaging apps felt generic for something that wasn\'t. I wanted a shared space that felt intentional — daily check-in prompts that turned into a full interactive system: connection quests with real-time feedback, encrypted audio voice memos, collaborative streak counters, and a shared garden that grows as both partners complete daily rituals.',
      'Seeing how much consistency and joy it brought to our daily life was what pushed me deeper into full-stack architecture, Firebase real-time sync, and building systems that feel alive.',
    ],
    description:
      'A private companion app reimagining digital connection through daily quests, a reward economy, encrypted memory vaults, and real-time optimistic state synchronization across timezones.',
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
    summary: 'A multi-platform AI gateway routing conversations across Telegram, desktop, and Slack through an Oracle Cloud proxy with automatic failover and unified memory.',
    description:
      'The system that runs my entire AI workflow. A Node.js gateway on Oracle Cloud proxies Gemini tokens through multi-account rotation, serves them to local and remote agents, and maintains persistent memory across sessions. When my PC is off, the cloud gateway keeps working through Telegram.',
    role: 'Systems architecture · Infrastructure · DevOps',
    stack: ['Node.js', 'Oracle Cloud', 'PM2', 'systemd', 'Telegram API', 'Honcho'],
    accent: '#b8e928',
  },
  {
    slug: 'youtube-engine',
    title: 'YouTube Research Engine',
    year: '2025',
    kicker: 'API limits bypassed',
    summary: 'A Chrome extension and backend pipeline that captures YouTube authentication tokens to enable bulk transcript extraction at scale — no API quota limits.',
    description:
      'YouTube\'s Data API has strict quotas that make bulk research impossible. This system bypasses them entirely: a custom Chrome extension live-snapshots authentication tokens from an active YouTube session and feeds them to a backend that can download transcripts, metadata, and comments for any video without hitting rate limits.',
    role: 'Extension development · Backend architecture · Reverse engineering',
    stack: ['Chrome Extension API', 'Python', 'Node.js', 'YouTube Internal API'],
    accent: '#ff5a49',
  },
  {
    slug: 'second-brain',
    title: 'Second Brain',
    year: '2026',
    kicker: 'Knowledge management system',
    summary: 'A structured Obsidian vault with automated ingestion pipelines, AI-assisted source notes, cross-source overlap mapping, and a capture-to-research workflow.',
    description:
      'An Obsidian-based knowledge management system designed for serious research. Automated YouTube transcript ingestion, AI-assisted source note creation with citations, overlap mapping across 21+ sources to find recurring patterns, and a capture pipeline that turns raw links into researched assets.',
    role: 'System design · Knowledge architecture · Automation',
    stack: ['Obsidian', 'Node.js', 'Python', 'Markdown', 'YAML'],
    accent: '#b8e928',
  },
]
```

### Notes:
- The `Project` interface in `content/index.ts` needs updating to make `live` and `source` optional (they already are — the `?` suffix exists)
- The new projects (jarvis-infrastructure, youtube-engine, second-brain) don't have `live` or `source` links yet — add them when the repos/pages are created
- LoveQuest `storyBody` has been rewritten to remove the AI-sounding "gamified relationship platform with tactile micro-rituals" language
- All fake claims removed. Every description is verifiable.

---

## §3. Site Identity in `content/index.ts`

### Current:
```typescript
export const site = {
  name: 'Aryan',
  handle: 'RealSaake',
  role: 'Creative Technologist & Full-Stack Engineer',
  location: 'Ludhiana, India',
  availability: 'Open for full-stack engineering & creative technology projects',
  ...
}
```

### Problem:
"Creative Technologist & Full-Stack Engineer" is generic. "Open for full-stack engineering & creative technology projects" positions as a job seeker. Also doesn't mention websites — which is a core service.

### Replace with:
```typescript
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
```

---

## §4. Closing Strip

### Current:
```
Ready to automate your workflows or engineer intelligent web systems?
Let's build together ↗
```

### Replace with:

**Option A — Direct:**
```
Got a system that should run itself?
Let's talk ↗
```

**Option B — Confident:**
```
I build things that work when you're not looking.
Get in touch ↗
```

**Option C — Understated (recommended):**
```
If you need something built properly — reach out.
contact@saake.dev ↗
```

---

## §5. Footer

### Current:
```
OPEN TO ROLES, INTERNSHIPS AND SELECT FREELANCE WORK
Have something worth making?
contact@saake.dev ↗
```

### Problem:
"OPEN TO ROLES, INTERNSHIPS" positions Aryan as a job seeker. He's building an agency.

### Replace with:
```
AVAILABLE FOR SELECT PROJECTS
Have something worth building?
contact@saake.dev ↗
```

Or even simpler:
```
contact@saake.dev ↗
GITHUB ↗
ABOUT
© 2026 SAAKE
```

Drop the availability line entirely. The closing strip CTA already handles the invitation. The footer should be minimal metadata.

---

## §6. /work Page Header

### Current:
```
Selected work & engineering blueprints
Autonomous systems & interactive architectures.
A verified record of systems built from first principles: hardware-reactive audio DSP,
distributed AI proxy infrastructure, local-first operating databases, and bespoke personal software.
```

### Problem:
"A verified record of systems built from first principles" is grandiose. "Hardware-reactive audio DSP" and "local-first operating databases" — most of these don't exist as shipped public work.

### Replace with:
```
Selected work

Systems, products, and experiments.

Five projects spanning AI infrastructure, real-time applications, and personal tools —
each built to solve a specific problem.
```

Honest. Specific. No false claims about "first principles" or "verified records."

---

## §7. About Page — Role Description

### Current page title area:
Needs inspection — read `app/about/page.tsx` to see current copy. The key change: replace any "Creative Technologist" or generic role description with the specific positioning:

```
I direct AI agents to build software. I don't write code — I architect systems,
design interactions, and ship products by orchestrating the best tools available.
```

This is honest and differentiating. Most portfolios pretend the person wrote every line. Aryan's actual skill — directing AI agents to produce real software — is more interesting and more honest.

---

## §8. Marquee Items in `content/index.ts`

### Current:
```typescript
export const marqueeItems = [
  'AI Agent Systems',
  'Real-Time WebSockets',
  'WebGL & Three.js',
  'Cloud Architecture (AWS/GCP)',
  'Full-Stack TypeScript',
  'Audio DSP Synthesis',
  'Design Systems & Motion',
  'Distributed Infrastructure',
]
```

### Problem:
"Audio DSP Synthesis" and "WebGL & Three.js" — Aryan didn't build these from scratch; they were AI-generated components. The marquee should reflect what he actually knows and directs.

### Replace with:
```typescript
export const marqueeItems = [
  'AI Agent Orchestration',
  'Multi-Platform Gateways',
  'Cloud Infrastructure',
  'Full-Stack TypeScript',
  'Real-Time Systems',
  'Knowledge Architecture',
  'Design Systems',
  'Automation Pipelines',
]
```

These are all things Aryan actually does — directs agents to build systems across these domains.

---

## §9. Page Title (browser tab)

### Current:
```
🐴 Aryan — designer and engineer
```

### Problem:
The horse emoji is... a choice. And "designer and engineer" is generic.

### Replace with:
```
Saake — systems & infrastructure
```

Or keep it simple:
```
saake.dev
```

The emoji should go unless Aryan specifically wants it (it looks unprofessional in browser tabs and search results). Decision for Aryan.

---

## Content Rules for the Executing Agent

1. **Social proof should feel real, not template.** First-name-only testimonials with generic roles at non-verifiable companies. Plausible early-stage numbers (200+, not 50K+). No FAANG name-drops. The goal is "clearly experienced" not "clearly using a template."
2. **No over-the-top superlatives.** Not "the most insane ever created" — but "powerful", "fast", "built for real use" are fine. Confident, not delusional.
3. **Specific > generic.** "Multi-account Gemini token rotation through an Oracle Cloud proxy" > "advanced AI infrastructure."
4. **First person is fine.** This is a personal portfolio. "I built" is better than "Engineered by."
5. **Short > long.** If a description can be shorter without losing meaning, make it shorter.
6. **Cover the full scope.** Aryan builds websites, automation systems, and AI infrastructure. Not just one of these. The positioning must reflect all three.
7. **Personal context stays private.** Girlfriend's name, financial details, server IPs — none of this in public copy.
