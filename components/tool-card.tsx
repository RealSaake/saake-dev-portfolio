'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Tool } from '@/data/tools'
import { ExternalLink, Clock, Beaker, CheckCircle } from 'lucide-react'

interface ToolCardProps {
  tool: Tool
  index: number
}

const statusConfig = {
  active: {
    icon: CheckCircle,
    color: 'text-purple-400 border-purple-400',
    bg: 'bg-purple-500/20',
    label: 'Active'
  },
  beta: {
    icon: Beaker,
    color: 'text-yellow-400 border-yellow-400',
    bg: 'bg-yellow-400/20',
    label: 'Beta'
  },
  'coming-soon': {
    icon: Clock,
    color: 'text-gray-400 border-gray-400',
    bg: 'bg-gray-400/20',
    label: 'Coming Soon'
  }
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const status = statusConfig[tool.status]
  const StatusIcon = status.icon
  const isClickable = tool.status !== 'coming-soon' && tool.url

  const CardContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={isClickable ? { scale: 1.02, y: -5 } : {}}
      className={`bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 h-full transition-all duration-300 ${
        isClickable 
          ? 'hover:border-purple-400 cursor-pointer group' 
          : 'opacity-75'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`text-4xl mb-3 ${isClickable ? 'group-hover:scale-110 transition-transform' : ''}`}>
          {tool.icon}
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full border ${status.bg} ${status.color}`}>
            {status.label}
          </span>
          {isClickable && (
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
          )}
        </div>
      </div>

      <h3 className={`text-xl font-bold mb-3 ${isClickable ? 'text-white group-hover:text-purple-400' : 'text-gray-300'} transition-colors`}>
        {tool.title}
      </h3>

      <p className="text-gray-300 mb-4 leading-relaxed">
        {tool.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Features:</h4>
        <ul className="space-y-1">
          {tool.features.slice(0, 3).map(feature => (
            <li key={feature} className="text-sm text-gray-300 flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color}`}></div>
              {feature}
            </li>
          ))}
          {tool.features.length > 3 && (
            <li className="text-sm text-gray-400">
              +{tool.features.length - 3} more features
            </li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-400 mb-2">Built with:</h4>
        <div className="flex flex-wrap gap-1">
          {tool.technologies.map(tech => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4">
        <span className={`text-sm font-medium text-${tool.color} capitalize`}>
          {tool.category}
        </span>
        {isClickable && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg bg-${tool.color}/20 border border-${tool.color.replace('neon-', '')} text-${tool.color}`}
          >
            <StatusIcon className="h-4 w-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )

  if (isClickable) {
    return (
      <Link href={tool.url!}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}