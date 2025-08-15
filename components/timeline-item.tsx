'use client'

import { motion } from 'framer-motion'
import { TimelineEvent } from '@/data/timeline'
import { Briefcase, GraduationCap, Code, Award, FileCheck, ExternalLink } from 'lucide-react'

interface TimelineItemProps {
  event: TimelineEvent
  index: number
}

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  project: Code,
  achievement: Award,
  certification: FileCheck
}

const colorMap = {
  work: 'text-purple-400 border-purple-400',
  education: 'text-pink-400 border-pink-400',
  project: 'text-violet-400 border-violet-400',
  achievement: 'text-fuchsia-400 border-fuchsia-400',
  certification: 'text-yellow-400 border-yellow-400'
}

export function TimelineItem({ event, index }: TimelineItemProps) {
  const Icon = iconMap[event.type]
  const colorClass = colorMap[event.type]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline Node */}
      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 bg-black ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex-1 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 hover:border-purple-400 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              {event.title}
            </h3>
            {event.company && (
              <p className="text-purple-400 font-medium">
                {event.company}
                {event.location && (
                  <span className="text-gray-400 ml-2">• {event.location}</span>
                )}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {new Date(event.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </span>
            {event.featured && (
              <span className="px-2 py-1 bg-purple-500/20 border border-purple-400 text-purple-400 text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">
          {event.description}
        </p>

        {event.technologies && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {event.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">View Project</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}