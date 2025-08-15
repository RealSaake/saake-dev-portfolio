'use client'

import { motion } from 'framer-motion'
import { TerminalHero } from '@/components/terminal-hero'
import { NetworkVisualization } from '@/components/network-visualization'
import { StatsGrid } from '@/components/stats-grid'
import { QuickLinks } from '@/components/quick-links'

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <NetworkVisualization />
        <div className="relative z-10 text-center">
          <TerminalHero />
        </div>
      </section>
      
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <StatsGrid />
        </div>
      </motion.section>

      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 neon-glow text-neon-green">
            {'> system.initialize()'}
          </h2>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            Full-stack developer and automation enthusiast building secure, scalable web apps, 
            AI demos, and data workflows. Specializing in modern web technologies, 
            automation systems, and cybersecurity best practices.
          </p>
          <QuickLinks />
        </div>
      </motion.section>
    </div>
  )
}