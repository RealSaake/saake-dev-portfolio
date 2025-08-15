'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { topSkills } from '@/data/skills'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'REST APIs', 'Serverless'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'AI & Automation',
    skills: ['OpenAI API', 'n8n', 'Automation', 'AI Integration'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Raspberry Pi', 'Linux'],
    color: 'from-orange-500 to-red-500'
  }
]

export function SkillsShowcase() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Skills & Expertise
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Technologies and tools I use to build exceptional digital experiences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6 hover-lift h-full">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-4 flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white rounded-sm" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="text-gray-400 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Skills Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="glass-card p-8 rounded-2xl"
      >
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Proficiency Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topSkills.slice(0, 8).map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}