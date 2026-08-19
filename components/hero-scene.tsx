'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import type { Group, Mesh } from 'three'

function Sculpture({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    if (!group.current || !core.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
    core.current.rotation.z -= delta * 0.14
  })

  // Desktop: offset right [2.1, 0.12, 0] to align vertically with headline; Mobile: centered backdrop
  const position: [number, number, number] = isMobile ? [0, 0.1, 0] : [2.1, 0.12, 0]
  // Reduced scale by ~10% per Prompt 19
  const scale = isMobile ? 0.75 : 0.92

  return (
    <group ref={group} position={position} rotation={[0.3, -0.3, 0.15]} scale={scale}>
      {/* Clean generative wireframe knot only — zero orbits, zero envelope */}
      <mesh ref={core}>
        <torusKnotGeometry args={[1.1, 0.26, 200, 26, 2, 5]} />
        <meshPhysicalMaterial
          color="#b8e928"
          roughness={0.16}
          metalness={0.2}
          clearcoat={1}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    media.addEventListener('change', listener)

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      media.removeEventListener('change', listener)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 4, 5]} intensity={3.0} color="#e8fa9f" />
        <directionalLight position={[-4, -2, -3]} intensity={1.2} color="#556e10" />
        <Sculpture reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
