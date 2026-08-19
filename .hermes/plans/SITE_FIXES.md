# SAAKE.DEV — Exact Site Fixes

> **Purpose:** Pixel-precise, copy-paste-ready code changes for the saake.dev homepage and components. An executing agent should apply these changes in order, running `npm run check` and `npm run contrast` after each section.
> **Prerequisite:** Read `DESIGN_DNA.md` first.
> **Repository:** `C:\Users\anubh\Downloads\Antigravity Projects\claude\site`

---

## §1. Foundations Ribbon Overhaul

### Current problems:
- Boxed between hairlines (hero's `border-bottom` + ribbon's own `border-b`)
- Logos are tiny (18-20px rendered height)
- "MY FOUNDATIONS" label is redundant
- Inconsistent vertical spacing above/below
- Mobile: scrolls horizontally with no affordance

### File: `components/capabilities-ticker.tsx`

**Changes:**
1. Remove the `border-b` from the section element
2. Remove the "MY FOUNDATIONS" label + green dot — the credentials are self-explanatory
3. Increase logo rendered heights from 18-20px to 28-32px
4. Increase label text from `text-xs` to `text-sm`
5. Change layout from `flex-col md:flex-row` to a single centered row
6. Remove `bg-paper` — let it inherit the hero's background for visual continuity

**New component (replace entire file):**
```tsx
'use client'

import { memo, Fragment } from 'react'
import Image from 'next/image'
import { Container } from './primitives'

interface BadgeItem {
  id: string
  label: string
  imageSrc: string
  width: number
  height: number
  renderedHeight: number
}

const BADGES: BadgeItem[] = [
  {
    id: 'harvard',
    label: 'CS50x Cert',
    imageSrc: '/media/certificates/harvard.png',
    width: 56,
    height: 64,
    renderedHeight: 30,
  },
  {
    id: 'meta',
    label: 'Meta Cert',
    imageSrc: '/media/certificates/meta.png',
    width: 96,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'openai',
    label: 'OpenAI Bootcamp',
    imageSrc: '/media/certificates/openai.png',
    width: 64,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'aws',
    label: 'AWS Cloud',
    imageSrc: '/media/certificates/aws.png',
    width: 96,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'gcp',
    label: 'GCP Infra',
    imageSrc: '/media/certificates/gcp.png',
    width: 80,
    height: 64,
    renderedHeight: 26,
  },
]

export const CapabilitiesTicker = memo(function CapabilitiesTicker() {
  return (
    <section
      aria-label="Certifications and foundations"
      className="relative z-10 w-full py-6"
    >
      <Container>
        <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 flex-nowrap overflow-x-auto no-scrollbar py-1">
          {BADGES.map((item, idx) => (
            <Fragment key={item.id}>
              <div className="group inline-flex items-center shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-default gap-3">
                <div
                  className="flex items-center justify-center shrink-0"
                >
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={item.width}
                    height={item.height}
                    unoptimized
                    style={{
                      height: `${item.renderedHeight}px`,
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-muted group-hover:text-ink transition-colors font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>

              {/* Divider dot */}
              {idx < BADGES.length - 1 && (
                <span
                  className="h-1 w-1 rounded-full bg-muted-2/40 shrink-0"
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
})
```

### File: `app/globals.css`

**Change in `.hero` rule (line ~972):**
Remove `border-bottom: 1px solid var(--rule)` from `.hero`.

Find:
```css
.hero { position: relative; border-bottom: 1px solid var(--rule); overflow: hidden; ...
```
Replace with:
```css
.hero { position: relative; overflow: hidden; ...
```
(Remove only `border-bottom: 1px solid var(--rule);`, keep everything else.)

**Change in `.project-section` rule (line ~1012):**
The first project section after the ribbon should have a subtle top border to separate it from the hero/ribbon area.

Find:
```css
.project-section { padding: 88px 0; border-bottom: 1px solid var(--rule); }
```
Replace with:
```css
.project-section { padding: 88px 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
```
Note: Only the FIRST `.project-section` needs the `border-top`. If you can scope it with `:first-of-type` in the context, do so. Otherwise apply `border-top` to all project sections (they already have `border-bottom`, so doubling up just means consistent hairlines between sections).

---

## §2. Hero Title — Remove the Period

### File: `app/page.tsx`

**Find (line ~28-30):**
```tsx
<h1 className="hero-title">
  Building <em>autonomous</em> systems &amp; smart <em>workflows</em>.
</h1>
```

**Replace with:**
```tsx
<h1 className="hero-title">
  Building <em>autonomous</em> systems &amp; smart <em>workflows</em>
</h1>
```

Just remove the period. That's it.

---

## §3. Hero Subtitle — Rewrite

### File: `app/page.tsx`

**Find (line ~33-35):**
```tsx
<p className="hero-intro">
  Engineering custom AI bot pipelines, automated company workflows, and resilient web infrastructure.
</p>
```

**Replace with the final copy from `CONTENT_REWRITE.md` §1.** (The content document will have the approved replacement text.)

---

## §4. Remove Section Markers from Home Page

### Problem:
The `<div className="section-marker">` pattern (01 / FEATURED FLAGSHIP / AUDIO SYNTHESIS) is an agency convention that doesn't fit a personal portfolio.

### File: `app/page.tsx`

**Find (lines ~60-66):**
```tsx
<Reveal>
  <div className="section-marker">
    <span>01</span>
    <span>Featured flagship</span>
    <span>Audio Synthesis</span>
  </div>
</Reveal>
```

**Replace with:**
```tsx
<Reveal>
  <p className="label" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--rule)' }}>
    Selected work
  </p>
</Reveal>
```

