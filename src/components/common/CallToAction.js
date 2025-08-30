import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CallToAction({ 
  title, 
  description, 
  buttons = [],
  className = ""
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={`text-center mt-12 ${className}`}
    >
      <div className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {buttons.map((button, index) => (
            <Link 
              key={button.href}
              href={button.href}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                index === 0 
                  ? 'bg-white text-[#a92d23] hover:bg-gray-100' 
                  : 'border border-white text-white hover:bg-white/10'
              }`}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
