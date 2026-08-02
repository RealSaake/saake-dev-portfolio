'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

/**
 * Three-state contract:
 *   localStorage.theme holds "light" | "dark" | "system"
 *   <html data-theme> always holds the RESOLVED value
 *
 * An explicit choice beats a system change — that is the case a naive
 * boolean implementation loses on the next OS theme switch.
 *
 * The unset default is 'dark', not 'system', and it has to match the
 * prepaint script in layout.tsx exactly. If this initialised to
 * 'system' while the document painted dark, the first click would
 * resolve against the wrong starting point and the theme would jump.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored === 'light' || stored === 'dark' || stored === 'system') setTheme(stored)
    } catch {
      /* localStorage disabled — fall through to the dark default */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')

    const resolve = () => {
      const light = theme === 'light' || (theme === 'system' && mq.matches)
      document.documentElement.dataset.theme = light ? 'light' : 'dark'
    }

    resolve()
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* non-fatal */
    }

    // only follow the OS while in system mode
    if (theme === 'system') {
      mq.addEventListener('change', resolve)
      return () => mq.removeEventListener('change', resolve)
    }
  }, [theme, mounted])

  const cycle = () => setTheme((t) => (t === 'dark' ? 'light' : t === 'light' ? 'system' : 'dark'))

  /* The word ("dark" / "light" / "system") is the clearest possible
   * control, but at 390px the wordmark plus three links plus a 68px
   * button overflows the row. Below `sm` the button shows a glyph and
   * the word moves into the accessible name, which is already
   * announcing the state anyway. */
  const GLYPH = { dark: '◐', light: '◑', system: '◒' } as const

  return (
    <button
      type="button"
      onClick={cycle}
      className="label border border-rule px-2 py-2 transition-colors duration-act hover:border-accent-edge hover:text-accent-text sm:px-3"
      aria-label={`Theme: ${theme}. Activate to change.`}
    >
      <span aria-hidden="true" className="sm:hidden">
        {mounted ? GLYPH[theme] : '◐'}
      </span>
      <span aria-hidden="true" className="hidden sm:inline">
        {mounted ? theme : 'theme'}
      </span>
    </button>
  )
}
