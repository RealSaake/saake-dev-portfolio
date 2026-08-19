# SAAKE.DEV — GitHub & Vercel Cleanup

> **Purpose:** Exact actions for every repo on RealSaake's GitHub profile and every Vercel project. The executing agent runs through this list top to bottom.
> **GitHub profile:** https://github.com/RealSaake
> **Prerequisite:** `gh auth status` must show authenticated as RealSaake.

---

## Phase 1: Delete Dead Repos

These repos are empty, ancient, or actively embarrassing. Delete them immediately.

```bash
# Run these commands one by one, confirming each deletion
gh repo delete RealSaake/saake.dev --yes          # Empty duplicate of the portfolio
gh repo delete RealSaake/Portfolio --yes           # 2022 relic, no content
gh repo delete RealSaake/anubhavaryan --yes        # 2022 profile README, outdated
gh repo delete RealSaake/JSGames --yes             # "My first JS App" from 2022
gh repo delete RealSaake/saake --yes               # Empty repo from 2022
gh repo delete RealSaake/Reelch --yes              # "Redefining Web" — empty CSS project
gh repo delete RealSaake/CryptoDad --yes           # Empty from 2022
gh repo delete RealSaake/aicluster --yes           # Empty repo
```

**Total: 8 repos deleted.**

### Before deleting: check if any of these have content you want to preserve
```bash
# Quick check — if any of these show non-trivial file counts, investigate before deleting
for repo in saake.dev Portfolio anubhavaryan JSGames saake Reelch CryptoDad aicluster; do
  echo "=== $repo ==="
  gh api repos/RealSaake/$repo --jq '.size' 2>/dev/null
done
```
If `.size` is > 100 KB for any of them, clone and inspect before deleting.

---

## Phase 2: Archive/Privatize Niche Repos

These repos have real content but don't belong on a professional portfolio profile.

```bash
# Make private (removes from public profile without deleting)
gh repo edit RealSaake/esp32-home-automation --visibility private
gh repo edit RealSaake/valentines-game --visibility private
```

**`esp32-home-automation`:** Real project with description ("Complete ESP32 Home Automation System with Firebase Integration"). Niche but legitimate. Keep private — could be made public later if IoT becomes part of the portfolio.

**`valentines-game`:** HTML game, cute but not portfolio material. Keep private.

---

## Phase 3: Remove Forks

```bash
gh repo delete RealSaake/copyparty --yes    # Forked file server — not Aryan's work
```

---

## Phase 4: Evaluate Sentinal

```bash
# Clone and inspect
gh repo clone RealSaake/sentinal "C:/Users/anubh/Projects/_audit/sentinal"
cd "C:/Users/anubh/Projects/_audit/sentinal"
find . -not -path './.git/*' -type f | head -30
cat README.md 2>/dev/null
```

**Decision tree:**
- If it has meaningful Python code and a clear purpose → Clean up README, keep public
- If it's a half-finished experiment → Make private or delete
- If it's related to any of the 5 featured projects → Incorporate into that project's narrative

---

## Phase 5: Clean Up Featured Repos

### 5A. `saake-dev-portfolio`
**Action:** This is the main site repo. No deletion, just ensure it's clean.
```bash
cd "C:/Users/anubh/Downloads/Antigravity Projects/claude/site"
# Check for sensitive files that shouldn't be public
git log --all --oneline | grep -i "key\|secret\|token\|password\|credential" | head -10
# Check for large files that shouldn't be in git
git rev-list --objects --all | git cat-file --batch-check='%(objectname) %(objecttype) %(objectsize) %(rest)' | awk '$3 > 1048576 {print}' | head -10
```

**Update the repo description on GitHub:**
```bash
gh repo edit RealSaake/saake-dev-portfolio --description "Personal portfolio — saake.dev" --homepage "https://saake.dev"
```

