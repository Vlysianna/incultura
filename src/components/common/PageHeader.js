import React from 'react'
import { motion } from 'framer-motion'

export default function PageHeader({ 
  title, 
  subtitle, 
  badge, 
  userInfo,
  className = "" 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`text-center mb-12 pt-28 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50 mb-6">
          {badge.icon}
          <span className="text-sm font-medium text-gray-600">{badge.text}</span>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {userInfo && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-6 py-3 mt-6"
        >
          {userInfo.icon}
          <span className="text-sm font-medium text-indigo-800">
            {userInfo.text}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
