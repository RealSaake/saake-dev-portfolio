'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ModernHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Available for work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">Saake</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Full-stack developer building{' '}
            <span className="text-white font-medium">AI-powered applications</span>,{' '}
            <span className="text-white font-medium">automation workflows</span>, and{' '}
            <span className="text-white font-medium">secure web experiences</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" className="group bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
            View My Work
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-white/20 hover:bg-white/5">
            Get In Touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <a 
            href="https://github.com/saake" 
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <Github className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a 
            href="https://linkedin.com/in/saake" 
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
          <a 
            href="mailto:hello@saake.dev" 
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <Mail className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </section>
  )
}