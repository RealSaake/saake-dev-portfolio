'use client'

import { memo, Fragment } from 'react'
import Image from 'next/image'
import { Container } from './primitives'

interface BadgeItem {
  id: string
  label: string
  imageSrc: string
  width: number
  height: number
  renderedHeight: number
}

const BADGES: BadgeItem[] = [
  {
    id: 'harvard',
    label: 'CS50x Cert',
    imageSrc: '/media/certificates/harvard.png',
    width: 56,
    height: 64,
    renderedHeight: 30,
  },
  {
    id: 'meta',
    label: 'Meta Cert',
    imageSrc: '/media/certificates/meta.png',
    width: 96,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'openai',
    label: 'OpenAI Bootcamp',
    imageSrc: '/media/certificates/openai.png',
    width: 64,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'aws',
    label: 'AWS Cloud',
    imageSrc: '/media/certificates/aws.png',
    width: 96,
    height: 64,
    renderedHeight: 26,
  },
  {
    id: 'gcp',
    label: 'GCP Infra',
    imageSrc: '/media/certificates/gcp.png',
    width: 80,
    height: 64,
    renderedHeight: 26,
  },
]

export const CapabilitiesTicker = memo(function CapabilitiesTicker() {
  return (
    <section
      aria-label="Certifications and foundations"
      className="relative z-10 w-full py-6"
    >
      <Container>
        <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 flex-nowrap overflow-x-auto no-scrollbar py-1">
          {BADGES.map((item, idx) => (
            <Fragment key={item.id}>
              <div className="group inline-flex items-center shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-default gap-3">
                <div className="flex items-center justify-center shrink-0">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={item.width}
                    height={item.height}
                    unoptimized
                    style={{
                      height: `${item.renderedHeight}px`,
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-muted group-hover:text-ink transition-colors font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </div>

              {/* Divider dot */}
              {idx < BADGES.length - 1 && (
                <span
                  className="h-1 w-1 rounded-full bg-muted-2/40 shrink-0"
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  )
})
