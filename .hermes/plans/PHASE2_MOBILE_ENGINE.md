# PHASE 2: The Mobile Engine

## 1. Intentional Responsiveness (`app/globals.css` & Components)
**The Problem:** Currently, the site just hits a breakpoint, collapses into a single column (`flex-col`), shrinks the font, and calls it a day. That is poor UI.
**The Fix for Flash 3.7:**
- **Optical Font Scaling:** Mobile isn't just "smaller text", it requires a different line-height (leading) and kerning. Ensure `text-balance` is used on headings. 
- **Touch Targets:** Any interactive button, card, or navigation link must be at least 48x48px optical hit area. 
- **Padding & Viewport:** The white space on mobile needs to be tight but breathable. Stop letting grids break awkwardly. 
- **Action for Flash:** For every element you redesign in the other phases, you must rigorously write CSS that handles `max-width: 480px` as a first-class citizen, not an afterthought. Research proper mobile typography scales.