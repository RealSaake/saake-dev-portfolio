import type { Config } from 'tailwindcss'

/**
 * Theme is OVERRIDDEN, not extended.
 * `text-blue-500`, `p-7`, `rounded-lg` must not compile — if a value
 * isn't in design/system.md, it isn't available.
 *
 * The discipline isn't in having tokens. It's in refusing to write a
 * value that isn't one: in both reference sites, nearly every defect
 * lived in an arbitrary-value override.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  darkMode: ['variant', '&:where([data-theme="light"] *)'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: 'var(--paper)',
      surface: 'var(--surface)',
      'surface-2': 'var(--surface-2)',
      rule: 'var(--rule)',
      'rule-strong': 'var(--rule-strong)',
      'muted-2': 'var(--muted-2)',
      muted: 'var(--muted)',
      'ink-2': 'var(--ink-2)',
      ink: 'var(--ink)',
      'accent-text': 'var(--accent-text)',
      'accent-fill': 'var(--accent-fill)',
      'accent-edge': 'var(--accent-edge)',
      'accent-wash': 'var(--accent-wash)',
      focus: 'var(--focus)',
    },
    // 4px base — twelve values, nothing else
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
      24: '96px',
      32: '128px',
      px: '1px',
    },
    fontSize: {
      label: ['var(--t-label)', { lineHeight: '1.4' }],
      s: ['var(--t-body-s)', { lineHeight: '1.6' }],
      body: ['var(--t-body)', { lineHeight: '1.65' }],
      lead: ['var(--t-lead)', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
      h3: ['var(--t-h3)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      h2: ['var(--t-h2)', { lineHeight: '1.15', letterSpacing: 'var(--track-tight)' }],
      h1: ['var(--t-h1)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
      display: ['var(--t-display)', { lineHeight: '1', letterSpacing: 'var(--track-display)' }],
    },
    fontFamily: {
      display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
      black: '800',
    },
    letterSpacing: {
      label: 'var(--track-label)',
      tight: 'var(--track-tight)',
      display: 'var(--track-display)',
      normal: 'var(--track-normal)',
    },
    borderRadius: {
      none: '0',
      full: '9999px', // status dot only — the single sanctioned exception
    },
    borderWidth: { DEFAULT: '1px', 0: '0', 1: '1px', 2: '2px' },
    maxWidth: {
      prose: 'var(--c-prose)',
      content: 'var(--c-content)',
      wide: 'var(--c-wide)',
      measure: 'var(--measure)',
      'measure-long': 'var(--measure-long)',
      full: '100%',
    },
    // no boxShadow key at all — elevation is border, never fill
    extend: {
      // 380 is where the nav row stops fitting, not a device width.
      screens: { xs: '380px' },
      transitionDuration: { act: 'var(--dur-act)', enter: 'var(--dur-enter)' },
      transitionTimingFunction: { act: 'var(--ease-act)', enter: 'var(--ease-enter)' },
      gridTemplateColumns: { 12: 'repeat(12, minmax(0, 1fr))' },
      aspectRatio: { card: '16 / 10' },
    },
  },
  plugins: [],
}

export default config
