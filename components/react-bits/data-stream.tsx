'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface DataStreamProps {
  className?: string
  color?: string
  speed?: number
  density?: number
}

export function DataStream({ 
  className = '',
  color = '#00ff41',
  speed = 1,
  density = 0.02
}: DataStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const streamsRef = useRef<Array<{ id: number; x: number; delay: number }>>([])
  const nextIdRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createStream = () => {
      if (Math.random() < density) {
        const stream = {
          id: nextIdRef.current++,
          x: Math.random() * container.offsetWidth,
          delay: Math.random() * 2
        }
        streamsRef.current.push(stream)
      }

      // Clean up old streams
      streamsRef.current = streamsRef.current.filter(stream => 
        Date.now() - stream.id < 10000
      )
    }

    const interval = setInterval(createStream, 100)

    return () => clearInterval(interval)
  }, [density])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {streamsRef.current.map(stream => (
        <motion.div
          key={stream.id}
          className="absolute w-0.5 h-20 opacity-60"
          style={{
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            left: stream.x
          }}
          initial={{ y: -80 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 3 / speed,
            delay: stream.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}