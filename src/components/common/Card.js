import React from 'react'

export default function Card({ 
  children, 
  className = "", 
  hover = true,
  padding = "p-6" 
}) {
  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 
      ${hover ? 'hover:shadow-xl transition-all duration-300' : ''} 
      ${padding} 
      ${className}
    `}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  )
}
