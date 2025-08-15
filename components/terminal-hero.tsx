'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypingAnimation } from '@/components/react-bits/typing-animation'
import { GlitchText } from '@/components/react-bits/glitch-text'
import { Button } from '@/components/ui/button'
import FuzzyText from '@/components/react-bits/fuzzy-text-advanced'

const commands = [
  '> initializing saake.dev...',
  '> loading neural networks...',
  '> connecting to mainframe...',
  '> dataflow initialized',
  '> welcome to the matrix'
]

export function TerminalHero() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentCommand < commands.length) {
      const command = commands[currentCommand]
      let index = 0
      
      const typeInterval = setInterval(() => {
        if (index <= command.length) {
          setDisplayText(command.slice(0, index))
          index++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setCurrentCommand(prev => prev + 1)
          }, 1000)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [currentCommand])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-black/80 backdrop-blur-md border border-neon-green/30 rounded-lg p-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="ml-4 text-sm text-gray-400">terminal@saake.dev</span>
      </div>
      
      <div className="font-mono text-lg">
        {commands.slice(0, currentCommand).map((cmd, index) => (
          <div key={index} className="text-neon-green mb-2">
            {cmd}
          </div>
        ))}
        
        <div className="text-neon-green">
          {displayText}
          {showCursor && <span className="terminal-cursor ml-1"></span>}
        </div>
        
        {currentCommand >= commands.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <FuzzyText
                fontSize="clamp(3rem, 8vw, 6rem)"
                color="#00ff41"
                baseIntensity={0.2}
                hoverIntensity={0.6}
                fontWeight={900}
                className="neon-glow"
              >
                SAAKE.DEV
              </FuzzyText>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Full-Stack Developer • Automation Enthusiast • Security-Focused
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="neon" size="lg">
                  View Projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="cyber" size="lg">
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}