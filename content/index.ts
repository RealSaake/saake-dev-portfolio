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
]

export const flagship = caseStudies.find((s) => s.flagship)!
export const featured = caseStudies.filter((s) => s.featured)

export function getCaseStudy(slug: string) {
  return caseStudies.find((s) => s.slug === slug)
}

/** Verified 2026-08-02. An unconfirmed profile ships as nothing, not as a link. */
export const site = {
  name: 'Aryan',
  handle: 'saake',
  url: 'https://saake.dev',
  email: 'hi@saake.dev',
  github: 'https://github.com/RealSaake',
  // linkedin — unverified, omitted
  // twitter — existence unconfirmed, omitted
}
