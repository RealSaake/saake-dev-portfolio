import Link from 'next/link'
import type { ReactNode } from 'react'

/* ── Rule — the only divider on the site ───────────────────── */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`border-0 border-t border-rule ${className}`} />
}

/* ── Label — the mono register (P5). Nothing else uses mono. ─ */
export function Label({ children, as: As = 'div', className = '' }: {
  children: ReactNode
  as?: 'div' | 'span' | 'h2'
  className?: string
}) {
  return <As className={`label ${className}`}>{children}</As>
}

/* ── SectionHead — number + label + heading ────────────────── */
export function SectionHead({ index, label, children }: {
  index?: string
  label: string
  children?: ReactNode
}) {
  return (
    <div className="mb-12">
      <div className="flex items-baseline gap-4 mb-6">
        {index && <span className="label">{index}</span>}
        <Label as="span">{label}</Label>
      </div>
      {children && <h2 className="text-h2 max-w-measure">{children}</h2>}
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

/* ── Grain — one fixed layer, server-rendered (P9) ─────────── */
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
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: '180px 180px',
      }}
    />
  )
}

/* ── ExternalLink — arrow, always rel-guarded (P18) ────────── */
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

/* ── Reveal — entrance wrapper. One class, one observer. ───── */
export function Reveal({ children, delay = 0, className = '' }: {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}) {
  return (
    <div className={`reveal ${delay ? `rd-${delay}` : ''} ${className}`}>{children}</div>
  )
}

/* ── Section — vertical rhythm, one value one jump (P11) ───── */
export function Section({ children, className = '', id }: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-24 md:py-40 ${className}`}>
      {children}
    </section>
  )
}

/* ── Container ─────────────────────────────────────────────── */
export function Container({ children, size = 'content', className = '' }: {
  children: ReactNode
  size?: 'prose' | 'content' | 'wide'
  className?: string
}) {
  const max = size === 'prose' ? 'max-w-prose' : size === 'wide' ? 'max-w-wide' : 'max-w-content'
  return <div className={`${max} mx-auto px-6 md:px-8 ${className}`}>{children}</div>
}
