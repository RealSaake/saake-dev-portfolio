# SAAKE.DEV — User Flow & Site Topology

> **Purpose:** Complete redesign of the site's page structure, navigation, and user journey. How visitors move through the portfolio and what they see at each step.
> **Current state:** Home → 2 inline projects → /work (3 cards) → /work/[slug] case studies
> **Target state:** Home → 5 project previews → /work (5 rich cards) → /work/[slug] deep case studies

---

## §1. Current Site Map (What Exists)

```
saake.dev/
├── /                   Home (hero + foundations + Waveline inline + LoveQuest inline + CTA)
├── /work               Work index (3 project cards: Waveline, LoveQuest, SkillBridge)
├── /work/waveline      Case study page
├── /work/lovequest     Case study page
├── /work/skillbridge   Case study page (may not exist yet — check)
├── /about              About page (portrait + bio + principles grid)
├── /contact            Contact page (email + details)
├── /not-found          404 page
├── /robots.ts          SEO
├── /sitemap.ts         SEO
└── /opengraph-image    OG card generation
```

### Problems:
1. Home page tries to be a case study AND a navigation hub — it embeds full interactive components (WavelineVisualizer, LoveQuest quest cards) that should live on their dedicated pages
2. Only 2 of 5 projects appear on the home page
3. /work page only lists 3 projects, not 5
4. SkillBridge may not have a case study page yet
5. New projects (Jarvis, YouTube Engine, Second Brain) have no pages at all

---

## §2. New Site Map (Target)

```
saake.dev/
├── /                          Home
│   ├── Hero section           (title, subtitle, CTA, 3D knot, coordinates)
│   ├── Credentials            (logo row — no borders, integrated with hero)
│   ├── Featured work          (2-3 project cards — NOT inline case studies)
│   └── Closing CTA            (short, confident, links to /contact)
│
├── /work                      Work index
│   └── 5 project cards        (SkillBridge, LoveQuest, Jarvis, YT Engine, Second Brain)
│
├── /work/skillbridge          Case study — SkillBridge
├── /work/lovequest            Case study — LoveQuest
├── /work/jarvis-infrastructure Case study — Jarvis Infrastructure
├── /work/youtube-engine       Case study — YouTube Research Engine
├── /work/second-brain         Case study — Second Brain
│
├── /about                     About page
├── /contact                   Contact page
└── (SEO/meta routes unchanged)
```

---

## §3. Home Page — New Layout

### Current flow (broken):
```
[Hero: title + subtitle + CTA + 3D knot]
[Foundations ribbon: MY FOUNDATIONS + 5 logos — boxed in hairlines]
[Section marker: 01 / FEATURED FLAGSHIP / AUDIO SYNTHESIS]
[Waveline: title + summary + FULL INLINE VISUALIZER + description + link]
[LoveQuest: heart art + quest cards + title + summary + tags + CTA button]
[Closing strip: generic CTA on lime background]
[Footer]
```

### New flow (clean):
```
[Hero: title + subtitle (or no subtitle) + CTA + 3D knot + coordinates]
[Credentials: logo row — no borders, no "MY FOUNDATIONS" label, integrated spacing]
[Selected work label: simple .label "Selected work"]
[Project card 1: SkillBridge — meta + title + summary + tags → links to /work/skillbridge]
[Project card 2: LoveQuest — meta + title + summary + tags → links to /work/lovequest]
[View all work link: "See all work →" → links to /work]
[Closing strip: short CTA on lime background → links to /contact]
[Footer: minimal — email, github, about, copyright]
```

### Key differences:
1. **No inline interactive components on home.** The WavelineVisualizer and LoveQuest quest cards move to their respective case study pages. Home page project cards are clean, clickable previews.
2. **Only 2 projects on home, 5 on /work.** Home page shows the two strongest (SkillBridge + LoveQuest). The work index shows all 5.
3. **"See all work →" link** bridges home to the full portfolio without forcing all 5 projects onto the home page.
4. **No section markers.** Just a quiet `.label` saying "Selected work."
5. **Credentials integrated.** No hairline borders boxing the ribbon. It flows naturally from the hero.

---

