'use client'

import { useState } from 'react'

interface LocationEgg {
  coords: string
  label: string
  detail: string
}

const LOCATIONS: LocationEgg[] = [
  {
    coords: '29.9792° N · 31.1342° E',
    label: 'GIZA APEX',
    detail: 'Speed of light: 299,792,458 m/s',
  },
  {
    coords: '25.0000° N · 71.0000° W',
    label: 'BERMUDA TRIANGLE',
    detail: 'Lost in automation pipelines',
  },
  {
    coords: '37.2431° N · 115.7930° W',
    label: 'AREA 51',
    detail: 'Classified autonomous bots',
  },
  {
    coords: '0.0000° N · 0.0000° E',
    label: 'NULL ISLAND',
    detail: 'Where all unprojected data converges',
  },
]

export function HeroCoordinates() {
  const [index, setIndex] = useState(0)
  const current = LOCATIONS[index]

  const nextLocation = () => {
    setIndex((prev) => (prev + 1) % LOCATIONS.length)
  }

  return (
    <button
      type="button"
      onClick={nextLocation}
      className="hero-coordinates"
      title={`${current.label}: ${current.detail} (Click to cycle)`}
      aria-label={`Current location easter egg: ${current.label}, ${current.coords}. ${current.detail}. Click to cycle.`}
    >
      <span className="hero-coords-text">{current.coords}</span>
      <span className="hero-coords-meta">
        <span className="hero-coords-tag">{current.label}</span>
        <span className="hero-coords-cycle">↺</span>
      </span>
    </button>
  )
}
