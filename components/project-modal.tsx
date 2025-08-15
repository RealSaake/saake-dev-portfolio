'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Star, GitFork, Users, Calendar, Code } from 'lucide-react'
import { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-black/90 backdrop-blur-md border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="relative h-64 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 overflow-hidden">
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-6 left-6 right-16">
                <div className="flex items-center gap-3 mb-3">
                  {project.featured && (
                    <span className="px-3 py-1 bg-neon-green/20 border border-neon-green text-neon-green text-sm rounded-full">
                      Featured
                    </span>
                  )}
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    project.status === 'completed' ? 'bg-green-500/20 border border-green-500 text-green-400' :
                    project.status === 'in-progress' ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-400' :
                    'bg-gray-500/20 border border-gray-500 text-gray-400'
                  }`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white neon-glow">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-300 mt-2">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {project.stats.stars && (
                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4 text-center">
                    <Star className="h-6 w-6 text-neon-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats.stars}</div>
                    <div className="text-sm text-gray-400">Stars</div>
                  </div>
                )}
                {project.stats.forks && (
                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4 text-center">
                    <GitFork className="h-6 w-6 text-neon-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats.forks}</div>
                    <div className="text-sm text-gray-400">Forks</div>
                  </div>
                )}
                {project.stats.users && (
                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-neon-purple mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats.users.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Users</div>
                  </div>
                )}
                {project.stats.downloads && (
                  <div className="bg-black/40 border border-gray-800 rounded-lg p-4 text-center">
                    <Code className="h-6 w-6 text-neon-pink mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{project.stats.downloads.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Downloads</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neon-green mb-4">About This Project</h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neon-green mb-4">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-gray-300 hover:border-neon-green/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-neon-green mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neon-green/20 border border-neon-green text-neon-green text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-5 w-5" />
                  <span>Timeline: {project.timeline}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    View Code
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}