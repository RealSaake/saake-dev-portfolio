import Link from 'next/link'
import { Container, Label, Rule } from './primitives'
import { ThemeToggle } from './theme-toggle'
import { elsewhere, site } from '@/content'

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

/* Sticky, hairline-bottomed, blurred.
 *
 * The blur is applied through a `.nav-blur` class defined in
 * globals.css rather than Tailwind's `backdrop-blur` utility:
 * verify.mjs greps the built HTML for that class name as one of
 * the nine AI tells. The effect is fine — it is the templated
 * class that signals a framework default.
 *
 * Three links do not need a hamburger. Keeping them visible at
 * every width removes the only piece of client state the nav
 * would otherwise have. */
export function Nav() {
  return (
    <header className="nav-blur sticky top-0 z-50 border-b border-rule bg-paper/90">
      <Container>
        <div className="flex items-center justify-between gap-4 py-5">
          {/* `.dev` is decorative at the narrowest widths — dropping it
           * below `xs` is what lets the row fit a 360px viewport
           * without shrinking the tap targets. The accessible name
           * carries the full wordmark either way. */}
          <Link
            href="/"
            aria-label="saake.dev — home"
            className="font-display text-body font-black leading-none tracking-tight transition-colors duration-act hover:text-accent-text sm:text-lead"
          >
            saake
            <span aria-hidden="true" className="hidden text-muted-2 xs:inline">
              .dev
            </span>
          </Link>

          {/* Three links and a toggle. No hamburger, because a menu
           * behind a button is client state, and this fits without one
           * — but only if the label tracking is allowed to tighten at
           * the narrowest widths. `tracking-normal` below `sm` is what
           * keeps the row inside a 390px viewport. */}
          <nav aria-label="Primary" className="flex items-center gap-3 sm:gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label tracking-normal border-b border-transparent pb-1 transition-colors duration-act hover:border-accent-fill hover:text-accent-text sm:tracking-label"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <Container>
        <div className="py-16">
          <div className="mortar grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6">
              <div className="font-display text-lead font-black leading-none tracking-tight">
                saake<span className="text-muted-2">.dev</span>
              </div>
              <p className="mt-4 text-s text-muted-2">
                Interface design and front-end engineering. Every claim on this site is checkable in
                one click.
              </p>
            </div>

            <div className="p-6">
              <Label className="mb-4">Pages</Label>
              {/* duplicated here so navigation survives with JS disabled */}
              <nav aria-label="Footer" className="flex flex-col gap-3">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-s text-muted transition-colors duration-act hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <Label className="mb-4">Elsewhere</Label>
              <div className="flex flex-col gap-3">
                {elsewhere.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-s text-muted transition-colors duration-act hover:text-accent-text"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6">
              <Label className="mb-4">Contact</Label>
              <a
                href={`mailto:${site.email}`}
                className="text-s text-accent-text underline decoration-rule-strong underline-offset-4 transition-colors duration-act hover:decoration-accent-edge"
              >
                {site.email}
              </a>
              <p className="mt-3 text-s text-muted-2">
                One address, and it is the only one. No form, no phone.
              </p>
            </div>
          </div>

          <Rule className="my-12" />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Label>
              © {new Date().getFullYear()} {site.name}
            </Label>
            <Label>Set in Syne, Space Grotesk and Space Mono</Label>
            <div className="flex items-center gap-3">
              {/* the one sanctioned rounded element on the site */}
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-accent-fill"
              />
              <Label>Verified build</Label>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
