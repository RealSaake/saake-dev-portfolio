'use client'

import { useState, useEffect } from 'react'

interface Quest {
  id: string
  title: string
  detail: string
  reward: number
  category: 'Daily' | 'Weekly' | 'Mega Event'
  completed: boolean
}

interface Memory {
  id: string
  date: string
  title: string
  caption: string
  category: string
  encryptedVoiceNote?: boolean
}

const REAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Daily Check-in Voice Memo',
    detail: 'Send an encrypted audio recording recounting one unexpected moment from your day.',
    reward: 50,
    category: 'Daily',
    completed: true,
  },
  {
    id: 'q2',
    title: 'Two-Year Anniversary Countdown',
    detail: 'Complete the milestone reflection before October 16, 2025 (WIB / GMT+7).',
    reward: 200,
    category: 'Mega Event',
    completed: false,
  },
  {
    id: 'q3',
    title: 'Virtual Sanctuary Garden Water',
    detail: 'Tend the shared interactive garden and leave a micro-note on the terrace.',
    reward: 35,
    category: 'Daily',
    completed: false,
  },
  {
    id: 'q4',
    title: 'Sunday Synced Film Debrief',
    detail: 'Add shared notes and favorite dialogue excerpts to the collaborative timeline.',
    reward: 75,
    category: 'Weekly',
    completed: false,
  },
]

const MEMORIES: Memory[] = [
  {
    id: 'm1',
    date: 'Oct 16 · Milestone',
    title: 'Two-Year Anniversary Reflection',
    caption: 'Synchronized countdown and memory vault unseal across India (IST) & Indonesia (WIB) timezones.',
    category: 'Anniversary',
    encryptedVoiceNote: true,
  },
  {
    id: 'm2',
    date: 'Nov 02 · Adventure',
    title: 'Coastal Drive & Communal Playlist',
    caption: 'Shared real-time queue streaming across 3,000 miles with zero playback drift.',
    category: 'Audio Sync',
    encryptedVoiceNote: true,
  },
  {
    id: 'm3',
    date: 'Dec 28 · Ritual',
    title: 'Late Night Digital Tea & Notes',
    caption: 'Tactile surprise notes unlocked in the virtual garden under starry atmosphere shaders.',
    category: 'Sanctuary',
    encryptedVoiceNote: false,
  },
]

