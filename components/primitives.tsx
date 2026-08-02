import Link from 'next/link'
import type { ReactNode } from 'react'

/* ── Rule — the only divider on the site ───────────────────── */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`border-0 border-t border-rule ${className}`} />
}

/* ── Label — the mono register. Nothing else uses mono. ────── */
export function Label({ children, as: As = 'div', className = '' }: {
  children: ReactNode
  as?: 'div' | 'span' | 'dt' | 'h2'
  className?: string
}) {
  return <As className={`label ${className}`}>{children}</As>
}

/* ── Eyebrow — the kicker above a heading ──────────────────── */
export function Eyebrow({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`label flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-accent-fill" />
      {children}
    </div>
  )
}

/* ── SectionHead — number + label + optional statement ───────
 *
 * The label is the section's real heading and is emitted as an
 * <h2>, styled down to the mono register. Rendering it as a span
 * left every section without a heading, so the <h3>s inside cards
 * skipped a level straight from the page <h1> — the same
 * heading-order defect catalogued in the reference sites.
 *
 * A visual size is not a document level. This keeps the outline
 * correct while the label still looks like a label.
 */
export function SectionHead({ index, label, children, className = '' }: {
  index?: string
  label: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="mb-6 flex items-baseline gap-4">
        {index && (
          <span aria-hidden="true" className="label text-accent-text">
            {index}
          </span>
        )}
        <h2 className="label">{label}</h2>
      </div>
      {children && <p className="max-w-measure text-h2 text-ink">{children}</p>}
    </div>
  )
}

/* ── Prose — measure-constrained running text ──────────────── */
export function Prose({ children, long = false, className = '' }: {
  children: ReactNode
  long?: boolean
  className?: string
}) {
  return (
    <div className={`prose-measure text-body text-muted ${long ? 'max-w-measure-long' : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ── FieldNote — a small aside, hairline-anchored ──────────── */
export function FieldNote({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`border-l border-accent-edge pl-4 text-s text-muted-2 ${className}`}>
      {children}
    </div>
  )
}

/* ── Grain — one fixed layer, server-rendered ──────────────── */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      data-grain=""
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 9999,
        opacity: 'var(--grain)',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        backgroundSize: '200px 200px',
      }}
    />
  )
}

/* ── ExternalLink — arrow, always rel-guarded ──────────────── */
export function ExternalLink({ href, children, className = '' }: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-baseline gap-1 text-accent-text underline decoration-rule-strong underline-offset-4 transition-colors duration-act hover:decoration-accent-edge ${className}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  )
}

