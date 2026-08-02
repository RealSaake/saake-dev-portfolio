import type { Config } from 'tailwindcss'

/**
 * Theme is OVERRIDDEN, not extended.
 * `text-blue-500`, `p-7`, `rounded-lg` must not compile — if a value
 * isn't in design/system.md, it isn't available.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  darkMode: ['variant', '&:where([data-theme="dark"] *)'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: 'var(--paper)',
      surface: 'var(--surface)',
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
    // 4px base — ten values, nothing else
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      6: '24px',
      8: '32px',
      12: '48px',
      16: '64px',
      24: '96px',
      40: '160px',
      px: '1px',
    },
    fontSize: {
      label: ['var(--t-label)', { lineHeight: '1.4' }],
      's': ['var(--t-body-s)', { lineHeight: '1.6' }],
      body: ['var(--t-body)', { lineHeight: '1.65' }],
      lead: ['var(--t-lead)', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
      h3: ['var(--t-h3)', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
      h2: ['var(--t-h2)', { lineHeight: '1.2', letterSpacing: 'var(--track-tight)' }],
      h1: ['var(--t-h1)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      display: ['var(--t-display)', { lineHeight: '1.02', letterSpacing: 'var(--track-display)' }],
    },
    fontFamily: {
      serif: ['var(--font-serif)', 'Times New Roman', 'serif'],
      sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
    },
    letterSpacing: {
      label: 'var(--track-label)',
      tight: 'var(--track-tight)',
      display: 'var(--track-display)',
      normal: '0',
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
    // no boxShadow key at all — elevation is border (P1)
    extend: {
      transitionDuration: { act: 'var(--dur-act)', enter: 'var(--dur-enter)' },
      transitionTimingFunction: { act: 'var(--ease-act)', enter: 'var(--ease-enter)' },
      gridTemplateColumns: { 12: 'repeat(12, minmax(0, 1fr))' },
    },
  },
  plugins: [],
}

export default config
