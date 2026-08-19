'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Container } from './primitives'
import { ThemeToggle } from './theme-toggle'
import { site } from '@/content'

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Header = memo(function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule nav-blur">
      <Container>
        <div className="nav-row">
          <Link
            href="/"
            className="wordmark"
            aria-label="Saake home"
          >
            saake<span>.dev</span>
          </Link>

          <nav aria-label="Primary" className="nav-links">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
})

export function Footer() {
  return (
    <footer className="relative border-t border-rule bg-paper">
      <div aria-hidden="true" className="footer-orbit" />
      <Container className="relative py-16 md:py-24">
        
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="label font-mono text-xs uppercase tracking-widest text-[#BFFF00] mb-4">
              AVAILABLE FOR SELECT PROJECTS &amp; ARCHITECTURE
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">
              If you need something built properly —<br className="hidden md:block" /> reach out.
            </h2>
            <a className="inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-sans text-xl font-bold text-ink transition-colors hover:text-[#BFFF00] hover:border-[#BFFF00]" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:col-span-4 md:justify-end items-start md:items-center">
            <a className="font-mono text-sm tracking-widest text-muted hover:text-ink transition-colors uppercase" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <Link className="font-mono text-sm tracking-widest text-muted hover:text-ink transition-colors uppercase" href="/about">About</Link>
            <Link className="font-mono text-sm tracking-widest text-muted hover:text-ink transition-colors uppercase" href="/work">Work</Link>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-rule pt-8 opacity-60">
          <span className="font-mono text-xs uppercase tracking-widest text-muted flex items-center gap-2">
            <span style={{ fontSize: '1.2em' }}>&copy;</span> 2026 SAAKE.DEV
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted text-center md:text-right">
            SYSTEM ENGINEERED FOR PERFORMANCE
          </span>
        </div>
      </Container>
    </footer>
  )
}
