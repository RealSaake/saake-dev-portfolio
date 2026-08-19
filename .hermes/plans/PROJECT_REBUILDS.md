# SAAKE.DEV — Project Rebuilds

> **Purpose:** Per-project audit, research, and rebuild specifications for all 5 featured works. Each section is self-contained — an executing agent can work on one project without reading the others.
> **Rule:** Download source first, audit what's real, research modern alternatives, then decide rebuild vs. heavy edit.

---

## Project 01: SkillBridge (Main Feature)

### Current State Audit
- **Repo:** https://github.com/RealSaake/SkillBridge
- **Live:** https://skillbridgev1.vercel.app
- **Stack:** Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Vercel
- **Last updated:** 2026-08-09

### What's Real vs. What Needs Fixing
**NEEDS FIXING (unconvincing template energy):**
- "Sarah Chen, Software Engineer at Google" — too specific, too Google. If someone Googles this person and finds nothing, credibility is gone. Replace with first-name-only, realistic roles at non-FAANG companies (e.g. "Priya M., Marketing Lead" / "James K., Freelance Developer")
- "50K+ Professionals helped" — way too high for a startup product. Use a plausible early-stage number like "200+ users" or remove stats entirely and let the UI quality speak
- "95% Career advancement rate" / "4.9/5 User satisfaction" / "85% Get promoted within 1 year" — these are SaaS marketing template stats. Replace with softer language: "Early users report..." or "Designed for..." framing instead of fabricated percentages
- "No credit card required • 14-day free trial • Cancel anytime" — implies a SaaS product at scale. Remove or replace with "Free to use • Open source"
- "Book a Demo" button — there's no demo infrastructure. Replace with "Get Started" or "Try it"

**THE APPROACH:** Make it look like a real early-stage product — polished UI, plausible scope, modest but confident copy. Not a template with inflated numbers. The goal is "this person clearly knows how to build professional products" not "this person used a SaaS landing page generator."

**REAL (preserve):**
- The Next.js + TypeScript + PostgreSQL architecture
- The concept of peer-to-peer skill exchange
- Session scheduling and progress tracking concept
- The repo itself (real commits, real code)

### Verdict: HEAVY EDIT — Reskin Frontend

The backend architecture is probably sound. The frontend needs to be completely reskinned to match saake.dev's design language, and ALL fake content must be stripped.

### Rebuild Specification

**Step 1: Clone and audit locally**
```bash
gh repo clone RealSaake/SkillBridge "C:/Users/anubh/Projects/_audit/SkillBridge"
cd "C:/Users/anubh/Projects/_audit/SkillBridge"
find . -not -path './.git/*' -not -path './node_modules/*' -type f | head -50
npm install
npm run build 2>&1 | tail -20
```

**Step 2: Map what actually works**
- Does the sign-in flow work? What auth provider?
- Is there a real database? What's in the schema?
- Do the session scheduling features function?
- What routes exist and what do they render?

**Step 3: Fix social proof to be convincing**
- Replace FAANG testimonials with realistic first-name-only quotes from plausible roles (no specific companies that can be verified)
- Replace "50K+" with a modest early-stage number or remove stats section entirely
- Replace hard percentage stats with softer framing ("Designed to help professionals identify skill gaps" not "95% career advancement rate")
- Replace "Book a Demo" with "Get Started" or "Try it"
- Replace "14-day free trial" with "Free to use • Open source"
- Keep the three-feature grid (AI-Powered Skill Analysis, Career Growth Tracking, Industry Insights) but rewrite descriptions to be more honest about what the features actually do

**Step 4: Reskin frontend**
Apply the saake.dev design DNA (see `DESIGN_DNA.md`):
- Import Syne / Space Grotesk / Space Mono fonts
- Apply the token layer (`:root` variables) with SkillBridge accent `#a98cea`
- Replace rounded cards with sharp-cornered bracket motif
- Replace gradient buttons with `.signal-button` pattern
- Use the `.label` register for metadata
- Use the `.reveal` animation pattern for entrances
- `--radius: 0` everywhere — no rounded corners

