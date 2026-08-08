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

/* The case-study routes are derived from the content module, not listed.
   This list was hand-written once and went stale the moment two more case
   studies shipped: production was reported green while two live routes had
   never been requested. A verifier that has to be updated by hand is a
   verifier that will eventually lie. */
const ROUTES = [
  '/',
  '/work',
  '/about',
  '/contact',
  ...[...readFileSync('content/index.ts', 'utf8').matchAll(/^\s{4}slug:\s*'([^']+)'/gm)].map(
    (m) => `/work/${m[1]}`
  ),
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

/* ── 6. Share cards actually fetch ────────────────────────────
 * Local verification proves the PNG was generated. It cannot prove
 * a crawler can reach it — that depends on routing and the CDN in
 * front of it, and a card that 404s over the wire previews exactly
 * as badly as no card at all. Twitter and Slack fetch this URL
 * unauthenticated and do not follow many hops, so it has to be 200
 * on the first try with an image content-type. */
console.log('\nShare cards')
const before6 = failures
{
  for (const route of ROUTES) {
    const html = await (await fetch(`${ORIGIN}${route}`)).text()
    const url = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1]
    if (!url) { fail(`${route}: no og:image declared`); continue }
    if (!url.startsWith(ORIGIN)) { fail(`${route}: og:image is not on ${ORIGIN}`); continue }

    const r = await fetch(url, { redirect: 'manual' })
    if (r.status !== 200) {
      fail(`${route}: og:image returns ${r.status}${r.headers.get('location') ? ` → ${r.headers.get('location')}` : ''}`)
      continue
    }
    const type = r.headers.get('content-type') || ''
    if (!type.startsWith('image/')) fail(`${route}: og:image serves ${type}`)

    const bytes = Buffer.from(await r.arrayBuffer())
    if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
      fail(`${route}: og:image body is not a PNG`)
    } else if (bytes.readUInt32BE(16) !== 1200 || bytes.readUInt32BE(20) !== 630) {
      fail(`${route}: og:image is ${bytes.readUInt32BE(16)}×${bytes.readUInt32BE(20)} over the wire`)
    }
  }
}
if (failures === before6) pass('every og:image returns 200 as a 1200×630 PNG')

/* ── 7. sitemap and robots agree with the canonical origin ────── */
console.log('\nSitemap and robots')
const before7 = failures
{
  const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!urls.length) fail('sitemap lists no URLs')
  for (const u of urls) {
    if (!u.startsWith(ORIGIN)) fail(`sitemap entry ${u} is not on ${ORIGIN}`)
  }
  for (const route of ROUTES) {
    // The home URL is emitted as the bare origin, matching its canonical.
    // Accept either form rather than inventing a trailing slash the site
    // does not use anywhere else.
    const expected = route === '/' ? [ORIGIN, `${ORIGIN}/`] : [`${ORIGIN}${route}`]
    if (!expected.some((u) => urls.includes(u))) {
      fail(`sitemap is missing ${expected[0]}`)
    }
  }

  // Whatever form it uses, the sitemap and the canonical must agree.
  const homeHtml = await (await fetch(`${ORIGIN}/`)).text()
  const homeCanonical = (homeHtml.match(/<link rel="canonical" href="([^"]+)"/) || [])[1]
  const homeInSitemap = urls.find((u) => u === ORIGIN || u === `${ORIGIN}/`)
  if (homeCanonical && homeInSitemap && homeCanonical !== homeInSitemap) {
    fail(`home canonical is ${homeCanonical} but the sitemap lists ${homeInSitemap}`)
  }

  const robots = await (await fetch(`${ORIGIN}/robots.txt`)).text()
  if (!robots.includes(`${ORIGIN}/sitemap.xml`)) fail('robots.txt does not point at the sitemap on this origin')
}
if (failures === before7) pass('sitemap complete and on-origin, robots points at it')

console.log(failures === 0 ? '\nPASS — live site verified\n' : `\nFAIL — ${failures} problem${failures === 1 ? '' : 's'}\n`)
process.exit(failures === 0 ? 0 : 1)
