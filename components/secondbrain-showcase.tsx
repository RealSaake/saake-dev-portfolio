'use client'

import { useState } from 'react'

const VAULT_PILLARS = [
  {
    code: '01',
    name: 'Capture Ledger',
    role: 'Automated Ingestion',
    description: 'Raw video links, academic papers, and technical transcripts captured silently and normalized into chronological records.',
  },
  {
    code: '02',
    name: 'AI Learning Library',
    role: '20+ Structured Sources',
    description: 'Timestamped citations, executive summaries, and key architectural diagrams extracted from deep-dive references.',
  },
  {
    code: '03',
    name: 'Overlap Detection',
    role: 'Pattern Synthesis',
    description: 'Cross-source matrix identifying recurring strategies across multiple independent practitioners to extract genuine signal.',
  },
  {
    code: '04',
    name: 'Active Project Portals',
    role: 'Execution & Grounding',
    description: 'Direct integration into active codebases (saake.dev, Hearth, lead-gen engine) with strict separation of concerns.',
  },
]

export function SecondBrainShowcase() {
  const [activePillar, setActivePillar] = useState(0)

  return (
    <div className="border border-rule-strong bg-[#090b09] p-6 sm:p-8 text-ink">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div>
          <span className="font-mono text-xs font-bold text-accent-text uppercase tracking-wider">
            Knowledge Architecture / Obsidian System
          </span>
          <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
            Second Brain / Research &amp; Synthesis Matrix
          </h2>
        </div>
        <div className="font-mono text-xs text-muted">
          Structured Vault with Overlap Analysis
        </div>
      </div>

      {/* Pillars grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VAULT_PILLARS.map((pillar, idx) => (
          <button
            key={pillar.code}
            type="button"
            onClick={() => setActivePillar(idx)}
            className={`text-left border p-4 transition-all ${
              activePillar === idx
                ? 'border-accent-fill bg-accent-fill/10'
                : 'border-rule bg-surface hover:border-rule-strong'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-muted">
              <span>{pillar.code}</span>
              <span className="text-accent-text font-bold">PILLAR</span>
            </div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{pillar.name}</div>
            <p className="mt-1 font-mono text-[11px] text-muted-2">{pillar.role}</p>
          </button>
        ))}
      </div>

      {/* Pillar detail */}
      <div className="mt-6 border border-rule bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-xs text-accent-text uppercase">Pillar Topology</span>
            <div className="mt-1 font-display text-base font-semibold text-ink">
              {VAULT_PILLARS[activePillar].name}
            </div>
          </div>
          <span className="font-mono text-xs text-muted-2">
            {VAULT_PILLARS[activePillar].role}
          </span>
        </div>
        <p className="mt-4 font-sans text-sm text-muted leading-relaxed">
          {VAULT_PILLARS[activePillar].description}
        </p>
      </div>
    </div>
  )
}
