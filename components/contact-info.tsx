'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@saake.dev',
    href: 'mailto:hello@saake.dev',
    color: 'text-neon-green'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'text-neon-blue'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
    color: 'text-neon-purple'
  },
  {
    icon: Clock,
    label: 'Timezone',
    value: 'PST (UTC-8)',
    href: null,
    color: 'text-neon-pink'
  }
]

const workingHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM PST' },
  { day: 'Sunday', hours: 'Emergency only' }
]

export function ContactInfo() {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-neon-green mb-6">
        Get in Touch
      </h2>
      
      <div className="space-y-6 mb-8">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon
          const content = (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-black/40 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-green/20 border border-green text-neon-green">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm text-gray-400">{detail.label}</div>
                <div className={`font-semibold ${detail.color}`}>
                  {detail.value}
                </div>
              </div>
            </motion.div>
          )

          return detail.href ? (
            <a key={detail.label} href={detail.href} className="block">
              {content}
            </a>
          ) : (
            <div key={detail.label}>
              {content}
            </div>
          )
        })}
      </div>

      {/* Working Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Working Hours
        </h3>
        <div className="space-y-3">
          {workingHours.map((schedule, index) => (
            <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <span className="text-gray-300">{schedule.day}</span>
              <span className="text-neon-blue font-medium">{schedule.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 p-4 bg-neon-green/10 border border-neon-green rounded-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-neon-green font-semibold">Quick Response</span>
        </div>
        <p className="text-sm text-gray-300">
          I typically respond to emails within 24 hours during business days. 
          For urgent matters, please mention "URGENT" in the subject line.
        </p>
      </motion.div>
    </div>
  )
}