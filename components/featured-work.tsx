'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { featuredProjects } from '@/data/projects'

export function FeaturedWork() {
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
          Featured Work
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A selection of projects that showcase my expertise in modern web development, 
          AI integration, and automation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="glass-card p-8 hover-lift smooth-shadow h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-400" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-400">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              {project.stats && (
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  {project.stats.users && (
                    <div>
                      <span className="text-white font-semibold">
                        {project.stats.users.toLocaleString()}
                      </span>{' '}
                      users
                    </div>
                  )}
                  {project.stats.stars && (
                    <div>
                      <span className="text-white font-semibold">
                        {project.stats.stars}
                      </span>{' '}
                      stars
                    </div>
                  )}
                  {project.stats.visits && (
                    <div>
                      <span className="text-white font-semibold">
                        {project.stats.visits.toLocaleString()}
                      </span>{' '}
                      visits
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}