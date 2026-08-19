import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Grain } from '@/components/primitives'
import { RevealObserver } from '@/components/reveal-observer'
import { Header, Footer } from '@/components/shell'
import { caseStudyCount, site } from '@/content'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aryan — designer and engineer',
    template: '%s — saake.dev',
  },
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
      data-scroll-behavior="smooth"
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
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  )
}
