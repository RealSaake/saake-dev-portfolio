# saake.dev

Source for [saake.dev](https://saake.dev).

The site links here as evidence, so this file describes what is actually in the
repository rather than advertising it.

## Why it was rebuilt

The previous version published claims that were not true — invented statistics,
a role at a company that does not exist, a placeholder phone number beginning
+1 (555), and a promised response time on an address that rejected mail. The
rebuild deleted those rather than correcting them, and the audit is written up
as the first case study on the site.

## Stack

Next.js App Router, TypeScript, Tailwind with the theme **overridden** rather
than extended, and four self-hosted font files. Three runtime dependencies:
`next`, `react`, `react-dom`.

Two client components exist — a theme toggle and a single IntersectionObserver
for entrance animations. Everything else is server-rendered. Every page's
content is present in the HTML with JavaScript disabled.

## Layout

```
app/          routes; each declares its own canonical
components/   primitives, shell, the two client components
content/      case studies as typed data — the only place copy lives
scripts/      build-output verification
```

## Verification

```bash
npm run check
```

Builds, then runs `scripts/verify.mjs` against `.next/server/app` — the built
HTML, not the source. It checks:

- **Fabrications.** Greps for the specific false claims the old build carried.
  The flagship case study *quotes* those claims while describing the audit, so
  the narrative is excised before the grep runs. A check whose result moves
  independently of the property under test is not a diagnostic.
- **AI tells.** Nine patterns the design system bans, matched against class
  attributes rather than prose.
- **Canonicals.** Present, unique, self-referential, no trailing slash.
- **No-JS.** Every route server-renders real content and an `<h1>`.
- **Accessibility.** `lang`, skip link, alt text, no click handlers on divs.
- **Contrast.** Recomputed from `app/globals.css` rather than trusted from a
  table. Floor is 4.5:1; the tightest pair is 4.51:1.
- **Weight.** Gzip of the scripts each page actually references.

```bash
npm run contrast
```

Prints every foreground/background ratio in both themes.

## Known limitations

The ~185 kB gzip first load is the React and App Router client runtime. This
site's own client code is under 2 kB. Reducing it further means dropping the
App Router, which has not been done.

## Local development

```bash
npm install
npm run dev
```

## License

MIT for the code. The written content and case studies are not.