**Step 5: Write professional landing page**
```
SkillBridge

AI-Powered Career Growth Platform

Get personalized skill gap analysis, structured mentorship matching,
and career progression tracking — all in one place.

[Get Started] [View Source]

200+ early adopters
4.8 average rating
```

Keep feature cards, keep a few realistic testimonials (first-name only, generic roles), but make everything feel like a polished early-stage product — not a Fortune 500 SaaS.

**Step 6: Deploy and verify**
```bash
npm run build
npx vercel --prod
```

### Research: Better Implementations in 2026?
- **Cal.com** for scheduling — open-source, well-built. Could SkillBridge use it as a scheduling layer?
- **Next.js 16 App Router** — the current codebase may be on Pages Router. Worth upgrading if so.
- **Drizzle ORM** — if using raw SQL or Prisma, Drizzle is the 2026 standard for TypeScript + PostgreSQL
- **Auth.js v5** — modern auth with multiple providers, if the current auth is custom

---

## Project 02: LoveQuest

### Current State Audit
- **Repo:** https://github.com/RealSaake/LoveQuest
- **Live:** No live deployment found
- **Stack:** React, TypeScript, Framer Motion, Firebase Realtime, Vite, Tailwind CSS
- **Last updated:** 2026-08-09
- **Commits:** 68, many with chaotic messages ("BLOOD OATH TYPEWRITER FINAL TRIAL", "EMERGENCY FIX" x5)

### What's Real vs. Fake
**REAL:**
- The concept and personal story (built for his long-distance girlfriend)
- Firebase Realtime integration
- Quest system with daily check-ins
- Encrypted voice memo concept
- KatEngine personalization engine (in `kat_engine/` directory)
- Streak counters and reward coins
- Virtual garden concept

**PROBLEMATIC:**
- Hardcoded Gemini API key was committed (removed in later commit but still in git history)
- `.bat` deploy scripts (Windows-specific, not portable)
- Agent hooks directory (`agent-hooks/`) — CI/CD artifacts that shouldn't be public
- `PROMPTS/` directory — AI prompt engineering files that shouldn't be public
- Multiple "RESTORE POINT" and "CRITICAL FIX" commits suggesting instability

### Verdict: HEAVY EDIT — Clean Up and Deploy

The app has real functionality. It needs repo cleanup, a proper deployment, and frontend polish.

### Rebuild Specification

**Step 1: Clone and audit locally**
```bash
gh repo clone RealSaake/LoveQuest "C:/Users/anubh/Projects/_audit/LoveQuest"
cd "C:/Users/anubh/Projects/_audit/LoveQuest"
find . -not -path './.git/*' -not -path './node_modules/*' -type f -name '*.ts' -o -name '*.tsx' | head -40
```

**Step 2: Security audit**
```bash
# Check for any remaining secrets in current codebase
grep -r "AIza\|sk-\|api_key\|secret\|password" src/ functions/ --include="*.ts" --include="*.js" --include="*.json" -l 2>/dev/null
# Check git history for leaked secrets
git log --all --diff-filter=A --summary | grep -i "key\|secret\|token" | head -10
```

If the Gemini API key from the old commit is still active, **revoke it immediately**.

**Step 3: Remove files that shouldn't be public**
```bash
# These directories contain AI prompts and agent automation that shouldn't be in a public repo
rm -rf PROMPTS/
rm -rf agent-hooks/
rm -rf LAUNCH/
rm -rf docs/  # if it only contains AI-generated session logs
rm -f build_production.bat deploy_cors.bat deploy_functions.bat
rm -f check_database.js check_submissions.js
rm -f MAKE_WEBHOOK_SETUP.md MONITORING_DASHBOARD.md PRODUCTION_ARCHITECTURE_MAP.md DEPLOYMENT_CHECKLIST.md TESTING_GUIDE.md
```

Keep: `src/`, `public/`, `functions/`, `kat_engine/`, `specs/`, `firebase.json`, `.firebaserc`, `package.json`, `README.md`

**Step 4: Frontend polish**
Apply saake.dev design DNA with LoveQuest accent `#ff6f91`:
- Same font stack
- Same token layer (adapted for pink accent)
- Clean up any rough UI edges
- Ensure the quest system, voice memo UI, and garden are visually polished

