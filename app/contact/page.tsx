'use client'

import { motion } from 'framer-motion'
import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'
import { SocialLinks } from '@/components/social-links'
import { Mail, MessageSquare, Calendar } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Me',
    description: 'Drop me a line for project inquiries or collaborations',
    action: 'hello@saake.dev',
    color: 'neon-green'
  },
  {
    icon: MessageSquare,
    title: 'Let\'s Chat',
    description: 'Schedule a call to discuss your project needs',
    action: 'Schedule Call',
    color: 'neon-blue'
  },
  {
    icon: Calendar,
    title: 'Book a Meeting',
    description: 'Available for consulting and technical discussions',
    action: 'View Calendar',
    color: 'neon-purple'
  }
]

export default function ContactPage() {
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
              CONTACT
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to build something amazing together? Let's connect and discuss 
            how we can bring your ideas to life.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400 transition-all duration-300 cursor-pointer group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="text-purple-400 font-semibold group-hover:underline">
                    {method.action}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            <ContactInfo />
            <SocialLinks />
          </motion.div>
        </div>

        {/* Availability Status */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-bold text-purple-400">
                Currently Available
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm currently accepting new projects and collaborations. 
              Whether you need AI integrations, automation workflows, 
              or secure web applications, let's build something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-purple-500/20 border border-purple-400 text-purple-400 rounded-full">
                AI/LLM Integration
              </span>
              <span className="px-4 py-2 bg-pink-500/20 border border-pink-400 text-pink-400 rounded-full">
                Automation Workflows
              </span>
              <span className="px-4 py-2 bg-violet-500/20 border border-violet-400 text-violet-400 rounded-full">
                Full-Stack Development
              </span>
              <span className="px-4 py-2 bg-fuchsia-500/20 border border-fuchsia-400 text-fuchsia-400 rounded-full">
                Cloud Infrastructure
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}