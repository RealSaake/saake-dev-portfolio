/**
 * Content is data (P19).
 *
 * Every field here is Tier A (executed) or Tier B (read in source) per
 * plans/03-content/3.3-ground-truth.md. Nothing sourced from a README.
 *
 * The editorial contract (P12 — the pronoun partition):
 *   `problem`  — subject is the situation. The word "I" never appears. Zero jargon.
 *   `response` — subject is "I". Verbs: built, designed, wrote, structured, cut, rebuilt.
 *   `stack`    — the entire technical vocabulary, quarantined in a closing fragment (P13).
 *
 * No metrics. Every number on this site is one that can be checked in one click.
 */

export type Tier = 'A' | 'B'

export interface CaseStudy {
  slug: string
  title: string
  year: string
  kind: string
  tagline: string
  problem: string
  response: string
  deliverables: string[]
  outcome: string
  stack: string
  links?: { label: string; href: string }[]
  flagship?: boolean
  featured?: boolean
  note?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'rebuilding-this-site',
    title: 'Rebuilding this site meant deleting most of it',
    year: '2026',
    kind: 'Argument',
    tagline: 'An audit and a rebuild for a portfolio that had stopped being true',
    problem:
      'The previous version of this site claimed 500,000 lines of code, 2,847 cups of coffee, 12,543 commits, a senior role at a company that does not exist, two cloud certifications, an address in San Francisco, and a phone number beginning +1 (555). None of it was true. The contact page promised a reply within 24 hours to an address that rejected mail. Nine developer tools were listed; none had been built.',
    response:
      'I audited every claim on the site against its own source and against the repositories it linked to, then deleted rather than corrected. A number that has to be researched before it can be trusted is not doing the job a number is for. I rebuilt the site around a rule that survives me being tired: content is a typed object with a required problem and a required outcome, so a screenshot with no story cannot be published. I set the accessibility floor as a merge gate rather than a launch task, and I removed every visual device that signals a template — the neon gradients, the glass cards, the counters that count, the rounded corners on everything.',
    deliverables: [
      'A claim-by-claim audit of the previous build, with each statement traced to source or deleted',
      'A token layer where every colour pair was contrast-checked before it shipped — the tightest is 4.51:1, and it passes by 0.01',
      'A content schema that fails the build when a case study has no stated outcome',
      'One entrance animation and one hover gesture, defined once and reused everywhere',
      'A three-state theme that resolves before first paint, so there is no flash',
      'Type set in Instrument Serif and Geist — deliberately not Inter',
    ],
    outcome:
      'The site is smaller and says less. Twelve invented statistics became zero, four fabricated projects became three real ones, and the one thing it now argues for is legible in the source of the page you are reading. Whether that reads as confidence or as a thin portfolio is a fair question, and I would rather be judged on the second than caught on the first.',
    stack: 'Next.js App Router, TypeScript, Tailwind with an overridden theme, CSS custom properties, IntersectionObserver, Vercel.',
    links: [{ label: 'Source', href: 'https://github.com/RealSaake/saake-dev-portfolio' }],
    flagship: true,
    featured: true,
  },
  {
    slug: 'waveline',
    title: 'Waveline',
    year: '2025',
    kind: 'Web',
    tagline: 'A live audio visualiser and session layer for a music account you already own',
    problem:
      'Music visualisers either run on a local file or ask for an upload. Neither matches how people actually listen, which is streaming, in a browser tab, without a copy of the file on disk. Reading what is playing from a streaming account means holding a session on the server, because handing the browser a token that can read someone\'s listening history is not something that should be done casually.',
    response:
      'I built the authentication flow server-side, so the browser never holds a token that could be lifted from it. I wrote the visualiser against the live output of the audio graph rather than against metadata, which means it responds to what is actually audible instead of to a number describing the track. When the upstream service stopped returning per-track feature data, I wrote a fallback that degrades to a heuristic instead of failing — the visual keeps running with less information rather than stopping.',
    deliverables: [
      'Server-side OAuth with signed session tokens, and a middleware layer that keeps them off the client',
      'A live frequency analyser reading from the Web Audio graph on every animation frame',
      'Microphone capture as an alternative input when no stream is available',
      'A canvas render loop with several visual modes',
      'A health endpoint, because a deployment that cannot say whether it is up is a deployment you debug by refreshing',
    ],
    outcome:
      'It is deployed and it runs. The honest limitation is that the fallback heuristic guesses at track character from artist and title strings, which works about as well as that description suggests — it degrades gracefully, but it is guessing, and I would rather say so than call it intelligence.',
    stack: 'Next.js, TypeScript, Web Audio API, Konva, jose for JWT signing, Vercel.',
    links: [
      { label: 'Live', href: 'https://waveline.vercel.app' },
      { label: 'Source', href: 'https://github.com/RealSaake/waveline' },
    ],
    featured: true,
  },
  {
    slug: 'skillbridge',
    title: 'SkillBridge',
    year: '2025',
    kind: 'Web',
    tagline: 'A career-mapping application built against a developer\'s own repository history',
    problem:
      'Advice about which skill to learn next is usually generic, because the person giving it cannot see what you have already built. The evidence of what someone actually knows is sitting in their commit history, in a form nobody reads.',
    response:
      'I built an application that authenticates against a code-hosting account and works from the repositories it finds there rather than from a self-reported checklist. It is the largest codebase I have written — enough of it that its structure, not its features, became the interesting problem.',
    deliverables: [
      'OAuth against a code-hosting provider, with repository analysis behind it',
      'A serverless function layer proxied behind the frontend',
      'Roadmap and assessment views built on the analysed data',
    ],
    outcome:
      'It runs, and it has a defect I am not going to hide: the deployed page ships as a client-rendered shell, so with JavaScript disabled it serves one sentence telling you to enable JavaScript. That is the same failure this site was rebuilt to avoid. I know how to fix it — the fix is a framework migration — and it has not been done yet.',
    stack: 'React, TypeScript, Firebase Functions, OAuth, Vercel.',
    links: [
      { label: 'Live', href: 'https://skillbridgev1.vercel.app' },
      { label: 'Source', href: 'https://github.com/RealSaake/SkillBridge' },
    ],
    featured: true,
    note: 'Client-rendered — see the outcome.',
  },
  {
    slug: 'esp32-home-automation',
    title: 'ESP32 home automation',
    year: '2025',
    kind: 'Firmware',
    tagline: 'Firmware and a wiring plan for a room that switches itself',
    problem:
      'Consumer smart-home hardware assumes a permanent connection to somebody else\'s server. When that service changes its terms or shuts down, a switch on a wall stops working — a physical object in a room, bricked by a business decision made elsewhere.',
    response:
      'I wrote firmware that runs the control loop on the board itself, so the network is a convenience rather than a dependency, and documented the wiring in enough detail that somebody else could build it from the repository alone. The nine hardware documents are the deliverable as much as the code is: a circuit nobody can safely reproduce is a sketch, not a design.',
    deliverables: [
      'Control firmware targeting the ESP32',
      'Nine hardware documents covering wiring, components and assembly',
      'A local-first control path that does not require a cloud service',
    ],
    outcome:
      'The firmware and the hardware documentation exist and are public. What I cannot tell you is whether the board was ever physically assembled and run in a room — nothing in the repository establishes that, and I am not going to claim a built system on the strength of code that compiles. Treat it as a design and a firmware implementation, not a finished installation.',
    stack: 'MicroPython, ESP32, GPIO relay control.',
    links: [{ label: 'Source', href: 'https://github.com/RealSaake/esp32-home-automation' }],
  },
  {
    slug: 'sentinal',
    title: 'Sentinal',
    year: '2025',
    kind: 'Python',
    tagline: 'An unfinished monitoring experiment, kept public',
    problem:
      'Some projects stop before they resolve. The honest thing to do with those is leave them visible, because a portfolio that only shows finished work is describing a career nobody has.',
    response:
      'I started this and did not finish it. It is roughly 1.4 MB of Python, last pushed in July 2025, and I am not going to write a case study describing an architecture I would have to reconstruct from memory to describe accurately.',
    deliverables: ['Python source, public and readable'],
    outcome:
      'Listed rather than hidden, and listed as unfinished. If you want to know whether I can write Python, the source is one click away and it can speak for itself — which is a better answer than a paragraph from me claiming it works.',
    stack: 'Python.',
    links: [{ label: 'Source', href: 'https://github.com/RealSaake/sentinal' }],
    note: 'Unfinished — listed for completeness.',
  },
]

