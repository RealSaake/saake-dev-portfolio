'use client'

import { useState } from 'react'

const SESSIONS = [
  {
    id: 's1',
    topic: 'TypeScript Type Gymnastics & Generics',
    mentor: 'Alex R.',
    status: 'Scheduled',
    duration: '45 mins',
    milestones: ['Mapped Types', 'Conditional Inference', 'Tuple Transformations'],
  },
  {
    id: 's2',
    topic: 'Web Audio API & Synthesizer Basics',
    mentor: 'Elena V.',
    status: 'In Progress',
    duration: '60 mins',
    milestones: ['AudioContext Graph', 'Custom Oscillators', 'Gain Envelopes'],
  },
  {
    id: 's3',
    topic: 'React 19 Server Components Architecture',
    mentor: 'Marcus K.',
    status: 'Completed',
    duration: '50 mins',
    milestones: ['Streaming SSR', 'Suspense Boundaries', 'Action Mutations'],
  },
]

export function SkillBridgeShowcase() {
  const [activeSession, setActiveSession] = useState(0)

  return (
    <div className="border border-rule bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div>
          <span className="label text-[#a98cea]">SkillBridge / Mentorship Engine</span>
          <p className="mt-1 font-sans text-xs text-muted">
            Peer-to-peer knowledge exchange and collaborative milestone tracking
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-[#a98cea]" />
          <span>Realtime Session Sync</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {SESSIONS.map((session, idx) => (
          <button
            key={session.id}
            type="button"
            onClick={() => setActiveSession(idx)}
            className={`text-left border p-5 transition-all ${
              activeSession === idx
                ? 'border-[#a98cea] bg-[#a98cea]/5 shadow-sm'
                : 'border-rule bg-paper hover:border-rule-strong'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-muted">
              <span>{session.status}</span>
              <span>{session.duration}</span>
            </div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{session.topic}</div>
            <p className="mt-2 font-sans text-xs text-muted">Mentor: {session.mentor}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 border border-rule bg-paper p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-xs text-[#a98cea] uppercase">Active Curriculum</span>
            <div className="mt-1 font-display text-base font-semibold text-ink">
              {SESSIONS[activeSession].topic}
            </div>
          </div>
          <span className="font-mono text-xs text-muted">Mentor: {SESSIONS[activeSession].mentor}</span>
        </div>

        <div className="mt-4">
          <span className="font-mono text-xs text-muted uppercase">Structured Session Milestones</span>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {SESSIONS[activeSession].milestones.map((m, i) => (
              <div key={m} className="flex items-center gap-2 border border-rule bg-surface p-3 text-xs">
                <span className="font-mono text-[#a98cea]">0{i + 1}</span>
                <span className="font-sans text-ink">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
