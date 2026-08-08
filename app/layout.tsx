import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Grain } from '@/components/primitives'
import { RevealObserver } from '@/components/reveal-observer'
import { Nav, Footer } from '@/components/shell'
import { caseStudyCount, site } from '@/content'
import './globals.css'

/* ── Faces ────────────────────────────────────────────────────
 * Syne for display, Space Grotesk for body, Space Mono for the
 * label register. Self-hosted latin subsets, four files, no third
 * party on the critical path.
 *
 * The mono face is reserved: labels, eyebrows, metadata, nav.
 * Never body. That separation is what gives the page a second
 * voice instead of a second font.
 *
 * adjustFontFallback sizes the fallback metrics to the real face
 * so the swap does not move the page.
 * ───────────────────────────────────────────────────────────── */

const display = localFont({
  src: [{ path: '../public/fonts/Syne-Variable.woff2', weight: '400 800', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

const sans = localFont({
  src: [{ path: '../public/fonts/SpaceGrotesk-Variable.woff2', weight: '300 700', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

const mono = localFont({
  src: [
    { path: '../public/fonts/SpaceMono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/SpaceMono-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
})

/* ── Metadata ─────────────────────────────────────────────────
 * No `alternates` key here. A canonical declared in the layout
 * is inherited by every child route, which is how six pages end
 * up claiming to be the same page. Each route declares its own.
 * ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aryan — designer and engineer',
    template: '%s — saake.dev',
  },
  // The count is derived — see spelledCount in content/index.ts.
  description: `I design and build interfaces, and I write down why. ${caseStudyCount} case studies, each with a stated problem and an honest outcome.`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: site.url,
    siteName: 'saake.dev',
    title: 'Aryan — designer and engineer',
    description: 'I design and build interfaces, and I write down why.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan — designer and engineer',
    description: 'I design and build interfaces, and I write down why.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f6f6f2' },
  ],
  colorScheme: 'dark light',
}

/* Runs before first paint. Resolves the theme and marks the document
 * as scripted, so `.reveal` elements start hidden only when something
 * exists to reveal them. Without the `.js` gate, a JS failure leaves
 * the entire page at opacity 0.
 *
 * Dark is the default, and deliberately not merely the OS default:
 * with nothing stored, this site is dark even on a light-preferring
 * machine. That is a brand decision rather than an oversight — the
 * light theme is a real, contrast-checked second mode, but it is the
 * alternative rather than the face of the site.
 *
 * An explicit stored choice always wins, and 'system' means system
 * for anyone who asks for it through the toggle. */
const PREPAINT = `(function(){try{
var d=document.documentElement;d.classList.add('js');
var s=localStorage.getItem('theme');
var l=window.matchMedia('(prefers-color-scheme: light)').matches;
d.dataset.theme=(s==='light'||(s==='system'&&l))?'light':'dark';
}catch(e){document.documentElement.dataset.theme='dark'}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      data-theme="dark"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREPAINT }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:border focus:border-accent-fill focus:bg-paper focus:px-4 focus:py-3 focus:text-s"
        >
          Skip to content
        </a>

        <Grain />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
