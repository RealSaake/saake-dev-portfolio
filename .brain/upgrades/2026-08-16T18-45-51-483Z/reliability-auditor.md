# reliability-auditor

model: gpt-5.6-terra
provider: custom:hhtechapi.com
exit_code: 0


[2;3m┌─ Reasoning ──────────────────────────────────────────────────────────────────┐[0m
[2;3m**Planning skill loading for audit****Planning skill loading for audit****Planning terminal command strategy**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Confirming terminal use for git****Planning terminal command strategy**[0m
[2;3m[0m
[2;3m**Confirming terminal use for git****Planning non-editing inspection strategy****Planning non-editing inspection strategy**[0m
[2;3m**Canceling vault edit and planning inspection****Canceling vault edit and planning inspection**[0m
[2;3m**Verifying read-only environment and gitignore**[0m
[2;3m[0m
[2;3m**Investigating symlink handling and source path filtering**[0m
[2;3m[0m
[2;3m**Planning Windows drive type verification****Verifying read-only environment and gitignore**[0m
[2;3m[0m
[2;3m**Investigating symlink handling and source path filtering**[0m
[2;3m[0m
[2;3m**Planning Windows drive type verification****Inspecting model config and CLI overrides**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Verifying model pinning and environment inheritance****Inspecting model config and CLI overrides**[0m
[2;3m[0m
[2;3m**Verifying model pinning and environment inheritance****Inspecting path issues with Node commands**[0m
[2;3m[0m
[2;3m[0m
[2;3m**Assessing read-only directory inspection options**[0m
[2;3m[0m
[2;3m**Reviewing model pinning and config overrides**[0m
[2;3m[0m
[2;3m**Assessing upgrade mode and report handling**[0m
[2;3m[0m
[2;3m**Planning package lock and verification checks****Inspecting path issues with Node commands**[0m
[2;3m[0m
[2;3m**Assessing read-only directory inspection options**[0m
[2;3m[0m
[2;3m**Reviewing model pinning and config overrides**[0m
[2;3m[0m
[2;3m**Assessing upgrade mode and report handling**[0m
[2;3m[0m
⚠️  Reached maximum iterations (8). Requesting summary...
Audit report: manual brain sync and upgrade workflow

Scope and state

- Repository: `C:\Users\anubh\Downloads\Antigravity Projects\claude\site`
- Read `AGENTS.md`.
- Inspected current uncommitted changes without deleting or editing anything.
- Working tree is substantially dirty, including modified `AGENTS.md`, `README.md`, `package.json`, `scripts/verify.mjs`, and untracked `.brain/`, `content/brain-data.json`, `scripts/sync-brain.mjs`, and `scripts/brain-upgrade.mjs`.
- Both scripts pass `node --check`.
- No files were edited by this audit.

Verified evidence

1. Windows path and RaiDrive dependency

`sync-brain.mjs` defaults to:

- `Z:\obsidian\Second Brain`
- `C:\Users\anubh\Downloads\Antigravity Projects\claude`
- `C:\Users\anubh\.gemini\antigravity-ide\brain`

Evidence:

- `C:\Users\anubh\Downloads\Antigravity Projects\claude` exists.
- `C:\Users\anubh\.gemini\antigravity-ide\brain` exists.
- `Z:\obsidian\Second Brain` returned `ENOENT` from Node during this audit.

The script does not fail when a source root is unavailable. `walkFiles()` catches all `readdirSync()` errors and returns an empty list at `scripts/sync-brain.mjs:58-75`. The caller then writes a new snapshot normally.

This means a disconnected or unavailable RaiDrive mapping can produce a successful-looking sync with missing vault data. The output can be silently replaced by a partial snapshot.

The workflow also has no explicit RaiDrive identity or mount validation. It does not verify that `Z:` resolves to the expected drive, directory, volume, or current vault. There is no reparse-point, symlink, or mapped-drive safety check.

2. Sync is not read-only

The UI and README describe the process as a manual refresh, but `npm run brain:sync` writes directly to:

`content/brain-data.json`

Evidence:

- `scripts/sync-brain.mjs:9`
- `scripts/sync-brain.mjs:329-330`

The write is direct rather than atomic. A process interruption or disk failure could leave a truncated generated artifact. There is also no backup, previous-output comparison, or rollback step.

The current generated snapshot is untracked and contains:

- 83 notes
- 99 research artifacts
- vault path metadata
- absolute C-drive source paths
- absolute `.gemini` brain paths

The generated JSON includes `sourcePath` values such as:

`C:\Users\anubh\.gemini\antigravity-ide\brain\...`

Those paths are rendered by the Brain UI through `app/brain/page.tsx:115-123` and `app/brain/page.tsx:150-155`. If the generated artifact is deployed, local filesystem structure is exposed publicly.

3. Privacy boundary is incomplete

The sync script excludes vault entries whose relative path starts with `Private` or `ReadOnly` at `scripts/sync-brain.mjs:261-265`.

Failure modes:

- The check is string-prefix based, so names such as `PrivateArchive` also match unintentionally.
- The check is case-sensitive.
- It does not validate the resolved path against a canonical vault root.
- It does not protect against symlink/reparse traversal from within the mapped vault.
- Research files and Antigravity artifacts are handled through separate roots and are not subject to the same vault privacy rule.

The generated snapshot’s `privatePathHits` probe found 64 textual occurrences of `Private` or `ReadOnly`. These are not proof that private note bodies were included, but they demonstrate that privacy-related path and content strings are present in the public artifact and need explicit classification.

4. Reproducibility is weak

The output is not fully reproducible from the same source state.

Evidence:

- `generatedAt` is always set to the current time at `scripts/sync-brain.mjs:312`.
- File ordering depends on filesystem enumeration and mtime sorting.
- `walkFiles()` silently skips unreadable directories.
- Reads are capped at 240,000 bytes for vault notes and 160,000 bytes for research artifacts at `scripts/sync-brain.mjs:78-86`, `207-210`, and `235-238`.
- Only the first 120 Antigravity brain directories are scanned at `scripts/sync-brain.mjs:295-300`.
- No source manifest, file hash, tool version, Node version, or environment capture is stored.
- Environment variables can change all three source roots.

A `package-lock.json` exists, but there is no visible Node version pin such as `.nvmrc`, `.node-version`, or `volta.json`.

5. Model pinning is declarative, not enforceable

`brain-upgrade.mjs` defaults to:

- subagents: `gpt-5.6-terra`
- manager: `gpt-5.6-sol`
- provider: `custom:hhtechapi.com`

Evidence:

- Defaults at `scripts/brain-upgrade.mjs:8-11`
- Explicit CLI arguments at `scripts/brain-upgrade.mjs:33-50`
- Model/provider values are recorded in manifests and reports at `scripts/brain-upgrade.mjs:71-84`, `99-103`, and `117-120`

However, all values are overrideable through environment variables:

- `HERMES_UPGRADE_MODEL`
- `HERMES_MANAGER_MODEL`
- `HERMES_UPGRADE_PROVIDER`
- `HERMES_UPGRADE_MAX_TURNS`

Therefore the workflow can claim Terra/Sol in documentation while actually running different models if the environment is modified.

The live Hermes configuration reports:

- Default model: `gpt-5.6-sol`
- Custom provider base URL: `https://hhtechapi.com/v1`
- Provider model discovery enabled
- Both requested models listed in the catalog

No live completion probe was run for either model during this audit, so availability and actual routing are not verified. The report metadata records the requested model, not the provider’s confirmed response model.

6. Upgrade failure handling is insufficient

The upgrade runner writes reports for failed agents and continues:

- `runAgent()` resolves both non-zero exits and spawn errors rather than rejecting: `scripts/brain-upgrade.mjs:31-63`.
- `Promise.all()` collects those results and proceeds: `scripts/brain-upgrade.mjs:87-106`.
- The manager is invoked regardless of specialist exit codes: `scripts/brain-upgrade.mjs:108-121`.
- The script prints `brain upgrade pass complete` without setting a failure exit code: `scripts/brain-upgrade.mjs:141-150`.

A run with one or more failed subagents can therefore exit successfully and produce a manager brief based on missing or error text.

There is also no timeout or cancellation for hung Hermes child processes. A child can remain running indefinitely.

7. Verification gates are not actually part of `brain:upgrade`

`package.json` defines:

- `brain:sync`: sync only
- `brain:check`: sync, then `npm run check`
- `brain:upgrade`: sync, then upgrade runner

`brain:upgrade` does not run:

- `npm run check`
- `npm run contrast`
- `npm run verify:live`

The README says upgrade reports are not implementation, but the script itself does not verify the generated snapshot, build output, report completeness, or model success.

The repository’s `AGENTS.md` requires both `npm run check` and `npm run contrast`, but `brain:check` only runs `npm run check`. `contrast` is omitted from the documented combined brain gate.

Failure modes

- RaiDrive disconnect or stale mapping causes a successful sync with zero or incomplete vault notes.
- A permission error in any source directory is swallowed and treated as “no files”.
- Direct output writing can corrupt `content/brain-data.json`.
- Public deployment can expose local Windows paths and Antigravity brain identifiers.
- Environment variables can silently replace the intended GPT-5.6 models or provider.
- Provider catalog changes or model availability failures are recorded as ordinary reports instead of failing the workflow.
- A failed specialist or manager can still result in exit code 0 and “complete” output.
- A hung Hermes process can block the workflow indefinitely.
- Different filesystem ordering, mtimes, timestamps, caps, and directory limits can produce different snapshots from equivalent source content.
- The current default vault path is unavailable on this host, so a normal default `npm run brain:sync` should be treated as unsafe until the mapping is restored or the script is made fail-closed.

Three concrete recommendations

1. Make source discovery fail-closed and RaiDrive-aware.
   - Validate every configured root exists, is a directory, and resolves to the expected canonical location before scanning.
   - Treat any source read error as a hard failure.
   - Add explicit mapped-drive/reparse-point checks and a source identity record.
   - Refuse to overwrite the previous snapshot when any required root is unavailable.
   - Write through a temporary file followed by an atomic rename.

2. Enforce and verify model routing.
   - Remove unrestricted model/provider overrides from the normal production command, or require an explicit `--allow-override` path.
   - Probe the selected provider/model before starting the pass.
   - Record the actual provider response model, not only the requested CLI value.
   - Fail if any specialist or the manager exits non-zero, times out, returns empty output, or uses a model outside the permitted `gpt-5.6-terra` / `gpt-5.6-sol` family.

3. Add a deterministic verification gate and public-data scrub.
   - Generate a manifest containing source roots, file counts, hashes, tool versions, and exclusion counts.
   - Verify expected minimum source counts and reject suspicious drops from the previous snapshot.
   - Run `npm run check` and `npm run contrast` after sync before declaring the workflow successful.
   - Remove absolute `sourcePath` values and other local filesystem identifiers from shipped JSON and rendered pages.
   - Add automated tests covering unavailable RaiDrive, private-path exclusion, partial reads, failed agents, model overrides, and corrupted output prevention.

Overall assessment: the architecture is directionally clear, and the intended model defaults and privacy rules are visible in the code, but the current workflow is not fail-closed. The most serious reliability risk is that an unavailable RaiDrive source can silently generate a reduced snapshot while the command still reports success.