export const flagship = caseStudies.find((s) => s.flagship)!
export const featured = caseStudies.filter((s) => s.featured)

export function getCaseStudy(slug: string) {
  return caseStudies.find((s) => s.slug === slug)
}

/* ── Capabilities ────────────────────────────────────────────
 * What I can do, not how long I have been doing it. No years, no
 * seniority, no client count — none of that is verifiable and all
 * of it is what the previous build invented.
 */
export const capabilities: { title: string; body: string; tools: string[] }[] = [
  {
    title: 'Interface design',
    body: 'Deciding what a screen is for before deciding what it looks like. Layout, hierarchy, type, and the specific behaviour of the states most designs skip — empty, loading, failed, and arrived-from-a-link.',
    tools: ['Type systems', 'Layout', 'Colour + contrast', 'Motion'],
  },
  {
    title: 'Front-end engineering',
    body: 'Building the thing rather than handing over a picture of it. Server-rendered by default, with client code added only where an interaction genuinely needs it.',
    tools: ['TypeScript', 'React', 'Next.js', 'Tailwind'],
  },
  {
    title: 'Design systems',
    body: 'Tokens that are enforced rather than documented. On this site the framework theme is overridden, so an off-scale value does not compile — the discipline is in the build, not in a wiki page nobody reads.',
    tools: ['Design tokens', 'CSS custom properties', 'Component APIs'],
  },
  {
    title: 'Editorial structure',
    body: 'Treating content as data with a required shape. A case study here cannot be published without a stated problem and a stated outcome, which makes a screenshot with no story structurally impossible.',
    tools: ['Content schemas', 'Information architecture', 'Copy'],
  },
  {
    title: 'Accessibility',
    body: 'Held as a merge gate rather than a launch-week audit. Contrast is recomputed from the stylesheet at build time and the build fails below 4.5:1, so the floor cannot quietly erode.',
    tools: ['WCAG AA', 'Keyboard paths', 'Reduced motion', 'No-JS'],
  },
  {
    title: 'Deployment',
    body: 'Getting it onto a domain and keeping it reachable. DNS, edge hosting, redirect direction, canonical hosts, and the verification that the live thing matches what was built.',
    tools: ['Vercel', 'Cloudflare DNS', 'CI checks'],
  },
]