### 5B. `waveline`
**Action:** Will be rebuilt (see `PROJECT_REBUILDS.md`). For now, update description:
```bash
gh repo edit RealSaake/waveline --description "Real-time audio visualization with Web Audio API and Canvas" --homepage "https://waveline.vercel.app"
```

### 5C. `LoveQuest`
**Action:** Will be cleaned up (see `PROJECT_REBUILDS.md`). For now, update description:
```bash
gh repo edit RealSaake/LoveQuest --description "Private relationship companion — daily quests, encrypted voice memos, shared virtual garden"
```

### 5D. `SkillBridge`
**Action:** Will be reskinned (see `PROJECT_REBUILDS.md`). For now, update description:
```bash
gh repo edit RealSaake/SkillBridge --description "Open-source peer mentorship platform with structured sessions and progress tracking" --homepage "https://skillbridgev1.vercel.app"
```

---

## Phase 6: GitHub Profile README

After cleanup, the profile should have these public repos:
1. `saake-dev-portfolio` — The portfolio site
2. `SkillBridge` — Main featured project
3. `LoveQuest` — Personal project
4. `waveline` — Audio visualization
5. `sentinal` — (if kept)

**Create/update profile README (`RealSaake/RealSaake`):**

If the `anubhavaryan` repo was the profile README, create a new one:
```bash
gh repo create RealSaake/RealSaake --public --description "GitHub profile" --clone
```

Write a minimal `README.md`:
```markdown
### Saake

Systems architect and AI infrastructure builder based in India.

Building autonomous workflows, real-time applications, and tools that run themselves.

→ [saake.dev](https://saake.dev)
```

No badges, no stats widgets, no "currently learning" lists. Just a clean pointer to the portfolio.

---

## Phase 7: Vercel Cleanup

```bash
# List all Vercel projects (requires vercel CLI authenticated)
npx vercel ls 2>/dev/null
```

**Actions:**
- Keep: `saake-dev-portfolio` (saake.dev deployment)
- Keep: `waveline` (waveline.vercel.app — will be rebuilt)
- Keep: `skillbridgev1` (skillbridgev1.vercel.app — will be reskinned)
- Delete: Any other dead/test deployments

```bash
# Remove dead Vercel projects (replace with actual project names from `vercel ls`)
# npx vercel remove <project-name> --yes
```

**Important:** Before deleting any Vercel project, check if it has a custom domain attached. Don't accidentally break a live domain.

---

## Phase 8: Pin Featured Repos

After cleanup, pin the repos that matter on the GitHub profile:

1. Go to https://github.com/RealSaake
2. Click "Customize your pins"
3. Pin (in order):
   - `saake-dev-portfolio`
   - `SkillBridge`
   - `LoveQuest`
   - `waveline`

This gives visitors the exact repos that matter, in the order that tells the best story.

---

## Post-Cleanup Verification

```bash
# Verify the public profile looks clean
gh api users/RealSaake/repos --jq '.[].name' | sort
# Should show only: LoveQuest, RealSaake, saake-dev-portfolio, sentinal (maybe), SkillBridge, waveline

# Verify no sensitive data in commit history of remaining repos
for repo in saake-dev-portfolio waveline LoveQuest SkillBridge; do
  echo "=== Checking $repo ==="
  gh api "repos/RealSaake/$repo/commits?per_page=5" --jq '.[].commit.message' 2>/dev/null
done
```

**Critical check for LoveQuest:** The repo had a hardcoded Gemini API key committed (commit message: "Remove hardcoded Gemini API key, delete unused GoogleDriveStorage"). Even though it was removed in a later commit, **the key is still in git history.** If that key is still active:
1. Revoke the key immediately in Google AI Studio
2. Consider using `git filter-branch` or BFG Repo-Cleaner to purge it from history
3. Force push the cleaned history

```bash
# Check if the key is in history
cd "C:/Users/anubh/Projects/_audit/LoveQuest"  # clone first
git log --all --diff-filter=D --summary | grep -i "key\|api\|secret" | head -10
```
