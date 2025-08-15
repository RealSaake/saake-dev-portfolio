'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeonBorderProps {
  children: ReactNode
  color?: string
  intensity?: number
  className?: string
  animate?: boolean
}

export function NeonBorder({ 
  children, 
  color = '#00ff41', 
  intensity = 1,
  className = '',
  animate = true
}: NeonBorderProps) {
  const glowStyle = {
    boxShadow: `
      0 0 ${5 * intensity}px ${color}40,
      0 0 ${10 * intensity}px ${color}30,
      0 0 ${15 * intensity}px ${color}20,
      inset 0 0 ${5 * intensity}px ${color}10
    `,
    border: `1px solid ${color}80`
  }

  const animatedGlowStyle = {
    boxShadow: [
      `0 0 ${5 * intensity}px ${color}40, 0 0 ${10 * intensity}px ${color}30, 0 0 ${15 * intensity}px ${color}20`,
      `0 0 ${8 * intensity}px ${color}60, 0 0 ${15 * intensity}px ${color}40, 0 0 ${25 * intensity}px ${color}30`,
      `0 0 ${5 * intensity}px ${color}40, 0 0 ${10 * intensity}px ${color}30, 0 0 ${15 * intensity}px ${color}20`
    ]
  }

  if (animate) {
    return (
      <motion.div
        className={`relative ${className}`}
        style={{ border: `1px solid ${color}80` }}
        animate={animatedGlowStyle}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`relative ${className}`} style={glowStyle}>
      {children}
    </div>
  )
}