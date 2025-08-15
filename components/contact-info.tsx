'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@saake.dev',
    href: 'mailto:hello@saake.dev',
    color: 'text-purple-400'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'text-pink-400'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
    color: 'text-violet-400'
  },
  {
    icon: Clock,
    label: 'Timezone',
    value: 'PST (UTC-8)',
    href: null,
    color: 'text-fuchsia-400'
  }
]

const workingHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM PST' },
  { day: 'Sunday', hours: 'Emergency only' }
]

export function ContactInfo() {
  return (
    <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
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
              className="flex items-center gap-4 p-4 bg-black/40 border border-purple-500/30 rounded-lg hover:border-purple-400 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400 text-purple-400">
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
              <span className="text-pink-400 font-medium">{schedule.hours}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 p-4 bg-purple-500/10 border border-purple-400 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-purple-400 font-semibold">Quick Response</span>
        </div>
        <p className="text-sm text-gray-300">
          I typically respond to emails within 24 hours during business days. 
          For urgent matters, please mention "URGENT" in the subject line.
        </p>
      </motion.div>
    </div>
  )
}