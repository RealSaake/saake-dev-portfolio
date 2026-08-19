# SAAKE.DEV — Design DNA

> **Purpose:** Distilled design rules extracted from Claude's 150M-token research into PandaX Studio and Karakal. These are the portable rules an executing agent must follow when touching any visual element on saake.dev or any sub-project frontend.
> **Source material:** `globals.css` token layer comments, `MASTER_DIRECTIVES_SUMMARY.md`, `USER_DIRECTIVES.md`, `FULL_CHAT_AUDIT.md`

---

## 1. The Two Reference Sites

Claude studied two premium studio portfolios — **PandaX Studio** and **Karakal** — and extracted their shared design DNA. The key findings are embedded directly in the CSS token comments. Here's what was learned:

### What both sites share (and saake.dev inherits):
- **Dark-first, light-real:** Dark is the default theme. Light is a genuine alternate, not an inversion. Both themes are designed independently.
- **Three-register typography:** A display face (bold, expressive), a body face (clean, readable), and a mono face (annotation/label register). Saake uses Syne / Space Grotesk / Space Mono.
- **Lime as singular accent:** One brand color with seven computed stops (`--l-1` through `--l-7`). The "split-token move": fill stays constant across themes, text shifts for contrast.
- **Hairline rules, not borders:** Structural lines are `1px solid var(--rule)` — barely visible, used for rhythm not decoration. They separate, they don't contain.
- **Tracked uppercase mono = structural voice:** The `.label` register (mono, uppercase, tracked at 0.2em) creates a second voice — machine/annotation — that sits beside the editorial voice. It carries structure that would otherwise need boxes.
- **Corner brackets, not rounded cards:** The `.bracket` motif (accent-colored L-shaped corners on hover) instead of `border-radius` cards. Zero radius everywhere.
- **Motion as material, not decoration:** Entrances are narrative (700ms, easeOutExpo). Interactions are feedback (300ms, ease). Never blended. The reveal animation is one entrance used everywhere — consistency IS the polish.

### What both sites got wrong (and saake.dev fixes):
- One site ran four infinite animation loops with no reduced-motion escape
- One hardcoded a hover value and smuggled gradient stops off-token
- Both had only three accent steps and ran out, patching with off-token values
- One had thirteen different letter-spacing values (saake.dev has four)

---

## 2. The Token System (Do Not Bypass)

Every visual value on the site comes from a CSS custom property. The executing agent must NEVER hardcode a color, size, or spacing value. Here's the full token inventory:

### Colors
```
--paper          Background (dark: #0a0a0a, light: #f6f6f2)
--surface        Card/elevated background
--surface-2      Deeper surface
--rule           Structural hairlines (intentionally below visible-edge threshold)
--rule-strong    Emphasized hairlines
--muted-2        Dimmest text (labels, metadata)
--muted          Secondary text (descriptions, body secondary)
--ink-2          Strong secondary text
--ink            Primary text
--accent-fill    Brand lime fill (constant across themes: #c6f135)
--accent-text    Brand lime for text (shifts per theme for contrast)
--accent-edge    Hover/focus edge color
--accent-wash    Subtle lime background tint
--on-accent      Text color ON accent fills (always dark)
--signal         Error/failure red
--evidence       Purple (QUARANTINED — only inside labeled artifacts)
```

### Typography Scale
```
--t-label        0.8rem    (mono labels)
--t-body-s       1rem      (small body)
--t-body         1.125rem  (body)
--t-lead         1.375rem  (lead paragraphs)
--t-h3           clamp(1.375rem → 1.75rem)
--t-h2           clamp(1.75rem → 2.75rem)
--t-h1           clamp(2.25rem → 3.75rem)
--t-display      clamp(2.75rem → 5.5rem)
```

### Tracking
```
--track-label    0.2em     (uppercase mono — the widest)
--track-tight    -0.02em   (body headings)
--track-display  -0.035em  (display type)
--track-normal   0         (body text)
```

### Spacing
```
--section-y      64px      (section vertical padding)
--section-y-lg   128px     (large section vertical padding)
--nav-h          77px      (sticky header height)
```

### Containers
```
--c-prose        720px     (text-only content)
--c-content      1120px    (mixed content)
--c-wide         1280px    (full-width content)
```

### Motion
```
--dur-enter      700ms     (entrance animations — narrative)
--ease-enter     cubic-bezier(0.16, 1, 0.3, 1)  (easeOutExpo)
--dur-act        300ms     (interaction feedback)
--ease-act       ease      (interaction feedback)
```

---

## 3. Component Patterns

### The Reveal Primitive
Every element entrance uses the same `.reveal` class. Two implementations:
1. **CSS scroll-driven** (85% of browsers): Pure CSS `animation-timeline: view()`, no JS
2. **IntersectionObserver fallback**: Adds `.in` class, runs transition

**Critical rule:** The base state of `.reveal` is `opacity: 1`. Content is VISIBLE by default. Animation only adds entrance motion. If JS fails, content is still there.

For above-fold content, `.reveal--load` switches from scroll timeline to document timeline with staggered delays (100ms per step).

### The Label Register
```css
.label {
  font-family: var(--font-mono);
  font-size: var(--t-label);      /* 0.8rem */
  letter-spacing: var(--track-label); /* 0.2em */
  text-transform: uppercase;
  color: var(--muted-2);
}
```
Used for: section numbers, category tags, metadata, timestamps. Creates the "machine voice" that gives structure without needing boxes.

