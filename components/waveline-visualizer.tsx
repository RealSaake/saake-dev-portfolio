'use client'

import { useEffect, useRef, useState } from 'react'

const BARS = 96
type WaveformType = 'sine' | 'triangle' | 'sawtooth' | 'square'
type PresetType = { name: string; freq: number; type: WaveformType }

const PRESETS: PresetType[] = [
  { name: 'Warm Sub (55Hz)', freq: 55, type: 'sine' },
  { name: 'Analog Pad (110Hz)', freq: 110, type: 'triangle' },
  { name: 'Harmonic Sweep (220Hz)', freq: 220, type: 'sawtooth' },
  { name: 'Lead Tone (440Hz)', freq: 440, type: 'square' },
]

export function WavelineVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const [playing, setPlaying] = useState(false)
  const [mode, setMode] = useState<'wave' | 'spectrum'>('wave')
  const [selectedPreset, setSelectedPreset] = useState<number>(1)
  const [waveform, setWaveform] = useState<WaveformType>('triangle')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = (time = 0) => {
      const ratio = Math.min(devicePixelRatio, 2)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio
        canvas.height = height * ratio
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // Background canvas grid
      ctx.fillStyle = '#060806'
      ctx.fillRect(0, 0, width, height)
      ctx.strokeStyle = 'rgba(184, 233, 40, 0.08)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      const t = reduced ? 0 : time * 0.001
      const energyMultiplier = playing ? 1.0 : 0.35

      if (mode === 'wave') {
        // Multi-harmonic wave drawing
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath()
          for (let x = 0; x <= width; x += 4) {
            const freq = waveform === 'square' ? 0.035 : waveform === 'sawtooth' ? 0.028 : 0.018
            const y =
              height / 2 +
              Math.sin(x * freq + t * (1.3 + layer * 0.35)) *
                (36 + layer * 20) *
                energyMultiplier +
              Math.sin(x * 0.06 - t * 2.2) * 12 * energyMultiplier
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.strokeStyle =
            layer === 0 ? '#b8e928' : `rgba(184, 233, 40, ${0.36 - layer * 0.1})`
          ctx.lineWidth = layer === 0 ? 2 : 1
          ctx.stroke()
        }
      } else {
        // Spectrum frequency bands
        const gap = 3
        const barWidth = Math.max(2, width / BARS - gap)
        for (let i = 0; i < BARS; i++) {
          const amplitude =
            (Math.sin(i * 0.32 + t * 2.2) * 0.5 + 0.5) *
            (Math.sin(i * 0.08 - t) * 0.35 + 0.65)
          const h = Math.max(4, amplitude * height * 0.75 * energyMultiplier)
          ctx.fillStyle = i % 8 === 0 ? '#e8fa9f' : '#b8e928'
          ctx.fillRect(i * (barWidth + gap), height - h, barWidth, h)
        }
      }
      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [playing, mode, waveform])

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      const ct = audioCtxRef.current.currentTime
      gainRef.current.gain.linearRampToValueAtTime(0.0001, ct + 0.15)
      setTimeout(() => {
        if (oscRef.current) {
          try {
            oscRef.current.stop()
            oscRef.current.disconnect()
          } catch {}
          oscRef.current = null
        }
      }, 160)
    }
    setPlaying(false)
  }

  const startAudio = async (presetIdx = selectedPreset, wf = waveform) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume()
      }

      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
        } catch {}
      }

      const ct = audioCtxRef.current.currentTime
      const osc = audioCtxRef.current.createOscillator()
      const gain = audioCtxRef.current.createGain()

      const targetPreset = PRESETS[presetIdx]
      osc.type = wf
      osc.frequency.setValueAtTime(targetPreset.freq, ct)

      gain.gain.setValueAtTime(0.0001, ct)
      gain.gain.linearRampToValueAtTime(0.03, ct + 0.1)

      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)

      osc.start(ct)
      oscRef.current = osc
      gainRef.current = gain
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const toggleSound = () => {
    if (playing) {
      stopAudio()
    } else {
      startAudio(selectedPreset, waveform)
    }
  }

  const selectPreset = (idx: number) => {
    setSelectedPreset(idx)
    setWaveform(PRESETS[idx].type)
    if (playing) {
      startAudio(idx, PRESETS[idx].type)
    }
  }

  return (
    <div className="visualizer-shell border border-rule-strong bg-[#060806]">
      <div className="visualizer-head flex flex-wrap items-center justify-between gap-4 border-b border-[#1c221c] p-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#b8e928]">
            Waveline / Live Audio Instrument
          </span>
          <p className="mt-1 font-sans text-xs text-muted">
            Direct Web Audio synthesis &amp; real-time frequency oscilloscope
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('wave')}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              mode === 'wave'
                ? 'border border-[#b8e928] bg-[#b8e928]/10 text-[#b8e928] font-bold'
                : 'border border-[#2b332b] text-muted hover:text-ink'
            }`}
          >
            Oscilloscope
          </button>
          <button
            type="button"
            onClick={() => setMode('spectrum')}
            className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              mode === 'spectrum'
                ? 'border border-[#b8e928] bg-[#b8e928]/10 text-[#b8e928] font-bold'
                : 'border border-[#2b332b] text-muted hover:text-ink'
            }`}
          >
            Spectrum
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="visualizer-canvas h-[320px] w-full" />

      <div className="visualizer-controls flex flex-wrap items-center justify-between gap-4 border-t border-[#1c221c] p-4">
        {/* Preset selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-2 mr-1">Presets:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => selectPreset(idx)}
              className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                selectedPreset === idx
                  ? 'border border-[#b8e928] bg-[#b8e928]/20 text-[#b8e928] font-semibold'
                  : 'border border-[#242b24] text-muted hover:text-ink'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={toggleSound}
          className={`signal-button flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider ${
            playing ? 'border-red-500 bg-red-500/20 text-red-400' : ''
          }`}
          aria-label={playing ? 'Mute audio synthesizer' : 'Play audio synthesizer'}
        >
          <span>{playing ? '◼ Mute Audio' : '▶ Play Test Audio'}</span>
        </button>
      </div>
    </div>
  )
}
