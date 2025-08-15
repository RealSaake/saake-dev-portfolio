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
            <span className="glitch-text neon-glow text-neon-green" data-text="CONTACT">
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
                  className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center hover:border-gray-700 transition-all duration-300 cursor-pointer group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/20 border border-green text-neon-green mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="text-neon-green font-semibold group-hover:underline">
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
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-bold text-neon-green">
                Currently Available
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm currently accepting new projects and collaborations. 
              Whether you need AI integrations, automation workflows, 
              or secure web applications, let's build something amazing together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-full">
                AI/LLM Integration
              </span>
              <span className="px-4 py-2 bg-neon-blue/20 border border-neon-blue text-neon-blue rounded-full">
                Automation Workflows
              </span>
              <span className="px-4 py-2 bg-neon-purple/20 border border-neon-purple text-neon-purple rounded-full">
                Full-Stack Development
              </span>
              <span className="px-4 py-2 bg-neon-pink/20 border border-neon-pink text-neon-pink rounded-full">
                Cloud Infrastructure
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}