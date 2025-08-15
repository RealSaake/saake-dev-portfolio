'use client'

import { motion } from 'framer-motion'
import { SkillsRadar } from '@/components/skills-radar'
import { AboutHero } from '@/components/about-hero'
import { ExperienceGrid } from '@/components/experience-grid'
import { skillCategories } from '@/data/skills'
import { Code, Heart, Zap, Users } from 'lucide-react'
import { saakeEngine } from '@/data/skills'

const values = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code that stands the test of time.',
    color: 'neon-green'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing every byte and millisecond for the best user experience.',
    color: 'neon-blue'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Building great products through effective teamwork and communication.',
    color: 'neon-purple'
  },
  {
    icon: Heart,
    title: 'User-Centric',
    description: 'Putting users first in every design and development decision.',
    color: 'neon-pink'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="glitch-text neon-glow text-neon-green" data-text="ABOUT">
              ABOUT
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The story behind the code - my journey, values, and the passion that drives 
            me to build exceptional digital experiences.
          </p>
        </motion.div>

        {/* Hero Section */}
        <AboutHero />

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-neon-green">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center hover:border-gray-700 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/20 border border-green text-neon-green mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-neon-green">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SkillsRadar />
            <div className="space-y-6">
              {skillCategories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-4 text-neon-green">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 6).map(skill => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded border border-gray-700"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Experience Grid */}
        <ExperienceGrid />

        {/* Personal Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-neon-green">
              Beyond the Code
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              When I'm not building automation workflows or tinkering with my home lab, you'll 
              find me exploring AI/LLM integrations, contributing to cybersecurity tools, or 
              working on travel photography. I believe in the power of automation and security 
              to create efficient, reliable systems.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {saakeEngine.interests.slice(0, 4).map((interest, index) => (
                <span 
                  key={interest}
                  className={`px-4 py-2 bg-neon-${['green', 'blue', 'purple', 'pink'][index]}/20 border border-neon-${['green', 'blue', 'purple', 'pink'][index]} text-neon-${['green', 'blue', 'purple', 'pink'][index]} rounded-full`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}