export function LoveQuestShowcase() {
  const [activeTab, setActiveTab] = useState<'quests' | 'vault' | 'garden' | 'architecture'>('quests')
  const [quests, setQuests] = useState<Quest[]>(REAL_QUESTS)
  const [coins, setCoins] = useState(385)
  const [streakDays, setStreakDays] = useState(48)
  const [gardenBlooms, setGardenBlooms] = useState(12)

  const toggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextState = !q.completed
          setCoins((c) => (nextState ? c + q.reward : c - q.reward))
          if (nextState && q.category === 'Daily') {
            setGardenBlooms((g) => g + 1)
          }
          return { ...q, completed: nextState }
        }
        return q
      })
    )
  }

  return (
    <div className="lovequest-interactive-engine border border-[#ff6f91]/30 bg-[#12080c] p-6 sm:p-8 text-ink">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3d1825] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl text-[#ff6f91]">♥</span>
            <span className="font-display text-lg font-bold tracking-tight text-[#fdf2f4]">
              LoveQuest / Intimacy Companion Engine
            </span>
          </div>
          <p className="mt-1 font-sans text-xs text-[#dca8b8]">
            Tactile long-distance operating system: KatEngine personalization, encrypted audio vaults, and real-time state sync
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded border border-[#ff6f91]/40 bg-[#ff6f91]/10 px-3 py-1.5 font-mono text-xs text-[#ff6f91]">
            <span>🔥 {streakDays}-Day Streak</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-[#ff6f91]/40 bg-[#ff6f91]/10 px-3 py-1.5 font-mono text-xs font-bold text-[#ff6f91]">
            <span>💰 {coins} LoveCoins</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-[#2d121c] pb-3">
        {(
          [
            { id: 'quests', label: 'Active Quests & Rewards' },
            { id: 'vault', label: 'Encrypted Memory Vault' },
            { id: 'garden', label: 'Virtual Sanctuary Garden' },
            { id: 'architecture', label: 'State Synchronization Graph' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === t.id
                ? 'border-b-2 border-[#ff6f91] text-[#fdf2f4] font-bold'
                : 'text-[#a87082] hover:text-[#fdf2f4]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Quests System */}
      {activeTab === 'quests' && (
        <div className="mt-6 space-y-3">
          {quests.map((q) => (
            <div
              key={q.id}
              onClick={() => toggleQuest(q.id)}
              className={`cursor-pointer border p-4 transition-all ${
                q.completed
                  ? 'border-[#ff6f91]/50 bg-[#ff6f91]/10'
                  : 'border-[#331420] bg-[#1a0c12] hover:border-[#ff6f91]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border font-mono text-xs ${
                      q.completed
                        ? 'border-[#ff6f91] bg-[#ff6f91] text-black font-bold'
                        : 'border-[#552030]'
                    }`}
                  >
                    {q.completed ? '✓' : ''}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-[#fdf2f4]">
                        {q.title}
                      </span>
                      <span className="rounded bg-[#ff6f91]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#ff6f91]">
                        {q.category}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-xs text-[#c990a2]">{q.detail}</p>
                  </div>
                </div>
                <div className="shrink-0 font-mono text-xs font-bold text-[#ff6f91]">
                  +{q.reward} Coins
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Encrypted Vault */}
      {activeTab === 'vault' && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MEMORIES.map((m) => (
            <div key={m.id} className="border border-[#3d1825] bg-[#1a0c12] p-5">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#ff6f91]">
                <span>{m.date}</span>
                {m.encryptedVoiceNote && (
                  <span className="rounded bg-[#ff6f91]/20 px-1.5 py-0.5 text-[10px]">
                    🔒 Voice Memo #42
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold text-[#fdf2f4]">{m.title}</h3>
              <p className="mt-2 font-sans text-xs leading-relaxed text-[#c990a2]">{m.caption}</p>
              <div className="mt-4 pt-3 border-t border-[#2d121c] flex items-center justify-between text-[11px] font-mono text-[#8a5062]">
                <span>Status: Unsealed</span>
                <span className="text-[#ff6f91]">AES-GCM 256</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Virtual Garden */}
      {activeTab === 'garden' && (
        <div className="mt-6 border border-[#3d1825] bg-[#1a0c12] p-6 text-center">
          <div className="text-4xl mb-3">🌸 🌺 🌻 🌷 🌹</div>
          <h3 className="font-display text-base font-semibold text-[#fdf2f4]">
            Shared Sanctuary Garden ({gardenBlooms} Blooms)
          </h3>
          <p className="mt-1 font-sans text-xs text-[#c990a2] max-w-md mx-auto">
            Each daily completed quest cultivates reactive SVG botanical nodes in the shared canvas, synchronized across Indonesia (WIB) and India (IST).
          </p>
          <div className="mt-6 grid grid-cols-6 gap-2 max-w-md mx-auto">
            {Array.from({ length: gardenBlooms }).map((_, i) => (
              <div
                key={i}
                className="aspect-square border border-[#ff6f91]/30 bg-[#ff6f91]/10 flex items-center justify-center text-lg"
              >
                {['🌸', '🌺', '🌷', '🌹', '✨', '🌿'][i % 6]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Architecture */}
      {activeTab === 'architecture' && (
        <div className="mt-6 border border-[#3d1825] bg-[#1a0c12] p-5 font-mono text-xs text-[#dca8b8]">
          <span className="text-[#ff6f91] uppercase tracking-wider font-semibold">
            Realtime Synchronization Topology
          </span>
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-[#0e0609] border border-[#2d121c]">
              <span className="text-[#ff6f91]">KatEngine Personalization:</span> Dynamic quest generator analyzing timezones, streak cadence, and relationship milestones.
            </div>
            <div className="p-3 bg-[#0e0609] border border-[#2d121c]">
              <span className="text-[#ff6f91]">Optimistic State Store:</span> Zustand + Immer persistent client hydration with immediate tactile UI dispatch.
            </div>
            <div className="p-3 bg-[#0e0609] border border-[#2d121c]">
              <span className="text-[#ff6f91]">Firebase Security Rules:</span> Strictly scoped dual-profile access token exchange with granular storage path claims.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
