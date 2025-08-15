'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { topSkills } from '@/data/skills'

export function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    const skills = topSkills.slice(0, 8) // Top 8 skills for radar

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw radar grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1

      // Concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Radar lines
      const angleStep = (Math.PI * 2) / skills.length
      for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()
      }

      // Draw skill polygon
      ctx.strokeStyle = '#a855f7'
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)'
      ctx.lineWidth = 2
      ctx.beginPath()

      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2
        const skillRadius = (skill.level / 100) * radius
        const x = centerX + Math.cos(angle) * skillRadius
        const y = centerY + Math.sin(angle) * skillRadius
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw skill points and labels
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2
        const skillRadius = (skill.level / 100) * radius
        const x = centerX + Math.cos(angle) * skillRadius
        const y = centerY + Math.sin(angle) * skillRadius
        
        // Skill point
        ctx.fillStyle = '#a855f7'
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Skill label
        const labelX = centerX + Math.cos(angle) * (radius + 20)
        const labelY = centerY + Math.sin(angle) * (radius + 20)
        
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.name, labelX, labelY)
        
        // Skill level
        ctx.fillStyle = '#ec4899'
        ctx.font = '10px monospace'
        ctx.fillText(`${skill.level}%`, labelX, labelY + 15)
      })
    }

    // Animate the radar
    let animationProgress = 0
    const animate = () => {
      if (animationProgress < 1) {
        animationProgress += 0.02
        
        // Temporarily modify skill levels for animation
        const animatedSkills = skills.map(skill => ({
          ...skill,
          level: skill.level * Math.min(animationProgress, 1)
        }))
        
        // Redraw with animated values
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw static radar grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 1
        
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath()
          ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2)
          ctx.stroke()
        }
        
        const angleStep = (Math.PI * 2) / skills.length
        for (let i = 0; i < skills.length; i++) {
          const angle = i * angleStep - Math.PI / 2
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
        
        // Draw animated polygon
        ctx.strokeStyle = '#a855f7'
        ctx.fillStyle = 'rgba(168, 85, 247, 0.1)'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        animatedSkills.forEach((skill, index) => {
          const angle = index * angleStep - Math.PI / 2
          const skillRadius = (skill.level / 100) * radius
          const x = centerX + Math.cos(angle) * skillRadius
          const y = centerY + Math.sin(angle) * skillRadius
          
          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        
        requestAnimationFrame(animate)
      } else {
        drawRadar()
      }
    }

    setTimeout(() => animate(), 500)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-lg p-6"
    >
      <h3 className="text-xl font-semibold text-purple-400 mb-6 text-center">
        Skills Radar
      </h3>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="max-w-full h-auto"
        />
      </div>
      <p className="text-sm text-gray-400 text-center mt-4">
        Visualization of my top technical skills and proficiency levels
      </p>
    </motion.div>
  )
}