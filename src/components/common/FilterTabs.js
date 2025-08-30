import React from 'react'
import { motion } from 'framer-motion'

export default function FilterTabs({ tabs = [], activeFilter, onFilterChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-2 mb-8 inline-flex gap-2"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        )
      })}
    </motion.div>
  )
}
