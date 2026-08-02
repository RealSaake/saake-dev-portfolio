/**
 * Live verification. Runs against the deployed site, not the build.
 *
 * Local verification cannot catch a canonical that points at a URL which
 * redirects, because the redirect lives in host configuration rather than
 * in the repository. That is exactly the class of defect that shipped
 * unnoticed before, so it gets its own check here.
 *
 *   node scripts/verify-live.mjs [origin]
 */

import { readFileSync } from 'node:fs'

const DECLARED = (
  readFileSync('content/index.ts', 'utf8').match(/url:\s*'([^']+)'/) || [, 'https://saake.dev']
)[1].replace(/\/$/, '')

const ORIGIN = (process.argv[2] || DECLARED).replace(/\/$/, '')

const ROUTES = [
  '/',
  '/work',
  '/about',
  '/contact',
  '/work/rebuilding-this-site',
  '/work/waveline',
  '/work/skillbridge',
]

let failures = 0
const fail = (m) => { console.log(`  ✗ ${m}`); failures++ }
const pass = (m) => console.log(`  ✓ ${m}`)

async function head(url) {
  const r = await fetch(url, { redirect: 'manual' })
  return { status: r.status, location: r.headers.get('location'), headers: r.headers }
}

console.log(`\nVerifying ${ORIGIN}\n`)

/* ── 1. Every route serves 200 without a redirect hop ─────────── */
console.log('Reachability')
for (const route of ROUTES) {
  const { status, location } = await head(`${ORIGIN}${route}`)
  if (status === 200) continue
  if (status >= 300 && status < 400) fail(`${route}: ${status} → ${location}`)
  else fail(`${route}: ${status}`)
}
if (!failures) pass(`${ROUTES.length} routes serve 200 directly`)

/* ── 2. Canonicals resolve without redirecting ────────────────── */
console.log('\nCanonical resolves to itself')
const before2 = failures
for (const route of ROUTES) {
  const res = await fetch(`${ORIGIN}${route}`)
  const html = await res.text()
  const m = html.match(/<link rel="canonical" href="([^"]+)"/)
  if (!m) { fail(`${route}: no canonical`); continue }

  const canonical = m[1]
  const { status, location } = await head(canonical)
  if (status !== 200) {
    fail(`${route}: canonical ${canonical} returns ${status}${location ? ` → ${location}` : ''}`)
  }
}
if (failures === before2) pass('every canonical returns 200 at the URL it names')

/* ── 3. The fabrications are gone from production ─────────────── */
console.log('\nFabrications')
const AUDIT_START = 'The previous version of this site claimed'
const AUDIT_END = 'none had been built.'
const PATTERNS = [
  [/\(555\)/, 'placeholder phone'],
  [/San Francisco/i, 'fabricated location'],
  [/\b2,?847\b/, 'invented coffee count'],
  [/\b12,?543\b/, 'invented commit count'],
  [/within 24 hours/i, 'unkeepable promise'],
  [/github\.com\/saake\b/, 'wrong GitHub handle'],
]
const before3 = failures
for (const route of ROUTES) {
  let body = await (await fetch(`${ORIGIN}${route}`)).text()
  for (;;) {
    const s = body.indexOf(AUDIT_START)
    if (s === -1) break
    const e = body.indexOf(AUDIT_END, s)
    if (e === -1) break
    body = body.slice(0, s) + body.slice(e + AUDIT_END.length)
  }
  for (const [re, label] of PATTERNS) if (re.test(body)) fail(`${route}: ${label}`)
}
if (failures === before3) pass('none present in production HTML')

/* ── 4. Redirects and 404 ─────────────────────────────────────── */
console.log('\nRedirects')
const before4 = failures
{
  const { status, location } = await head(`${ORIGIN}/projects`)
  if (status !== 308 && status !== 301) fail(`/projects: expected a permanent redirect, got ${status}`)
  else if (!/\/work$/.test(location || '')) fail(`/projects → ${location}, expected /work`)

  const missing = await fetch(`${ORIGIN}/definitely-not-a-page`)
  if (missing.status !== 404) fail(`unknown route returns ${missing.status}, expected 404`)

  const http = await head(ORIGIN.replace('https://', 'http://'))
  if (http.status < 300 || http.status >= 400) fail(`http:// does not redirect (got ${http.status})`)
}
if (failures === before4) pass('/projects → /work, unknown → 404, http → https')

/* ── 5. Security headers ──────────────────────────────────────── */
console.log('\nHeaders')
const before5 = failures
{
  const { headers } = await head(`${ORIGIN}/`)
  const want = {
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-frame-options': 'DENY',
  }
  for (const [k, v] of Object.entries(want)) {
    const got = headers.get(k)
    if (!got) fail(`missing ${k}`)
    else if (got.toLowerCase() !== v.toLowerCase()) fail(`${k}: ${got}, expected ${v}`)
  }
  if (!headers.get('strict-transport-security')) fail('missing strict-transport-security')
}
if (failures === before5) pass('nosniff, referrer-policy, frame-options, HSTS')

/* ── 6. sitemap and robots agree with the canonical origin ────── */
console.log('\nSitemap and robots')
const before6 = failures
{
  const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!urls.length) fail('sitemap lists no URLs')
  for (const u of urls) {
    if (!u.startsWith(ORIGIN)) fail(`sitemap entry ${u} is not on ${ORIGIN}`)
  }
  for (const route of ROUTES) {
    const expected = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`
    if (!urls.includes(expected)) fail(`sitemap is missing ${expected}`)
  }

  const robots = await (await fetch(`${ORIGIN}/robots.txt`)).text()
  if (!robots.includes(`${ORIGIN}/sitemap.xml`)) fail('robots.txt does not point at the sitemap on this origin')
}
if (failures === before6) pass('sitemap complete and on-origin, robots points at it')

console.log(failures === 0 ? '\nPASS — live site verified\n' : `\nFAIL — ${failures} problem${failures === 1 ? '' : 's'}\n`)
process.exit(failures === 0 ? 0 : 1)
