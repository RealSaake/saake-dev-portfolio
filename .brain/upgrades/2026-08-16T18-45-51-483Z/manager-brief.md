# Manager upgrade brief

model: gpt-5.6-sol
provider: custom:hhtechapi.com
exit_code: 0


[2;3m┌─ Reasoning ──────────────────────────────────────────────────────────────────┐[0m
[2;3m**Loading relevant skills and inspecting repo**[0m
[2;3m[0m
[2;3m**Loading codebase-inspection and review skills****Loading relevant skills and inspecting repo**[0m
[2;3m[0m
[2;3m**Loading codebase-inspection and review skills****Inspecting AGENTS package and scripts**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Planning read-only codebase inspection****Inspecting AGENTS package and scripts**[0m
[2;3m[0m
[2;3m**Planning read-only codebase inspection****Planning read-only repo inspections**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Planning read-only node inspections and skill loading**[0m
[2;3m[0m
[2;3m**Confirming codebase-inspection skill loading****Planning read-only repo inspections**[0m
[2;3m[0m
[2;3m**Planning read-only node inspections and skill loading**[0m
[2;3m[0m
[2;3m**Confirming codebase-inspection skill loading****Planning node script validation approach**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Verifying build and source integrity without edits**[0m
[2;3m[0m
[2;3m**Planning node command for file inspection**[0m
[2;3m[0m
[2;3m**Fixing regex and syntax errors****Planning node script validation approach**[0m
[2;3m[0m
[2;3m**Verifying build and source integrity without edits**[0m
[2;3m[0m
[2;3m**Planning node command for file inspection**[0m
[2;3m[0m
[2;3m**Fixing regex and syntax errors****Inspecting shell navigation conditionals**[0m
[2;3m[0m
[2;3m**Verifying private brain build and environment gating**[0m
[2;3m[0m
[2;3m**Assessing data boundary and ignore rules****Inspecting shell navigation conditionals**[0m
[2;3m[0m
[2;3m**Verifying private brain build and environment gating**[0m
[2;3m[0m
⚠️  Reached maximum iterations (8). Requesting summary...
**Saake.dev Brain Upgrade Brief**

Scope: read all three `gpt-5.6-terra` audit reports, inspect the current repository and generated snapshot, and run the existing verification gate. No files were edited.

Manager context: `gpt-5.6-sol` via `custom:hhtechapi.com`.

## Executive Assessment

The Brain surface is structurally build-valid, but it is not ready for public deployment or indexing.

The highest-risk issue is the publication boundary: the sync script treats anything outside `Private` and `ReadOnly` as publishable. The current snapshot contains `ReadWrite` material including financial information and raw transcripts. The second major issue is fail-open synchronization: an unavailable `Z:` vault can produce a successful-looking reduced snapshot.

The smallest sensible next implementation slice is:

> Make Brain sync fail closed and publish only explicitly approved content, while redacting all absolute local paths from the generated public snapshot.

This should happen before further UI polish, search improvements, or richer Brain features.

## Verified

### 1. Existing production checks pass

Verified by a fresh `npm run check` run:

- Next production build completed.
- TypeScript passed.
- Static generation completed.
- Repository verifier passed.
- No-JS checks passed.
- Accessibility checks passed.
- Share-card checks passed.
- Contrast passed at a tightest measured ratio of `5.34:1`.
- Heaviest measured route was `195 kB` gzip against a `200 kB` ceiling.

This verifies build integrity, not publication safety.

### 2. The working tree is substantially dirty

Current state includes:

- Modified: `AGENTS.md`, `README.md`, `app/globals.css`, `app/page.tsx`, `app/sitemap.ts`, `components/*`, `package.json`, `scripts/verify.mjs`
- Untracked: `app/brain/*`, `components/brain-explorer.tsx`, `content/brain-data.json`, `lib/*`, `scripts/sync-brain.mjs`, `scripts/brain-upgrade.mjs`, `scripts/private-brain-check.mjs`, `.brain/*`, `walkthrough.md`

The Brain work is not an isolated committed slice.

### 3. The generated snapshot contains unsafe public metadata

Current `content/brain-data.json` contains:

- `83` notes
- `99` research artifacts
- `0` discarded notes
- `vaultPath: Z:\obsidian\Second Brain`
- `claudeRoot: C:\Users\anubh\Downloads\Antigravity Projects\claude`
- `99` records with absolute Windows paths in the generated research data

The UI renders these values in:

- `app/brain/page.tsx:153-158`
- `app/brain/research/[slug]/page.tsx:63-67`

### 4. Publication filtering is permissive

`scripts/sync-brain.mjs:261-265` excludes only paths beginning with `Private` or `ReadOnly`.

The same script publishes notes when `publish !== false` at `scripts/sync-brain.mjs:213`.

The generated snapshot demonstrably includes `ReadWrite` content, including raw transcripts. The audit specifically identified `ReadWrite/01-Profile/Finances.md` as containing balances, investments, income, tax context, and relationship-linked income.

This conflicts with the repository’s own claim in `AGENTS.md` that private content is excluded and that unpublished notes are tracked in a discard ledger. The current snapshot’s discarded count is zero.

### 5. Source availability can fail silently

`scripts/sync-brain.mjs:58-75` catches directory-read errors and returns an empty list.

The configured default vault is:

`Z:\obsidian\Second Brain`

The audit reported that this path returned `ENOENT`. Therefore a disconnected or unavailable mapped drive can generate a reduced snapshot instead of failing.

The script then writes directly to `content/brain-data.json` at `scripts/sync-brain.mjs:329-330`, without atomic replacement or rollback protection.

### 6. Link identity is title-based and currently lossy

Current snapshot inspection found:

- Duplicate normalized title: `Watch Order`
- Duplicate normalized title: `README`, appearing three times
- Three unresolved links:
  - `AI Income Streams`
  - `Personal Life`
  - `Personal Life`

`lib/brain.ts:100-106` builds link maps keyed by normalized title, so duplicate titles can overwrite one another.

### 7. Brain verification is intentionally exempted from several checks

`scripts/verify.mjs` excludes `/brain` routes from:

- Fabrication scanning
- AI-tell scanning
- Heading-order enforcement

The only Brain-specific assertion is the presence of `data-brain-archive`.

This is reasonable for raw imported documents in principle, but the exemption currently also covers the Brain index, metadata, cards, and route chrome.

### 8. Model routing is declarative rather than enforced

`scripts/brain-upgrade.mjs:8-11` defaults to:

- Specialist agents: `gpt-5.6-terra`
- Manager: `gpt-5.6-sol`
- Provider: `custom:hhtechapi.com`

However, environment variables can override these values:

- `HERMES_UPGRADE_MODEL`
- `HERMES_MANAGER_MODEL`
- `HERMES_UPGRADE_PROVIDER`
- `HERMES_UPGRADE_MAX_TURNS`

The reports record requested values, not confirmed provider response models.

### 9. Upgrade failures do not fail the workflow

`scripts/brain-upgrade.mjs:31-63` resolves failed child processes instead of rejecting.

`scripts/brain-upgrade.mjs:87-121` proceeds to manager synthesis regardless of specialist failures.

`scripts/brain-upgrade.mjs:141-150` prints completion without setting a failure exit code.

A failed specialist, failed manager, empty report, or hung process can therefore produce a superficially successful upgrade pass.

## Recommended

Ranked by user value, confidence, and risk:

| Rank | Recommendation | User value | Confidence | Implementation risk |
|---|---|---:|---:|---:|
| 1 | Replace implicit exclusions with an explicit publication allowlist or mandatory `publish: true` gate | Very high | Very high | Medium |
| 2 | Make sync fail closed when any required source is unavailable or unreadable | Very high | Very high | Medium |
| 3 | Remove absolute paths and internal agent metadata from public JSON and rendered pages | Very high | Very high | Low |
| 4 | Write snapshots atomically and preserve the previous valid snapshot on failure | High | High | Low |
| 5 | Add source manifests, minimum-count/drop detection, hashes, and exclusion ledgers | High | High | Medium |
| 6 | Make `brain:upgrade` fail on failed, empty, timed-out, or incorrectly routed agents | High | High | Medium |
| 7 | Add canonical IDs based on source-relative paths and report duplicate titles/unresolved links | High | High | Medium |
| 8 | Add body and research search, plus an explicit no-results state | Medium | High | Low |
| 9 | Tighten Brain verification so index/chrome/metadata pass normal checks while raw documents retain documented exceptions | Medium | High | Medium |
| 10 | Fix tablet research density and normalize imported heading typography | Medium | Medium | Low |
| 11 | Replace “Manual refresh, live knowledge” with precise snapshot language | Low | High | Very low |
| 12 | Add freshness and truncation indicators | Medium | High | Low |

## Pending

These require a deliberate product decision or additional validation:

- Which vault folders are genuinely intended for public publication?
- Whether the Brain is meant to be public, private, preview-only, or deployment-gated.
- Whether raw research transcripts should ever be public.
- Whether `ReadWrite` means editable/internal or public.
- What minimum source count should cause a sync failure.
- Whether the existing `Z:` mapping should remain a required source or be replaced with a stable local/exported source.
- Whether imported Markdown heading levels should be normalized or preserved.
- Whether Brain archive pages should be included in the sitemap at all.
- Actual live browser/screenshot review: the design audit did not complete visual browser verification.
- Actual provider-response verification for `gpt-5.6-sol` and `gpt-5.6-terra`: the reports recorded requested routing but did not perform a live completion probe.

## Blocked

The following should block public deployment or indexing:

1. **Publication boundary**
   The current sync policy can publish sensitive `ReadWrite` notes.

2. **Unavailable vault behavior**
   A missing or disconnected `Z:` source can silently produce incomplete content and overwrite the snapshot.

3. **Absolute-path leakage**
   The generated public data exposes the Windows username, drive layout, repository paths, and `.gemini` research paths.

4. **Unverified public data policy**
   The repository currently has no enforced distinction between public, internal, and private source material.

5. **Unreliable upgrade success signal**
   `brain:upgrade` can report completion after specialist or manager failure.

## Smallest Next Implementation Slice

Implement one bounded data-safety slice before touching the UI:

1. Require explicit publication approval, preferably `publish: true`, for vault notes.
2. Fail if the configured vault root or required research roots are unavailable.
3. Treat read errors as failures rather than empty directories.
4. Redact `vaultPath`, `claudeRoot`, and `sourcePath` from shipped data.
5. Write the generated snapshot to a temporary file and atomically replace the existing snapshot only after all checks pass.
6. Add tests or executable assertions for:
   - Missing vault root
   - Sensitive `ReadWrite` note exclusion
   - Absolute-path absence
   - Zero/abnormally reduced source counts
   - Preservation of the previous snapshot after failure

Acceptance condition:

> A failed or ambiguous sync must exit non-zero and leave the previous valid snapshot untouched; a successful snapshot must contain only explicitly approved content and no machine-specific paths.

No implementation was performed in this pass, consistent with the read-only instruction.