## §4. New `app/page.tsx` Structure

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Reveal } from '@/components/primitives'
import { HeroSceneLoader } from '@/components/hero-scene-loader'
import { CapabilitiesTicker } from '@/components/capabilities-ticker'
import { projects } from '@/content'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Home() {
  // Show first 2 projects on home page
  const featured = projects.slice(0, 2)

  return (
    <>
      {/* ── Hero ── */}
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
            {/* Optional subtitle — see CONTENT_REWRITE.md §1 for options */}
            <Reveal load delay={2}>
              <p className="hero-intro">
                {/* Final copy TBD — Aryan picks from options */}
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
          <div className="hero-coordinates" aria-label="Coordinates: 29.9792° N, 31.1342° E">
            29.9792° N<br />31.1342° E
          </div>
        </Container>
      </section>

      {/* ── Credentials ── */}
      <CapabilitiesTicker />

      {/* ── Selected Work ── */}
      <section id="work" className="project-section">
        <Container>
          <Reveal>
            <p className="label" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--rule)' }}>
              Selected work
            </p>
          </Reveal>

          <div className="project-grid">
            {featured.map((project, idx) => (
              <Reveal key={project.slug} delay={Math.min(idx + 1, 3) as 1 | 2 | 3}>
                <Link href={`/work/${project.slug}`} className="project-card">
                  <div className="project-card__meta">
                    <span className="label">0{idx + 1} / {project.year}</span>
                    <span className="label">{project.kicker}</span>
                  </div>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <div className="project-card__tags">
                    {project.stack.slice(0, 4).map(t => (
                      <span key={t} className="label">{t}</span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: '48px', textAlign: 'center' }}>
              <Link href="/work" className="text-link">
                See all work →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Closing Strip ── */}
      <section className="closing-strip">
        <Container>
          <Reveal>
            {/* Final copy from CONTENT_REWRITE.md §4 */}
            <p>If you need something built properly — reach out.</p>
            <Link href="/contact">contact@saake.dev ↗</Link>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
```

### New CSS for `.project-grid` (add to `globals.css`):
```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1px;
  background: var(--rule);
  margin-top: 32px;
}
.project-grid > * {
  background: var(--paper);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}
```

This gives a mortar-grid effect (1px gap = hairline seam) for the project cards.

---

## §5. /work Page — Updated for 5 Projects

### File: `app/work/page.tsx`

The existing `/work` page already maps over the `projects` array from `content/index.ts`. Once the content file is updated with all 5 projects (see `CONTENT_REWRITE.md` §2), the work page will automatically show all 5.

**Changes needed:**
1. Update the header copy (see `CONTENT_REWRITE.md` §6)
2. Ensure the card grid works with 5 items (currently `repeat(auto-fit, minmax(300px, 1fr))` — this is fine)
3. Add accent color hover states for the 3 new projects:
```css
.work-index-card--jarvis-infrastructure:hover h2 { color: var(--accent-text); }
.work-index-card--youtube-engine:hover h2 { color: var(--signal); }
.work-index-card--second-brain:hover h2 { color: var(--accent-text); }
```

---

## §6. Case Study Pages — Template

### File: `app/work/[slug]/page.tsx`

Each case study page should follow a consistent structure:

```
[Project hero: kicker + title + summary + stack tags]
[Interactive showcase: project-specific component — visualizer, demo, screenshots]
[Story section: problem → solution → what I learned]
[Technical section: architecture, stack details, challenges]
[Live links: Visit live / View source (where applicable)]
[Next project: navigation to the next case study]
```

The existing `[slug]/page.tsx` already has most of this structure. For the 3 new projects (Jarvis, YouTube Engine, Second Brain), the "interactive showcase" section will be:
- **Jarvis:** Architecture diagram (SVG or generated)
- **YouTube Engine:** System flow diagram
- **Second Brain:** Vault structure screenshot + pipeline diagram

### New slugs to support:
The `[slug]/page.tsx` uses `getProject(slug)` from `content/index.ts`. Once the content file has all 5 projects, the dynamic routing handles it automatically. But check:
1. Does `generateStaticParams` include all 5 slugs?
2. Does the page handle projects without `live` or `source` links gracefully?
3. Does the page handle projects without `storyHeadline` / `storyBody`?

---

## §7. Navigation Updates

### Current nav:
```
saake.dev | WORK | ABOUT | CONTACT | [theme toggle]
```

This is fine. No changes needed to the navigation structure. The WORK link goes to `/work` which shows all 5 projects.

### Internal linking:
- Hero CTA → `#work` anchor on home page
- Each project card → `/work/[slug]`
- "See all work →" → `/work`
- Closing strip → `/contact`
- Footer email → `mailto:contact@saake.dev`
- Footer GitHub → `https://github.com/RealSaake`
- Each case study "Next project" → next project's `/work/[slug]`

The next-project navigation at the bottom of each case study should cycle:
SkillBridge → LoveQuest → Jarvis → YouTube Engine → Second Brain → SkillBridge

---

## §8. Content Architecture

### `content/index.ts` serves as the single source of truth for:
- Project data (title, summary, description, stack, links)
- Site identity (name, handle, role, location)
- Marquee items
- Case study count

### Rule: ALL copy lives in `content/index.ts` or in the page file itself.
No copy scattered through random components. If a component needs text, it receives it as a prop from the page, which gets it from content.

The LoveQuest showcase component (`components/lovequest-showcase.tsx`) currently has hardcoded copy inside it (quest titles, memory descriptions, garden text). This should either:
- **A)** Move the copy to `content/index.ts` and pass as props
- **B)** Accept that component-level copy is fine for interactive demo content (the demo IS the content)

Recommendation: B for interactive showcases, A for everything else.
