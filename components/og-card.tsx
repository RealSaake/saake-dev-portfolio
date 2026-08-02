import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/* ── Share card ────────────────────────────────────────────────
 *
 * The layout declared `twitter:card: summary_large_image` and the
 * site shipped no image, so every share rendered as a blank slab
 * with a hostname under it. That is worse than declaring nothing:
 * the tag promises a picture and then does not produce one.
 *
 * This renders the same card the site would draw — near-black
 * ground, one lime mark, one hairline, Syne for the headline and
 * Space Mono for the label. No gradient, no radius except the dot,
 * no shadow. It has to survive being seen next to the page it
 * links to.
 *
 * Satori cannot read woff2, so the OG faces are separate static
 * TTFs under assets/og/ — the same families the site loads as
 * woff2 for the browser. They are a build-time dependency only;
 * nothing here reaches the client.
 *
 * The hex literals below are deliberate. Satori resolves no CSS
 * custom properties, so the tokens cannot be referenced by name.
 * These values are copies of the dark-theme ramp in globals.css
 * and must be changed with it.
 * ───────────────────────────────────────────────────────────── */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const PAPER = '#0a0a0a'
const INK = '#f5f5f0'
const MUTED = '#9a9a92'
const RULE = '#1f1f1f'
const LIME = '#c6f135'

const face = (file: string) => readFileSync(join(process.cwd(), 'assets', 'og', file))

/**
 * Read at module scope so a missing or corrupt face fails the build
 * rather than silently rendering the card in a fallback sans — which
 * would look almost right and be wrong on every share.
 *
 * These must be STATIC instances. Satori cannot resolve a variable
 * axis and fails with an out-of-range index deep in its font parser
 * rather than a readable error, so `Syne-ExtraBold.ttf` is a wght=800
 * instance cut from the variable file rather than the variable file
 * itself.
 */
export function ogFonts() {
  return [
    { name: 'Syne', data: face('Syne-ExtraBold.ttf'), weight: 800 as const, style: 'normal' as const },
    { name: 'Space Grotesk', data: face('SpaceGrotesk-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
    { name: 'Space Mono', data: face('SpaceMono-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
  ]
}

export function OgCard({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string
  title: string
  note: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: PAPER,
        padding: '72px 80px',
      }}
    >
      {/* Label row — mark, then the wordmark in mono at label tracking. */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 16, height: 16, background: LIME }} />
        <div
          style={{
            marginLeft: 20,
            fontFamily: 'Space Mono',
            fontSize: 22,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Headline. */}
      <div
        style={{
          display: 'flex',
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: title.length > 46 ? 72 : 88,
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          color: INK,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      {/* Elevation is a border, here as everywhere. */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', height: 1, background: RULE }} />
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            fontFamily: 'Space Grotesk',
            fontSize: 28,
            lineHeight: 1.4,
            color: MUTED,
            maxWidth: 920,
          }}
        >
          {note}
        </div>
      </div>
    </div>
  )
}
