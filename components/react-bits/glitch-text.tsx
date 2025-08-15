'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
  colors?: string[]
}

export function GlitchText({ 
  text, 
  className = '', 
  glitchIntensity = 0.1,
  colors = ['#ff0080', '#00d4ff', '#00ff41']
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [glitchIntensity])

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0]
        } : {}}
        transition={{ duration: 0.15 }}
      >
        {text}
      </motion.span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute top-0 left-0 z-0"
        style={{ color: colors[0] }}
        animate={isGlitching ? {
          x: [-1, 1, -2, 2, 0],
          opacity: [0.8, 0.3, 0.8, 0.3, 0]
        } : { opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 z-0"
        style={{ color: colors[1] }}
        animate={isGlitching ? {
          x: [2, -1, 1, -2, 0],
          opacity: [0.8, 0.3, 0.8, 0.3, 0]
        } : { opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
      >
        {text}
      </motion.span>
    </div>
  )
}