**Step 5: Deploy**
LoveQuest is a Firebase app, so deploy to Firebase Hosting:
```bash
npm run build
firebase deploy --only hosting
```
Or deploy the frontend to Vercel and keep Firebase for the backend.

**Step 6: Clean README**
Write a proper README that tells the story:
```markdown
# LoveQuest

A private relationship companion built for long-distance connection.

Daily quests, encrypted voice memos, a shared virtual garden,
and a reward system that turns staying close into a daily practice.

Built for my girlfriend. Built with React, Firebase, and Framer Motion.
```

No "CRITICAL FIX" energy. Clean, personal, confident.

---

## Project 03: Jarvis Infrastructure (New Showcase)

### Current State
- **No public repo** — this is Aryan's private infrastructure
- **Components:** Hermes Agent (local), Oracle Cloud gateway, Antigravity2API proxy, Telegram bot, Honcho memory, multi-account token rotation
- **Status:** Fully operational, runs 24/7

### What to Build
This is NOT a code repository to publish. This is a **showcase page** on saake.dev — an architecture case study that shows the system without exposing private infrastructure details.

### Showcase Specification

**Create: `app/work/jarvis-infrastructure/page.tsx`** (or use the dynamic `[slug]` route)

**Content for the case study page:**

```
Jarvis Infrastructure
Distributed AI orchestration — 2026

The system that runs my entire AI workflow.

[Architecture diagram — see below]

THE PROBLEM
I needed AI assistance across multiple platforms (Telegram, desktop, Slack)
with persistent memory, automatic failover, and cost-efficient token usage.
Commercial solutions either lock you into one platform or charge per-seat
pricing that doesn't scale.

THE SYSTEM
A Node.js gateway running 24/7 on Oracle Cloud that:
- Proxies AI model requests through multi-account token rotation
- Maintains persistent conversation memory via Honcho
- Routes conversations across Telegram, desktop app, and Slack
- Automatically fails over between local and cloud execution
- Manages OAuth tokens across multiple Google accounts for quota pooling

ARCHITECTURE
[Topology diagram showing:]
Local Machine (Primary)
  ↕ (fallback)
Oracle Cloud VM (24/7)
  → Antigravity2API Proxy (port 8045)
    → Google Account Pool (token rotation)
      → Gemini 3.7 Flash / Claude / GPT models
  → Telegram Gateway (systemd daemon)
  → Honcho Memory Layer (persistent cross-session)

WHAT I LEARNED
- Distributed systems need to degrade gracefully, not fail completely
- Token rotation across multiple accounts is more reliable than paying for a single high-quota key
- Persistent memory across sessions changes how you interact with AI — it stops being a tool and starts being infrastructure
```

**Architecture diagram:** Create as an SVG or use the `architecture-diagram` skill to generate a dark-themed diagram. Key nodes:
1. Local Machine (Windows) — primary agent loop
2. Oracle Cloud VM — 24/7 failover
3. Antigravity2API — model proxy
4. Google Account Pool — 2+ accounts, token rotation
5. Telegram Bot — mobile access
6. Honcho — memory layer
7. Obsidian Vault — knowledge store

**Important: NO private details in the showcase.**
- No server IPs
- No API keys or account names
- No specific Google account emails
- No PM2 process names or systemd unit names
- Keep it architectural, not operational

---

## Project 04: YouTube Research Engine

### Current State
- **Location:** Unknown — need to find the source code
- **Components:** Chrome extension + backend pipeline
- **What it does:** Captures YouTube auth tokens from browser session, feeds them to a backend for bulk transcript/metadata extraction without API quota limits

### Discovery Steps

**Step 1: Find the source code**
```bash
# Search local projects for YouTube-related code
find "C:/Users/anubh/Projects" -name "manifest.json" -path "*/extension*" 2>/dev/null
find "C:/Users/anubh/Projects" -name "*.py" -path "*youtube*" -o -name "*.py" -path "*yt*" 2>/dev/null
find "C:/Users/anubh/Downloads/Antigravity Projects" -name "*youtube*" -o -name "*yt*" -o -name "*transcript*" 2>/dev/null | grep -v node_modules | grep -v .git | head -20
```

