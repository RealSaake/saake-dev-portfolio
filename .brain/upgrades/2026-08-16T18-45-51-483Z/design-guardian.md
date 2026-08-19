# design-guardian

model: gpt-5.6-terra
provider: custom:hhtechapi.com
exit_code: 0


[2;3m┌─ Reasoning ──────────────────────────────────────────────────────────────────┐[0m
[2;3m**Inspecting agent status and codebase****Inspecting agent status and codebase****Planning parallel brain file inspection**[0m
[2;3m**Planning parallel brain file inspection****Planning CSS and route inspection****Planning CSS and route inspection**[0m
[2;3m**Planning exploratory UI inspection****Planning exploratory UI inspection****Planning serialized build, check, and contrast tasks**[0m
[2;3m**Planning serialized build, check, and contrast tasks****Starting local development server**[0m
⚠️  Reached maximum iterations (8). Requesting summary...
## Brain UI audit report

Scope: read `AGENTS.md`, inspected the uncommitted Brain implementation and surrounding design system, and ran the required production gates. No files were edited.

Verified gates
- `npm run check`: passed. Next production build compiled, TypeScript passed, 200 static pages generated, output verifier passed.
- `npm run contrast`: passed. Tightest audited token pair is `--muted-2` on light paper at 5.34:1.
- The heaviest first-load route is 195 kB gzip against the repository’s 200 kB ceiling. This passes, but leaves only 5 kB headroom.
- I was not able to complete live browser/screenshot review before the tool-iteration limit; the findings below are grounded in source and production build output, with responsive items explicitly marked as risks rather than observed visual defects.

## Findings

### Medium: Archive-route exemptions weaken the stated verification standard
`scripts/verify.mjs` excludes every `/brain` route from the fabrication scanner, AI-tell scanner, and heading-order check. The only Brain-specific assertion is that built HTML contains `data-brain-archive`. That attribute is not a visible archive label to visitors, and the current UI presents the Brain as a normal primary-nav destination.

This creates a different quality bar for the newly public surface despite `AGENTS.md` requiring readable, accessible pages and truth-integrity safeguards. The exemption is understandable for preserved research, but it is too broad for the Brain index, cards, metadata, and public note framing. Evidence: `scripts/verify.mjs` archive exclusions around sections 1, 2, and 5; archive marker assertion in section 5b; `/brain` added to primary navigation in `components/shell.tsx:6-11`.

### Medium: Raw Markdown heading depth can produce visually unstructured sections and is not verified
The custom Markdown renderer deliberately shifts source `#` headings to rendered `h2`, but preserves deeper source levels through `h6`. Brain typography provides explicit spacing and sizing only for `.brain-prose h1`, `h2`, and `h3`; `h4` through `h6` receive no Brain-specific rhythm. The archive heading-order verifier is disabled, so raw imported documents can introduce level skips and lower-level headings that visually collapse into body-like content or inherit inconsistent global styling.

Evidence: `lib/markdown.ts` renders levels through `h6`; `app/globals.css:1175-1178` styles only Brain prose headings through `h3`; `scripts/verify.mjs` explicitly bypasses Brain heading-order enforcement.

### Medium: The UI exposes local filesystem topology as visitor-facing content
The index renders `brain.vaultPath` and `brain.claudeRoot`; research detail pages render each `item.sourcePath`. These values are absolute local Windows paths, including `C:\Users\anubh` and repository structure. This is not only unnecessary implementation disclosure but also visually conflicts with the site’s deliberate, visitor-facing portfolio language. It makes a curated knowledge surface read as an internal diagnostic screen.

Evidence: `app/brain/page.tsx:140-156`; `app/brain/research/[slug]/page.tsx:61-65`; values originate in `scripts/sync-brain.mjs`.

### Low: Opening-language contradiction reduces information trust
The Brain kicker says “Manual refresh, live knowledge,” while the supporting text correctly says content does not change until `npm run brain:sync` is run. “Live” implies automatic/current synchronization; “manual refresh” and the actual data model describe a generated snapshot. This is a small copy issue, but the Brain’s core promise is traceability, so precision matters.

Evidence: `app/brain/page.tsx:35-44`.

## Responsive and system risks

- At widths from 481px to 900px, six statistics render as a two-column, three-row block; at 480px they abruptly become a six-row single column. This is structurally safe but creates a significant density and page-length jump near a common mobile breakpoint. Evidence: `app/globals.css:1137,1195-1205`.
- The research list uses five columns above 900px, including a fixed 120px kind column plus title, path, excerpt, and action. Around the 901-1024px tablet range, the path and excerpt columns become narrow enough to create tall, irregular rows. Below 900px it switches to one column, so the awkward range is specifically the just-above-breakpoint layout. Evidence: `app/globals.css:1160,1195-1199`.
- The Brain index includes 83 notes in the client-side `BrainExplorer`. It does server-render complete no-JS content, which is correct, but then hydrates a filter component over the entire note collection. The current route budget passes only narrowly at 195 kB gzip; adding sorting, tag facets, highlighting, or richer cards without budget enforcement could cross the hard ceiling. Evidence: `components/brain-explorer.tsx:1-63`; build output.
- Search is functional but has no empty-result state beyond “0 of 83 notes”; after filtering, the page presents an empty grid with no recovery affordance or explanation. This is a UX resilience risk, particularly on mobile where the filter consumes a high proportion of the viewport. Evidence: `components/brain-explorer.tsx:38-60`.

## Three concrete recommendations

1. Replace broad Brain exclusions with archive-aware verification. Keep raw-document allowances only for imported prose, but require the Brain index, cards, metadata, and route chrome to pass the standard fabrication, AI-tell, heading, and semantic checks. Add a visible “archive snapshot” label, synced timestamp, and provenance statement rather than relying on `data-brain-archive` alone.

2. Establish a constrained archive typography contract. Normalize imported heading levels relative to the document `h1`, or style and test `h2` through `h6` with consistent spacing, hierarchy, and mobile sizes. Add a build-output test that detects invalid heading jumps within rendered Brain prose unless an explicit documented exception is present.

3. Replace absolute machine paths and engine labels with visitor-relevant provenance. Show a stable source category such as “Obsidian vault snapshot” or “Research archive,” retain relative document paths only where useful, and move local source paths plus SOL/TERRA operational details to non-public build metadata or an internal handover. At the same time, convert the research list to a two- or three-column tablet layout before 1024px and add a clear no-results state to search.

Audit status: verification is green, but I would not treat the Brain UI as design-system-ready until the verification-scope, raw-heading, provenance, and tablet-density issues are addressed.
