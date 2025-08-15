import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { MatrixBackground } from '@/components/matrix-background'

export const metadata: Metadata = {
  title: 'saake.dev - Cyber Portfolio',
  description: 'Full-stack developer and automation enthusiast building secure, scalable web apps, AI demos, and data workflows.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'nextjs', 'typescript'],
  authors: [{ name: 'Saake' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
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
      <body className="min-h-screen bg-background text-foreground relative antialiased">
        <Navigation />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}