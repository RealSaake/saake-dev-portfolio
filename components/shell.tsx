import Link from 'next/link'
import { Container, Label, Rule } from './primitives'
import { ThemeToggle } from './theme-toggle'
import { site } from '@/content'

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="border-b border-rule bg-paper">
      <Container>
        <div className="flex items-center justify-between py-6">
          <Link
            href="/"
            className="font-serif text-lead leading-none transition-colors duration-act hover:text-accent-text"
          >
            saake<span className="text-muted-2">.dev</span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label transition-colors duration-act hover:text-accent-text"
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
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            <div>
              <Label className="mb-4">Elsewhere</Label>
              {/* nav duplicated here so it stays reachable with JS disabled */}
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

            <div>
              <Label className="mb-4">Contact</Label>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="text-s text-muted transition-colors duration-act hover:text-accent-text"
                >
                  {site.email}
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-s text-muted transition-colors duration-act hover:text-accent-text"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          <Rule className="my-12" />

          <div className="flex flex-col gap-3 md:flex-row md:justify-between">
            <Label>© {new Date().getFullYear()} {site.name}</Label>
            <Label>Set in Instrument Serif and Geist</Label>
          </div>
        </div>
      </Container>
    </footer>
  )
}
