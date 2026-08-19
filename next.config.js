/** @type {import('next').NextConfig} */

// trailingSlash was `true` in the previous build. That is what put a 308 in
// front of every route and made each canonical point at a URL one hop away
// from the one that served it. Canonical URLs are now bare.

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // /projects was the old index. It has inbound links; do not 404 it.
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/projects/:slug', destination: '/work/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