/* ── Process ─────────────────────────────────────────────────
 * The voice here is the same one used on the homepage. It is not
 * a methodology diagram; it is what actually happens.
 */
export const process: { title: string; body: string }[] = [
  {
    title: 'Write the problem in plain language',
    body: 'If I cannot describe it to someone outside the project, I do not understand it yet, and any interface I draw will be a guess with good spacing.',
  },
  {
    title: 'Find the case that breaks the obvious design',
    body: 'The empty state, the slow network, the user who arrives from a link rather than the front door. Building for that case first tends to produce something simpler than building for the happy path and patching it afterwards.',
  },
  {
    title: 'Build it, in the real material',
    body: 'Layouts behave differently in a browser than in a design file. I would rather find that out in week one than hand over something that only works at one width.',
  },
  {
    title: 'Make it checkable',
    body: 'Ship it somewhere a stranger can inspect it, and write down what is still wrong. On this site the known defects are on the page rather than in a footnote.',
  },
]

/* ── Stack — only things genuinely present in the repositories ─ */
export const stack: { group: string; items: string[] }[] = [
  { group: 'Language', items: ['TypeScript', 'JavaScript', 'Python'] },
  { group: 'Framework', items: ['Next.js', 'React', 'Express'] },
  { group: 'Styling', items: ['Tailwind', 'CSS custom properties'] },
  { group: 'Runtime', items: ['Node', 'Web Audio API', 'Canvas / Konva'] },
  { group: 'Platform', items: ['Vercel', 'Firebase Functions', 'Cloudflare'] },
  { group: 'Hardware', items: ['ESP32', 'MicroPython'] },
]

