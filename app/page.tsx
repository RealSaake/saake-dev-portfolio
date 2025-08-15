'use client'

import { motion } from 'framer-motion'
import { ModernHero } from '@/components/modern-hero'
import { FeaturedWork } from '@/components/featured-work'
import { SkillsShowcase } from '@/components/skills-showcase'
import { ContactCTA } from '@/components/contact-cta'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ModernHero />
      
      {/* Featured Work */}
      <motion.section 
        className="py-32 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FeaturedWork />
      </motion.section>

      {/* Skills Showcase */}
      <motion.section 
        className="py-32 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SkillsShowcase />
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        className="py-32 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ContactCTA />
      </motion.section>
    </div>
  )
}