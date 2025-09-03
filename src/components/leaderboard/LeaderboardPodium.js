import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Medal, Award, Coins } from 'lucide-react'

export default function LeaderboardPodium({ users = [] }) {
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return null
    }
  }

  if (users.length === 0) return null

  return (
    <div className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {users.slice(0, 3).map((user, index) => {
          const rank = index + 1
          const isFirst = rank === 1
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`text-center ${
                isFirst ? 'md:order-2' : rank === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className={`relative inline-block mb-4 ${
                isFirst ? 'transform md:scale-110' : ''
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                  rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  'bg-gradient-to-br from-amber-500 to-amber-700'
                }`}>
                  {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="absolute -top-2 -right-2">
                  {getRankIcon(rank)}
                </div>
              </div>
              
              <h3 className="font-bold text-gray-800 mb-1">
                {user.name || user.email}
              </h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-yellow-700">{user.coins || 0}</span>
              </div>
              <div className="text-sm text-gray-600">
                {user.activitiesCount != null ? user.activitiesCount : (user.activities?.length || 0)} aktivitas
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