This gives a clean, understated section header using the existing `.label` register (mono, uppercase, tracked, muted). No numbered flagships, no category tags — just "Selected work" as a quiet annotation.

**Note:** If Aryan wants no section label at all, just remove the entire `<Reveal>` block (lines 60-66). The project title "Waveline" / "SkillBridge" is itself sufficient context.

---

## §5. Project Showcase Redesign (Home Page)

### Current structure (for the Waveline section):
```
section-marker → project-lead (title + summary + role) → WavelineVisualizer → project-foot (description + link)
```

### New structure:
The home page should show 2-3 projects as clean, visual cards that invite clicking. Not inline case studies with embedded visualizers.

**Proposed new project card pattern:**
```tsx
{/* Project card — one per featured work */}
<Reveal>
  <Link href="/work/skillbridge" className="project-card">
    <div className="project-card__meta">
      <span className="label">01 / 2024</span>
      <span className="label">{project.kicker}</span>
    </div>
    <h2>{project.title}</h2>
    <p>{project.summary}</p>
    <div className="project-card__tags">
      {project.stack.slice(0, 3).map(t => (
        <span key={t} className="label">{t}</span>
      ))}
    </div>
  </Link>
</Reveal>
```

**New CSS for `.project-card` (add to `globals.css`):**
```css
.project-card {
  display: block;
  padding: 48px 36px;
  border: 1px solid var(--rule);
  background: var(--surface);
  transition: border-color var(--dur-act) var(--ease-act), transform var(--dur-act) var(--ease-act);
  text-decoration: none;
}
.project-card:hover {
  border-color: var(--accent-edge);
  transform: translateY(-4px);
}
.project-card__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}
.project-card h2 {
  font-family: var(--font-display), sans-serif;
  font-size: clamp(2rem, 3.6vw, 3.2rem);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -0.035em;
  margin-bottom: 16px;
}
.project-card p {
  max-width: 600px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.55;
}
.project-card__tags {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
```

**Decision for Aryan:** The inline WavelineVisualizer on the home page — keep it or remove it? It's a cool demo but it breaks the visual consistency. Options:
- **A)** Keep it only on the `/work/waveline` case study page (recommended)
- **B)** Keep it on home but move it below the project card, not inside the flow

The LoveQuest inline art (heart + quest cards) has the same issue. Recommend moving interactive showcases to individual case study pages and keeping the home page clean with card-based navigation.

---

## §6. Mobile Responsive Pass

### Current state:
Single `@media (max-width: 768px)` block at the end of `globals.css` handling everything. It's crude but functional.

### Changes needed:

**Hero on mobile:**
```css
@media (max-width: 768px) {
  .hero { min-height: auto; padding: 48px 0 32px; }
  .hero-scene { opacity: 0.25; }
  .hero-copy { padding: 0; max-width: 100%; }
  .hero-kicker-link { margin-bottom: 12px; }
  .hero-title { font-size: clamp(2rem, 8vw, 2.8rem); line-height: 1.1; }
  .hero-intro { font-size: 0.95rem; margin-top: 14px; }
  .hero-actions { margin-top: 24px; }
  .signal-button { width: 100%; justify-content: center; }
  .hero-coordinates { position: static; margin-top: 20px; text-align: left; font-size: 0.65rem; }
}
```

**Foundations ribbon on mobile (if keeping the inline flex approach):**
The ribbon should stack to a 2x3 or 3x2 grid on small screens instead of horizontal scroll:
```css
@media (max-width: 640px) {
  /* Override the flex row with a grid for small screens */
  .capabilities-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    justify-items: start;
  }
  .capabilities-grid .divider-dot { display: none; }
}
```
Note: This requires adding a `.capabilities-grid` class to the badge container and `.divider-dot` to the separator spans in the new component above.

**Project cards on mobile:**
```css
@media (max-width: 768px) {
  .project-card { padding: 28px 20px; }
  .project-card h2 { font-size: clamp(1.6rem, 6vw, 2.2rem); }
  .project-section { padding: 48px 0; }
}
```

**LoveQuest grid on mobile (if keeping inline):**
```css
@media (max-width: 768px) {
  .lovequest-grid { grid-template-columns: 1fr; gap: 32px; }
  .lovequest-art { aspect-ratio: 16/9; }
}
```

---

## §7. Closing Strip Copy

### Current:
```
Ready to automate your workflows or engineer intelligent web systems?
Let's build together ↗
```

### Problem:
Generic. Sounds like every agency site ever.

### Fix:
See `CONTENT_REWRITE.md` §4 for the replacement copy.

---

## §8. Footer

### Current:
```
OPEN TO ROLES, INTERNSHIPS AND SELECT FREELANCE WORK
Have something worth making?
contact@saake.dev ↗
GITHUB ↗
ABOUT
© 2026 SAAKE
DESIGNED AND BUILT WITH INTENT
```

### Problem:
"OPEN TO ROLES, INTERNSHIPS AND SELECT FREELANCE WORK" — Aryan is building an agency, not looking for internships. This positions him as a job seeker.

### Fix:
See `CONTENT_REWRITE.md` §5 for the replacement copy.

---

## Verification Checklist

After applying all changes, run:
```bash
cd "C:\Users\anubh\Downloads\Antigravity Projects\claude\site"
npm run check     # must pass — builds + runs verify.mjs
npm run contrast  # must pass — checks WCAG AA compliance
```

Then visually verify at three breakpoints:
1. **375px** (iPhone SE — smallest common mobile)
2. **768px** (iPad — tablet/small laptop)
3. **1280px+** (Desktop — the primary target)
