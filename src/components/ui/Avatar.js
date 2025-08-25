import React from 'react'
import Image from 'next/image'

export default function Avatar({ src, alt = 'avatar', size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  )
}
