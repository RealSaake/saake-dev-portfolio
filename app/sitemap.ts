import type { MetadataRoute } from 'next'
import { caseStudies, site } from '@/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Fixed date rather than new Date() — a lastModified that changes on every
  // build tells crawlers everything changed when nothing did.
  const modified = new Date('2026-08-02')

  const routes = ['', '/work', '/about', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: modified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const studies = caseStudies.map((s) => ({
    url: `${site.url}/work/${s.slug}`,
    lastModified: modified,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...routes, ...studies]
}
