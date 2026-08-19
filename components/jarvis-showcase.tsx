'use client'

import { useState } from 'react'

const TOPOLOGY_NODES = [
  {
    id: 'local',
    name: 'Local Desktop (Daily Driver)',
    role: 'Primary Runtime',
    status: 'Active',
    specs: 'Windows 11 / Local Agent Daemon',
    description: 'Fast local execution loop with filesystem and local tool privileges.',
  },
  {
    id: 'oracle',
    name: 'Oracle Cloud VM (24/7 Gateway)',
    role: 'Always-on Gateway & Failover',
    status: 'Operational',
    specs: 'Ubuntu 24.04 / systemd / PM2 Proxy',
    description: 'Persistent Telegram gateway daemon running 24/7 for mobile capture and offline execution.',
  },
  {
    id: 'proxy',
    name: 'Antigravity2API Proxy',
    role: 'Model Load-Balancer & Rotation',
    status: 'Healthy',
    specs: 'Port 8045 / Multi-Account OAuth Pool',
    description: 'Extracts and rotates quota tokens across multiple Google accounts to ensure zero rate-limit downtime.',
  },
  {
    id: 'honcho',
    name: 'Honcho Memory Matrix',
    role: 'Durable Cross-Session Memory',
    status: 'Synchronized',
    specs: 'Cloud Vector / Hybrid Search',
    description: 'Unified cross-session memory maintaining user preferences, environment parameters, and project lineage.',
  },
]

export function JarvisShowcase() {
  const [selectedNode, setSelectedNode] = useState(0)

  return (
    <div className="border border-rule-strong bg-[#080b08] p-6 sm:p-8 text-ink">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-accent-text">SYSTEM: ACTIVE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />
          </div>
          <h2 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">
            Jarvis / Distributed AI Orchestration Topology
          </h2>
        </div>
        <div className="font-mono text-xs text-muted">
          Multi-Provider Failover &amp; Token Rotation
        </div>
      </div>

      {/* Nodes grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOPOLOGY_NODES.map((node, idx) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setSelectedNode(idx)}
            className={`text-left border p-4 transition-all ${
              selectedNode === idx
                ? 'border-accent-fill bg-accent-fill/10'
                : 'border-rule bg-surface hover:border-rule-strong'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[11px] text-muted">
              <span>0{idx + 1}</span>
              <span className="text-accent-text font-bold">{node.status}</span>
            </div>
            <div className="mt-3 font-display text-sm font-semibold text-ink">{node.name}</div>
            <p className="mt-1 font-mono text-[11px] text-muted-2">{node.role}</p>
          </button>
        ))}
      </div>

      {/* Active node detail */}
      <div className="mt-6 border border-rule bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div>
            <span className="font-mono text-xs text-accent-text uppercase">Node Specifications</span>
            <div className="mt-1 font-display text-base font-semibold text-ink">
              {TOPOLOGY_NODES[selectedNode].name}
            </div>
          </div>
          <span className="font-mono text-xs text-muted-2">
            {TOPOLOGY_NODES[selectedNode].specs}
          </span>
        </div>
        <p className="mt-4 font-sans text-sm text-muted leading-relaxed">
          {TOPOLOGY_NODES[selectedNode].description}
        </p>
      </div>
    </div>
  )
}
