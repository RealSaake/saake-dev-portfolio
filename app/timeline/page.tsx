'use client'

import { motion } from 'framer-motion'
import { TimelineItem } from '@/components/timeline-item'
import { SaakeEngine } from '@/components/saake-engine'
import { allEvents } from '@/data/timeline'
import { Clock, Zap } from 'lucide-react'

export default function TimelinePage() {
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
            <span className="gradient-text">
              TIMELINE
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My journey through the digital realm - from first line of code to architecting 
            the future of web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-violet-400"></div>
              
              <div className="space-y-8">
                {allEvents.map((event, index) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Saake Engine */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-24"
            >
              <SaakeEngine />
              
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Career Highlights
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Years Coding</span>
                    <span className="text-pink-400 font-bold">6+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Projects Completed</span>
                    <span className="text-violet-400 font-bold">50+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Technologies Mastered</span>
                    <span className="text-fuchsia-400 font-bold">25+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Open Source Contributions</span>
                    <span className="text-purple-400 font-bold">100+</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}