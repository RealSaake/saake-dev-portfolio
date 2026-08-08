'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * One IntersectionObserver for the whole document (P7).
 * One-shot: unobserve on first intersection. Travel 24px, threshold 0.15.
 *
 * The `.js` class is set by an inline script in <head>, not here — by the
 * time this effect runs, hydration has happened and it would be too late.
 *
 * ── Why this re-runs on every route change ──────────────────────
 *
 * `.js .reveal` is `opacity: 0`. Content is therefore invisible until
 * this component adds `.in`, which makes an unobserved `.reveal` node a
 * blank screen rather than an unanimated one.
 *
 * This component lives in the root layout, and the App Router does not
 * remount the layout on a client-side navigation. With an empty
 * dependency array the effect ran exactly once per full page load, so
 * every in-app navigation mounted a fresh set of `.reveal` nodes with
 * nothing observing them: the URL changed, the nav and the marquee
 * rendered (neither is inside a `.reveal`), and the rest of the page
 * was invisible until a manual reload remounted the layout.
 *
 * Keying the effect to the pathname rebuilds the observer for each
 * route's nodes, and re-arms the deadline below — which had also fired
 * once, on the first page, and never again.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    /**
     * Where scroll-driven animations exist, the entrance is done in
     * CSS and this component has no work to do — the stylesheet scopes
     * the observer's rules behind `@supports not (animation-timeline:
     * view())`, so adding `.in` here would match nothing anyway.
     * Bailing before constructing anything keeps ~85% of visitors from
     * paying for an observer, a timer and a listener they never use.
     */
    if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: view()')) return

    /**
     * Collected once per route, which is only sound because this app has no
     * streaming boundary: no `loading.tsx`, no `<Suspense>`, no `dynamic()`.
     * Every route's `.reveal` nodes are therefore in the DOM by the time this
     * effect runs. Add a boundary and nodes will arrive after this line,
     * unobserved and invisible — the same failure this file was fixing. A
     * MutationObserver is the answer at that point.
     */
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'))

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
     * So: a deadline. If nothing in *this* route's set has been revealed by
     * the time it fires, stop animating and just show everything.
     *
     * The check is scoped to `targets` rather than querying the document.
     * A global `.reveal.in` lookup answers "has anything anywhere ever been
     * revealed", which on a client-side navigation is the wrong question and
     * would skip the rescue on precisely the route that needed it.
     */
    const deadline = window.setTimeout(() => {
      if (!targets.some((el) => el.classList.contains('in'))) {
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
  }, [pathname])

  return null
}
