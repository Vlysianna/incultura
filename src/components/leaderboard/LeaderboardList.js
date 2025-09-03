import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, ChevronUp, ChevronDown } from 'lucide-react'

export default function LeaderboardList({ 
  users = [], 
  currentUserId = null,
  startRank = 4 
}) {
  if (users.length === 0) return null

  return (
    <div className="p-6">
      <AnimatePresence>
        {users.map((user, index) => {
          const rank = index + startRank
          const isCurrentUser = currentUserId === user.id
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-xl mb-3 transition-all duration-300 hover:shadow-md ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200' 
                  : 'bg-gray-50 hover:bg-white border border-gray-200'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm border border-gray-200">
                <span className="font-bold text-gray-600">#{rank}</span>
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {user.name || user.email}
                  {isCurrentUser && (
                    <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                      Anda
                    </span>
                  )}
                </h4>
                <p className="text-sm text-gray-600">
                  {user.activitiesCount != null ? user.activitiesCount : (user.activities?.length || 0)} aktivitas
                </p>
              </div>

              {/* Coins */}
              <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-700">{user.coins || 0}</span>
              </div>

              {/* Trend indicator */}
              <div className="text-green-500">
                {Math.random() > 0.5 ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-red-500" />}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
