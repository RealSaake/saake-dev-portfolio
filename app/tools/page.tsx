'use client'

import { motion } from 'framer-motion'
import { ToolCard } from '@/components/tool-card'
import { tools } from '@/data/tools'
import { Wrench, Code, Zap } from 'lucide-react'

export default function ToolsPage() {
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
              TOOLS
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of utility tools and mini-applications I've built to solve 
            everyday development challenges. Each tool is crafted with precision and purpose.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={index}
            />
          ))}
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-8">
            <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">More Tools Coming Soon</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm constantly building new tools to streamline development workflows. 
              Have an idea for a tool that would be useful? Let me know!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
            >
              Suggest a Tool
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}