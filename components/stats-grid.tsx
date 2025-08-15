'use client'

import { motion } from 'framer-motion'
import { Code, Coffee, GitBranch, Zap } from 'lucide-react'
import { AnimatedCounter } from '@/components/react-bits/animated-counter'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    icon: Code,
    label: 'Lines of Code',
    value: 500000,
    suffix: '+',
    color: 'text-neon-green'
  },
  {
    icon: Coffee,
    label: 'Cups of Coffee',
    value: 2847,
    suffix: '',
    color: 'text-neon-blue'
  },
  {
    icon: GitBranch,
    label: 'Commits',
    value: 12543,
    suffix: '+',
    color: 'text-neon-purple'
  },
  {
    icon: Zap,
    label: 'Projects Deployed',
    value: 127,
    suffix: '',
    color: 'text-neon-pink'
  }
]



export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/40 backdrop-blur-md border-gray-800 hover:border-neon-green/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color} neon-glow`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}