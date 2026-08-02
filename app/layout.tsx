import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Grain } from '@/components/primitives'
import { RevealObserver } from '@/components/reveal-observer'
import { Nav, Footer } from '@/components/shell'
import { site } from '@/content'
import './globals.css'

/* ── Faces ────────────────────────────────────────────────────
 * Instrument Serif ships 400 only — there is no bold cut, and
 * synthesising one is the tell. Geist and Geist Mono are the
 * variable latin subsets. Four files, self-hosted, no third
 * party on the critical path.
 *
 * adjustFontFallback sizes the fallback metrics to the real face
 * so the swap does not move the page.
 * ───────────────────────────────────────────────────────────── */

const serif = localFont({
  src: [
    { path: '../public/fonts/InstrumentSerif-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Iowan Old Style', 'Georgia', 'serif'],
})

const sans = localFont({
  src: [{ path: '../public/fonts/Geist-Variable.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

const mono = localFont({
  src: [{ path: '../public/fonts/GeistMono-Variable.woff2', weight: '400', style: 'normal' }],
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
  description:
    'I design and build interfaces, and I write down why. Three case studies, each with a stated problem and an honest outcome.',
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
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#12110e' },
  ],
  colorScheme: 'light dark',
}

/* Runs before first paint. Resolves the theme and marks the document
 * as scripted, so `.reveal` elements start hidden only when something
 * exists to reveal them. Without the `.js` gate, a JS failure leaves
 * the entire page at opacity 0. */
const PREPAINT = `(function(){try{
var d=document.documentElement;d.classList.add('js');
var s=localStorage.getItem('theme');
var m=window.matchMedia('(prefers-color-scheme: dark)').matches;
d.dataset.theme=(s==='dark'||((s===null||s==='system')&&m))?'dark':'light';
}catch(e){document.documentElement.dataset.theme='light'}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      data-theme="light"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREPAINT }} />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-3 focus:text-s"
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