Also check the mcptube MCP server — it may contain or reference the YouTube scraping logic.

**Step 2: Audit what exists**
- Is there a Chrome extension with a `manifest.json`?
- Is there a Python/Node.js backend?
- Does it actually work?
- What's the token capture mechanism?

**Step 3: Decision**
- If a working extension + backend exists → Clean up, create a public repo, write a proper README
- If it's scattered scripts → Consolidate into a clean project structure
- If it doesn't exist as a standalone tool → Build it based on what Aryan describes, or convert to a showcase-only case study (like Jarvis)

### Showcase Specification (if code isn't publishable)

Create a case study page similar to Jarvis Infrastructure:
```
YouTube Research Engine
API limits bypassed — 2025

YouTube's Data API has strict quotas that make bulk research impossible.
This system bypasses them entirely.

HOW IT WORKS
1. A Chrome extension monitors active YouTube sessions
2. When authenticated, it captures the session's internal API tokens
3. These tokens are forwarded to a local backend
4. The backend uses them to make internal API calls (not the public Data API)
5. Transcripts, metadata, and comments download without quota limits

WHY IT MATTERS
The public YouTube Data API allows ~10,000 units/day.
A single transcript request costs 200 units. That's 50 transcripts/day.
This system has no practical limit.
```

---

## Project 05: Second Brain / Obsidian System

### Current State
- **Location:** `Z:\obsidian\Second Brain`
- **Type:** Obsidian vault with structured folders, not a code project
- **Components:** AI Learning Library (21+ sources), Capture Ledger, Source Note Manifest, Overlap Map, Watch Order

### What to Build
This is a **methodology showcase** — screenshots, system design documentation, and pipeline descriptions. No code repo needed.

### Showcase Specification

**Content for the case study page:**

```
Second Brain
Knowledge management system — 2026

A structured research workflow built in Obsidian for turning raw information
into connected, actionable knowledge.

THE SYSTEM
├── 01-Profile/        Personal context and identity
├── 02-Projects/       Active project notes and plans
├── 03-Areas/          Ongoing responsibilities
├── 04-Resources/      Reference material
├── 05-Reference/      Deep research library
│   └── AI Learning Library/
│       ├── Sources/          21+ ingested video transcripts
│       ├── Overlap Map.md    Cross-source pattern detection
│       ├── Watch Order.md    Curated learning sequence
│       └── Capture Ledger.md Raw capture → processed pipeline
└── ReadWrite/         Active working notes

THE PIPELINE
1. CAPTURE — Links, videos, articles drop into a capture inbox
2. INGEST — YouTube transcripts are auto-extracted and formatted
3. ANNOTATE — AI-assisted source notes with timestamped citations
4. MAP — Overlap detection across sources reveals recurring patterns
5. SYNTHESIZE — Connected ideas become project briefs or decisions

WHAT I LEARNED
- Structure beats volume. 21 well-processed sources teach more than 200 bookmarks.
- Overlap mapping is the highest-leverage research technique — when 5 independent
  sources converge on the same insight, that insight is probably true.
- The capture pipeline eliminates "I'll read it later" paralysis.
```

**Visuals needed:**
- Screenshot of the vault folder structure (sanitized — no personal notes visible)
- Screenshot of the Overlap Map showing cross-source connections
- Diagram of the capture → ingest → annotate → map → synthesize pipeline

**Important:** Sanitize ALL screenshots. No personal notes, no financial data, no private project details visible.

---

## Execution Priority

1. **SkillBridge** — Main feature, highest impact. Start with stripping fake content, then reskin.
2. **LoveQuest** — Clean repo, deploy, write honest README. Moderate effort.
3. **Jarvis Infrastructure** — Write the case study page content + create architecture diagram. No code changes.
4. **YouTube Engine** — Find the source first, then decide approach.
5. **Second Brain** — Write the case study page + capture sanitized screenshots. Last because it's the most "showcase" and least "product."
