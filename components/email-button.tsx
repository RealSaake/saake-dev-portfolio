'use client'

import { useState } from 'react'

interface EmailButtonProps {
  email: string
  label?: string
  className?: string
}

export function EmailButton({ email, label = 'Copy email', className = 'signal-button' }: EmailButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label={`Copy email address: ${email}`}
    >
      {copied ? 'Copied to clipboard!' : label}
    </button>
  )
}
