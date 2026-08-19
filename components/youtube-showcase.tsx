'use client'

import { useState } from 'react'

const PIPELINE_STAGES = [
  {
    step: '01',
    name: 'Browser Session Snapshot',
    component: 'Chrome Extension / Content Hook',
    description: 'Captures active YouTube session tokens and ephemeral request signatures directly from authenticated browser context.',
    tag: 'Client Hook',
  },
  {
    step: '02',
    name: 'Internal Endpoint Bridge',
    component: 'Token Injector / Headers Emulation',
    description: 'Routes extraction queries through YouTube inner-protocol endpoints without triggering standard Data API v3 quota consumption.',
    tag: 'Zero Quota',
  },
  {
    step: '03',
    name: 'Stream De-muxing & Parsing',
    component: 'Python Ingestion Worker',
    description: 'Parses timed-text XML/JSON payloads, reconstructs timestamped transcripts, and sanitizes character encoding.',
    tag: 'Batch Extraction',
  },
  {
    step: '04',
    name: 'Obsidian & LLM Ingestion',
    component: 'Markdown Pipeline / Second Brain',
    description: 'Emits structured YAML frontmatter metadata and markdown records ready for overlap analysis and knowledge grounding.',
    tag: 'Vault Ready',
  },
]

export function YouTubeShowcase() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div className="border border-rule-strong bg-[#0d0707] p-6 sm:p-8 text-ink">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div>
          <span className="font-mono text-xs font-bold text-[#ff5a49] uppercase tracking-wider">
            Engine Architecture / API Limit Bypass
          </span>
          <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
            YouTube High-Throughput Research Pipeline
          </h2>
        </div>
        <div className="font-mono text-xs text-muted">
          Continuous Token Capture &amp; Ingestion
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE_STAGES.map((stage, idx) => (
          <button
            key={stage.step}
            type="button"
            onClick={() => setActiveStage(idx)}
            className={`text-left border p-4 transition-all ${
              activeStage === idx
                ? 'border-[#ff5a49] bg-[#ff5a49]/10'
                : 'border-rule bg-surface hover:border-rule-strong'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-muted">
              <span>{stage.step}</span>
              <span className="text-[#ff5a49] font-bold">{stage.tag}</span>
            </div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{stage.name}</div>
            <p className="mt-1 font-mono text-[11px] text-muted-2">{stage.component}</p>
          </button>
        ))}
      </div>

      {/* Stage detail */}
      <div className="mt-6 border border-rule bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-xs text-[#ff5a49] uppercase">Stage Execution Profile</span>
            <div className="mt-1 font-display text-base font-semibold text-ink">
              {PIPELINE_STAGES[activeStage].name}
            </div>
          </div>
          <span className="font-mono text-xs text-muted-2">
            {PIPELINE_STAGES[activeStage].component}
          </span>
        </div>
        <p className="mt-4 font-sans text-sm text-muted leading-relaxed">
          {PIPELINE_STAGES[activeStage].description}
        </p>
      </div>
    </div>
  )
}
