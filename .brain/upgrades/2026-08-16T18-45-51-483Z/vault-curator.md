# vault-curator

model: gpt-5.6-terra
provider: custom:hhtechapi.com
exit_code: 0


[2;3m┌─ Reasoning ──────────────────────────────────────────────────────────────────┐[0m
[2;3m**Planning codebase inspection setup**[0m
[2;3m[0m
[2;3m**Finalizing tool invocation strategy****Planning codebase inspection setup**[0m
[2;3m[0m
[2;3m**Finalizing tool invocation strategy****Planning parallel file and status search**[0m
[2;3m**Planning parallel file and status search****Inspecting agent and vault data structures**[0m
[2;3m**Inspecting agent and vault data structures****Inspecting vault structure with ripgrep**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Auditing data leak risks in JSON outputs****Inspecting vault structure with ripgrep**[0m
[2;3m[0m
[2;3m**Auditing data leak risks in JSON outputs****Inspecting vault files and build data**[0m
[2;3m**Inspecting vault files and build data****Planning non-editing inspection commands**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Designing node script comparison checks****Planning non-editing inspection commands**[0m
[2;3m[0m
[2;3m**Designing node script comparison checks****Assessing source boundary risks**[0m
[2;3m[0m
[2;3m**Investigating markdown sanitizer risks****Assessing source boundary risks**[0m
[2;3m[0m
[2;3m**Investigating markdown sanitizer risks****Verifying source note boundaries and publish flags**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Inspecting vault README and profiles****Verifying source note boundaries and publish flags**[0m
[2;3m[0m
⚠️  Reached maximum iterations (8). Requesting summary...
Brain control-plane audit report

Scope and status

- Audited `C:\Users\anubh\Downloads\Antigravity Projects\claude\site`.
- Read the modified `AGENTS.md`.
- Inspected the uncommitted worktree without deleting or editing anything.
- Verified the generated Brain snapshot, sync script, route implementations, Markdown renderer, sitemap, verifier, and representative Obsidian source notes.
- No files were modified.
- This is an audit only; no change is complete.

Worktree evidence

The repository was already substantially uncommitted:

- Modified: `AGENTS.md`, `README.md`, `app/globals.css`, `app/page.tsx`, `app/sitemap.ts`, `components/*`, `package.json`, `scripts/verify.mjs`
- Untracked: `app/brain/*`, `components/brain-explorer.tsx`, `content/brain-data.json`, `lib/*`, `scripts/sync-brain.mjs`, `scripts/brain-upgrade.mjs`, `.brain/upgrades/*`, `walkthrough.md`

The Brain implementation is therefore not yet a cleanly isolated or committed slice.

Verified build state

`npm run check` passed:

- Next build completed successfully.
- 200 static pages generated.
- 83 vault-note routes and 99 research-artifact routes were generated.
- 190 unique canonical URLs passed verification.
- Server-rendered/no-JS checks passed.
- Brain archive markers passed.
- Accessibility checks passed.
- Share-card checks passed.
- Tightest tested contrast ratio: `5.34:1`.
- Heaviest route: `195 kB` gzip against a `200 kB` ceiling.

This verifies build integrity, not source-boundary correctness.

Finding 1: High-risk privacy boundary mismatch

Evidence:

- `scripts/sync-brain.mjs:261-265` excludes only paths beginning with `Private` or `ReadOnly`.
- The actual vault contains:
  - `Private/`
  - `ReadOnly/`
  - `ReadWrite/`
- The vault’s own conventions state that `Private/` must never be accessed unless explicitly invited, while `ReadWrite/` contains working notes.
- The sync script includes all other Markdown files, including every `ReadWrite` note unless `publish: false` is present.
- The generated snapshot contains 83 published vault notes and 0 discarded notes.
- The snapshot includes `ReadWrite/01-Profile` and `ReadWrite/05-Reference/AI Learning Library/Raw Transcripts`.
- The inspected `ReadWrite/01-Profile/Finances.md` contains bank balances, Binance holdings, INDmoney holdings, client income, tax context, and relationship-linked income.
- `ReadWrite/01-Profile/Aryan (saake).md` explicitly links to `Personal Life` marked private.
- Raw transcript and source notes contain captured comments, emails, affiliate links, private/public discussion, and potentially sensitive operational material.

Risk:

The generator treats “not in `Private` or `ReadOnly`” as equivalent to “safe to publish.” The vault convention does not establish that all `ReadWrite` notes are public. A future sync can publish personal finance or other working notes simply because they lack `publish: false`.

The current `/brain` routes are statically generated and added to the sitemap, so this is not merely an internal index risk. It can become public discoverability and search-engine exposure.

Recommendation 1:

Replace the implicit exclusion model with an explicit publication allowlist or mandatory publication gate. For example:

- Only sync designated public folders, or
- Require `publish: true` for every note, with all unspecified notes excluded, or
- Add an explicit `visibility: public|internal|private` policy and fail the sync when a sensitive boundary is ambiguous.

Add a sync-time assertion that rejects known sensitive paths/content and reports the exact excluded ledger. Do not rely on the absence of `publish: false`.

Finding 2: Source-path and archive metadata are exposed publicly

Evidence:

- `content/brain-data.json` contains:
  - `vaultPath: "Z:\\obsidian\\Second Brain"`
  - `claudeRoot: "C:\\Users\\anubh\\Downloads\\Antigravity Projects\\claude"`
- Every research artifact includes an absolute `sourcePath`.
- `app/brain/research/[slug]/page.tsx:62-65` renders `item.sourcePath` directly.
- The generated research set includes `site/AGENTS.md`, `site/README.md`, `site/walkthrough.md`, `MASTER_AGENT_HANDOVER.md`, and Antigravity brain artifacts.
- The `/brain` index renders the vault and research root paths directly at `app/brain/page.tsx:140-156`.
- 99 research artifacts are included in static routes and sitemap entries.

Risk:

Absolute local paths reveal the Windows username, directory layout, project organization, and the existence of local research/agent artifacts. The research archive also turns operational documentation into crawlable public pages. Even if the content is not personally sensitive, these paths are unnecessary metadata leakage and make the public surface harder to reason about.

Recommendation 2:

Separate internal provenance from public display:

- Keep only a stable source identifier, relative logical path, or redacted source label in the public snapshot.
- Remove `vaultPath`, `claudeRoot`, and absolute `sourcePath` from public JSON and rendered pages.
- Do not automatically ingest repository management files, handovers, agent artifacts, or walkthroughs into the public research archive.
- Maintain a private audit manifest outside the public build if exact provenance is required.

Finding 3: Discoverability and link resolution are weaker than the control-plane framing suggests

Evidence:

- `components/brain-explorer.tsx:17-21` searches only title, area, folder, status, excerpt, and tags. It does not search note bodies, links, or research artifacts.
- The page advertises “Search the brain,” but the control only filters vault notes.
- Research is displayed as the first 18 items only and has no search/filter interface.
- The snapshot contains 3 links that cannot resolve against normalized note titles:
  - `The ONLY 7 Ways to Make REAL Money with AI` → `AI Income Streams`
  - `Aryan (saake)` → `Personal Life`
  - `Finances` → `Personal Life`
- The snapshot contains duplicate normalized titles:
  - `Watch Order`
  - `README`
- `lib/brain.ts:72-78` builds title-keyed maps with `Object.fromEntries`, so duplicate normalized titles overwrite one another.
- `scripts/sync-brain.mjs:159-167` extracts links as raw target strings and does not resolve them to canonical note IDs or emit unresolved-link diagnostics.

Risk:

Important knowledge is not discoverable through body search, and some Obsidian relationships silently render as missing links. Duplicate titles can resolve to the wrong page depending on ordering. This undermines backlinks and the “control plane” relationship graph while still allowing the build to pass.

Recommendation 3:

Introduce canonical source IDs and an index-quality report:

- Assign each note a stable ID based on source-relative path, not title.
- Resolve wikilinks using Obsidian-style path/title rules, including aliases and bracketed titles.
- Emit and fail or prominently report unresolved links and duplicate title collisions.
- Search body text and research artifacts, with explicit result-type filters.
- Add route-level counts for unresolved links, duplicate identities, and truncated bodies.

Stale-data and freshness risks

Evidence:

- Snapshot `generatedAt`: `2026-08-16T18:49:15.793Z`.
- 153 of 182 indexed items have no frontmatter `updated` value.
- 56 indexed bodies are truncated or at the configured cap:
  - vault note cap: 24,000 characters
  - research cap: 12,000 characters
- `app/sitemap.ts:9-10` uses a fixed `lastModified` date of `2026-08-02` for every Brain route, regardless of source `mtime` or snapshot generation.
- The UI says refresh is manual and uses the generated timestamp, but there is no freshness threshold or warning when the snapshot ages.

Risk:

The site can present a materially incomplete or stale archive while still appearing healthy. Search engines also receive incorrect modification dates. Truncation is especially consequential for raw transcripts and long research artifacts because the page looks like the source note but silently contains only a prefix.

Suggested follow-up priority

1. Fix the publication boundary before any public deployment or indexing. This is the highest-risk issue.
2. Remove absolute paths and narrow research ingestion to intentionally public artifacts.
3. Add canonical IDs, unresolved-link checks, body/research search, and freshness/truncation indicators.

Overall assessment

The generated Brain surface is build-valid and structurally functional, but its current source policy is permissive rather than privacy-safe. The largest concern is not a failed test; it is that the existing tests do not test the actual Obsidian publication contract. The current implementation should be treated as an internal prototype pending an explicit public-content allowlist and provenance redaction.
