import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { MatrixBackground } from '@/components/matrix-background'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300','400','500','600','700','800','900'],
})

export const metadata: Metadata = {
  title: 'saake.dev - Cyber Portfolio',
  description: 'Full-stack developer and automation enthusiast building secure, scalable web apps, AI demos, and data workflows.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'nextjs', 'typescript'],
  authors: [{ name: 'Saake' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  metadataBase: new URL('https://saake.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'saake.dev - Cyber Portfolio',
    description: 'Full-stack developer and automation enthusiast',
    type: 'website',
    url: 'https://saake.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'saake.dev - Cyber Portfolio',
    description: 'Full-stack developer and automation enthusiast',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground relative antialiased`}>
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Saake',
            url: 'https://saake.dev',
            sameAs: [
              'https://github.com/RealSaake',
              'https://linkedin.com/in/saake'
            ],
            jobTitle: 'Full-stack Developer',
            worksFor: {
              '@type': 'Organization',
              name: 'saake.dev'
            }
          })}
        </Script>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        <main id="main-content" className="relative" role="main">
          {children}
        </main>
      </body>
    </html>
  )
}