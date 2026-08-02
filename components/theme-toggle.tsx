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
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored === 'light' || stored === 'dark' || stored === 'system') setTheme(stored)
    } catch {
      /* localStorage disabled — fall through to system */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const resolve = () => {
      const dark = theme === 'dark' || (theme === 'system' && mq.matches)
      document.documentElement.dataset.theme = dark ? 'dark' : 'light'
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

  const cycle = () => setTheme((t) => (t === 'light' ? 'dark' : t === 'dark' ? 'system' : 'light'))

  return (
    <button
      type="button"
      onClick={cycle}
      className="label border border-rule px-3 py-2 transition-colors duration-act hover:border-accent-edge"
      aria-label={`Theme: ${theme}. Activate to change.`}
    >
      {mounted ? theme : 'theme'}
    </button>
  )
}
