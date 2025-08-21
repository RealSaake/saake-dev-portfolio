import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saake.dev'
  const routes = ['', '/projects', '/about', '/contact', '/timeline', '/tools'].map((path) => ({
    url: `${baseUrl}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  return routes
}


