'use client'

import { motion } from 'framer-motion'
import { featuredEvents } from '@/data/timeline'
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react'

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
  project: Code,
  certification: Award
}

const colorMap = {
  work: 'neon-blue',
  education: 'neon-green',
  achievement: 'neon-pink',
  project: 'neon-purple',
  certification: 'yellow-400'
}

export function ExperienceGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">
        Key Milestones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredEvents.map((event, index) => {
          const Icon = iconMap[event.type]
          const color = colorMap[event.type]
          
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 hover:border-purple-400 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400 text-purple-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  {event.company && (
                    <p className="text-sm text-purple-400 font-medium">
                      {event.company}
                    </p>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
              
              {event.technologies && (
                <div className="flex flex-wrap gap-1">
                  {event.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {event.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded border border-purple-500/30">
                      +{event.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}