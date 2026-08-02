import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/* ── Share card ────────────────────────────────────────────────
 *
 * The layout declared `twitter:card: summary_large_image` and the
 * site shipped no image, so every share rendered as a blank slab
 * with a hostname under it. That is worse than declaring nothing:
 * the tag promises a picture and then does not produce one.
 *
 * This renders the same card the site would draw — paper ground,
 * one vermillion dot, one hairline, Instrument Serif for the
 * headline and Geist Mono for the label. No gradient, no radius
 * except the dot, no shadow. It has to survive being seen next to
 * the page it links to.
 *
 * Satori cannot read woff2 or a variable axis, so the OG faces are
 * separate static TTFs under assets/og/. They are a build-time
 * dependency only — nothing here reaches the browser.
 * ───────────────────────────────────────────────────────────── */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const PAPER = '#f7f5f0'
const INK = '#191814'
const MUTED = '#585245'
const RULE = '#ded8cb'
const VERMILLION = '#9b3312'

const face = (file: string) => readFileSync(join(process.cwd(), 'assets', 'og', file))

/**
 * Read at module scope so a missing or corrupt face fails the build
 * rather than silently rendering the card in a fallback sans — which
 * would look almost right and be wrong on every share.
 */
export function ogFonts() {
  return [
    { name: 'Instrument Serif', data: face('InstrumentSerif-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
    { name: 'Geist', data: face('Geist-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
    { name: 'Geist Mono', data: face('GeistMono-Regular.ttf'), weight: 400 as const, style: 'normal' as const },
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
      {/* Label row — dot, then the wordmark in mono at label tracking. */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: VERMILLION }} />
        <div
          style={{
            marginLeft: 20,
            fontFamily: 'Geist Mono',
            fontSize: 22,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          {eyebrow}
        </div>
      </div>

      {/* Headline. Instrument Serif has no bold cut; the size is the emphasis. */}
      <div
        style={{
          display: 'flex',
          fontFamily: 'Instrument Serif',
          fontSize: title.length > 46 ? 76 : 92,
          lineHeight: 1.04,
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
            fontFamily: 'Geist',
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
