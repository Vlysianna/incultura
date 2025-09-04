import React from 'react'
import Image from 'next/image'

export default function Avatar({ src, alt = 'avatar', size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>
  <Image src={typeof src === 'string' && src.startsWith('data:') ? src : (typeof src === 'string' ? encodeURI(src) : src)} alt={alt} width={size} height={size} />
    </div>
  )
}
