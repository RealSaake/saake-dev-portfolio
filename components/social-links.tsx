'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/saake',
    color: 'hover:text-purple-400 hover:border-purple-400',
    description: 'Open source projects and contributions'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/saake',
    color: 'hover:text-pink-400 hover:border-pink-400',
    description: 'Professional network and career updates'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/saake_dev',
    color: 'hover:text-violet-400 hover:border-violet-400',
    description: 'Tech thoughts and industry insights'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/saake.dev',
    color: 'hover:text-fuchsia-400 hover:border-fuchsia-400',
    description: 'Behind the scenes and life updates'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/@saakedev',
    color: 'hover:text-red-400 hover:border-red-400',
    description: 'Coding tutorials and tech reviews'
  }
]

const platforms = [
  {
    name: 'Dev.to',
    href: 'https://dev.to/saake',
    description: 'Technical articles and tutorials',
    color: 'neon-green'
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@saake',
    description: 'In-depth technical writing',
    color: 'neon-blue'
  },
  {
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/saake',
    description: 'Helping the developer community',
    color: 'neon-purple'
  },
  {
    name: 'CodePen',
    href: 'https://codepen.io/saake',
    description: 'Creative coding experiments',
    color: 'neon-pink'
  }
]

export function SocialLinks() {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Connect & Follow
      </h2>
      
      {/* Main Social Links */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-4 p-4 bg-black/40 border border-purple-500/30 rounded-lg transition-all duration-300 group ${social.color}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border border-gray-600 text-gray-300 group-hover:bg-current/20 group-hover:border-current group-hover:text-current transition-all">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white group-hover:text-current transition-colors">
                  {social.name}
                </div>
                <div className="text-sm text-gray-400">
                  {social.description}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-current transition-colors" />
            </motion.a>
          )
        })}
      </div>

      {/* Additional Platforms */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Other Platforms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="block p-3 bg-black/40 border border-purple-500/30 rounded-lg hover:border-purple-400 hover:text-purple-400 transition-all duration-300 group"
            >
              <div className="font-medium text-white group-hover:text-current transition-colors">
                {platform.name}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {platform.description}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 p-4 bg-purple-500/10 border border-purple-400 rounded-lg"
      >
        <h4 className="text-lg font-semibold text-purple-400 mb-2">
          Stay Updated
        </h4>
        <p className="text-sm text-gray-300 mb-4">
          Subscribe to my newsletter for the latest updates on projects, 
          tutorials, and tech insights.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
        >
          Subscribe to Newsletter
        </motion.button>
      </motion.div>
    </div>
  )
}