/* ── InternalLink ──────────────────────────────────────────── */
export function InternalLink({ href, children, className = '' }: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-baseline gap-1 text-accent-text underline decoration-rule-strong underline-offset-4 transition-colors duration-act hover:decoration-accent-edge ${className}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

/* ── Reveal — entrance wrapper. One class, one observer. ─────
 *
 * Long lists cycle their delay index modulo the number of slots,
 * so unbounded content never exceeds the five defined classes.
 * Use `revealDelay(i)` for anything rendered from a .map().
 */
export function Reveal({ children, delay = 0, className = '' }: {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}) {
  return <div className={`reveal ${delay ? `rd-${delay}` : ''} ${className}`}>{children}</div>
}

export function revealDelay(i: number): 1 | 2 | 3 | 4 | 5 {
  return ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5
}

/* ── Section — vertical rhythm, one value with one jump ──────
 *
 * `pad` is a variant, not a className override. Passing `pt-32`
 * alongside the default compiles both, and which wins is decided
 * by their order in the generated stylesheet rather than in the
 * JSX — so the override is silently unreliable.
 *
 * `band` steps down for non-content strips: marquees, stat bars.
 */
const SECTION_PAD = {
  default: 'py-16 md:py-32',
  top: 'pt-16 pb-16 md:pt-24 md:pb-32',
  band: 'py-8 md:py-12',
  tight: 'py-12 md:py-20',
} as const

export function Section({ children, className = '', id, pad = 'default' }: {
  children: ReactNode
  className?: string
  id?: string
  pad?: keyof typeof SECTION_PAD
}) {
  return (
    <section id={id} className={`${SECTION_PAD[pad]} ${className}`}>
      {children}
    </section>
  )
}

/* ── Container ─────────────────────────────────────────────
 *
 * The narrowest gutter is 12px rather than 16px because the nav row
 * (wordmark + three links + toggle) is the widest fixed-content row
 * on the site and overflows a 360px viewport at 16px. Gutters step
 * up quickly from there.
 */
export function Container({ children, size = 'wide', className = '' }: {
  children: ReactNode
  size?: 'prose' | 'content' | 'wide'
  className?: string
}) {
  const max = size === 'prose' ? 'max-w-prose' : size === 'content' ? 'max-w-content' : 'max-w-wide'
  return <div className={`${max} mx-auto px-3 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

/* ── Card — bordered cell with corner brackets ─────────────── */
export function Card({ children, className = '', as: As = 'div' }: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  return (
    <As className={`bracket lift border border-rule bg-surface p-6 md:p-8 ${className}`}>
      {children}
    </As>
  )
}

/* ── StatTile — a number that links to where it can be checked ─
 *
 * Every figure on this site is verifiable in one click. A number
 * that has to be researched before it can be trusted is not doing
 * the job a number is for.
 */
export function StatTile({ value, label, note, href }: {
  value: string
  label: string
  note?: string
  href?: string
}) {
  const body = (
    <>
      <div className="font-display text-h2 font-black leading-none text-ink">{value}</div>
      <Label className="mt-4">{label}</Label>
      {note && <p className="mt-2 text-s text-muted-2">{note}</p>}
    </>
  )

  if (!href) return <div className="bg-surface p-6 md:p-8">{body}</div>

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-surface p-6 transition-colors duration-act hover:bg-surface-2 md:p-8"
    >
      {body}
      <span className="label mt-4 block text-accent-text opacity-0 transition-opacity duration-act group-hover:opacity-100">
        Check it ↗
      </span>
    </a>
  )
}

/* ── Marquee — the breadth band ─────────────────────────────
 *
 * The track is duplicated so the loop is seamless; the clone is
 * aria-hidden so a screen reader hears the list once. The
 * animation stops entirely under prefers-reduced-motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="label whitespace-nowrap">
          {item}
        </span>
      ))}
    </div>
  )

  /* The outer wrapper is what actually clips. `overflow: hidden` on
   * `.marquee` is not enough on its own: the flex track establishes a
   * min-content floor wider than the viewport, so the band grows
   * instead of scrolling and the document picks up a horizontal
   * scrollbar. `max-w-full` plus the clip contains it locally. */
  return (
    <div className="max-w-full overflow-hidden border-y border-rule py-5">
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee">
        {track}
        {track}
      </div>
    </div>
  )
}

/* ── SpecTable — key/value metadata as a definition list ───── */
export function SpecTable({ rows, className = '' }: {
  rows: [string, ReactNode][]
  className?: string
}) {
  return (
    <dl className={`mortar grid-cols-1 sm:grid-cols-2 ${className}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="p-5">
          <dt className="label">{k}</dt>
          <dd className="mt-2 text-s text-ink-2">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ── NumberedList — 01 / 02 / 03, hairline rows ────────────── */
export function NumberedList({ items, className = '' }: {
  items: ReactNode[]
  className?: string
}) {
  return (
    <ol className={`border-t border-rule ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-6 border-b border-rule py-5">
          <span className="label shrink-0 text-accent-text">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-s text-muted">{item}</span>
        </li>
      ))}
    </ol>
  )
}

/* ── DotGrid — a deliberate placeholder ─────────────────────
 *
 * Used where a screenshot would sit. There are no product shots
 * for this work, and a stock image would be a lie about what
 * exists — so the slot is filled with structure instead.
 */
export function DotGrid({ className = '', label }: {
  className?: string
  label?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`hud-grid relative border border-rule bg-surface-2 ${className}`}
    >
      {label && (
        <span className="label absolute bottom-4 left-4 text-muted-2">{label}</span>
      )}
    </div>
  )
}
