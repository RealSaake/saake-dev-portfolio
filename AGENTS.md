# Workspace Agent Directives & Verification Standards

> **Scope:** Applies to any AI assistant, subagent, or autonomous tool operating on this repository and workspace.

## 1. Transparency & Logging Protocol
- **Record All Actions:** Every agent modifying files must maintain clear, verifiable records of modifications, rationale, and verification outputs in relevant project handover notes or logs (`walkthrough.md`, `SAAKEDEV_HANDOVER.md`).
- **Surface File Edits:** Do not execute silent or obscured code modifications; make targeted, clean diffs that are easily auditable.

## 2. Truth & Content Integrity
- **No Hallucinated Claims:** Never fabricate client metrics, corporate logos, business stats, roles, or testimonials.
- **Verifiable Truth Baseline:** All project descriptions, code examples, and technical claims must be grounded in actual source repositories and verifiable architecture.

## 3. Engineering & Design Standards
- **No-JS & Semantic HTML:** All pages must render complete readable content without client-side JavaScript.
- **Accessibility & Contrast:**
  - Maintain WCAG AA compliance (contrast ratio ≥ 4.5:1 for normal text).
  - Enforce proper heading order (`h1` → `h2` → `h3`) and descriptive accessible labels.
  - Honor `prefers-reduced-motion` on all animations, canvas routines, and WebGL scenes.
- **Performance Budget:** Ensure per-route first-load bundle remains strictly within the defined gzip limits (< 200 kB).

## 4. Verification Gates
Before finishing any slice, run and pass all repository verification gates:
```bash
npm run check
npm run contrast
```
