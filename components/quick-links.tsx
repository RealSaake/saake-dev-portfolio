'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

const quickLinks = [
  {
    title: 'View Projects',
    description: 'Explore my latest work and experiments',
    href: '/projects',
    icon: ArrowRight,
    color: 'border-neon-green hover:bg-neon-green/10'
  },
  {
    title: 'GitHub',
    description: 'Check out my open source contributions',
    href: 'https://github.com/saake',
    icon: Github,
    color: 'border-neon-blue hover:bg-neon-blue/10',
    external: true
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    href: 'https://linkedin.com/in/saake',
    icon: Linkedin,
    color: 'border-neon-purple hover:bg-neon-purple/10',
    external: true
  },
  {
    title: 'Twitter',
    description: 'Follow my tech thoughts and updates',
    href: 'https://twitter.com/saake_dev',
    icon: Twitter,
    color: 'border-neon-pink hover:bg-neon-pink/10',
    external: true
  }
]

export function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {quickLinks.map((link, index) => {
        const Icon = link.icon
        const Component = link.external ? 'a' : Link
        
        return (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Component
              href={link.href}
              {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              className={`block p-6 bg-black/40 backdrop-blur-md border rounded-lg transition-all duration-300 ${link.color} group`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-current transition-colors">
                  {link.title}
                </h3>
                <Icon className="h-5 w-5 text-gray-400 group-hover:text-current transition-colors" />
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {link.description}
              </p>
            </Component>
          </motion.div>
        )
      })}
    </div>
  )
}