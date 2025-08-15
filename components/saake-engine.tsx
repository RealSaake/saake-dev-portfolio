'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { saakeEngine } from '@/data/skills'
import { Brain, Zap } from 'lucide-react'

export function SaakeEngine() {
  const [animatedQuotient, setAnimatedQuotient] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const increment = saakeEngine.hackermanQuotient / 50
      const interval = setInterval(() => {
        current += increment
        if (current >= saakeEngine.hackermanQuotient) {
          setAnimatedQuotient(saakeEngine.hackermanQuotient)
          clearInterval(interval)
        } else {
          setAnimatedQuotient(Math.floor(current))
        }
      }, 30)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-6"
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="h-6 w-6 text-neon-green" />
          <h3 className="text-xl font-semibold text-neon-green">SAAKE ENGINE</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          {saakeEngine.personality.type}
        </p>
        <p className="text-xs text-gray-500 mb-4 italic">
          "{saakeEngine.identity.tagline}"
        </p>
        
        {/* Hackerman Quotient */}
        <div className="relative mb-6">
          <div className="text-4xl font-bold text-neon-green neon-glow mb-2">
            {animatedQuotient}%
          </div>
          <div className="text-sm text-gray-400 mb-3">Hackerman Quotient</div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${animatedQuotient}%` }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Attributes Radar */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Core Attributes
        </h4>
        <div className="space-y-3">
          {Object.entries(saakeEngine.attributes).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-800 rounded-full h-1.5">
                  <motion.div
                    className="bg-neon-blue h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </div>
                <span className="text-xs text-neon-blue font-bold w-8">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personality Traits */}
      <div>
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Personality Traits</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {saakeEngine.personality.traits.map(trait => (
            <span
              key={trait}
              className="px-2 py-1 bg-neon-purple/20 border border-neon-purple text-neon-purple text-xs rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>
        <blockquote className="text-sm text-gray-300 italic border-l-2 border-neon-green pl-3">
          "{saakeEngine.identity.professional_philosophy}"
        </blockquote>
      </div>
    </motion.div>
  )
}