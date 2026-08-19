'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') setTheme(stored)
    } catch {
      // The dark default remains usable when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Theme still applies for the current page.
    }
  }, [theme, mounted])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="theme-switch"
      aria-label={`Use ${next} theme`}
      title={`Use ${next} theme`}
    >
      <span className="theme-switch__icon" aria-hidden="true">
        {mounted && theme === 'light' ? '☀' : '◒'}
      </span>
      <span className="theme-switch__label" aria-hidden="true">
        {mounted ? theme : 'dark'}
      </span>
    </button>
  )
}
