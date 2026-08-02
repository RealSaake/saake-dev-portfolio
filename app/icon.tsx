import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/* A dot in vermillion on paper. No letterform — at 32px an "S" in
   Instrument Serif is mush, and a shape that survives the size is
   worth more than one that is technically the wordmark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f7f5f0',
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#9b3312' }} />
      </div>
    ),
    size
  )
}
