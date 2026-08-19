# PHASE 2: "Blocker-Style" Deep Case Studies 

## The Problem
Right now, the `/work` index page uses "AI as fuck" jargon ("autonomous systems and interactive architectures a portfolio of verified systems..."). It sounds like a prompt, not a person. 
Worse, when you click into a project like SkillBridge, you get a generic React component widget and a tiny sentence. It provides zero info, zero depth, and "looks half-assed." It doesn't explain the *why*, the *value*, or the *system*. 

## Executing Agent (3.7 Flash) Directives:
**1. Humanize the Lead Copy (`app/work/page.tsx`):**
- Purge the jargon. Talk like an actual founder explaining their system. 
- "Selected Work" -> "Websites, workflows, and backend systems built for performance." Talk to the clients, not to developers.

**2. Deep Editorial Case Studies (`app/work/[slug]/page.tsx`):**
- **Structure:** You must write a GENUINE dive into the project (Think "Blocker" level design). Every project must have:
  1. **The Brief / The Problem:** What was wrong? (Real world use case).
  2. **The Architecture / The Solution:** How did we fix it? What was unique about the approach?
  3. **The Outcome:** What does the user/client actually get?
- **Design:** Build specific UI components for case study text. Do NOT just dump `<p>` tags. Use large pull quotes, stylized statistical highlights, animated scroll-reveals (e.g., `framer-motion` or CSS text reveals). 
- **The Task:** You must actually READ the codebase of SkillBridge/LoveQuest/Jarvis and WRITE compelling narrative case studies. Look at modern agency portfolios. Emulate them. Make the reader understand *what* the project is without needing to be an engineer.