### The Mortar Grid
Container painted in rule color, cells in surface color, 1px gap. The gap bleeds through as perfect hairline seams — no per-cell border management.
```css
.mortar { display: grid; gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
.mortar > * { background: var(--surface); }
```

### The Lift Hover
One hover gesture site-wide: `translateY(-6px)` + `border-color: var(--accent-edge)`. Gated behind `@media (hover: hover)`.

### The Bracket Motif
Corner brackets on hoverable cards: two pseudo-elements creating L-shaped accent corners at top-left and bottom-right. Opacity 0.55 → 1 on hover.

---

## 4. Typography Rules

1. **Display type (h1, hero):** Syne, weight 650-750, negative tracking (-0.035em), `text-box-trim: trim-both` for optical alignment
2. **Body type:** Space Grotesk, weight 400, line-height 1.6, `text-wrap: pretty` (no orphans)
3. **Headings:** `text-wrap: balance` (even ragged edge, capped at 4 lines)
4. **Labels/metadata:** Space Mono, 0.8rem, uppercase, tracked at 0.2em, color `--muted-2`
5. **Links in body:** Underlined with `border-bottom: 1px solid var(--accent-edge)`, not text-decoration
6. **No mixing registers:** Display face is never used for body text. Mono face is never used for body text. Each face has exactly one job.

---

## 5. Spacing Rules

1. **Section padding:** `var(--section-y)` (64px) or `var(--section-y-lg)` (128px). No other values.
2. **Content max-widths:** `--c-prose` (720px) for text, `--c-content` (1120px) for mixed, `--c-wide` (1280px) for full.
3. **Between elements within a section:** Use multiples of 8px. Common values: 8, 16, 24, 32, 48, 64.
4. **Between sections:** Use `--section-y` (64px) as the base. Larger sections get `--section-y-lg`.
5. **Grid gaps:** 1px for mortar grids, 8-16px for tight layouts, 32-64px for loose layouts.
6. **No magic numbers.** Every spacing value should be traceable to the 8px base or a token.

---

## 6. Color Rules

1. **Only three semantic colors exist:** Lime (brand), Red (failure/signal), Purple (evidence/quarantined)
2. **Purple is quarantined.** It appears ONLY inside labeled artifacts depicting rejected systems. Never as decoration.
3. **Red means failure/signal.** It appears ONLY where something is wrong. Never as decoration.
4. **Muted text has two tiers:** `--muted-2` (dimmest, for labels) and `--muted` (secondary text). Both meet WCAG AA.
5. **Accent on dark background:** Use `--accent-text` (which is `--l-4` in dark, `--l-7` in light).
6. **Text ON accent fills:** Always use `--on-accent` (#0a0a0a). The fill is light in both themes.

---

## 7. Accessibility Non-Negotiables

1. **WCAG AA contrast (≥4.5:1)** on all text. The token layer is pre-computed with exact ratios in comments.
2. **`prefers-reduced-motion`:** All animations collapse to 0.01ms. Scroll-driven timelines are explicitly switched off. Marquee stops.
3. **`prefers-reduced-transparency`:** Nav backdrop-filter drops to opaque.
4. **`prefers-contrast: more`:** Muted tiers raise to `--ink-2`. Rules firm up.
5. **`forced-colors`:** System keywords replace tokens. Decision bars opt out with `forced-color-adjust: none`.
6. **Heading order:** Strict h1 → h2 → h3, never skipped.
7. **No-JS resilience:** Page content must be visible and readable without JavaScript.
8. **Print stylesheet:** Dark mode inverts to ink-on-white, reveals force visible, header/footer hidden, links spell out URLs.
9. **Focus visible:** 2px solid `var(--focus)` with 2px offset on all interactive elements.

---

## 8. Anti-Patterns (Things That Must NEVER Appear)

These are the "nine AI tells" that `scripts/verify.mjs` checks for:

1. **Default gradients** — No `bg-gradient-to-*` utilities
2. **Pill-heavy UI** — No `rounded-full` buttons or badge clusters
3. **Gratuitous rounded cards** — `--radius: 0` everywhere
4. **Fake dashboard metrics** — No fabricated numbers or progress bars
5. **Generic "crafting digital experiences" copy** — Every sentence must be specific
6. **Unexplained 3D** — The torus knot exists for a reason (atmospheric, not decorative)
7. **Backdrop-blur as a class** — Applied via `.nav-blur` in CSS, not as a Tailwind utility (trips the AI tell detector)
8. **Template testimonials** — Zero fabricated quotes from fabricated people
9. **"Built with ❤️" or similar** — The site says "DESIGNED AND BUILT WITH INTENT"

---

## 9. Applying the DNA to Sub-Projects

When reskinning Waveline, SkillBridge, or LoveQuest frontends:

1. **Import the same font stack** (Syne, Space Grotesk, Space Mono) — self-hosted, same woff2 files
2. **Use the same token layer** — copy the `:root` variables, adapt accent color per project:
   - Waveline: `--accent-fill: #b8e928` (lime, same as main site)
   - LoveQuest: `--accent-fill: #ff6f91` (pink, already defined)
   - SkillBridge: `--accent-fill: #a98cea` (purple, already defined)
3. **Same component patterns** — mortar grids, bracket motifs, label register, reveal animations
4. **Same anti-patterns list** — no fake metrics, no template testimonials, no generic copy
5. **Same accessibility requirements** — reduced-motion, contrast, print, forced-colors
6. **Each project gets its own personality within the system** — different accent color, different content, but the same structural language. They should feel like siblings, not strangers.
