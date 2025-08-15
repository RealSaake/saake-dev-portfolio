import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(135deg, #000 0%, #111 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff41',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          border: '4px solid #00ff41',
          borderRadius: '20px',
        }}
      >
        &gt;_
      </div>
    ),
    {
      ...size,
    }
  )
}