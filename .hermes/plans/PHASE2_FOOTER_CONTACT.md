# PHASE 2: Footer & Contact Page Overhaul

## The Problem
Currently, the footer and closing CTA are a disjointed traffic jam. We have a lime green `.closing-strip` shouting "reach out", immediately followed by a black `Footer` saying "Have something worth making?", with redundant email links in both. The copyright and "built with intent" labels are floating awkwardly, the trademark icon is too small/misaligned, and the overall spacing lacks the 2026 premium agency feel.

The `app/contact/page.tsx` itself is completely ignored and screams "I am a junior looking for an internship." This ruins the "experienced agency founder" positioning targeting Ludhiana clinics and exporters.

## Executing Agent (3.7 Flash) Directives:
**1. Merge & Polish the Footer (`components/shell.tsx`):**
- Kill the double CTA. Either the lime green strip BECOMES the footer, or it is removed and the dark footer owns the CTA cleanly.
- Align all text perfectly. Fix the trademark `©` size and vertical alignment. 
- Space "Designed and built with intent" properly so it feels like a high-end studio sign-off.
- Combine the links (GitHub, About, Contact) into a slick, deliberate secondary nav row.

**2. Complete Contact Page Redesign (`app/contact/page.tsx`):**
- **Vibe:** Sleek B2B Lead Funnel.
- **Copy:** No more "roles and internships." It must position Saake as a high-ticket systems architect. Replace "Let's build something people remember" with something hyper-competent like "Build your digital infrastructure."
- **Layout:** Clear value proposition on the left, robust Email/Action hook on the right. 

**MANDATORY:** Research high-end studio contact pages. Do not just drop text on the screen. Use grid layouts.
