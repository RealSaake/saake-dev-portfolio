'use client'

import { useEffect } from 'react'

/**
 * One IntersectionObserver for the whole document (P7).
 * One-shot: unobserve on first intersection. Travel 18px, threshold 0.15.
 *
 * The `.js` class is set by an inline script in <head>, not here — by the
 * time this effect runs, hydration has happened and it would be too late.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal:not(.in)')
    const showAll = () => targets.forEach((el) => el.classList.add('in'))

    if (typeof IntersectionObserver === 'undefined') {
      showAll()
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      showAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    /**
     * IntersectionObserver does not deliver entries while the document is
     * hidden (background tab, prerender, a non-compositing embed). Without
     * this, a page opened in a background tab and then never scrolled stays
     * at opacity 0 — the content is in the DOM but invisible, which is worse
     * than having no animation at all.
     *
     * So: a deadline. If nothing has been revealed by the time it fires,
     * stop animating and just show everything.
     */
    const deadline = window.setTimeout(() => {
      if (!document.querySelector('.reveal.in')) {
        observer.disconnect()
        showAll()
      }
    }, 2000)

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        // force a fresh intersection calculation now that frames are flowing
        targets.forEach((el) => {
          if (!el.classList.contains('in')) observer.observe(el)
        })
      }
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearTimeout(deadline)
      document.removeEventListener('visibilitychange', onVisible)
      observer.disconnect()
    }
  }, [])

  return null
}
