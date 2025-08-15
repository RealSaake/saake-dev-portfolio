'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Zap, Code2 } from 'lucide-react'
import { saakeEngine } from '@/data/skills'
import FuzzyText from '@/components/react-bits/fuzzy-text-advanced'

const quickFacts = [
  {
    icon: MapPin,
    label: 'Based In',
    value: 'Remote',
    color: 'text-purple-400'
  },
  {
    icon: Calendar,
    label: 'Experience',
    value: '4+ Years',
    color: 'text-pink-400'
  },
  {
    icon: Zap,
    label: 'Automation Projects',
    value: '25+',
    color: 'text-violet-400'
  },
  {
    icon: Code2,
    label: 'Active Projects',
    value: '6',
    color: 'text-fuchsia-400'
  }
]

export function AboutHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-violet-500/20 rounded-lg border border-purple-500/30 flex items-center justify-center">
            <div className="text-8xl">👨‍💻</div>
          </div>
          <div className="absolute -top-4 -right-4 bg-purple-500/20 border border-purple-400 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
            Available for hire
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Hey, I'm{' '}
            <FuzzyText
              fontSize="3rem"
              color="#a855f7"
              baseIntensity={0.1}
              hoverIntensity={0.4}
              className="inline-block"
            >
              Saake
            </FuzzyText>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 text-gray-300 leading-relaxed mb-8"
          >
            <p>
              {saakeEngine.identity.short_bio}
            </p>
            <p>
              My approach is rooted in {saakeEngine.identity.professional_philosophy.toLowerCase()} 
              I'm passionate about building secure, scalable web applications, AI demos, and 
              automation workflows that solve real problems.
            </p>
            <p>
              Currently focused on AI/LLM integrations, n8n automation, self-hosted Raspberry Pi 
              projects, and cloud infrastructure. Always exploring the intersection of security, 
              automation, and cutting-edge web technologies.
            </p>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon
              return (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-4 text-center"
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${fact.color}`} />
                  <div className={`text-lg font-bold ${fact.color}`}>
                    {fact.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {fact.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}