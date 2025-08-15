'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Users } from 'lucide-react'
import { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden hover:border-neon-green/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-4 right-4 flex gap-2">
          {project.featured && (
            <span className="px-2 py-1 bg-neon-green/20 border border-neon-green text-neon-green text-xs rounded-full">
              Featured
            </span>
          )}
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.status === 'completed' ? 'bg-green-500/20 border border-green-500 text-green-400' :
            project.status === 'in-progress' ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-400' :
            'bg-gray-500/20 border border-gray-500 text-gray-400'
          }`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-black/60 text-xs text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-black/60 text-xs text-gray-300 rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {project.stats.stars && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{project.stats.stars}</span>
              </div>
            )}
            {project.stats.forks && (
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{project.stats.forks}</span>
              </div>
            )}
            {project.stats.users && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{project.stats.users}</span>
              </div>
            )}
          </div>
          <span className="text-sm text-gray-500">{project.timeline}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {project.demoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.demoUrl, '_blank')
                }}
                className="p-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.githubUrl, '_blank')
                }}
                className="p-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                <Github className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex -space-x-1">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <div
                key={tech}
                className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full border-2 border-black flex items-center justify-center text-xs font-bold"
                title={tech}
              >
                {tech.charAt(0)}
              </div>
            ))}
            {project.techStack.length > 3 && (
              <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-black flex items-center justify-center text-xs text-gray-400">
                +{project.techStack.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}