/* ── Marquee — the breadth band. Real technologies only. ────── */
export const marqueeItems: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind',
  'Python',
  'Web Audio API',
  'Konva',
  'OAuth',
  'JWT',
  'Firebase Functions',
  'Vercel',
  'Cloudflare',
  'ESP32',
  'MicroPython',
]

/* ── Facts — the only numbers on this site ───────────────────
 * Four figures, each with an href that proves it. Verified
 * 2026-08-03 against the GitHub API. Nothing here is a metric,
 * a percentage, or a business result, because none of those
 * could be checked in one click.
 */
export const facts: { value: string; label: string; note: string; href: string }[] = [
  {
    value: '16',
    label: 'Public repositories',
    note: 'Everything I have made that is open',
    href: 'https://github.com/RealSaake?tab=repositories',
  },
  {
    value: '2019',
    label: 'On GitHub since',
    note: 'The commit history is the CV',
    href: 'https://github.com/RealSaake',
  },
  {
    value: '02',
    label: 'Live deployments',
    note: 'Both linked, both inspectable',
    href: 'https://waveline.vercel.app',
  },
  {
    value: '00',
    label: 'Unverifiable claims',
    note: 'The previous build had twelve',
    href: 'https://github.com/RealSaake/saake-dev-portfolio',
  },
]

/* ── Elsewhere — external verification ───────────────────────
 * Deliberately routing a visitor somewhere I do not control is a
 * costly signal. Nobody who is inflating does it.
 */
export const elsewhere: { label: string; href: string; note: string }[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/RealSaake',
    note: 'Every project on this site, at source',
  },
  {
    label: 'Waveline',
    href: 'https://waveline.vercel.app',
    note: 'Live — connect an account and it runs',
  },
  {
    label: 'SkillBridge',
    href: 'https://skillbridgev1.vercel.app',
    note: 'Live, with the defect described in its case study',
  },
  {
    label: 'This site, at source',
    href: 'https://github.com/RealSaake/saake-dev-portfolio',
    note: 'Including the checks that gate its build',
  },
]


/** Verified 2026-08-02. An unconfirmed profile ships as nothing, not as a link. */
export const site = {
  name: 'Aryan',
  handle: 'saake',
  /**
   * The canonical origin is www, not the apex.
   *
   * This is not the preference — apex is. But the Vercel project redirects
   * saake.dev → www.saake.dev with a 308, and a canonical that points at a
   * URL which redirects is worse than a canonical on the less-preferred
   * host: it tells a crawler the authoritative page is somewhere that
   * immediately sends it elsewhere.
   *
   * Fix the redirect direction in the Vercel dashboard (Project → Domains →
   * set saake.dev as primary), then change this back to the apex. Until the
   * redirect actually changes, this string must match whatever host serves
   * a 200.
   */
  url: 'https://www.saake.dev',
  email: 'hi@saake.dev',
  github: 'https://github.com/RealSaake',
  // linkedin — unverified, omitted
  // twitter — existence unconfirmed, omitted
}
